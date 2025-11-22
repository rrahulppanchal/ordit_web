'use client'

import Link from 'next/link'
import { LucideIcon, ChevronLeft } from 'lucide-react'
import { ReactNode } from 'react'

interface PageHeaderProps {
  // Left side - Avatar/User section
  avatar?: {
    type: 'icon' | 'image'
    icon?: LucideIcon
    image?: string
    alt?: string
  }
  title?: string
  subtitle?: string
  
  // Center - Title with icon
  centerTitle?: string
  centerIcon?: LucideIcon
  
  // Right side - Actions
  rightActions?: {
    type: 'notification' | 'icon' | 'link' | 'custom' | 'profile'
    icon?: LucideIcon
    href?: string
    badge?: boolean | number
    onClick?: () => void
    custom?: ReactNode
  }[]
  
  // Back button
  backButton?: {
    href: string
    label?: string
  }
  
  // Styling
  sticky?: boolean
  className?: string
  variant?: 'default' | 'compact' | 'centered'
}

export function PageHeader({
  avatar,
  title,
  subtitle,
  centerTitle,
  centerIcon,
  rightActions = [],
  backButton,
  sticky = false,
  className = '',
  variant = 'default'
}: PageHeaderProps) {
  const CenterIcon = centerIcon
  
  const headerContent = (
    <div className={`flex items-center gap-3 px-4 py-4 ${className}`}>
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Back Button */}
        {backButton && (
          <Link 
            href={backButton.href} 
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
        )}
        
        {/* Avatar Section */}
        {avatar && !backButton && (
          <div className="flex-shrink-0">
            {avatar.type === 'icon' && avatar.icon ? (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-none border-primary/20">
                {avatar.icon && <avatar.icon className="w-6 h-6 text-primary" />}
              </div>
            ) : avatar.type === 'image' && avatar.image ? (
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                <img 
                  src={avatar.image} 
                  alt={avatar.alt || 'Avatar'} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
          </div>
        )}
        
        {/* Title Section */}
        {variant === 'centered' && centerTitle ? (
          <div className="flex-1 text-center">
            {CenterIcon && (
              <div className="flex justify-center mb-2">
                <CenterIcon className="w-6 h-6 text-primary" />
              </div>
            )}
            <h1 className="text-xl font-bold text-foreground">{centerTitle}</h1>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className={`font-bold text-foreground ${variant === 'compact' ? 'text-lg' : 'text-xl'}`}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Right Actions */}
      {rightActions.length > 0 && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightActions.map((action, idx) => {
            if (action.type === 'custom' && action.custom) {
              return <div key={idx}>{action.custom}</div>
            }

            const IconComponent = action.icon

            if (action.type === 'notification') {
              return (
                <Link
                  key={idx}
                  href={action.href || '/notifications'}
                  className="p-2.5 hover:bg-muted rounded-full transition-colors relative"
                >
                  {IconComponent && <IconComponent size={22} className="text-muted-foreground" />}
                  {action.badge && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </Link>
              )
            }

            if (action.type === 'link' && action.href) {
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  {IconComponent && <IconComponent className="w-5 h-5 text-foreground" />}
                </Link>
              )
            }

            // New: Profile-style action, matching avatar design
            if (action.type === 'profile' && IconComponent) {
              return (
                <Link
                  key={idx}
                  href={action.href || '/profile'}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/20 hover:bg-primary/10 transition-colors"
                >
                  <IconComponent className="w-6 h-6 text-primary" />
                </Link>
              )
            }

            if (action.type === 'icon') {
              return (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="p-2 hover:bg-muted rounded-lg transition-colors relative"
                >
                  {IconComponent && <IconComponent className="w-5 h-5 text-foreground" />}
                  {action.badge && typeof action.badge === 'number' && action.badge > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {action.badge > 9 ? '9+' : action.badge}
                    </span>
                  )}
                </button>
              )
            }

            return null
          })}
        </div>
      )}
    </div>
  )

  if (sticky) {
    return (
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        {headerContent}
      </div>
    )
  }

  return <div className="border-b border-border">{headerContent}</div>
}

