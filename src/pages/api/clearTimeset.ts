import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = JSON.parse(req.body)
  const param_res = checkParams(['groupId'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // clear the timesets
  const group = Group.findByIdAndUpdate(
    info.groupId,
    { $set: { time_sets: [] } },
    { new: true }
  )

  // return the group
  res.status(200).json(group)
}
