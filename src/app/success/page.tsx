"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()

  useEffect(() => {
    // Here you would typically verify the session and update the user's subscription status
    // For now, we'll just simulate a delay and redirect to the main page
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Thank You for Your Subscription!</h1>
      <p className="text-xl mb-8">Your payment was successful and your account has been upgraded.</p>
      <p>You will be redirected to the main page shortly...</p>
    </div>
  )
}
