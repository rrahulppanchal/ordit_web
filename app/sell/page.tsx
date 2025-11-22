'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Plus, Package, ArrowRight, Eye, DollarSign, User, Bell, ChartLine, 
  MoreVertical, Edit, Trash2, ExternalLink, TrendingUp, CheckCircle2, 
  Clock, XCircle, Image as ImageIcon
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  price: number
  image: string
  status: 'active' | 'draft' | 'sold'
  views: number
  sales: number
  category: string
  createdAt: string
}

export default function SellPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Vintage Camera',
      price: 299.99,
      image: '/vintage-camera.png',
      status: 'active',
      views: 124,
      sales: 0,
      category: 'Electronics',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Handcrafted Leather Wallet',
      price: 89.99,
      image: '/leather-wallet.jpg',
      status: 'active',
      views: 89,
      sales: 3,
      category: 'Accessories',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Potted Succulent',
      price: 24.99,
      image: '/potted-plant.png',
      status: 'active',
      views: 156,
      sales: 1,
      category: 'Home & Garden',
      createdAt: '2024-01-18'
    },
    {
      id: '4',
      name: 'Mid-Century Chair',
      price: 320.00,
      image: '/mid-century-wooden-chair.jpg',
      status: 'draft',
      views: 0,
      sales: 0,
      category: 'Furniture',
      createdAt: '2024-01-22'
    },
    {
      id: '5',
      name: 'Ceramic Bowls Set',
      price: 45.00,
      image: '/ceramic-bowls-set.jpg',
      status: 'sold',
      views: 203,
      sales: 1,
      category: 'Home & Garden',
      createdAt: '2024-01-10'
    },
    {
      id: '6',
      name: 'Abstract Art Print',
      price: 30.00,
      image: '/abstract-art-print.jpg',
      status: 'active',
      views: 67,
      sales: 0,
      category: 'Art',
      createdAt: '2024-01-25'
    }
  ])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const stats = [
    { 
      label: 'Active Listings', 
      value: products.filter(p => p.status === 'active').length.toString(), 
      icon: Package, 
      color: 'text-primary' 
    },
    { 
      label: 'Total Sales', 
      value: `$${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toFixed(1)}K`, 
      icon: DollarSign, 
      color: 'text-primary' 
    },
  ]

  const handleDelete = (productId: string) => {
    setProductToDelete(productId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case 'draft':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        )
      case 'sold':
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Sold
          </Badge>
        )
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <div className="max-w-md mx-auto px-0 pt-0">
        {/* Header */}
        <PageHeader
          avatar={{
            type: 'icon',
            icon: ChartLine
          }}
          title="Sell Items"
          subtitle="Manage your marketplace"
          rightActions={[
            {
              type: 'notification',
              icon: Bell,
              href: '/notifications',
              badge: true
            },
            {
              type: 'profile',
              icon: User,
              href: '/profile',
            }
          ]}
        />

        {/* Quick Action */}
        <div className="mb-6 px-4 pt-4">
          <Link href="/list-item">
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group">
              <Plus className="w-5 h-5" />
              <span>List New Product</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>


        {/* Products List */}
        <div className="px-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-foreground">Your Listings ({products.length})</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Manage</span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-card rounded-xl p-12 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold mb-2">No listings yet</p>
              <p className="text-sm text-muted-foreground mb-6">Start selling by listing your first product</p>
              <Link href="/list-item">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  List Your First Product
                </Button>
              </Link>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-xl border border-border hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted group">
                      {product.image ? (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      {product.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <XCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-base font-bold text-foreground truncate hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">{product.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link href={`/product/${product.id}`} className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/list-item?edit=${product.id}`} className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(product.status)}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{product.views}</span>
                        </div>
                        {product.sales > 0 && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{product.sales}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone and will remove the product from your listings permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </main>
  )
}
