import mongoose, { ConnectOptions } from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

console.log(process.env.SOMEINFO)
let mongodbConnection = null

const uri = process.env.DB_URI!
try {
  mongodbConnection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
} catch (e) {
  console.log('failed to connect to mongodb. Error:', e)
}

export { mongodbConnection }
