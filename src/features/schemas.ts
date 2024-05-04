import mongoose from 'mongoose'

const userSchema = new mongoose.Schema<User>({
  username: String,
  email: String,
})

export { userSchema }
