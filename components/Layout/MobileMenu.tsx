'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export function MobileMenu({ isOpen, onClose, locale }: MobileMenuProps) {
  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          'fixed right-0 top-0 h-full w-80 bg-gray-950 z-50',
          'border-l border-brand-purple/30',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-brand-cyan transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-12 pt-12" aria-label="Mobile navigation">
          <Navigation locale={locale} mobile onLinkClick={onClose} />

          <div className="border-t border-gray-800 pt-8 w-48 flex justify-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
      </div>
    </>
  )
}
