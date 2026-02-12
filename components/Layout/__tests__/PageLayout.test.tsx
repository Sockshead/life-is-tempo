import { render, screen } from '@testing-library/react'
import { PageLayout } from '../PageLayout'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Mock i18n routing
jest.mock('@/i18n/routing', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/en',
  useRouter: () => ({ replace: jest.fn() }),
}))

// Mock lucide-react (used by Header)
jest.mock('lucide-react', () => ({
  Menu: ({ size, ...props }: { size?: number; [key: string]: unknown }) => (
    <svg data-testid="menu-icon" width={size} height={size} {...props} />
  ),
  X: ({ size, ...props }: { size?: number; [key: string]: unknown }) => (
    <svg data-testid="x-icon" width={size} height={size} {...props} />
  ),
}))

describe('PageLayout', () => {
  describe('Rendering', () => {
    it('renders children inside main element', () => {
      render(
        <PageLayout locale="en">
          <p>Test content</p>
        </PageLayout>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders main element with id main-content', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toHaveAttribute('id', 'main-content')
    })

    it('renders Header component', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders Footer component', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <PageLayout locale="en">
          <p>First child</p>
          <p>Second child</p>
          <p>Third child</p>
        </PageLayout>
      )

      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
      expect(screen.getByText('Third child')).toBeInTheDocument()
    })
  })

  describe('Skip to Content Link', () => {
    it('renders skip-to-content link', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toBeInTheDocument()
    })

    it('skip link points to main-content', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    it('skip link is an anchor element', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink.tagName).toBe('A')
    })

    it('skip link has sr-only class for screen reader visibility', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveClass('sr-only')
    })

    it('skip link becomes visible on focus', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveClass('focus:not-sr-only')
      expect(skipLink).toHaveClass('focus:fixed')
    })
  })

  describe('Locale Propagation', () => {
    it('passes locale to Header and Footer', () => {
      render(
        <PageLayout locale="es">
          <p>Content</p>
        </PageLayout>
      )

      // Header and Footer both render when locale is passed
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('main element has min-h-screen class', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toHaveClass('min-h-screen')
    })

    it('main element has pt-20 class for header offset', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toHaveClass('pt-20')
    })

    it('skip link has brand styling on focus', () => {
      render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveClass('focus:bg-brand-purple')
      expect(skipLink).toHaveClass('focus:text-white')
      expect(skipLink).toHaveClass('focus:rounded-lg')
    })
  })

  describe('Document Structure', () => {
    it('renders skip link before header', () => {
      const { container } = render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const elements = Array.from(container.children)
      const skipLinkIndex = elements.findIndex((el) => el.tagName === 'A' && el.textContent === 'Skip to main content')
      const headerIndex = elements.findIndex((el) => el.tagName === 'HEADER')

      expect(skipLinkIndex).toBeGreaterThanOrEqual(0)
      expect(headerIndex).toBeGreaterThan(skipLinkIndex)
    })

    it('renders main before footer', () => {
      const { container } = render(
        <PageLayout locale="en">
          <p>Content</p>
        </PageLayout>
      )

      const elements = Array.from(container.children)
      const mainIndex = elements.findIndex((el) => el.tagName === 'MAIN')
      const footerIndex = elements.findIndex((el) => el.tagName === 'FOOTER')

      expect(mainIndex).toBeGreaterThanOrEqual(0)
      expect(footerIndex).toBeGreaterThan(mainIndex)
    })
  })
})
