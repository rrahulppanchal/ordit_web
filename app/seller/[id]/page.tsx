'use client'

import { ChevronLeft, MoreVertical, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function SellerStorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const products: Product[] = [
    { id: '1', name: 'Oakwood Chair', price: 150.00, image: '/oakwood-chair.jpg', category: 'furniture' },
    { id: '2', name: 'Ceramic Vase', price: 45.00, image: '/ceramic-vase.png', category: 'decor' },
    { id: '3', name: 'Linen Throw Pillow', price: 35.00, image: '/linen-throw-pillow.png', category: 'decor' },
    { id: '4', name: 'Walnut Coffee Table', price: 220.00, image: '/walnut-coffee-table.png', category: 'furniture' },
    { id: '5', name: 'Woven Wall Hanging', price: 60.00, image: '/woven-wall-hanging.jpg', category: 'pottery' },
    { id: '6', name: 'Clay Serving Bowl', price: 55.00, image: '/clay-serving-bowl.jpg', category: 'pottery' },
    { id: '7', name: 'Scented Candle', price: 25.00, image: '/scented-candle.png', category: 'decor' },
    { id: '8', name: 'Ceramic Coasters', price: 30.00, image: '/ceramic-coasters.jpg', category: 'pottery' },
  ]

  const categories = ['all', 'furniture', 'decor', 'pottery']
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, value) }))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/browse" className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-foreground font-bold text-lg">Seller's Store</h1>
          <button className="text-foreground">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-4">
        {/* Store Info */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <div className="flex gap-3">
            <img src="/artisan-ceramic-shop.jpg" alt="Store" className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <h2 className="text-foreground font-bold">The Artisan's Corner</h2>
              <p className="text-muted-foreground text-sm">Handcrafted goods for your home.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-muted text-foreground font-medium py-2 rounded-lg hover:bg-muted/80">
              Follow
            </button>
            <Link href="/messages" className="flex-1 bg-primary text-primary-foreground font-medium py-2 rounded-lg hover:opacity-90 text-center">
              Contact
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} {cat === 'all' && 'Products'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-3">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-card rounded-lg p-3 border border-border flex gap-3">
              <Link href={`/product/${product.id}`} className="flex-shrink-0">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <Link href={`/product/${product.id}`}>
                  <div>
                    <h3 className="text-foreground font-semibold">{product.name}</h3>
                    <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1">
                    <button onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)} className="text-primary">−</button>
                    <span className="text-foreground font-medium w-6 text-center">{quantities[product.id] || 1}</span>
                    <button onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)} className="text-primary">+</button>
                  </div>
                  <button className="flex-1 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
