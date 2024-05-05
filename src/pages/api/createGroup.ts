import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group, User } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const info = JSON.parse(req.body)
  const param_res = checkParams(['leaderId'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // get user
  const leader = await User.findById(info.leaderId)

  console.log('LEADER', leader)

  const group_info = {
    leader: leader,
  }
  const newGroup = new Group(group_info)
  await newGroup.save()
  res.status(200).json(newGroup)
}
