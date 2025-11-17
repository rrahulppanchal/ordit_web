'use client';

import { useState } from 'react';
import { ChevronLeft, MoreVertical, MessageSquare, Truck, Heart, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/bottom-nav';

type NotificationCategory = 'all' | 'messages' | 'orders' | 'promotions';

interface Notification {
  id: string;
  type: 'message' | 'order' | 'offer' | 'inquiry';
  title: string;
  description: string;
  time: string;
  timeType: 'today' | 'yesterday';
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Clara',
    description: 'Hey! Just wanted to confirm if the vintage lamp is still available...',
    time: '5m ago',
    timeType: 'today',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    title: 'Your order #12345 has...',
    description: 'It should arrive in 3-5 business days.',
    time: '1h ago',
    timeType: 'today',
    read: false,
  },
  {
    id: '3',
    type: 'offer',
    title: 'New offer on your wishlist...',
    description: 'The Leather Handbag is now 20% off.',
    time: '4h ago',
    timeType: 'today',
    read: false,
  },
  {
    id: '4',
    type: 'inquiry',
    title: 'New inquiry on your listing',
    description: 'Someone is asking about the Antique Vase.',
    time: '1:15 PM',
    timeType: 'yesterday',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="w-6 h-6" />;
    case 'order':
      return <Truck className="w-6 h-6" />;
    case 'offer':
      return <Heart className="w-6 h-6" />;
    case 'inquiry':
      return <HelpCircle className="w-6 h-6" />;
    default:
      return <MessageSquare className="w-6 h-6" />;
  }
};

export default function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');

  const filteredNotifications =
    activeCategory === 'all'
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => {
          if (activeCategory === 'messages') return n.type === 'message';
          if (activeCategory === 'orders') return n.type === 'order';
          if (activeCategory === 'promotions') return n.type === 'offer' || n.type === 'inquiry';
          return true;
        });

  const groupedByTime = {
    today: filteredNotifications.filter((n) => n.timeType === 'today'),
    yesterday: filteredNotifications.filter((n) => n.timeType === 'yesterday'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard" className="flex items-center">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground text-center flex-1">Notifications</h1>
          <Link href="/notifications/settings" className="flex items-center">
            <MoreVertical className="w-6 h-6 text-foreground" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'messages', 'orders', 'promotions'] as NotificationCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="px-4 py-6 space-y-8">
        {groupedByTime.today.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Today
            </h2>
            <div className="space-y-3">
              {groupedByTime.today.map((notification) => {
                const getHref = () => {
                  if (notification.type === 'message') return '/messages'
                  if (notification.type === 'order') return '/buyer/orders/12345'
                  return '/browse'
                }
                return (
                  <Link
                    key={notification.id}
                    href={getHref()}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {groupedByTime.yesterday.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Yesterday
            </h2>
            <div className="space-y-3">
              {groupedByTime.yesterday.map((notification) => {
                const getHref = () => {
                  if (notification.type === 'message') return '/messages'
                  if (notification.type === 'order') return '/buyer/orders/12345'
                  return '/browse'
                }
                return (
                  <Link
                    key={notification.id}
                    href={getHref()}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
