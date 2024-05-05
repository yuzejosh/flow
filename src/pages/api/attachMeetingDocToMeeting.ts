import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { MeetingDocument, Meeting } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams(['meeting_id', 'meeting_doc_id'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // get meeting doc
  const meetingDocument = await MeetingDocument.findOne(info.meeting_doc_id)

  // attaching the meeting document to the meeting
  await Meeting.findByIdAndUpdate(
    info.meeting_id,
    { $push: { meetingDocuments: meetingDocument } },
    { new: true }
  )

  // sending result back
  res.status(200).json(meetingDocument)
}
