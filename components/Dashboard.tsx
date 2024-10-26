import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DashboardData {
  totalApplications: number;
  pendingResponses: number;
  interviewsScheduled: number;
  successRate: number;
  lastApplication: {
    company: string;
    date: string;
    time: string;
  };
  recentApplications: Array<{
    company: string;
    position: string;
    date: string;
  }>;
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const dashboardData = await response.json()
        setData(dashboardData)
      } catch (err) {
        setError('Error fetching dashboard data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) return <div>Loading dashboard data...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No dashboard data available</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Dashboard</CardTitle>
        <CardDescription>Overview of your job application progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
            <p className="text-3xl font-bold">{data.totalApplications}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending Responses</h3>
            <p className="text-3xl font-bold">{data.pendingResponses}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Interviews Scheduled</h3>
            <p className="text-3xl font-bold">{data.interviewsScheduled}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Application Success Rate</h3>
          <Progress value={data.successRate} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">{data.successRate}% of applications resulted in further action</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Last Application Sent</h3>
          <p className="text-sm text-gray-600">
            {data.lastApplication.company} on {data.lastApplication.date} at {data.lastApplication.time}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recent Applications</h3>
          <ul className="space-y-2">
            {data.recentApplications.map((app, index) => (
              <li key={index} className="text-sm text-gray-600">
                {app.position} at {app.company} - {app.date}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
