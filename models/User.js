import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'Please provide a user name for this user.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for this user.'],
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)