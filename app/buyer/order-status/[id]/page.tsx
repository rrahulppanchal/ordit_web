'use client';

import Link from 'next/link';
import { ChevronLeft, Truck, CheckCircle2, Cog, Package } from 'lucide-react';

export default function OrderStatusPage({ params }: { params: { id: string } }) {
  const order = {
    id: '123-456789',
    status: 'on-its-way',
    arrivalDate: 'Tuesday, Oct 26',
    items: 2,
    shippingAddress: '123 Main St, Anytown, USA',
    timeline: [
      { stage: 'Order Confirmed', date: 'Oct 24', completed: true, icon: CheckCircle2 },
      { stage: 'Processing', date: 'Oct 24', completed: true, icon: Cog },
      { stage: 'Shipped', date: 'Oct 25', completed: true, icon: Truck },
      { stage: 'Delivered', date: null, completed: false, icon: Package },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4 flex items-center gap-3">
        <Link href="/buyer/orders">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground flex-1">Order Status</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order ID Card */}
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="text-2xl font-bold text-foreground">#{order.id}</p>
        </div>

        {/* Status Message Card */}
        <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
          <div className="flex justify-center">
            <Truck className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-primary">Your order is on its way!</h2>
          <p className="text-lg text-secondary font-semibold">Arriving by {order.arrivalDate}</p>
        </div>

        {/* Timeline */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="space-y-6">
            {order.timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        item.completed
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" strokeWidth={2} />
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div
                        className={`w-1 h-12 ${
                          item.completed ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1 pb-6 last:pb-0">
                    <h3
                      className={`font-semibold ${
                        item.completed ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.stage}
                    </h3>
                    {item.date && (
                      <p
                        className={`text-sm ${
                          item.completed
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card border border-border rounded-lg p-5">
          <button className="w-full flex items-center justify-between font-semibold text-foreground hover:bg-muted p-3 rounded-lg transition-colors">
            <span>Order Items ({order.items})</span>
            <span className="text-2xl">▼</span>
          </button>
        </div>

        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-2">
          <h3 className="font-semibold text-foreground">Shipping To</h3>
          <p className="text-foreground">{order.shippingAddress}</p>
        </div>

        {/* Contact Support Button */}
        <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Contact Support
        </button>
      </div>
    </div>
  );
}
