import mongoose from 'mongoose'
import { groupSchema, userSchema } from './schemas'

const User = mongoose.models.User || mongoose.model('User', userSchema)
const Group = mongoose.models.Group || mongoose.model('Group', groupSchema)

export { User, Group }
