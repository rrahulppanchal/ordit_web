'use client'

import Link from 'next/link'
import { ChevronLeft, Check } from 'lucide-react'
import { useState } from 'react'

const ORDER_DATA = {
  id: 'ORD-12345',
  datePlaced: 'Oct 26, 2023',
  totalAmount: 145.00,
  items: [
    {
      id: 1,
      name: 'Handcrafted Leather...',
      quantity: 1,
      price: 75.00,
      image: '🎒'
    },
    {
      id: 2,
      name: 'Artisan Wooden...',
      quantity: 1,
      price: 70.00,
      image: '🪵'
    }
  ],
  buyer: {
    name: 'Jane Doe',
    email: 'jane@example.com'
  },
  shipping: {
    address: '123 Artisan Way',
    city: 'Creativity City',
    state: 'CA',
    zip: '98765',
    country: 'United States'
  },
  status: 'New Order'
}

export default function OrderDetails() {
  const [orderStatus, setOrderStatus] = useState(ORDER_DATA.status)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/seller/orders" className="p-2 -m-2">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground flex-1 text-center">Order #{ORDER_DATA.id}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Info Card */}
        <div className="p-4 bg-card rounded-lg border border-border space-y-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-bold text-foreground">{ORDER_DATA.id}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Date Placed</p>
            <p className="font-medium text-foreground">{ORDER_DATA.datePlaced}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-lg font-bold text-primary">${ORDER_DATA.totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Items</h3>
          <div className="space-y-3">
            {ORDER_DATA.items.map(item => (
              <div key={item.id} className="p-3 bg-card rounded-lg border border-border flex gap-3">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Information */}
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">Buyer Information</h3>
          <div className="space-y-1 mb-4">
            <p className="font-semibold text-foreground">{ORDER_DATA.buyer.name}</p>
            <p className="text-sm text-muted-foreground">{ORDER_DATA.buyer.email}</p>
          </div>
          <Link href="/messages" className="text-primary font-semibold">
            Contact Buyer
          </Link>
        </div>

        {/* Shipping Address */}
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">Shipping Address</h3>
          <p className="text-foreground">{ORDER_DATA.shipping.address}</p>
          <p className="text-foreground">{ORDER_DATA.shipping.city}, {ORDER_DATA.shipping.state} {ORDER_DATA.shipping.zip}</p>
          <p className="text-foreground">{ORDER_DATA.shipping.country}</p>
        </div>

        {/* Order Status */}
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-bold text-foreground mb-3">Order Status</h3>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>New Order</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Accept Button */}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Accept Order
        </button>
      </div>
    </div>
  )
}
