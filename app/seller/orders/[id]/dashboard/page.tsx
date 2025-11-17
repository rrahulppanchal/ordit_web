'use client'

import Link from 'next/link'
import { ChevronLeft, MoreVertical, MessageCircle, Package, Truck, Clock } from 'lucide-react'
import { useState } from 'react'

export default function OrderDashboard() {
  const [remarks, setRemarks] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/seller/orders" className="p-2 -m-2">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground flex-1 text-center">Order Dashboard</h1>
          <button className="p-2 -m-2">
            <MoreVertical className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Status Card */}
        <div className="p-6 bg-primary text-primary-foreground rounded-xl space-y-4">
          <div className="text-center">
            <p className="text-sm opacity-90">Order ID</p>
            <p className="text-3xl font-bold">#A582-F98I</p>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full w-fit mx-auto">
            <Truck className="w-5 h-5" />
            <span className="font-medium">Current Status: Shipped</span>
          </div>
        </div>

        {/* Update Status */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Update Status</label>
          <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Shipped</option>
            <option>Processing</option>
            <option>Pending</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Message Buyer Button */}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Message Buyer Now
        </button>

        {/* Order Summary */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'summary' ? null : 'summary')}
            className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
            <span className={`transition-transform ${expandedSection === 'summary' ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          {expandedSection === 'summary' && (
            <div className="px-4 pb-4 border-t border-border space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items (2)</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-muted rounded">
                    <span className="text-2xl">🎒</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Handcrafted Leather Wallet</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                    <span className="font-semibold text-foreground">$75.00</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted rounded">
                    <span className="text-2xl">🪑</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Vintage Wooden Chair</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                    <span className="font-semibold text-foreground">$120.00</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground">Order Total</span>
                  <span className="font-semibold text-primary">$195.00</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buyer & Shipping Details */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'shipping' ? null : 'shipping')}
            className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="text-lg font-bold text-foreground">Buyer & Shipping Details</h3>
            <span className={`transition-transform ${expandedSection === 'shipping' ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {expandedSection === 'shipping' && (
            <div className="px-4 pb-4 border-t border-border space-y-4 text-foreground">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Buyer</p>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane@example.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Shipping Address</p>
                <p className="font-medium">123 Artisan Way</p>
                <p className="text-sm">Creativity City, CA 98765</p>
              </div>
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Activity Timeline</h3>
            <button className="text-primary font-semibold text-sm hover:underline">Reload</button>
          </div>

          <div className="bg-card rounded-lg border border-border p-4 space-y-4">
            {/* Timeline Items */}
            <div className="space-y-4 pb-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <div className="w-0.5 h-12 bg-border my-1" />
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-primary">CURRENT: Mar 22, 2024, 10:05 AM</p>
                  <p className="font-bold text-foreground">Order Shipped</p>
                  <p className="text-sm text-muted-foreground">Tracking number: IZ9999W9999999999.</p>
                  <p className="text-sm text-muted-foreground">The package is on its way.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-muted-foreground text-muted-foreground flex items-center justify-center text-sm">
                    →
                  </div>
                  <div className="w-0.5 h-12 bg-border my-1" />
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-muted-foreground">NEXT: Estimated Delivery Mar 25, 2024</p>
                  <p className="font-bold text-foreground">Out for Delivery</p>
                  <p className="text-sm text-muted-foreground">Package expected to arrive soon.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    ⚙
                  </div>
                  <div className="w-0.5 h-12 bg-border my-1" />
                </div>
                <div className="pt-1">
                  <p className="text-sm text-muted-foreground">Mar 21, 2024, 04:30 PM</p>
                  <p className="font-bold text-foreground">Order in Processing</p>
                  <p className="text-sm text-muted-foreground">Items are being prepared for shipment.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    📦
                  </div>
                </div>
                <div className="pt-1">
                  <p className="text-sm text-muted-foreground">Mar 21, 2024, 02:15 PM</p>
                  <p className="font-bold text-foreground">Order Placed</p>
                  <p className="text-sm text-muted-foreground">Payment of $195.00 confirmed.</p>
                </div>
              </div>
            </div>

            {/* Add Remark */}
            <div className="border-t border-border pt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add a remark or tracking number..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
