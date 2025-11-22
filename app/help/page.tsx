'use client'

import { useState, useRef } from 'react'
import { HelpCircle, Mail, User, MessageSquare, Paperclip, X, Send, Loader2, FileText, Image, File } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BottomNav } from '@/components/bottom-nav'

interface Attachment {
  id: string
  file: File
  name: string
  size: number
  type: string
}

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call with FormData
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('subject', formData.subject)
    formDataToSend.append('category', formData.category)
    formDataToSend.append('message', formData.message)
    
    attachments.forEach((att, index) => {
      formDataToSend.append(`attachment_${index}`, att.file)
    })

    setTimeout(() => {
      setIsLoading(false)
      console.log('Contact form submitted:', formData, attachments)
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      })
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <User className="w-4 h-4 text-primary" />
              Your Name <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              Email Address <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="h-12 pl-12 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Category
            </label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="h-12 py-5.5 w-full bg-card text-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="billing">Billing & Payments</SelectItem>
                <SelectItem value="account">Account Issues</SelectItem>
                <SelectItem value="orders">Order Related</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your issue"
              className="h-12 pl-4 bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MessageSquare className="w-4 h-4 text-primary" />
              Message <span className="text-primary">*</span>
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Please describe your issue or question in detail..."
              className="bg-card text-foreground placeholder:text-muted-foreground border-2 border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

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
            disabled={isLoading || !formData.name || !formData.email || !formData.message}
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
