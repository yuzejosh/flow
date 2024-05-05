import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group, User } from '@/features/mongodb/models'
import { checkParams } from '../../app/lib/apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = JSON.parse(req.body)
  const param_res = checkParams(['userId', 'groupId'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // connect to DB
  await connectDB()

  // get the user
  const user = await User.findById(info.userId)

  // add new user to group
  const group = await Group.findByIdAndUpdate(info.groupId, { $push: { users: user} }, { new: true })

  // return all users
  res.status(200).json(group.users)
}