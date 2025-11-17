'use client'

import { ChevronLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { BottomNav } from '@/components/bottom-nav'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function ShoppingCartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Vintage Leather Bag',
      price: 120.00,
      quantity: 1,
      image: '/vintage-leather-bag.jpg'
    },
    {
      id: '2',
      name: 'Wooden Bowl',
      price: 45.00,
      quantity: 2,
      image: '/wooden-bowl.png'
    },
    {
      id: '3',
      name: 'Classic Silver Watch',
      price: 250.00,
      quantity: 1,
      image: '/classic-silver-watch.jpg'
    }
  ])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items.filter(item => item.id !== id))
    } else {
      setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
    }
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 10.00
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-foreground text-xl font-bold flex-1 text-center">Shopping Cart</h1>
          <div className="w-6" />
        </div>
      </div>

      <main className="px-4 py-6 space-y-4 pb-32">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="bg-card rounded-lg p-4 border border-border flex gap-4">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-foreground font-semibold">{item.name}</h3>
                      <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="text-primary"
                        >
                          −
                        </button>
                        <span className="text-foreground font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="text-primary"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-lg p-4 border border-border space-y-3 mt-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-foreground font-semibold">Total</span>
                <span className="text-primary font-bold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout/confirm" className="block">
              <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition mt-4">
                Proceed to Checkout
              </button>
            </Link>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
