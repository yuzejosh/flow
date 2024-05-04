import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { User } from '@/features/mongodb/models'

// Handler function for the /api/users endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user_info = req.query

  // needs query parameters
  if (!('username' in user_info)) {
    res.status(400).json({
      error: "'username' query parameter missing",
    })
    return
  }

  // console.log("query", req.query)
  // console.log("body", JSON.parse(req.body))
  // Respond with the list of users
  await connectDB()
  const user = await User.findOne({ username: user_info.username })
  res.status(200).json(user)
}
