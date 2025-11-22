'use client'

import { Bell, Search, Crown, ShoppingCart, MessageCircle, Package, Truck, User } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function DashboardPage() {
  const quickActions = [
    {
      icon: Crown,
      label: 'List New Product',
      href: '/list-item',
      bgColor: 'bg-muted'
    },
    {
      icon: ShoppingCart,
      label: 'View Cart',
      href: '/cart',
      bgColor: 'bg-primary/10'
    },
    {
      icon: MessageCircle,
      label: 'Message Support',
      href: '/messages',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Package,
      label: 'Pending Orders',
      href: '/buyer/orders',
      bgColor: 'bg-muted'
    }
  ]

  const recentActivity = [
    {
      icon: MessageCircle,
      title: 'New message from Sarah W.',
      subtitle: '"Is the vintage camera still available?"',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Truck,
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/20">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Welcome, Alex!</h1>
              <p className="text-xs text-muted-foreground">Ready to explore?</p>
            </div>
          </div>
          <Link href="/notifications" className="p-2.5 hover:bg-muted rounded-full transition-colors relative">
            <Bell size={22} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products or sellers..."
              className="w-full pl-12 pr-4 py-3.5 bg-card border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, idx) => {
              const IconComponent = action.icon
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={`${action.bgColor} rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all border border-border group`}
                >
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-center text-foreground">
                    {action.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-card rounded-xl p-4 space-y-3 border border-border">
            {recentActivity.map((activity, idx) => {
              const IconComponent = activity.icon
              return (
                <Link 
                  key={idx} 
                  href={idx === 0 ? '/messages' : '/buyer/orders/123456'}
                  className="flex gap-4 items-start hover:bg-muted/50 p-3 rounded-lg transition-colors group"
                >
                  <div className={`${activity.bgColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-8">
          <div className="bg-card rounded-xl p-4 flex gap-4 border border-border">
            <Link href="/buyer/orders" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-xl transition-all text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              My Orders
            </Link>
            <Link href="/seller/orders" className="flex-1 bg-card border-2 border-border text-foreground font-semibold py-3 px-4 rounded-xl hover:bg-muted transition-all text-center flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" />
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
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {activeListings.map((listing, idx) => (
              <Link key={idx} href={`/product/${idx + 1}`} className="flex-shrink-0 w-32">
                <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border group">
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
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
              <Link key={idx} href={`/product/${idx + 10}`} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-border group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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
