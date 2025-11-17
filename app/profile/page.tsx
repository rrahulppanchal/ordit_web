'use client'

import { ChevronLeft, User, Store, Lock, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function ProfilePage() {
  const menuItems = [
    {
      icon: User,
      label: 'Update Personal Details',
      href: '/profile/edit'
    },
    {
      icon: Store,
      label: 'Manage Business Profile',
      href: '/seller/1'
    },
    {
      icon: Lock,
      label: 'Change Password',
      href: '/profile/password'
    },
    {
      icon: Settings,
      label: 'Account Settings',
      href: '/notifications/settings'
    },
    {
      icon: LogOut,
      label: 'Log Out',
      href: '/'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pt-6 pb-20 px-4">
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="flex-1 text-center text-2xl font-bold text-secondary">
            Profile Overview
          </h1>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-sm mb-6 border border-border">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4 border-4 border-card shadow-md">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center">
                <span className="text-3xl">👩</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Jane Doe</h2>
            <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567 • San Francisco, CA</p>
          </div>

          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="font-semibold text-foreground mb-1">Seller: Jane's Handmade Goods</p>
            <p className="text-sm text-muted-foreground">Artisanal crafts and unique finds for your home.</p>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors shadow-sm border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <item.icon size={20} className="text-muted-foreground" />
                </div>
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
              <ChevronLeft size={20} className="text-muted-foreground rotate-180" />
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
