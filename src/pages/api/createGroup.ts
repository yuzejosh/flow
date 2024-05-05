import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const group_info = JSON.parse(req.body)
  const param_res = checkParams(['leader'], group_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  await connectDB()

  const newGroup = new Group(group_info)
  await newGroup.save()
  res.status(200).json(newGroup)
}
