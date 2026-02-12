import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '../LanguageSwitcher'

// Track mock router for assertions
const mockReplace = jest.fn()

jest.mock('@/i18n/routing', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/about',
  useRouter: () => ({ replace: mockReplace }),
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockReplace.mockClear()
  })

  describe('Rendering', () => {
    it('renders EN and ES buttons', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      expect(screen.getByText('EN')).toBeInTheDocument()
      expect(screen.getByText('ES')).toBeInTheDocument()
    })

    it('renders separator between languages', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      expect(screen.getByText('|')).toBeInTheDocument()
    })

    it('renders as a group with accessible label', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const group = screen.getByRole('group', { name: 'Language selection' })
      expect(group).toBeInTheDocument()
    })
  })

  describe('Active State', () => {
    it('highlights EN when current locale is en', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const enButton = screen.getByText('EN')
      expect(enButton).toHaveClass('text-brand-cyan')
      expect(enButton).toHaveClass('font-bold')
    })

    it('dims ES when current locale is en', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const esButton = screen.getByText('ES')
      expect(esButton).toHaveClass('text-gray-600')
      expect(esButton).not.toHaveClass('font-bold')
    })

    it('highlights ES when current locale is es', () => {
      render(<LanguageSwitcher currentLocale="es" />)

      const esButton = screen.getByText('ES')
      expect(esButton).toHaveClass('text-brand-cyan')
      expect(esButton).toHaveClass('font-bold')
    })

    it('dims EN when current locale is es', () => {
      render(<LanguageSwitcher currentLocale="es" />)

      const enButton = screen.getByText('EN')
      expect(enButton).toHaveClass('text-gray-600')
      expect(enButton).not.toHaveClass('font-bold')
    })

    it('sets aria-current on active locale', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const enButton = screen.getByText('EN')
      expect(enButton).toHaveAttribute('aria-current', 'true')

      const esButton = screen.getByText('ES')
      expect(esButton).not.toHaveAttribute('aria-current')
    })
  })

  describe('Locale Switching', () => {
    it('calls router.replace when switching to ES', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      fireEvent.click(screen.getByText('ES'))

      expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'es' })
    })

    it('calls router.replace when switching to EN', () => {
      render(<LanguageSwitcher currentLocale="es" />)

      fireEvent.click(screen.getByText('EN'))

      expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'en' })
    })

    it('does not call router.replace when clicking current locale', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      fireEvent.click(screen.getByText('EN'))

      expect(mockReplace).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('EN button has accessible label', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const enButton = screen.getByLabelText('Switch to English')
      expect(enButton).toBeInTheDocument()
    })

    it('ES button has accessible label', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const esButton = screen.getByLabelText('Switch to Spanish')
      expect(esButton).toBeInTheDocument()
    })

    it('separator is hidden from screen readers', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const separator = screen.getByText('|')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
    })

    it('buttons are proper button elements', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })
  })

  describe('Styling', () => {
    it('applies mono font to buttons', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const enButton = screen.getByText('EN')
      expect(enButton).toHaveClass('font-mono')
      expect(enButton).toHaveClass('text-sm')
    })

    it('applies transition classes', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const enButton = screen.getByText('EN')
      expect(enButton).toHaveClass('transition-colors')
      expect(enButton).toHaveClass('duration-200')
    })

    it('applies hover styles to inactive button', () => {
      render(<LanguageSwitcher currentLocale="en" />)

      const esButton = screen.getByText('ES')
      expect(esButton).toHaveClass('hover:text-gray-400')
    })
  })
})
