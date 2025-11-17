'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'delivered' | 'pending' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: '123456',
      date: '15 Oct 2023',
      amount: 150.0,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '123457',
      date: '14 Oct 2023',
      amount: 75.5,
      status: 'Pending',
      statusColor: 'bg-orange-100 text-primary',
    },
    {
      id: '123458',
      date: '12 Oct 2023',
      amount: 210.25,
      status: 'Cancelled',
      statusColor: 'bg-red-100 text-red-700',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === 'all' ||
      order.status.toLowerCase() === activeTab;
    const matchesSearch =
      order.id.includes(searchQuery) ||
      order.amount.toString().includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-4 flex items-center gap-3">
        <Link href="/dashboard">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground flex-1">My Orders</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order ID or product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {(['all', 'delivered', 'pending', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/buyer/orders/${order.id}`}
              className="block bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Order <span className="text-primary">#{order.id}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">${order.amount.toFixed(2)}</span>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
