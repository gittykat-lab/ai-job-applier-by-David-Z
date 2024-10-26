import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Robot, Play, Pause, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dashboard } from '@/components/Dashboard'
import { Subscription } from '@/components/Subscription'
import { JobPreferences } from '@/components/JobPreferences'
import { UploadResume } from '@/components/UploadResume'
import { LLMPreferences } from '@/components/LLMPreferences'
import { ApplicationHistory } from '@/components/ApplicationHistory'
import { Login } from '@/components/Login'

export default function Home() {
  const [isAiActive, setIsAiActive] = useState(false)
  const [currentPlan, setCurrentPlan] = useState('free')
  const [blacklistedCompanies, setBlacklistedCompanies] = useState(['Example Inc.', 'Test Corp'])
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">AI Job Applier by David Z</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">Our AI will Apply to Jobs on LinkedIn for You</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={currentPlan === 'free' ? 'secondary' : 'default'}>
              {currentPlan === 'free' ? 'Free Plan' : currentPlan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
            </Badge>
            <div className={`flex items-center ${isAiActive ? 'text-green-500' : 'text-gray-400'}`}>
              <Robot className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{isAiActive ? 'AI Active' : 'AI Idle'}</span>
            </div>
            <Button onClick={() => setIsAiActive(!isAiActive)}>
              {isAiActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isAiActive ? 'Pause AI' : 'Start AI'}
            </Button>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="subscription" className="space-y-4">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
            <TabsTrigger value="llm-preferences">LLM Preferences</TabsTrigger>
            <TabsTrigger value="history">Application History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription">
            <Subscription
              currentPlan={currentPlan}
              onSubscribe={(plan) => setCurrentPlan(plan)}
              onCancel={() => setCurrentPlan('free')}
              transactions={[]} // Add your transactions data here
            />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="upload">
            <UploadResume />
          </TabsContent>
          
          <TabsContent value="preferences">
            <JobPreferences
              blacklistedCompanies={blacklistedCompanies}
              onRemoveCompany={(index) => setBlacklistedCompanies(blacklistedCompanies.filter((_, i) => i !== index))}
              onAddCompany={() => setBlacklistedCompanies([...blacklistedCompanies, 'New Company'])}
            />
          </TabsContent>
          
          <TabsContent value="llm-preferences">
            <LLMPreferences />
          </TabsContent>
          
          <TabsContent value="history">
            <ApplicationHistory
              applications={[]} // Add your applications data here
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">&copy; 2024 AI Job Applier by David Z. All rights reserved.</p>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm text-gray-600">Your data is secure and private</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
