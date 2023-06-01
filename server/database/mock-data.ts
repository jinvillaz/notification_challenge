import mongoose from 'mongoose'

export const initializeData = async () => {
  const categoryModel = mongoose.model('Category')
  let categories = await categoryModel.find({})
  if (categories.length === 0) {
    await categoryModel.create({ name: 'Sports' })
    await categoryModel.create({ name: 'Finance' })
    await categoryModel.create({ name: 'Movies' })
    categories = await categoryModel.find({})
  }
  const channelModel = mongoose.model('Channel')
  let channels = await channelModel.find({})
  if (channels.length === 0) {
    await channelModel.create({ name: 'sms' })
    await channelModel.create({ name: 'email' })
    await channelModel.create({ name: 'push-notification' })
    channels = await channelModel.find({})
  }
  const userModel = mongoose.model('User')
  const users = await userModel.find({})
  if (users.length === 0) {
    await userModel.create({ name: 'jhon perez', email: 'jperez@gmail.com', phone: '5917221478', subscribed: [categories[0]._id ], channels: [channels[0]._id] })
    await userModel.create({ name: 'julio peredo', email: 'jperedo@gmail.com', phone: '5917221479', subscribed: [categories[1]._id ], channels: [channels[1]._id] })
    await userModel.create({ name: 'jhon titor', email: 'jtitor@gmail.com', phone: '5917221470', subscribed: [categories[2]._id ], channels: [channels[2]._id] })
  }
}
