import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    subscribed: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
  },
  {
    timestamps: true,
  },
)
userSchema.indexes()
userSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const User = mongoose.model('User', userSchema)
export default User
