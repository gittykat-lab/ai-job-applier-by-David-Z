import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Linkedin } from 'lucide-react'

interface LoginProps {
  onLogin: (user: { email: string }) => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in a real app, you'd validate credentials here
    onLogin({ email })
  }

  const handleLinkedInLogin = () => {
    // Simulate LinkedIn login - in a real app, you'd redirect to LinkedIn OAuth here
    onLogin({ email: 'linkedin-user@example.com' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Access your AI Job Applier account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Login with Email</Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button onClick={handleLinkedInLogin} variant="outline" className="w-full">
          <Linkedin className="mr-2 h-4 w-4" />
          Login with LinkedIn
        </Button>
      </CardContent>
    </Card>
  )
}
