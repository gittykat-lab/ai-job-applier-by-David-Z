import type { NextApiRequest, NextApiResponse } from 'next'

type UserPreferences = {
  jobTitle: string
  location: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreferences | { message: string }>
) {
  if (req.method === 'POST') {
    // In a real application, you would save this data to a database
    const { jobTitle, location } = req.body
    console.log('Saving user preferences:', { jobTitle, location })
    
    // For now, we'll just echo back the received data
    res.status(200).json({ jobTitle, location })
  } else if (req.method === 'GET') {
    // In a real application, you would fetch this data from a database
    // For now, we'll just return mock data
    res.status(200).json({ jobTitle: 'Software Engineer', location: 'San Francisco, CA' })
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

