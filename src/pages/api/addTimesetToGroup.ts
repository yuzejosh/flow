import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = JSON.parse(req.body)
  const param_res = checkParams(['times', 'groupId', 'user'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to database
  await connectDB()

  // add the timset to the group
  const group = await Group.findByIdAndUpdate(
    info.groupId,
    { $push: { time_sets: { user: info.user, times: info.times } } },
    { new: true }
  )

  res.status(200).json(group.time_sets)
}
