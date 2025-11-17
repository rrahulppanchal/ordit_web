'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Plus, Mail, User } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/browse', icon: Search, label: 'Browse' },
    { href: '/sell', icon: Plus, label: 'Sell' },
    { href: '/messages', icon: Mail, label: 'Messages' },
    { href: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 max-w-md mx-auto">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                isActive
                  ? 'text-orange-700 border-t-2 border-orange-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
