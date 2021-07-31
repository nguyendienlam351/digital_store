import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a image for this product.'],
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [24, 'Name cannot be more than 60 characters'],
  },
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
