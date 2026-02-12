import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '../Navigation'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Track the pathname mock so we can change it per test
let mockPathname = '/en'

jest.mock('@/i18n/routing', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: jest.fn() }),
}))

describe('Navigation', () => {
  beforeEach(() => {
    mockPathname = '/en'
  })

  describe('Rendering', () => {
    it('renders all navigation links', () => {
      render(<Navigation locale="en" />)

      expect(screen.getByText('training')).toBeInTheDocument()
      expect(screen.getByText('dualLife')).toBeInTheDocument()
      expect(screen.getByText('underground')).toBeInTheDocument()
    })

    it('renders links with correct hrefs', () => {
      render(<Navigation locale="en" />)

      const trainingLink = screen.getByText('training').closest('a')
      expect(trainingLink).toHaveAttribute('href', '/training')

      const dualLifeLink = screen.getByText('dualLife').closest('a')
      expect(dualLifeLink).toHaveAttribute('href', '/dual-life')

      const undergroundLink = screen.getByText('underground').closest('a')
      expect(undergroundLink).toHaveAttribute('href', '/underground')
    })

    it('renders as a list', () => {
      render(<Navigation locale="en" />)

      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()

      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(3)
    })
  })

  describe('Active State', () => {
    it('marks current page link as active', () => {
      mockPathname = '/training'
      render(<Navigation locale="en" />)

      const trainingLink = screen.getByText('training').closest('a')
      expect(trainingLink).toHaveAttribute('aria-current', 'page')
      expect(trainingLink).toHaveClass('text-brand-cyan')
      expect(trainingLink).toHaveClass('text-glow')
    })

    it('does not mark inactive links as current', () => {
      mockPathname = '/training'
      render(<Navigation locale="en" />)

      const dualLifeLink = screen.getByText('dualLife').closest('a')
      expect(dualLifeLink).not.toHaveAttribute('aria-current')
      expect(dualLifeLink).toHaveClass('text-gray-400')
    })

    it('detects active state for nested paths', () => {
      mockPathname = '/training/some-post'
      render(<Navigation locale="en" />)

      const trainingLink = screen.getByText('training').closest('a')
      expect(trainingLink).toHaveAttribute('aria-current', 'page')
    })

    it('applies inactive styles to non-matching links', () => {
      mockPathname = '/en'
      render(<Navigation locale="en" />)

      const allLinks = screen.getAllByRole('link')
      allLinks.forEach((link) => {
        expect(link).toHaveClass('text-gray-400')
        expect(link).not.toHaveClass('text-brand-cyan')
      })
    })
  })

  describe('Desktop Mode', () => {
    it('renders horizontal layout by default', () => {
      render(<Navigation locale="en" />)

      const list = screen.getByRole('list')
      expect(list).toHaveClass('flex')
      expect(list).toHaveClass('items-center')
      expect(list).toHaveClass('gap-8')
    })

    it('applies small text size in desktop mode', () => {
      render(<Navigation locale="en" />)

      const link = screen.getByText('training').closest('a')
      expect(link).toHaveClass('text-sm')
    })
  })

  describe('Mobile Mode', () => {
    it('renders vertical layout when mobile prop is true', () => {
      render(<Navigation locale="en" mobile />)

      const list = screen.getByRole('list')
      expect(list).toHaveClass('flex')
      expect(list).toHaveClass('flex-col')
      expect(list).toHaveClass('items-center')
      expect(list).toHaveClass('gap-6')
    })

    it('applies large text size in mobile mode', () => {
      render(<Navigation locale="en" mobile />)

      const link = screen.getByText('training').closest('a')
      expect(link).toHaveClass('text-2xl')
    })
  })

  describe('onLinkClick Callback', () => {
    it('calls onLinkClick when a link is clicked', () => {
      const handleLinkClick = jest.fn()
      render(<Navigation locale="en" onLinkClick={handleLinkClick} />)

      const link = screen.getByText('training')
      fireEvent.click(link)

      expect(handleLinkClick).toHaveBeenCalledTimes(1)
    })

    it('calls onLinkClick for each link clicked', () => {
      const handleLinkClick = jest.fn()
      render(<Navigation locale="en" mobile onLinkClick={handleLinkClick} />)

      fireEvent.click(screen.getByText('training'))
      fireEvent.click(screen.getByText('dualLife'))
      fireEvent.click(screen.getByText('underground'))

      expect(handleLinkClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Styling', () => {
    it('applies font-display to links', () => {
      render(<Navigation locale="en" />)

      const link = screen.getByText('training').closest('a')
      expect(link).toHaveClass('font-display')
      expect(link).toHaveClass('tracking-wider')
    })

    it('applies transition classes to links', () => {
      render(<Navigation locale="en" />)

      const link = screen.getByText('training').closest('a')
      expect(link).toHaveClass('transition-all')
      expect(link).toHaveClass('duration-200')
    })
  })
})
