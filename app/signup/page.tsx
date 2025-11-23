'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Phone, Mail, Building2, MapPin, Check, Loader2, ArrowRight } from 'lucide-react'
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

const signupSchema = z.object({
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  businessName: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phone: '',
      email: '',
      businessName: '',
      location: '',
      termsAccepted: false,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: SignupFormValues) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', data)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <OrditLogo />
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Join the Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your account and start selling today
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-foreground">
                    Phone Number <span className="text-primary">*</span>
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
                        className="w-full h-12 pl-19 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-foreground">
                    Email <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="w-5 h-5" />
                      </div>
                      <Input
                        type="email"
                        placeholder="agarwal123@gmail.com"
                        className="w-full h-12 pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Name Field */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-foreground">
                    Business Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Agarwal wholesalers"
                        className="w-full h-12 pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-semibold text-foreground">
                    Location
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Sector 1, Noida, Uttar Pradesh"
                        className="w-full h-12 pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3 py-2">
                    <FormControl>
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={field.value}
                          onChange={field.onChange}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-border rounded-md bg-card flex items-center justify-center transition-all peer-checked:bg-primary peer-checked:border-primary">
                          {field.value && (
                            <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormLabel htmlFor="terms" className="text-sm text-foreground leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <Link href="#" className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline">
                        Terms and Conditions
                      </Link>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !form.watch('termsAccepted')}
              className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing Up...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          Already have an account?{' '}
          <Link href="/send-otp" className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1">
            Log in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
