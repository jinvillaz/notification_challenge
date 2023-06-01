import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)
channelSchema.indexes()
channelSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const Channel = mongoose.model('Channel', channelSchema)
export default Channel
