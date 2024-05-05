import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { User } from '@/features/mongodb/models'
import { checkParams } from '../../app/lib/apihelpers'

// Handler function for the /api/users endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user_info = JSON.parse(req.body)

  // check query parameters
  const param_res = checkParams(['username'], user_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  // console.log("query", req.query)
  // console.log("body", JSON.parse(req.body))
  // Respond with the list of users
  await connectDB()
  const newUser = new User(user_info)
  await newUser.save()
  res.status(200).json(newUser)
}
