import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group, Meeting } from '@/features/mongodb/models'
import { checkParams } from '../../app/lib/apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meeting_info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams(['groupId', 'time'], meeting_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // find the group
  const group = await Group.findById(meeting_info.groupId)

  console.log(meeting_info)
  const newMeeting = new Meeting({
    meetingPeriod: {
        startDatetime: new Date(meeting_info.time.startDatetime),
        endDatetime: new Date(meeting_info.time.endDatetime)
    },
    group: group
  })
  console.log(newMeeting)
//   await newMeeting.save()
  res.status(200).json(newMeeting)
}
