import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Briefcase } from 'lucide-react'

const JobPreferences: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/user-settings')
        if (!response.ok) {
          throw new Error('Failed to fetch preferences')
        }
        const data = await response.json()
        setJobTitle(data.jobTitle)
        setLocation(data.location)
      } catch (error) {
        console.error('Error fetching preferences:', error)
        setError('Failed to fetch preferences. Please try again later.')
      }
    }

    fetchPreferences()
  }, [])

  const handleSavePreferences = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle, location }),
      })

      if (!response.ok) {
        throw new Error('Failed to save preferences')
      }

      alert('Preferences saved successfully!')
    } catch (error) {
      console.error('Error saving preferences:', error)
      setError('Failed to save preferences. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
        <CardDescription>Set your job search criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSavePreferences} className="space-y-4">
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
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default JobPreferences
