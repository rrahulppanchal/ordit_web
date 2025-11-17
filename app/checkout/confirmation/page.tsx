'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <main className="w-full max-w-md space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-primary" strokeWidth={3} />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-foreground text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. A confirmation email has been sent to you.</p>
        </div>

        {/* Order Number */}
        <div className="bg-muted rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-1">Order Number:</p>
          <p className="text-foreground font-bold text-lg">#123456789</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/buyer/orders/123456789">
            <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition">
              View Order Details
            </button>
          </Link>
          <Link href="/browse">
            <button className="w-full bg-background text-secondary border-2 border-secondary font-bold py-3 rounded-lg hover:bg-muted transition">
              Continue Shopping
            </button>
          </Link>
          <Link href="/dashboard" className="block pt-2">
            <button className="w-full text-secondary font-bold py-3 hover:underline">
              Go to Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
