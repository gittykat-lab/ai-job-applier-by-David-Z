import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DashboardProps {
  totalApplications: number;
  pendingResponses: number;
  interviewsScheduled: number;
  successRate: number;
  lastApplication: {
    company: string;
    date: string;
    time: string;
  };
}

export function Dashboard({ totalApplications, pendingResponses, interviewsScheduled, successRate, lastApplication }: DashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Dashboard</CardTitle>
        <CardDescription>Overview of your job application progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ... Dashboard content ... */}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Application Success Rate</h3>
          <Progress value={successRate} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">{successRate}% of applications resulted in further action</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Last Application Sent</h3>
          <p className="text-sm text-gray-600">
            {lastApplication.company} on {lastApplication.date} at {lastApplication.time}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
