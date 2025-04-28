import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CanceledPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-red-500">
          Purchase Canceled
        </h1>
        <p className="text-lg text-gray-300">
          Your order has been canceled. No charges were made.
        </p>
        <div className="pt-4">
          <Link 
            href="/shows" 
            className="text-blue-500 hover:text-blue-400 underline"
          >
            ← Return to shows
          </Link>
        </div>
      </section>
    </main>
  )
}