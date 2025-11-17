'use client'

import { useState } from 'react'
import { OrditLogo } from '@/components/ordit-logo'

export default function SendOtpPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('OTP sent to:', phoneNumber)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <OrditLogo />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Your Journey Continues
          </h1>
          <p className="text-lg text-muted-foreground">
            Reconnect with Ordit and explore what's new.
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-muted-foreground">📞</span>
              <input
                type="tel"
                placeholder="e.g., +1 555-123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-secondary bg-card text-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground font-medium">Or connect with</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 border-2 border-border rounded-lg py-3 hover:bg-muted transition-colors">
            <div className="w-6 h-6 bg-foreground rounded"></div>
            <span className="font-semibold text-foreground">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-border rounded-lg py-3 hover:bg-muted transition-colors">
            <div className="w-6 h-6 bg-muted rounded"></div>
            <span className="font-semibold text-foreground">Apple</span>
          </button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          New to Ordit?{' '}
          <a href="/signup" className="text-primary hover:text-primary/90 font-semibold">
            Join the community
          </a>
        </div>
      </div>
    </main>
  )
}
