'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Loader2, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import { OrditLogo } from '@/components/ordit-logo'
import { OtpInput } from '@/components/otp-input'

export default function VerifyOtpPage() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  const handleVerify = async (code: string) => {
    setOtpCode(code)
    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      console.log('Code verified:', code)
    }, 1000)
  }

  const handleResend = () => {
    console.log('Resending OTP...')
    setOtpCode('')
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
            Enter Verification Code
          </h1>
          <p className="text-lg text-muted-foreground">
            We've sent a 6-digit code to your phone.
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="mb-8">
          <OtpInput length={6} onComplete={(code) => {
            setOtpCode(code)
            handleVerify(code)
          }} />
        </div>

        {/* Verify Button */}
        <button
          onClick={() => otpCode && handleVerify(otpCode)}
          disabled={isVerifying || !otpCode || otpCode.length !== 6}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group mb-6"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Verify</span>
            </>
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Resend OTP
          </button>
        </div>
      </div>
    </main>
  )
}
