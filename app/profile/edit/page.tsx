'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'

const editProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^[\d\s()+-]+$/, 'Invalid phone number format'),
  location: z.string().min(3, 'Location must be at least 3 characters').max(200, 'Location must be less than 200 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

type EditProfileFormValues = z.infer<typeof editProfileSchema>

export default function EditProfilePage() {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Artisanal crafts and unique finds for your home.',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: EditProfileFormValues) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Profile updated:', data)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <PageHeader
        backButton={{
          href: '/profile'
        }}
        title="Edit Profile"
        subtitle="Update your personal information"
        sticky
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Picture Section */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-card shadow-lg">
                <User className="w-12 h-12 text-primary" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                <User className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">Profile Picture</p>
            <p className="text-xs text-muted-foreground">Tap to change your photo</p>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="tel"
                        className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="w-full pl-4 pt-3 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Tell us about yourself..."
                      {...field}
                    />
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <BottomNav />
    </main>
  )
}

