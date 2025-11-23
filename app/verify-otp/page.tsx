'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Shield, Loader2, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import { OrditLogo } from '@/components/ordit-logo'
import { OtpInput } from '@/components/otp-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

const verifyOtpSchema = z.object({
  otpCode: z.string()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^[0-9]{6}$/, 'OTP code must contain only numbers'),
})

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>

export default function VerifyOtpPage() {
  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otpCode: '',
    },
  })

  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async (code: string) => {
    form.setValue('otpCode', code)
    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      console.log('Code verified:', code)
    }, 1000)
  }

  const handleResend = () => {
    console.log('Resending OTP...')
    form.setValue('otpCode', '')
    form.reset()
  }

  const onSubmit = async (data: VerifyOtpFormValues) => {
    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      console.log('Code verified:', data.otpCode)
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
            Enter Verification Code
          </h1>
          <p className="text-lg text-muted-foreground">
            We've sent a 6-digit code to your phone.
          </p>
        </div>

        {/* OTP Input Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-6">
                      <OtpInput
                        length={6}
                        onComplete={(code) => {
                          field.onChange(code)
                          if (code.length === 6) {
                            form.handleSubmit(onSubmit)()
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={isVerifying || form.watch('otpCode').length !== 6}
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
            </Button>
          </form>
        </Form>

        {/* Resend OTP */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          Didn't receive the code?{' '}
          <Button
            type="button"
            variant="ghost"
            onClick={handleResend}
            className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1 p-0 h-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Resend OTP
          </Button>
        </div>
      </div>
    </main>
  )
}
