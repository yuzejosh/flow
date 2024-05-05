import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group, Meeting } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meeting_info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams(['meeting_id', 'period', 'attendees'], meeting_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  

  await connectDB()

  const newMeeting = new Meeting(meeting_info)
  await newMeeting.save()
  res.status(200).json(newMeeting)
}
