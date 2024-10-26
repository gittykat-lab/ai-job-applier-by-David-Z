import Link from 'next/link'

export default function Canceled() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Subscription Canceled</h1>
      <p className="text-xl mb-8">Your subscription process was canceled. No charges were made.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}
