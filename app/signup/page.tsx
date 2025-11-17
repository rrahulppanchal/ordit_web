'use client'

import { useState } from 'react'
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
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <OrditLogo />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Join the Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Phone Number<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-muted-foreground">📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="e.g., +1 555-123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-secondary bg-card text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email <span className="text-muted-foreground">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-muted-foreground">✉️</span>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-secondary bg-card text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Business Name
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-muted-foreground">🏪</span>
              <input
                type="text"
                name="businessName"
                placeholder="e.g., The Corner Cafe"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-secondary bg-card text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Location
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-muted-foreground">📍</span>
              <input
                type="text"
                name="location"
                placeholder="e.g., New York, NY"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-secondary bg-card text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-5 h-5 border-2 border-border rounded cursor-pointer accent-secondary"
            />
            <label htmlFor="terms" className="text-sm text-foreground">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary/90 font-semibold">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/send-otp" className="text-primary hover:text-primary/90 font-semibold">
            Log in
          </a>
        </div>
      </div>
    </main>
  )
}
