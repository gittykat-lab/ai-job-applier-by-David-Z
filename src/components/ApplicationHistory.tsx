import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Application {
  company: string;
  position: string;
  date: string;
}

interface ApplicationHistoryProps {
  applications: Application[];
}

export function ApplicationHistory({ applications }: ApplicationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application History</CardTitle>
        <CardDescription>Track your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {applications.map((app, index) => (
            <div key={index} className="flex items-center space-x-4">
              {/* ... Application item content ... */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}