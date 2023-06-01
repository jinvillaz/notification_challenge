import { Request, Response } from 'express'
import log4js from 'log4js'
import { schema } from './schema-validator'
import mongoose from 'mongoose'

const logger = log4js.getLogger('NotificationHandler')
logger.level = 'debug'
const BAD_REQUEST = 400

interface Notification {
  message: string
  category: string
  user: string
  channel: string
}

export const getHandler = async (req: Request, res: Response) => {
  const notificationModel = mongoose.model('Notification')
  const data = await notificationModel.find({}).populate(['user', 'channel', 'category']).sort({ createdAt: -1 }).exec()
  res.json(data)
}

export const postHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body
    await schema.validate(data, { abortEarly: false, strict: true })
    const item: Notification = {
      ...data,
    }
    const userModel = mongoose.model('User')
    const users = await userModel.find({ subscribed: item.category }).populate('channels').exec()
    const notificationModel = mongoose.model('Notification')
    const notificationsCreated = []
    await Promise.all(users.map(async (user) => {
      await Promise.all(user.channels.map(async (channel) => {
        // Todo implement notification handler
        console.info('send notification by ', channel.name, ' to user: ', user.name)
        item.channel = channel._id
        item.user = user._id
        const notificationCreated = await notificationModel.create(item)
        notificationsCreated.push(await notificationModel.findById(notificationCreated).populate(['user', 'channel', 'category']).exec())
      }))
    }))
    res.json(notificationsCreated.reverse())
  } catch (e) {
    logger.warn(e)
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors)
    } else {
      return res.status(BAD_REQUEST).send(e.message)
    }
  }
}
