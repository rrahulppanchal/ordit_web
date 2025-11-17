'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send } from 'lucide-react';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [remark, setRemark] = useState('');

  const order = {
    id: 'B4T5-345-22',
    date: 'October 23, 2023',
    status: 'Shipped',
    items: [
      { name: 'Classic Leather Tote', quantity: 1, price: 185.0, image: '/leather-tote.jpg' },
      { name: 'Suede Ankle Boots', quantity: 1, price: 120.0, image: '/ankle-boots.jpg' },
    ],
    subtotal: 305.0,
    shipping: 10.0,
    total: 315.0,
    timeline: [
      { event: 'Order placed', date: 'October 23, 2023, 10:00 AM', icon: '📦' },
      { event: 'From Buyer: Any updates on shipping?', date: 'October 23, 2023, 02:15 PM', icon: '💬' },
      { event: 'Status updated to: Shipped', date: 'October 24, 2023, 09:30 AM', icon: '✓' },
      { event: 'From Seller: Package shipped, tracking info sent via email.', date: 'October 24, 2023, 10:00 AM', icon: '📨' },
    ],
    shipping_address: 'Alex Doe, 123 Market Street, San Francisco, CA 94103, United States',
    payment_method: 'Credit Card ending in 1234',
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4 flex items-center gap-3">
        <Link href="/buyer/orders">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground flex-1">Order Details</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Header Info */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Order ID</span>
            <span className="font-semibold text-foreground">#{order.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Order Date</span>
            <span className="text-foreground">{order.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-secondary">
              {order.status}
            </span>
          </div>
        </div>

        {/* Items */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Items</h2>
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-foreground">${item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Order Activity Timeline</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a remark..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>

            <div className="text-center py-4">
              <button className="text-primary font-semibold hover:underline">
                Reload Timeline
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              {order.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 pb-4 last:pb-0 last:border-b-0 border-b border-border last:border-b-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.event}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Shipping & Handling</span>
            <span className="text-foreground">${order.shipping.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="font-semibold text-foreground">Total Amount</span>
            <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Address</h3>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-foreground whitespace-pre-line">{order.shipping_address}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Payment Method</h3>
          <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-foreground">{order.payment_method}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
