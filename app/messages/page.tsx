'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'
import { User } from 'lucide-react'

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-3">
        {/* Placeholder message items */}
        {[1, 2, 3].map(i => (
          <Link key={i} href={`/messages/${i}`} className="flex gap-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Sender {i}</p>
              <p className="text-sm text-muted-foreground truncate">Last message preview...</p>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}
