'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Plus, Grid3x3, UtensilsCrossed, Leaf, Store, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { User } from 'lucide-react'

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All', icon: Grid3x3 },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'services', label: 'Services', icon: Leaf }
  ]

  const businesses = [
    {
      id: 1,
      name: 'Cozy Corner Cafe',
      description: 'Freshly brewed coffee and homemade pastries.',
      category: 'restaurants',
      products: [
        { name: 'Vintage Sofa', price: 3.50, image: '/brown-sofa.jpg' },
        { name: 'Wooden Chair', price: 4.00, image: '/simple-wooden-chair.png' },
        { name: 'Coffee Setup', price: 8.00, image: '/modern-coffee-machine.png' }
      ]
    },
    {
      id: 2,
      name: 'Tech Haven Electronics',
      description: 'Your one-stop shop for gadgets and accessories.',
      category: 'services',
      products: [
        { name: 'Laptop Stand', price: 1200, image: '/laptop-stand.png' },
        { name: 'Smart Watch', price: 399, image: '/modern-smartwatch.png' }
      ]
    },
    {
      id: 3,
      name: 'Green Thumb Nursery',
      description: 'Plants, pots, and gardening supplies for every home.',
      category: 'services',
      products: [
        { name: 'Headphones', price: 15, image: '/diverse-people-listening-headphones.png' },
        { name: 'Mountain Bike', price: 45, image: '/classic-bicycle.png' },
        { name: 'Hiking Backpack', price: 12, image: '/colorful-backpack-on-wooden-table.png' }
      ]
    },
    {
      id: 4,
      name: 'Ocean Breeze Surf Shop',
      description: 'Catch the perfect wave with our top-notch gear.',
      category: 'all',
      products: [
        { name: 'Beach Scene', price: 300, image: '/tropical-beach-paradise.png' },
        { name: 'Leather Couch', price: 150, image: '/brown-couch.jpg' }
      ]
    }
  ]

  const filteredBusinesses = businesses.filter(b =>
    activeCategory === 'all' || b.category === activeCategory
  )

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <PageHeader
        avatar={{
          type: 'icon',
          icon: Search
        }}
        title="Browse"
        subtitle="Discover Local Businesses"
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
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 pt-4"></div>

        <div className="px-4 pb-4 space-y-4">

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search Businesses or Categories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-2 border-border placeholder:text-muted-foreground"
              />
            </div>
            <Button size="icon" variant="outline" className="border-2 border-border w-14 h-12 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5 text-foreground" />
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => {
              const IconComponent = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        {filteredBusinesses.map(business => (
          <div key={business.id} className="border-2 border-border rounded-xl p-5 space-y-4 hover:border-primary/50 hover:shadow-lg transition-all bg-card">
            {/* Business Info */}
            <Link href={`/seller/${business.id}`} className="block group">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{business.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{business.description}</p>
                </div>
              </div>
            </Link>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-3">
              {business.products.map((product, idx) => (
                <Link key={idx} href={`/product/${business.id}-${idx + 1}`} className="space-y-2 group">
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-semibold text-primary">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link href="/list-item" className="fixed bottom-28 right-4">
        <Button size="lg" className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>

      <BottomNav />
    </main>
  )
}
