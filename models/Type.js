import mongoose from 'mongoose'

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this type.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a image for this type.'],
  },
})

export default mongoose.models.Type || mongoose.model('Type', TypeSchema)
