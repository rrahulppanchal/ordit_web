'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Phone, Loader2, ArrowRight, Mail } from 'lucide-react'
import { OrditLogo } from '@/components/ordit-logo'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const sendOtpSchema = z.object({
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
})

type SendOtpFormValues = z.infer<typeof sendOtpSchema>

export default function SendOtpPage() {
  const form = useForm<SendOtpFormValues>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: SendOtpFormValues) => {
    // Simulate API call
    setTimeout(() => {
      console.log('OTP sent to:', data.phoneNumber)
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-foreground">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-muted-foreground">
                        +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        className="w-full pl-19 h-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group"
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
            </Button>
          </form>
        </Form>

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
