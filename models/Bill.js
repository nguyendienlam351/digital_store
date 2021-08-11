import mongoose from 'mongoose'

const BillSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date for this bill.'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this bill.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a type for this bill.'],
    maxlength: [10, 'Phone cannot be more than 10 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please provide a address for this bill.'],
  },
  product: {
    type: Array,
    required: [true, 'Please provide products for this bill.'],
  },
})

export default mongoose.models.Bill || mongoose.model('Bill', BillSchema)
