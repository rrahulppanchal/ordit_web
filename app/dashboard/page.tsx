'use client'

import { Bell, Search } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function DashboardPage() {
  const quickActions = [
    {
      icon: '👑',
      label: 'List New Product',
      href: '/list-item',
      bgColor: 'bg-muted'
    },
    {
      icon: '🛒',
      label: 'View Cart',
      href: '/cart',
      bgColor: 'bg-primary/10'
    },
    {
      icon: '💬',
      label: 'Message Support',
      href: '/messages',
      bgColor: 'bg-primary/10'
    },
    {
      icon: '📦',
      label: 'Pending Orders',
      href: '/buyer/orders',
      bgColor: 'bg-muted'
    }
  ]

  const recentActivity = [
    {
      icon: '💬',
      title: 'New message from Sarah W.',
      subtitle: '"Is the vintage camera still available?"',
      bgColor: 'bg-primary/10'
    },
    {
      icon: '🚚',
      title: 'Your order has shipped!',
      subtitle: 'Handmade Leather Wallet is on its way.',
      bgColor: 'bg-muted'
    }
  ]

  const activeListings = [
    {
      image: '/vintage-camera.png',
      title: 'Vintage Camera',
      price: 'View All'
    },
    {
      image: '/leather-wallet.jpg',
      title: 'Leather Wallet',
      price: 'View All'
    },
    {
      image: '/potted-plant.png',
      title: 'Potted Succulent',
      price: 'View All'
    }
  ]

  const recommendedProducts = [
    {
      image: '/mid-century-wooden-chair.jpg',
      title: 'Mid-Century Chair',
      price: '$120.00'
    },
    {
      image: '/ceramic-bowls-set.jpg',
      title: 'Ceramic Bowls Set',
      price: '$45.00'
    },
    {
      image: '/abstract-art-print.jpg',
      title: 'Abstract Print',
      price: '$30.00'
    }
  ]

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted"></div>
            <h1 className="text-lg font-bold text-foreground">Welcome, Alex!</h1>
          </div>
          <Link href="/notifications" className="p-2 hover:bg-muted rounded-full transition-colors">
            <Bell size={24} className="text-muted-foreground" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products or sellers..."
              className="w-full pl-10 pr-4 py-3 bg-card border-2 border-border rounded-lg focus:outline-none focus:border-secondary text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className={`${action.bgColor} rounded-lg p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all border border-border`}
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="text-sm font-semibold text-center text-foreground">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-card rounded-lg p-4 space-y-4 border border-border">
            {recentActivity.map((activity, idx) => (
              <Link 
                key={idx} 
                href={idx === 0 ? '/messages' : '/buyer/orders/123456'}
                className="flex gap-4 items-start hover:bg-muted/50 p-2 rounded-lg transition-colors -m-2"
              >
                <div className={`${activity.bgColor} w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-8">
          <div className="bg-card rounded-lg p-4 flex gap-4 border border-border">
            <Link href="/buyer/orders" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors text-center">
              My Orders
            </Link>
            <Link href="/seller/orders" className="flex-1 bg-card border-2 border-border text-foreground font-semibold py-2 px-4 rounded-lg hover:bg-muted transition-colors text-center">
              Seller Dash...
            </Link>
          </div>
        </div>

        {/* Active Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Your Active Listings (5)</h2>
            <Link href="/sell" className="text-primary hover:text-primary/90 text-sm font-semibold">
              View All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {activeListings.map((listing, idx) => (
              <Link key={idx} href={`/product/${idx + 1}`} className="flex-shrink-0 w-32">
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {listing.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended For You */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Recommended For You</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map((product, idx) => (
              <Link key={idx} href={`/product/${idx + 10}`} className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-border">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {product.title}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
