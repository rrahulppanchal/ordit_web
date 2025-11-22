'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Loader2, ArrowRight, Mail, Smartphone, Apple } from 'lucide-react'
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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-10 flex justify-center">
          <OrditLogo />
        </div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Your Journey Continues
          </h1>
          <p className="text-lg text-muted-foreground">
            Reconnect with Ordit and explore what's new.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSendOtp} className="space-y-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Phone className="w-5 h-5" />
              </div>
              <div className="absolute left-12 top-1/2 -translate-y-1/2 text-muted-foreground">
                +91
              </div>
              <input
                type="tel"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full pl-19 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !phoneNumber}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send OTP</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground font-medium">Or connect with</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 border-2 border-border rounded-xl py-3.5 hover:bg-muted/50 transition-all group">
            <Mail className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            <span className="font-semibold text-foreground">Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          New to Ordit?{' '}
          <Link href="/signup" className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1">
            Join the community
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
