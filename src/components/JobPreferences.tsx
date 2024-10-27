import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Briefcase, X } from 'lucide-react'

interface JobPreferencesProps {
  blacklistedCompanies: string[];
  onRemoveCompany: (index: number) => void;
  onAddCompany: () => void;
}

export function JobPreferences({ blacklistedCompanies, onRemoveCompany, onAddCompany }: JobPreferencesProps) {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')

  const handleLinkedInIntegration = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/linkedin-integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle, location }),
      })
      if (!response.ok) {
        throw new Error('Failed to integrate with LinkedIn')
      }
      alert('LinkedIn integration successful!')
      // Reset form fields
      setJobTitle('')
      setLocation('')
    } catch (error) {
      console.error('LinkedIn integration error:', error)
      alert('Failed to integrate with LinkedIn. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
        <CardDescription>Set your job search criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Job Preferences content */}
        {/* ... */}

        {/* LinkedIn Integration Form */}
        <form onSubmit={handleLinkedInIntegration} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Preferred Job Title</Label>
            <div className="flex items-center space-x-2">
              <Briefcase className="text-gray-500" />
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Software Engineer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., New York, Remote"
              />
            </div>
          </div>
          <Button type="submit">Integrate with LinkedIn</Button>
        </form>
      </CardContent>
    </Card>
  )
}
