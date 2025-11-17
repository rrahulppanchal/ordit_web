'use client'

import { ChevronLeft, Share2, Heart, MessageCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductDetailPage() {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // In a real app, this would add to cart state/context
    router.push('/cart')
  }

  const images = [
    '/handcrafted-leather-wallet-brown-wood.jpg',
    '/leather-wallet-detail-stitch.jpg',
    '/leather-wallet-side-view.jpg',
    '/leather-wallet-texture-detail.jpg'
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/browse" className="text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex gap-2">
          <button className="text-foreground">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={() => setIsLiked(!isLiked)} className={isLiked ? 'text-primary' : 'text-foreground'}>
            <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <main className="space-y-4">
        {/* Image Carousel */}
        <div className="relative bg-card">
          <img src={images[currentImageIndex] || "/placeholder.svg"} alt="Product" className="w-full aspect-square object-cover" />
          
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${idx === currentImageIndex ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 space-y-4">
          <div>
            <h1 className="text-foreground text-2xl font-bold mb-2">Handcrafted Leather Wallet</h1>
            <p className="text-primary font-bold text-2xl">$75.00</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary text-sm">★</span>
              ))}
            </div>
            <span className="text-muted-foreground text-sm">(124 reviews)</span>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <button className="flex-1 border-2 border-border rounded-lg py-2 px-3 text-foreground font-medium hover:border-secondary">
                Size
              </button>
              <button className="flex-1 border-2 border-border rounded-lg py-2 px-3 text-foreground font-medium hover:border-secondary">
                Color
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-foreground font-bold text-lg mb-2">Description</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover timeless elegance with our Handcrafted Leather Wallet. Made from premium full-grain leather, this wallet is designed to age beautifully, developing a unique patina over time. It features multiple card slots, a spacious bill compartment, and a slim profile that fits comfortably in your pocket.
            </p>
          </div>

          {/* Seller */}
          <Link href="/seller/1">
            <div className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border hover:bg-muted">
              <img src="/artisan-seller-avatar.jpg" alt="Seller" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="text-foreground font-semibold">Artisan Crafts</p>
                <p className="text-muted-foreground text-sm">View Shop</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link href="/messages" className="flex-1 border-2 border-secondary text-secondary font-bold py-3 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Message Seller
            </Link>
            <button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2">
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
