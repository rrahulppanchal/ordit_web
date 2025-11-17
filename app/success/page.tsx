'use client'

import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-between py-12 px-4">
      <div></div>

      <div className="text-center space-y-8 max-w-sm">
        <h1 className="text-4xl font-bold text-foreground">Success</h1>

        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-secondary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Product Listed!</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your item is now live for buyers to see and is visible in the marketplace.
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 font-semibold rounded-lg">
          View Listing
        </Button>
        <Button variant="outline" className="w-full border-2 border-secondary text-secondary hover:bg-secondary/5 py-3 font-semibold rounded-lg">
          List Another Product
        </Button>
        <Link href="/dashboard">
          <p className="text-center text-foreground font-semibold hover:text-secondary transition-colors">
            Go to Dashboard
          </p>
        </Link>
      </div>
    </main>
  )
}
