'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, ArrowRight, Filter, Search } from 'lucide-react'
import { BottomNav } from '@/components/bottom-nav'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'buying' | 'selling'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const buyingOrders = [
    {
      id: '123456',
      date: '15 Oct 2023',
      amount: 150.0,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-700',
      items: 2
    },
    {
      id: '123457',
      date: '14 Oct 2023',
      amount: 75.5,
      status: 'Pending',
      statusColor: 'bg-orange-100 text-primary',
      items: 1
    }
  ]

  const sellingOrders = [
    {
      id: 'ORD-789',
      date: '16 Oct 2023',
      amount: 220.0,
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-700',
      items: 1
    },
    {
      id: 'ORD-788',
      date: '13 Oct 2023',
      amount: 95.0,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-700',
      items: 3
    }
  ]

  const allOrders = [...buyingOrders, ...sellingOrders]
  const displayedOrders = activeTab === 'all' ? allOrders : activeTab === 'buying' ? buyingOrders : sellingOrders

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <PageHeader
        title="Orders"
        subtitle="Track your purchases and sales"
        rightActions={[
          {
            type: 'icon',
            icon: Filter,
            onClick: () => console.log('Filter')
          }
        ]}
        sticky
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(['all', 'buying', 'selling'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {tab === 'buying' && <ShoppingBag className="w-4 h-4" />}
              {tab === 'selling' && <Package className="w-4 h-4" />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {displayedOrders.map((order) => (
            <Link
              key={order.id}
              href={activeTab === 'selling' ? `/seller/orders/${order.id}` : `/buyer/orders/${order.id}`}
              className="block bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {activeTab === 'selling' ? (
                      <Package className="w-4 h-4 text-primary" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-primary" />
                    )}
                    <h3 className="text-lg font-semibold text-foreground">
                      Order <span className="text-primary">#{order.id}</span>
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.items} item{order.items > 1 ? 's' : ''}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xl font-bold text-foreground">${order.amount.toFixed(2)}</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {displayedOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground font-medium">No orders found</p>
            <p className="text-sm text-muted-foreground mt-1">Your {activeTab === 'all' ? '' : activeTab} orders will appear here</p>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
