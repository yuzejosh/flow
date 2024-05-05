import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const timeset_info = JSON.parse(req.body)
  const param_res = checkParams(['timeset', 'groupId'], timeset_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  await connectDB()

  const group = await Group.findByIdAndUpdate(timeset_info.groupId, { $push: { time_sets: timeset_info.timeset } }, { new: true })


  res.status(200).json(group.time_sets)
}