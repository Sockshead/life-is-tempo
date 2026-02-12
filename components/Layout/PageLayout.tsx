import { Header } from './Header'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
  locale: string
}

export function PageLayout({ children, locale }: PageLayoutProps) {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-purple focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      <Header locale={locale} />

      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>

      <Footer locale={locale} />
    </>
  )
}
