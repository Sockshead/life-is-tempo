'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface NavigationProps {
  locale: string
  mobile?: boolean
  onLinkClick?: () => void
}

interface NavItem {
  key: 'training' | 'dualLife' | 'underground'
  href: '/training' | '/dual-life' | '/underground'
}

const navItems: NavItem[] = [
  { key: 'training', href: '/training' },
  { key: 'dualLife', href: '/dual-life' },
  { key: 'underground', href: '/underground' },
]

export function Navigation({ locale, mobile = false, onLinkClick }: NavigationProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        mobile
          ? 'flex flex-col items-center gap-6'
          : 'flex items-center gap-8'
      )}
      role="list"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <li key={item.key}>
            <Link
              href={item.href}
              locale={locale as 'en' | 'es'}
              className={cn(
                'font-display tracking-wider transition-all duration-200',
                mobile ? 'text-2xl' : 'text-sm',
                isActive
                  ? 'text-brand-cyan text-glow'
                  : 'text-gray-400 hover:text-brand-cyan'
              )}
              onClick={onLinkClick}
              aria-current={isActive ? 'page' : undefined}
            >
              {t(item.key)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
