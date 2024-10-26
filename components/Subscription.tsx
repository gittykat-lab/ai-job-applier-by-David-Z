import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SubscriptionProps {
  currentPlan: string;
  onCancel: () => void;
  transactions: Array<{ date: string; amount: number; description: string }>;
}

export function Subscription({ currentPlan, onCancel, transactions }: SubscriptionProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout process. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">
              {currentPlan === 'free' ? 'Free Tier' : currentPlan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
            </p>
            <p className="text-gray-600">
              {currentPlan === 'free' 
                ? 'Limited to 20 applications' 
                : 'Up to 60 applications per day'}
            </p>
            {currentPlan !== 'free' && (
              <Button variant="destructive" className="mt-4" onClick={onCancel}>
                Cancel Subscription
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>Choose a plan that works for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-bold">Monthly Plan</p>
                <p className="text-sm text-gray-600">$20/month</p>
              </div>
              <Button 
                onClick={() => handleSubscribe('monthly')} 
                disabled={currentPlan === 'monthly' || isLoading}
              >
                {currentPlan === 'monthly' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded">
              <div>
                <p className="font-bold">Yearly Plan</p>
                <p className="text-sm text-gray-600">$120/year (Save $120)</p>
              </div>
              <Button 
                onClick={() => handleSubscribe('yearly')} 
                disabled={currentPlan === 'yearly' || isLoading}
              >
                {currentPlan === 'yearly' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{transaction.date}</td>
                  <td className="py-2">{transaction.description}</td>
                  <td className="text-right py-2">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
