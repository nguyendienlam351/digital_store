import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a image for this product.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product.'],
  },
  type: {
    type: String,
    required: [true, 'Please provide a type for this product.'],
    maxlength: [30, 'Name cannot be more than 30 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide a quantity for this product.'],
  },
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
