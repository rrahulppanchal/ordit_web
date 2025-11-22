'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, Building2, MapPin, Check, Loader2, ArrowRight } from 'lucide-react'
import { OrditLogo } from '@/components/ordit-logo'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    businessName: '',
    location: '',
    termsAccepted: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Form submitted:', formData)
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
        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          {/* Phone Number Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Phone Number <span className="text-primary">*</span>
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
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full pl-19 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Email <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="agarwal123@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>
          </div>

          {/* Business Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Business Name
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Building2 className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="businessName"
                placeholder="Agarwal wholesalers"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Location
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Sector 1, Noida, Uttar Pradesh"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground transition-all"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 py-2">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-border rounded-md bg-card flex items-center justify-center transition-all peer-checked:bg-primary peer-checked:border-primary">
                {formData.termsAccepted && (
                  <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                )}
              </div>
            </div>
            <label htmlFor="terms" className="text-sm text-foreground leading-relaxed cursor-pointer">
              I agree to the{' '}
              <Link href="#" className="text-primary hover:text-primary/90 font-semibold underline-offset-2 hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.termsAccepted}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group"
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
          </button>
        </form>

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
