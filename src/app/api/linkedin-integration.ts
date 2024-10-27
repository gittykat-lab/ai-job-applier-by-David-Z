import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Log the form data
    console.log('LinkedIn Integration Data:', req.body)
    
    // Simulate a successful integration
    res.status(200).json({ message: 'LinkedIn integration successful' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
