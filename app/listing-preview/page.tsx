'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function ListingPreviewPage() {
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const images = [
    '/leather-wallet-brown.jpg',
    '/leather-wallet-detail.jpg',
    '/leather-wallet-side.jpg',
    '/leather-wallet-texture.jpg'
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center gap-4 px-4 py-4">
        <Link href="/list-item">
          <button className="text-foreground hover:text-secondary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-foreground">Listing Preview</h1>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-8">
        {/* Image Carousel */}
        <div className="space-y-3">
          <div className="bg-foreground/10 rounded-lg overflow-hidden">
            <img src={images[activeImageIdx] || "/placeholder.svg"} alt="Product" className="w-full h-64 object-cover" />
          </div>
          <div className="flex gap-2 justify-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === activeImageIdx ? 'bg-secondary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Title and Price */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">The Journeyman Wallet</h2>
          <p className="text-3xl font-bold text-primary">$79.99</p>
        </div>

        {/* Category Badge */}
        <div>
          <Badge className="bg-muted text-foreground">Accessories</Badge>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            Crafted from premium full-grain leather, this minimalist wallet is designed for the modern individual. It features four card slots and a central pocket for folded cash, combining timeless style with practical functionality. Each wallet is hand-stitched for durability, ensuring it ages beautifully over time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="">
          <Link href="/list-item">
            <Button variant="outline" className="h-12 w-full flex-1 border-2 border-primary text-primary hover:bg-primary/5 py-3 font-semibold rounded-lg">
              Edit Details
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="h-12 w-full mt-5 flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold rounded-lg">
              Submit Listing
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
