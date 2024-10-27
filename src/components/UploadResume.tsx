import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin } from 'lucide-react'

const UploadResume: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>Drag and drop your resume file or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ... Upload Resume content ... */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Integration</CardTitle>
          <CardDescription>Connect your LinkedIn account for automated applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="flex items-center">
            <Linkedin className="mr-2 h-4 w-4" />
            Connect LinkedIn Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadResume
