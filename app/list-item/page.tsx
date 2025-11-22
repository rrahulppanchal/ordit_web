'use client'

import { useState } from 'react'
import { ChevronLeft, Upload, Trash2, Plus, Image, Tag, DollarSign, FileText, Package, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BottomNav } from '@/components/bottom-nav'
import { PageHeader } from '@/components/page-header'

export default function ListItemPage() {
  const [variations, setVariations] = useState([
    { id: 1, name: 'Size', options: [{ name: 'Small', price: '', quantity: '' }, { name: 'Medium', price: '', quantity: '' }] },
    { id: 2, name: 'Color', options: [{ name: 'Black', price: '', quantity: '' }] }
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <PageHeader
        backButton={{
          href: '/sell'
        }}
        title="List Your Item"
        subtitle="Create a new listing"
        sticky
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Product Photos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-foreground">Product Photos</h2>
              <p className="text-xs text-muted-foreground">Add up to 5 photos</p>
            </div>
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-48 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="font-semibold text-foreground text-center mb-1">Upload images</p>
            <p className="text-sm text-muted-foreground text-center">Tap here to select photos from your gallery</p>
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Tag className="w-4 h-4 text-primary" />
            Product Name
          </label>
          <Input 
            placeholder="Handmade Leather Wallet" 
            className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="w-4 h-4 text-primary" />
            Description
          </label>
          <Textarea 
            placeholder="Describe your item in detail..." 
            className="bg-card text-foreground placeholder:text-muted-foreground border-2 border-border min-h-32 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" 
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Package className="w-4 h-4 text-primary" />
            Category
          </label>
          <Select>
            <SelectTrigger className="w-full bg-card text-foreground border-2 border-border rounded-xl py-5.5 focus:ring-2 focus:ring-primary/20 focus:border-primary">
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
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <DollarSign className="w-4 h-4 text-primary" />
            Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-semibold">$</span>
            <Input 
              type="number" 
              placeholder="0.00" 
              className="bg-card h-12 text-foreground placeholder:text-muted-foreground border-2 border-border pl-8 rounded-xl py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
            />
          </div>
        </div>

        {/* Product Variations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-base font-bold text-foreground">Product Variations</h3>
              <p className="text-xs text-muted-foreground">Add options like size, color, etc.</p>
            </div>
          </div>

          {variations.map((variation) => (
            <div key={variation.id} className="border border-border rounded-xl p-4 space-y-3 bg-card hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Variation {variation.id}: {variation.name}</p>
                </div>
                <button className="p-2 hover:bg-destructive/10 rounded-lg text-destructive hover:text-destructive/80 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {variation.options.map((option, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <Input 
                      placeholder={`e.g. ${option.name}`} 
                      className="bg-background text-foreground placeholder:text-muted-foreground border-border rounded-lg text-sm" 
                    />
                    <Input 
                      placeholder="Price (+$5)" 
                      className="bg-background text-foreground placeholder:text-muted-foreground border-border rounded-lg text-sm" 
                    />
                    <Input 
                      placeholder="Qty" 
                      className="bg-background text-foreground placeholder:text-muted-foreground border-border rounded-lg text-sm" 
                    />
                  </div>
                ))}
              </div>

              <button className="w-full border-2 border-dashed border-primary text-primary py-2.5 rounded-xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Add Option
              </button>
            </div>
          ))}

          <button className="w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Add Another Variation
          </button>
        </div>

        {/* List Button */}
        <div className="pt-4">
          <Link href="/listing-preview">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
              <span>List My Product</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
