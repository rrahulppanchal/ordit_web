'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Lock, Eye, EyeOff, Save, Loader2, Shield } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BottomNav } from '@/components/bottom-nav'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
  })

  const isLoading = form.formState.isSubmitting

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const onSubmit = async (data: ChangePasswordFormValues) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed:', data)
      form.reset()
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <PageHeader
        backButton={{
          href: '/profile'
        }}
        title="Change Password"
        subtitle="Update your account security"
        sticky
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Security Info Card */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Password Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include at least one number</li>
                <li>• Include at least one special character</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lock className="w-4 h-4 text-primary" />
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showPasswords.current ? 'text' : 'password'}
                        placeholder="Enter your current password"
                        className="h-12 pl-12 pr-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lock className="w-4 h-4 text-primary" />
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showPasswords.new ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        className="h-12 pl-12 pr-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lock className="w-4 h-4 text-primary" />
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        className="h-12 pl-12 pr-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Password</span>
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Security Tips */}
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Security Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Never share your password with anyone</li>
            <li>• Use a unique password for this account</li>
            <li>• Change your password regularly</li>
            <li>• Enable two-factor authentication for extra security</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}

