'use client'

import { ChevronRight, User, Store, Lock, Settings, LogOut, Bell, Mail, Phone, MapPin, Edit, Shield, CreditCard, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'
import { PageHeader } from '@/components/page-header'

export default function ProfilePage() {
  const menuItems = [
    {
      icon: User,
      label: 'Update Personal Details',
      href: '/profile/edit',
      description: 'Edit your name, email, and contact info'
    },
    {
      icon: Store,
      label: 'Manage Business Profile',
      href: '/seller/1',
      description: 'Update your business information'
    },
    {
      icon: Lock,
      label: 'Change Password',
      href: '/profile/password',
      description: 'Update your account password'
    },
    {
      icon: Settings,
      label: 'Account Settings',
      href: '/notifications/settings',
      description: 'Notification and privacy settings'
    },
    {
      icon: LogOut,
      label: 'Log Out',
      href: '/send-otp',
      description: 'Sign out of your account',
      variant: 'destructive' as const
    }
  ]

  const quickStats = [
    { label: 'Active Listings', value: '12', icon: Store },
    { label: 'Total Orders', value: '45', icon: CreditCard },
    { label: 'Rating', value: '4.8', icon: Shield }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <div className="max-w-md mx-auto">
        <PageHeader
          avatar={{
            type: 'icon',
            icon: User
          }}
          title="Profile"
          subtitle="Manage your account"
          rightActions={[
            {
              type: 'notification',
              icon: Bell,
              href: '/notifications',
              badge: true
            }
          ]}
        />

        <div className="px-4 pt-6 space-y-6 pb-6">
          {/* Profile Card */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-card shadow-lg">
                  <User className="w-14 h-14 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Jane Doe</h2>
              <div className="flex flex-col items-center gap-1 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>jane.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 w-full text-center border border-primary/20">
                <p className="font-semibold text-foreground mb-1 flex items-center justify-center gap-2">
                  <Store className="w-4 h-4 text-primary" />
                  Seller: Jane's Handmade Goods
                </p>
                <p className="text-sm text-muted-foreground">Artisanal crafts and unique finds for your home.</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat, idx) => {
              const IconComponent = stat.icon
              return (
                <div key={idx} className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-all text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between p-4 bg-card rounded-xl hover:shadow-md transition-all border border-border group ${
                  item.variant === 'destructive' ? 'hover:bg-destructive/5' : ''
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    item.variant === 'destructive' 
                      ? 'bg-destructive/10 group-hover:bg-destructive/20' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <item.icon 
                      size={22} 
                      className={item.variant === 'destructive' ? 'text-destructive' : 'text-primary'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-foreground ${item.variant === 'destructive' ? 'text-destructive' : ''}`}>
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0 ${
                    item.variant === 'destructive' ? 'text-destructive/70' : ''
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Help Section */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <Link href="/help" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <HelpCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Need Help?</p>
                <p className="text-xs text-muted-foreground">Contact support or view FAQs</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
