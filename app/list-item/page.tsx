'use client'

import { useState } from 'react'
import { ChevronLeft, Upload, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BottomNav } from '@/components/bottom-nav'

export default function ListItemPage() {
  const [variations, setVariations] = useState([
    { id: 1, name: 'Size', options: [{ name: 'Small', price: '', quantity: '' }, { name: 'Medium', price: '', quantity: '' }] },
    { id: 2, name: 'Color', options: [{ name: 'Black', price: '', quantity: '' }] }
  ])

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border flex items-center gap-4 px-4 py-4">
        <Link href="/sell" className="text-foreground hover:text-secondary transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">List Your Item</h1>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        {/* Product Photos */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <h2 className="text-lg font-bold text-foreground">Product Photos</h2>
            <p className="text-sm text-muted-foreground">Add up to 5 photos</p>
          </div>
          <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 flex flex-col items-center justify-center min-h-48 cursor-pointer hover:border-secondary transition-colors bg-muted/30">
            <Upload className="w-12 h-12 text-secondary mb-2" />
            <p className="font-semibold text-foreground text-center">Upload images</p>
            <p className="text-sm text-muted-foreground text-center mt-1">Tap here to select photos from your gallery</p>
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Product Name</label>
          <Input placeholder="e.g. Handmade Leather Wallet" className="bg-background text-foreground placeholder:text-muted-foreground border-border" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Description</label>
          <Textarea placeholder="Describe your item in detail..." className="bg-background text-foreground placeholder:text-muted-foreground border-border min-h-28" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Category</label>
          <Select>
            <SelectTrigger className="bg-background text-foreground border-border">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-foreground">$</span>
            <Input type="number" placeholder="0.00" className="bg-background text-foreground placeholder:text-muted-foreground border-border pl-6" />
          </div>
        </div>

        {/* Product Variations */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-1">
            <h3 className="text-lg font-bold text-foreground">Product Variations</h3>
            <p className="text-sm text-muted-foreground">Add options like size, color, etc.</p>
          </div>

          {variations.map((variation) => (
            <div key={variation.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Variation {variation.id}: {variation.name}</p>
                <button className="text-destructive hover:text-destructive/80 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {variation.options.map((option, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <Input placeholder={`e.g. ${option.name}`} className="bg-background text-foreground placeholder:text-muted-foreground border-border" />
                    <Input placeholder="Price (e.g. +5" className="bg-background text-foreground placeholder:text-muted-foreground border-border" />
                    <Input placeholder="Quantity" className="bg-background text-foreground placeholder:text-muted-foreground border-border" />
                  </div>
                ))}
              </div>

              <button className="w-full border-2 border-dashed border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Option
              </button>
            </div>
          ))}

          <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
            Add Another Variation
          </button>
        </div>

        {/* List Button */}
        <Link href="/listing-preview">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold rounded-lg">
            List My Product
          </Button>
        </Link>
      </div>

      <BottomNav />
    </main>
  )
}
