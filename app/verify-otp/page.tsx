'use client'

import { useState } from 'react'
import { OrditLogo } from '@/components/ordit-logo'
import { OtpInput } from '@/components/otp-input'

export default function VerifyOtpPage() {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async (code: string) => {
    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      console.log('Code verified:', code)
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
            Enter Verification Code
          </h1>
          <p className="text-lg text-muted-foreground">
            We've sent a 6-digit code to your phone.
          </p>
        </div>

        <div className="mb-8">
          <OtpInput length={6} onComplete={handleVerify} />
        </div>

        <button
          onClick={() => handleVerify('123456')}
          disabled={isVerifying}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Didn't receive the code?{' '}
          <button className="text-primary hover:text-primary/90 font-semibold">
            Resend OTP
          </button>
        </div>
      </div>
    </main>
  )
}
