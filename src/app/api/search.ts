import type { NextApiRequest, NextApiResponse } from 'next'

type Job = {
  id: string
  title: string
  company: string
  location: string
  description: string
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'We are looking for a talented software engineer to join our team...'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'New York, NY',
    description: 'Seeking an experienced product manager to lead our product development efforts...'
  },
  // Add more mock jobs as needed
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>
) {
  if (req.method === 'GET') {
    // In a real application, you would filter based on query parameters
    res.status(200).json(mockJobs)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

