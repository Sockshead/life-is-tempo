import React from 'react'

export function Link({
  children,
  href,
  ...props
}: {
  children: React.ReactNode
  href: string
  [key: string]: unknown
}) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export function usePathname() {
  return '/en'
}

export function useRouter() {
  return {
    replace: () => {},
    push: () => {},
    back: () => {},
  }
}

export function redirect() {}

export function getPathname() {
  return '/en'
}

export const routing = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pathnames: {
    '/about': { en: '/about', es: '/acerca' },
    '/training': { en: '/training', es: '/training' },
    '/dual-life': { en: '/dual-life', es: '/dual-life' },
    '/underground': { en: '/underground', es: '/underground' },
  },
}
