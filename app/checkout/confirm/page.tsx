'use client'

import { ChevronLeft, MapPin, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

export default function ConfirmOrderPage() {
  const router = useRouter()
  const [items] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Vintage Leather Jacket',
      quantity: 1,
      price: 145.00,
      image: '/vintage-leather-jacket.png'
    },
    {
      id: '2',
      name: 'Handcrafted Wooden Bowl',
      quantity: 2,
      price: 70.00,
      image: '/handcrafted-wooden-bowl.png'
    }
  ])

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 10.00
  const taxes = 12.90
  const total = subtotal + shipping + taxes

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-foreground text-xl font-bold flex-1 text-center">Confirm Your Order</h1>
          <div className="w-6" />
        </div>
      </div>

      <main className="px-4 py-6 space-y-6 pb-8">
        {/* Your Items */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-foreground font-bold text-lg mb-4">Your Items</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-muted" />
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-foreground font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping To */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-secondary mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">Shipping To</h3>
                <p className="text-muted-foreground text-sm">Alex Doe, 123 Greenfield Ave, Apt 4B, Springfield, IL 62704</p>
              </div>
            </div>
            <Link href="#" className="text-primary font-medium text-sm hover:opacity-80">
              Change
            </Link>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-secondary mt-1">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">Payment Method</h3>
                <p className="text-muted-foreground text-sm">Visa ending in 1234</p>
              </div>
            </div>
            <Link href="#" className="text-primary font-medium text-sm hover:opacity-80">
              Change
            </Link>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-card rounded-lg p-4 border border-border space-y-3">
          <h2 className="text-foreground font-bold text-lg">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-foreground font-semibold">Total Amount</span>
            <span className="text-primary font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </section>

        {/* Terms */}
        <p className="text-muted-foreground text-sm text-center">
          By placing your order, you agree to our Terms of Service.
        </p>

        {/* Place Order Button */}
        <button 
          onClick={() => router.push('/checkout/confirmation')}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition"
        >
          Place Order
        </button>
      </main>
    </div>
  )
}
