import type { NextApiRequest, NextApiResponse } from 'next'

// This would typically come from a database, but we're simulating it with a static object
const dashboardData = {
  totalApplications: 42,
  pendingResponses: 28,
  interviewsScheduled: 3,
  successRate: 33,
  lastApplication: {
    company: 'Tech Corp',
    date: '2024-03-15',
    time: '14:30'
  },
  recentApplications: [
    { company: 'Tech Company 1', position: 'Software Engineer', date: '2024-03-14' },
    { company: 'Tech Company 2', position: 'Product Manager', date: '2024-03-13' },
    { company: 'Tech Company 3', position: 'Data Scientist', date: '2024-03-12' },
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json(dashboardData)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
