import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { MeetingDocument, Meeting } from '@/features/mongodb/models'
import { checkParams } from '../../app/lib/apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meeting_info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams([], meeting_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // saving to DB
  const meetingDocument = new MeetingDocument()
  await meetingDocument.save()
  res.status(200).json(meetingDocument)
}
