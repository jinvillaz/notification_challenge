import { Request, Response } from 'express'
import log4js from 'log4js'
import mongoose from 'mongoose'

const logger = log4js.getLogger('ChannelHandler')
logger.level = 'debug'

export const getHandler = async (req: Request, res: Response) => {
  const channelModel = mongoose.model('Channel')
  const data = await channelModel.find({})
  res.json(data)
}
