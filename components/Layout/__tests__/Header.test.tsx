import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '../Header'

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

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Menu: ({ size, ...props }: { size?: number; [key: string]: unknown }) => (
    <svg data-testid="menu-icon" width={size} height={size} {...props} />
  ),
  X: ({ size, ...props }: { size?: number; [key: string]: unknown }) => (
    <svg data-testid="x-icon" width={size} height={size} {...props} />
  ),
}))

describe('Header', () => {
  describe('Rendering', () => {
    it('renders the logo text', () => {
      render(<Header locale="en" />)

      expect(screen.getByText('LIFE IS TEMPO')).toBeInTheDocument()
    })

    it('renders with banner role', () => {
      render(<Header locale="en" />)

      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders the logo as a link to home', () => {
      render(<Header locale="en" />)

      const logoLink = screen.getByLabelText('Life Is Tempo - Home')
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('renders desktop navigation', () => {
      render(<Header locale="en" />)

      const nav = screen.getByRole('navigation', { name: 'Main navigation' })
      expect(nav).toBeInTheDocument()
    })

    it('renders the hamburger menu button for mobile', () => {
      render(<Header locale="en" />)

      const menuButton = screen.getByLabelText('Open menu')
      expect(menuButton).toBeInTheDocument()
    })

    it('renders the menu icon', () => {
      render(<Header locale="en" />)

      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })
  })

  describe('Scroll Behavior', () => {
    it('applies transparent background when not scrolled', () => {
      render(<Header locale="en" />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-gray-950/50')
      expect(header).toHaveClass('border-transparent')
    })

    it('applies opaque background after scrolling', () => {
      render(<Header locale="en" />)

      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
      fireEvent.scroll(window)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-gray-950/90')
      expect(header).toHaveClass('border-brand-purple/20')
    })
  })

  describe('Mobile Menu Integration', () => {
    it('opens mobile menu when hamburger is clicked', () => {
      render(<Header locale="en" />)

      const menuButton = screen.getByLabelText('Open menu')
      fireEvent.click(menuButton)

      // Mobile menu dialog should be present
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveClass('translate-x-0')
    })

    it('hamburger button has correct aria-expanded', () => {
      render(<Header locale="en" />)

      const menuButton = screen.getByLabelText('Open menu')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('hamburger button references mobile menu via aria-controls', () => {
      render(<Header locale="en" />)

      const menuButton = screen.getByLabelText('Open menu')
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    })
  })

  describe('Accessibility', () => {
    it('logo has accessible label', () => {
      render(<Header locale="en" />)

      const logo = screen.getByLabelText('Life Is Tempo - Home')
      expect(logo.tagName).toBe('A')
    })

    it('hamburger icon is hidden from screen readers', () => {
      render(<Header locale="en" />)

      const icon = screen.getByTestId('menu-icon')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders navigation with accessible label', () => {
      render(<Header locale="en" />)

      const nav = screen.getByRole('navigation', { name: 'Main navigation' })
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Responsive Layout', () => {
    it('desktop navigation has hidden md:flex classes', () => {
      render(<Header locale="en" />)

      const nav = screen.getByRole('navigation', { name: 'Main navigation' })
      expect(nav).toHaveClass('hidden')
      expect(nav).toHaveClass('md:flex')
    })

    it('hamburger button has md:hidden class', () => {
      render(<Header locale="en" />)

      const menuButton = screen.getByLabelText('Open menu')
      expect(menuButton).toHaveClass('md:hidden')
    })
  })

  describe('Styling', () => {
    it('applies fixed positioning', () => {
      render(<Header locale="en" />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('fixed')
      expect(header).toHaveClass('z-50')
    })

    it('applies backdrop blur', () => {
      render(<Header locale="en" />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('backdrop-blur-md')
    })

    it('logo has display font and gradient text', () => {
      render(<Header locale="en" />)

      const logo = screen.getByLabelText('Life Is Tempo - Home')
      expect(logo).toHaveClass('font-display')
      expect(logo).toHaveClass('gradient-text')
    })
  })
})
