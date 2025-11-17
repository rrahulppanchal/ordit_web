'use client'

import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function SellPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      <div className="max-w-md mx-auto px-4 pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">Sell</h1>
        <div className="space-y-4">
          <Link href="/list-item">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-lg flex items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              List New Product
            </Button>
          </Link>
          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <h2 className="text-lg font-bold text-foreground">Your Listings</h2>
            <p className="text-muted-foreground">Manage your active listings and track their performance.</p>
            <Link href="/dashboard" className="text-primary hover:text-primary/90 font-semibold">
              View All Listings →
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
