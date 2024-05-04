import mongoose, { ConnectOptions } from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

export async function connectDB() {
  const uri = process.env.DB_URI!
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
}
