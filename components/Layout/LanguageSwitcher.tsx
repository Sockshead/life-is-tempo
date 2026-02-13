'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  currentLocale: string
}

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
] as const

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLocaleChange(newLocale: string) {
    if (newLocale === currentLocale) return
    // Cast needed because usePathname() returns the dynamic route pattern type
    // (e.g. '/blog/[slug]'), but at runtime it's always a concrete path
    router.replace(pathname as '/', { locale: newLocale as 'en' | 'es' })
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      {locales.map((locale, index) => (
        <span key={locale.code} className="flex items-center">
          {index > 0 && (
            <span className="text-gray-700 mx-1" aria-hidden="true">|</span>
          )}
          <button
            type="button"
            className={cn(
              'font-mono text-sm tracking-wide transition-colors duration-200 px-1 py-0.5',
              currentLocale === locale.code
                ? 'text-brand-cyan font-bold'
                : 'text-gray-600 hover:text-gray-400'
            )}
            onClick={() => handleLocaleChange(locale.code)}
            aria-label={`Switch to ${locale.code === 'en' ? 'English' : 'Spanish'}`}
            aria-current={currentLocale === locale.code ? 'true' : undefined}
          >
            {locale.label}
          </button>
        </span>
      ))}
    </div>
  )
}
