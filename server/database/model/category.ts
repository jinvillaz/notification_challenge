import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const categorySchema = new Schema(
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
categorySchema.indexes()
categorySchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const Category = mongoose.model('Category', categorySchema)
export default Category
