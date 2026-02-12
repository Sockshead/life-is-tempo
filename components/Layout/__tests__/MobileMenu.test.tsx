import { render, screen, fireEvent } from '@testing-library/react'
import { MobileMenu } from '../MobileMenu'

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
  X: ({ size, ...props }: { size?: number; [key: string]: unknown }) => (
    <svg data-testid="x-icon" width={size} height={size} {...props} />
  ),
}))

describe('MobileMenu', () => {
  afterEach(() => {
    document.body.style.overflow = ''
  })

  describe('Rendering', () => {
    it('renders dialog with correct role and aria attributes', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu')
    })

    it('renders the dialog with id mobile-menu', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('id', 'mobile-menu')
    })

    it('renders close button with accessible label', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const closeButton = screen.getByLabelText('Close menu')
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveAttribute('type', 'button')
    })

    it('renders close icon hidden from screen readers', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const icon = screen.getByTestId('x-icon')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders mobile navigation with accessible label', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const nav = screen.getByRole('navigation', { name: 'Mobile navigation' })
      expect(nav).toBeInTheDocument()
    })

    it('renders navigation links inside the menu', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      expect(screen.getByText('training')).toBeInTheDocument()
      expect(screen.getByText('dualLife')).toBeInTheDocument()
      expect(screen.getByText('underground')).toBeInTheDocument()
    })

    it('renders the language switcher', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      expect(screen.getByText('EN')).toBeInTheDocument()
      expect(screen.getByText('ES')).toBeInTheDocument()
    })
  })

  describe('Open State', () => {
    it('applies translate-x-0 class when open', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('translate-x-0')
    })

    it('applies opacity-100 to overlay when open', () => {
      const { container } = render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const overlay = container.querySelector('[aria-hidden="true"]')
      expect(overlay).toHaveClass('opacity-100')
    })
  })

  describe('Closed State', () => {
    it('applies translate-x-full class when closed', () => {
      render(<MobileMenu isOpen={false} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('translate-x-full')
    })

    it('applies opacity-0 and pointer-events-none to overlay when closed', () => {
      const { container } = render(<MobileMenu isOpen={false} onClose={jest.fn()} locale="en" />)

      const overlay = container.querySelector('[aria-hidden="true"]')
      expect(overlay).toHaveClass('opacity-0')
      expect(overlay).toHaveClass('pointer-events-none')
    })
  })

  describe('Close Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const handleClose = jest.fn()
      render(<MobileMenu isOpen={true} onClose={handleClose} locale="en" />)

      const closeButton = screen.getByLabelText('Close menu')
      fireEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when overlay is clicked', () => {
      const handleClose = jest.fn()
      const { container } = render(<MobileMenu isOpen={true} onClose={handleClose} locale="en" />)

      const overlay = container.querySelector('[aria-hidden="true"]')
      fireEvent.click(overlay!)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when ESC key is pressed while open', () => {
      const handleClose = jest.fn()
      render(<MobileMenu isOpen={true} onClose={handleClose} locale="en" />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose on ESC when closed', () => {
      const handleClose = jest.fn()
      render(<MobileMenu isOpen={false} onClose={handleClose} locale="en" />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('Body Scroll Lock', () => {
    it('locks body scroll when open', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      render(<MobileMenu isOpen={false} onClose={jest.fn()} locale="en" />)

      expect(document.body.style.overflow).toBe('')
    })

    it('restores body scroll on unmount', () => {
      const { unmount } = render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      expect(document.body.style.overflow).toBe('hidden')

      unmount()

      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('Styling', () => {
    it('applies fixed positioning and z-index to drawer', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('fixed')
      expect(dialog).toHaveClass('z-50')
    })

    it('applies dark background to drawer', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('bg-gray-950')
    })

    it('applies border-l to drawer', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('border-l')
      expect(dialog).toHaveClass('border-brand-purple/30')
    })

    it('applies transition classes to drawer', () => {
      render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('transition-transform')
      expect(dialog).toHaveClass('duration-300')
      expect(dialog).toHaveClass('ease-in-out')
    })

    it('applies transition classes to overlay', () => {
      const { container } = render(<MobileMenu isOpen={true} onClose={jest.fn()} locale="en" />)

      const overlay = container.querySelector('[aria-hidden="true"]')
      expect(overlay).toHaveClass('transition-opacity')
      expect(overlay).toHaveClass('duration-300')
    })
  })
})
