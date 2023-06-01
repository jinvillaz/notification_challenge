import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
  },
  {
    timestamps: true,
  },
)
notificationSchema.indexes()
notificationSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const User = mongoose.model('Notification', notificationSchema)
export default User
