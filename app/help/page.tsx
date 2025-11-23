'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { HelpCircle, Mail, User, MessageSquare, Paperclip, X, Send, Loader2, FileText, Image, File } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BottomNav } from '@/components/bottom-nav'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface Attachment {
  id: string
  file: File
  name: string
  size: number
  type: string
}

const helpFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  category: z.string().optional(),
  subject: z.string().max(200, 'Subject must be less than 200 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
})

type HelpFormValues = z.infer<typeof helpFormSchema>

export default function HelpPage() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<HelpFormValues>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const newAttachment: Attachment = {
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }
      setAttachments(prev => [...prev, newAttachment])
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image
    if (type.includes('pdf')) return FileText
    return File
  }

  const onSubmit = async (data: HelpFormValues) => {
    // Simulate API call with FormData
    const formDataToSend = new FormData()
    formDataToSend.append('name', data.name)
    formDataToSend.append('email', data.email)
    formDataToSend.append('subject', data.subject || '')
    formDataToSend.append('category', data.category || '')
    formDataToSend.append('message', data.message)
    
    attachments.forEach((att, index) => {
      formDataToSend.append(`attachment_${index}`, att.file)
    })

    setTimeout(() => {
      console.log('Contact form submitted:', data, attachments)
      form.reset()
      setAttachments([])
      alert('Thank you! Your message has been sent. We\'ll get back to you soon.')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      <PageHeader
        backButton={{
          href: '/profile'
        }}
        title="Help & Support"
        subtitle="We're here to help"
        sticky
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Need Assistance?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fill out the form below and our support team will get back to you within 24 hours.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@ordit.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    Your Name <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        {...field}
                      />
                    </div>
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
                    <FileText className="w-4 h-4 text-primary" />
                    Category
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 py-5.5 w-full bg-card text-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="orders">Order Related</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Brief description of your issue"
                      className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Message <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Please describe your issue or question in detail..."
                      className="bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* Attachments */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Paperclip className="w-4 h-4 text-primary" />
              Attachments
              <span className="text-xs text-muted-foreground font-normal">(Optional, max 10MB per file)</span>
            </label>
            
            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Paperclip className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">Add Attachments</p>
              <p className="text-xs text-muted-foreground">Tap to select files (images, PDFs, documents)</p>
            </button>

            {/* Attached Files List */}
            {attachments.length > 0 && (
              <div className="space-y-2 mt-3">
                {attachments.map((attachment) => {
                  const FileIcon = getFileIcon(attachment.type)
                  return (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-3 bg-muted rounded-xl border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* FAQ Section */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            <Link href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <p className="font-semibold text-foreground text-sm">How do I create a listing?</p>
            </Link>
            <Link href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <p className="font-semibold text-foreground text-sm">How do I track my orders?</p>
            </Link>
            <Link href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <p className="font-semibold text-foreground text-sm">What payment methods are accepted?</p>
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
