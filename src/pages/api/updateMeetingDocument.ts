import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { MeetingDocument, Meeting } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meetingdoc_info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams(['meeting_document'], meetingdoc_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // update the meeting document with new info and save to db
  const meetingDoc = await MeetingDocument.findByIdAndUpdate(
    meetingdoc_info.meeting_document.id,
    { $set: meetingdoc_info },
    { new: true }
  )

  // return the result
  res.status(200).json(meetingDoc)
}
