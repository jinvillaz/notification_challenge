import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import log4js from 'log4js'
import { initializeData } from './mock-data'

const logger = log4js.getLogger('DbConnection')
class DbManager {
  urlConnection: string
  constructor() {
    this.urlConnection = 'mongodb://localhost:27017/test'
  }

  loadModels() {
    const pathModels = `${__dirname}/model`
    const models = fs.readdirSync(pathModels)
    models.forEach((model) => {
      const name = path.parse(model).name
      require(`${pathModels}/${name}`)
    })
    logger.info('Models loaded. ', models.length)
  }

  async connect() {
    this.urlConnection = process.env.DATABASE_URL
    await mongoose.connect(this.urlConnection)
    logger.info(`Successful database connection on ${this.urlConnection}`)
    this.loadModels()
    await initializeData()
  }

  async disconnect() {
    await mongoose.disconnect()
    logger.info('Successful database disconnection.')
  }
}

export const dbManager = new DbManager()
