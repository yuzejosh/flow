import { NextApiRequest, NextApiResponse } from "next"

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

// Handler function for the /api/users endpoint
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Respond with the list of users
  res.status(200).json(users)
}
