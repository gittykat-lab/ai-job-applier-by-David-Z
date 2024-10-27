import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function LLMPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LLM Preferences</CardTitle>
        <CardDescription>Configure AI behavior for job applications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ... LLM Preferences content ... */}
      </CardContent>
    </Card>
  )
}
