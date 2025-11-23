'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, Image, Tag, DollarSign, FileText, Package, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BottomNav } from '@/components/bottom-nav'
import { PageHeader } from '@/components/page-header'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const listItemSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters').max(100, 'Product name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  category: z.enum(['accessories', 'clothing', 'electronics', 'home'], {
    required_error: 'Please select a category',
  }),
  price: z.string()
    .min(1, 'Price is required')
    .refine((val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    }, 'Price must be a positive number'),
})

type ListItemFormValues = z.infer<typeof listItemSchema>

export default function ListItemPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const form = useForm<ListItemFormValues>({
    resolver: zodResolver(listItemSchema),
    defaultValues: {
      productName: '',
      description: '',
      category: undefined,
      price: '',
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files).slice(0, 5)
    setImages(fileArray)
  }

  const onSubmit = async (data: ListItemFormValues) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Form data:', data)
      console.log('Images:', images)
      // Navigate to preview page
      window.location.href = '/listing-preview'
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <PageHeader
        backButton={{
          href: '/sell'
        }}
        title="List Your Item"
        subtitle="Create a new listing"
        sticky
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Product Photos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-base font-bold text-foreground">Product Photos</h2>
                <p className="text-xs text-muted-foreground">Add up to 5 photos</p>
              </div>
            </div>
            <label className="block">
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-48 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-foreground text-center mb-1">Upload images</p>
                <p className="text-sm text-muted-foreground text-center">Tap here to select photos from your gallery</p>
                {images.length > 0 && (
                  <p className="text-xs text-primary mt-2">{images.length} file(s) selected</p>
                )}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Product Name */}
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Tag className="w-4 h-4 text-primary" />
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Handmade Leather Wallet"
                    className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="w-4 h-4 text-primary" />
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your item in detail..."
                    className="bg-card text-foreground placeholder:text-muted-foreground border-2 border-border min-h-32 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Package className="w-4 h-4 text-primary" />
                  Category
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-card text-foreground border-2 border-border rounded-xl py-5.5 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Price
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-semibold">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="bg-card h-12 text-foreground placeholder:text-muted-foreground border-2 border-border pl-8 rounded-xl py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* List Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>List My Product</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <BottomNav />
    </main>
  )
}
