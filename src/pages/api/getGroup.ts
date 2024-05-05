import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group } from '@/features/mongodb/models'
import { checkParams } from '../../app/lib/apihelpers'

// Handler function for the /api/users endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = req.query

  // needs query parameters
  const param_res = checkParams(['groupId'], info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // console.log("query", req.query)
  // console.log("body", JSON.parse(req.body))
  // Respond with the list of users
  await connectDB()
  const group = await Group.findById(info.groupId)
  res.status(200).json(group)
}
