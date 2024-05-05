import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const group_info = JSON.parse(req.body)
  if (!('leader' in group_info)) {
    res.status(400).json("'leader' parameter is missing")
    return
  }

  await connectDB()

  const newGroup = new Group(group_info)
  await newGroup.save()
  res.status(200).json(newGroup)
}
