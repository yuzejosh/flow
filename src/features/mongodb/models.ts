import mongoose from 'mongoose'
import { groupSchema, meetingDocumentSchema, meetingSchema, userSchema } from './schemas'

const User = mongoose.models.User || mongoose.model('User', userSchema)
const Group = mongoose.models.Group || mongoose.model('Group', groupSchema)
const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema)
const MeetingDocument = mongoose.models.MeetingDocument || mongoose.model('MeetingDocument', meetingDocumentSchema)

export { User, Group, Meeting, MeetingDocument }
