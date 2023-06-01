import { Request, Response } from 'express'
import log4js from 'log4js'
import mongoose from 'mongoose'

const logger = log4js.getLogger('CategoryHandler')
logger.level = 'debug'

export const getHandler = async (req: Request, res: Response) => {
  const notificationModel = mongoose.model('Category')
  const data = await notificationModel.find({})
  res.json(data)
}
