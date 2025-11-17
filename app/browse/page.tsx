'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All', icon: '⊞' },
    { id: 'restaurants', label: 'Restaurants', icon: '🏪' },
    { id: 'services', label: 'Services', icon: '🌿' }
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
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Discover Local Businesses</h1>
          <Link href="/profile" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <img src="/user-profile-avatar.png" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search Businesses or Categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border placeholder:text-muted-foreground"
            />
          </div>
          <Button size="icon" variant="outline" className="border-border">
            <SlidersHorizontal className="w-5 h-5 text-foreground" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Business Cards */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {filteredBusinesses.map(business => (
          <div key={business.id} className="border-2 border-border rounded-xl p-4 space-y-3 hover:border-secondary transition-colors">
            {/* Business Info */}
            <Link href={`/seller/${business.id}`}>
              <div>
                <h3 className="text-lg font-bold text-foreground">{business.name}</h3>
                <p className="text-sm text-muted-foreground">{business.description}</p>
              </div>
            </Link>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-3">
              {business.products.map((product, idx) => (
                <Link key={idx} href={`/product/${business.id}-${idx + 1}`} className="space-y-2">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-20 rounded-lg object-cover bg-muted" />
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
