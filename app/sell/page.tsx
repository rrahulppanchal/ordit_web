'use client'

import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Store, Package, TrendingUp, ArrowRight, Eye, DollarSign, User, Bell, Search, ChartLine } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

export default function SellPage() {
  const stats = [
    { label: 'Active Listings', value: '12', icon: Package, color: 'text-primary' },
    { label: 'Total Sales', value: '$2.4K', icon: DollarSign, color: 'text-primary' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <div className="max-w-md mx-auto px-0 pt-0">
        {/* Header */}
        <PageHeader
          avatar={{
            type: 'icon',
            icon: ChartLine
          }}
          title="Sell Items"
          subtitle="Manage your marketplace"
          rightActions={[
            {
              type: 'notification',
              icon: Bell,
              href: '/notifications',
              badge: true
            },
            {
              type: 'profile',
              icon: User,
              href: '/profile',
            }
          ]}
        />

        {/* Quick Action */}
        <div className="mb-8 px-4 pt-4">
          <Link href="/list-item">
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group">
              <span>List New Product</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8 px-4">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon
            return (
              <div key={idx} className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-all">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Your Listings Card */}
        <div className="bg-card rounded-xl p-6 mx-4 border border-border space-y-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">Your Listings</h2>
              <p className="text-sm text-muted-foreground">Manage and track performance</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-semibold group"
            >
              <span>View All Listings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
