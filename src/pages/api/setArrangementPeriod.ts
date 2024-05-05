import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { MeetingDocument, Meeting, Group } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = JSON.parse(req.body)

  // checks for required parameters
  const param_res = checkParams(['groupId', 'timeset'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // overwriting timeset
  Group.findByIdAndUpdate(
    info.groupId,
    { $set: { arrangement_period: info.timeset } },
    { new: true }
  )

  // return timeset
  res.status(200).json(info.timeset)
}
