import mongoose, { Document, Schema } from 'mongoose'

const userSchema = new mongoose.Schema<User & Document>(
  {
    username: String,
    email: String,
  },
  { strict: true }
)

const groupSchema = new mongoose.Schema<Group & Document>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leader: { type: Schema.Types.ObjectId, ref: 'User' },
    arrangement_period: { type: Schema.Types.Mixed, ref: 'TimeSet' },
    time_sets: [{ type: Schema.Types.Mixed, ref: 'TimeSet' }],
  },
  { strict: true }
)

const meetingSchema = new mongoose.Schema<Meeting & Document>(
  {
    meetingPeriod: {
      type: Schema.Types.ObjectId,
      trim: false,
      cast: false,
      default: null
    },
    meetingDocuments: [{ type: Schema.Types.ObjectId, ref: 'MeetingDocument' }],
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
  },
  { strict: false }
)

const meetingDocumentSchema = new mongoose.Schema<MeetingDocument & Document>(
  {
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  },
  { strict: true }
)

export { userSchema, groupSchema, meetingSchema, meetingDocumentSchema }
