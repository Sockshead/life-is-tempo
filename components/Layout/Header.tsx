'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'backdrop-blur-md border-b',
          scrolled
            ? 'bg-gray-950/90 border-brand-purple/20'
            : 'bg-gray-950/50 border-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            locale={locale as 'en' | 'es'}
            className="font-display text-xl tracking-wider gradient-text hover:opacity-80 transition-opacity"
            aria-label="Life Is Tempo - Home"
          >
            LIFE IS TEMPO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" aria-label="Main navigation">
            <Navigation locale={locale} />
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-brand-cyan transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  )
}
