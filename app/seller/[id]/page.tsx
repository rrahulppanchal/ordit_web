'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Store, MessageCircle, Heart, ShoppingCart, Plus, Minus, Trash2, 
  X, CheckCircle2, Package, ArrowRight, Star, Users,
  MapPin,
  PhoneOutgoing
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BottomNav } from '@/components/bottom-nav'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
}

interface CartItem extends Product {
  quantity: number
}

export default function SellerStorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const sellerInfo = {
    name: "The Artisan's Corner",
    description: "Handcrafted goods for your home.",
    image: "/artisan-ceramic-shop.jpg",
    rating: 4.8,
    followers: 1240,
    products: 24
  }

  const products: Product[] = [
    { id: '1', name: 'Oakwood Chair', price: 150.00, image: '/oakwood-chair.jpg', category: 'furniture', rating: 4.5, reviews: 23 },
    { id: '2', name: 'Ceramic Vase', price: 45.00, image: '/ceramic-vase.png', category: 'decor', rating: 4.8, reviews: 45 },
    { id: '3', name: 'Linen Throw Pillow', price: 35.00, image: '/linen-throw-pillow.png', category: 'decor', rating: 4.6, reviews: 18 },
    { id: '4', name: 'Walnut Coffee Table', price: 220.00, image: '/walnut-coffee-table.png', category: 'furniture', rating: 4.9, reviews: 32 },
    { id: '5', name: 'Woven Wall Hanging', price: 60.00, image: '/woven-wall-hanging.jpg', category: 'pottery', rating: 4.7, reviews: 28 },
    { id: '6', name: 'Clay Serving Bowl', price: 55.00, image: '/clay-serving-bowl.jpg', category: 'pottery', rating: 4.4, reviews: 15 },
    { id: '7', name: 'Scented Candle', price: 25.00, image: '/scented-candle.png', category: 'decor', rating: 4.3, reviews: 67 },
    { id: '8', name: 'Ceramic Coasters', price: 30.00, image: '/ceramic-coasters.jpg', category: 'pottery', rating: 4.5, reviews: 42 },
  ]

  const categories = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'furniture', label: 'Furniture', count: products.filter(p => p.category === 'furniture').length },
    { id: 'decor', label: 'Decor', count: products.filter(p => p.category === 'decor').length },
    { id: 'pottery', label: 'Pottery', count: products.filter(p => p.category === 'pottery').length },
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, value) }))
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity }])
    }
    
    setCartOpen(true)
    setQuantities(prev => ({ ...prev, [product.id]: 1 }))
  }

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = cartItems.length > 0 ? 10.00 : 0
  const cartTotal = cartSubtotal + shipping

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <PageHeader
          backButton={{
            href: '/browse'
          }}
          title={`Agarwal Wholesalers`}
          subtitle={`Sector 1, Noida, Uttar Pradesh`}
          rightActions={[
            {
              type: 'notification',
              icon: ShoppingCart,
              href: '/cart',
              badge: cartItems.length > 0 ? cartItems.length : false
            }
          ]}
          sticky
        />

        <div className="px-4 pt-4 space-y-6">
          {/* Store Info Card */}
          <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
            <div className="flex gap-4 mb-4">
              <div className="relative">
                <img 
                  src={sellerInfo.image} 
                  alt={sellerInfo.name} 
                  className="w-20 h-20 rounded-xl object-cover border-2 border-border"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">{`Agarwal Wholesalers`}</h2>
                <p className="text-sm text-muted-foreground mb-2">{sellerInfo.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary-500 fill-primary-500" />
                    <span className="font-semibold text-foreground">{`Sector 1, Noida, Uttar Pradesh`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/messages" className="flex-1">
                <Button variant="outline" className="w-full">
                  <PhoneOutgoing className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </Link>
            </div>
          </div>
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground border border-border hover:bg-muted'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-card rounded-xl p-4 border border-border hover:shadow-lg transition-all group"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`} className="flex-shrink-0">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-muted">
                      <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {product.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                        </div>
                        {product.reviews && (
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        )}
                      </div>
                    )}

                    <p className="text-lg font-bold text-primary mb-3">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Quantity & Add to Cart */}
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 border-2 border-border rounded-lg px-2 py-1.5 bg-muted/50">
                        <button 
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                          className="text-primary hover:text-primary/80 transition-colors p-0.5"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-6 text-center">
                          {quantities[product.id] || 1}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                          className="text-primary hover:text-primary/80 transition-colors p-0.5"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-9"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Popup Dialog */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </DialogTitle>
            <DialogDescription>
              Items from {sellerInfo.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-foreground font-semibold mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add items to see them here</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex gap-3">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{item.name}</h4>
                      <p className="text-primary font-bold mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1 bg-muted/50">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold text-foreground w-6 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="ml-auto">
                          <p className="text-sm font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-border pt-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(false)}
                  className="flex-1"
                >
                  Continue Shopping
                </Button>
                <Link href="/cart" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Cart
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </main>
  )
}
