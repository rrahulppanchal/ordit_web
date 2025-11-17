'use client'

import Link from 'next/link'
import { ChevronRight, Menu } from 'lucide-react'
import { useState } from 'react'

const SELLER_ORDERS = [
  {
    id: '12345',
    amount: 75.50,
    buyer: 'Alex Doe',
    date: '15 Oct 2023',
    status: 'Shipped',
    statusColor: 'text-secondary'
  },
  {
    id: '12344',
    amount: 120.00,
    buyer: 'Jane Smith',
    date: '14 Oct 2023',
    status: 'Delivered',
    statusColor: 'text-green-600'
  },
  {
    id: '12342',
    amount: 42.99,
    buyer: 'Sam Wilson',
    date: '12 Oct 2023',
    status: 'Accepted',
    statusColor: 'text-blue-600'
  },
  {
    id: '12341',
    amount: 99.00,
    buyer: 'Chris Evans',
    date: '11 Oct 2023',
    status: 'Pending',
    statusColor: 'text-primary'
  }
]

export default function SellerOrders() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'pending', 'accepted', 'shipped']

  const filteredOrders = SELLER_ORDERS.filter(order => {
    if (activeFilter === 'all') return true
    return order.status.toLowerCase() === activeFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-secondary text-secondary-foreground">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">My Orders</h1>
          <Menu className="w-6 h-6" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-3 min-w-min">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pb-24">
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <Link
              key={order.id}
              href={`/seller/orders/${order.id}`}
              className="block p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground">Order #{order.id}</h3>
                    <span className="text-lg font-semibold text-foreground">${order.amount.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Buyer: {order.buyer}</p>
                  <p className="text-xs text-muted-foreground mb-3">{order.date}</p>
                  <span className={`text-sm font-semibold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around py-3 max-w-md mx-auto">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <span className="w-6 h-6">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/browse" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <span className="w-6 h-6">🔍</span>
          <span className="text-xs">Search</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="w-6 h-6">📋</span>
          <span className="text-xs">Orders</span>
        </button>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <span className="w-6 h-6">👤</span>
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  )
}
