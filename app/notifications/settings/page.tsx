'use client';

import { useState } from 'react';
import { ChevronLeft, Bell, MessageSquare, Truck, Tag } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    messages: true,
    orders: true,
    promotions: true,
    sound: true,
    vibration: true,
    doNotDisturb: false,
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTimeChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border px-4 py-4 z-10">
        <div className="flex items-center gap-4">
          <Link href="/notifications" className="flex items-center">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="px-4 py-6 space-y-6 mb-20">
        {/* Notification Types */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Notification Types</h2>
          <div className="space-y-3">
            {/* Messages */}
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Order's Messages</h3>
                  <p className="text-xs text-muted-foreground">Get notified about order remarks</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('messages')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.messages ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.messages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Orders */}
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Orders</h3>
                  <p className="text-xs text-muted-foreground">Get notified about order updates</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('orders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.orders ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.orders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

          </div>
        </div>


        {/* Do Not Disturb */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Do Not Disturb</h2>
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Enable Do Not Disturb</h3>
                <p className="text-xs text-muted-foreground">Silence notifications during hours</p>
              </div>
              <button
                onClick={() => handleToggle('doNotDisturb')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.doNotDisturb ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.doNotDisturb ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {settings.doNotDisturb && (
              <div className="space-y-3 pt-4 border-t border-border">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">From</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbStart}
                    onChange={(e) => handleTimeChange('doNotDisturbStart', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">To</label>
                  <input
                    type="time"
                    value={settings.doNotDisturbEnd}
                    onChange={(e) => handleTimeChange('doNotDisturbEnd', e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
