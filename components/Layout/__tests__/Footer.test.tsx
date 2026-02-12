import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

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

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders the logo text', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('LIFE IS TEMPO')).toBeInTheDocument()
    })

    it('renders with contentinfo role', () => {
      render(<Footer locale="en" />)

      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('renders the about text', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('about')).toBeInTheDocument()
    })

    it('renders the location', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('location')).toBeInTheDocument()
    })

    it('renders copyright with current year', () => {
      render(<Footer locale="en" />)

      const currentYear = new Date().getFullYear()
      expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument()
      expect(screen.getByText(/copyright/)).toBeInTheDocument()
    })
  })

  describe('Column Headers', () => {
    it('renders Train column header', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('train')).toBeInTheDocument()
    })

    it('renders Live column header', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('live')).toBeInTheDocument()
    })

    it('renders Connect column header', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('connect')).toBeInTheDocument()
    })

    it('applies display font and brand color to column headers', () => {
      render(<Footer locale="en" />)

      const trainHeader = screen.getByText('train')
      expect(trainHeader).toHaveClass('font-display')
      expect(trainHeader).toHaveClass('text-brand-purple')
      expect(trainHeader).toHaveClass('uppercase')
    })
  })

  describe('Train Column Links', () => {
    it('renders Training Chronicles link', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('trainingChronicles')).toBeInTheDocument()
      const link = screen.getByText('trainingChronicles').closest('a')
      expect(link).toHaveAttribute('href', '/training')
    })

    it('renders Berlin 70.3 link', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('berlin703')).toBeInTheDocument()
    })
  })

  describe('Live Column Links', () => {
    it('renders Dual Life Tactics link', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('dualLifeTactics')).toBeInTheDocument()
      const link = screen.getByText('dualLifeTactics').closest('a')
      expect(link).toHaveAttribute('href', '/dual-life')
    })

    it('renders Underground Endurance link', () => {
      render(<Footer locale="en" />)

      expect(screen.getByText('undergroundEndurance')).toBeInTheDocument()
      const link = screen.getByText('undergroundEndurance').closest('a')
      expect(link).toHaveAttribute('href', '/underground')
    })
  })

  describe('Connect Column Links', () => {
    it('renders Instagram link', () => {
      render(<Footer locale="en" />)

      const link = screen.getByText('instagram').closest('a')
      expect(link).toHaveAttribute('href', 'https://instagram.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders Strava link', () => {
      render(<Footer locale="en" />)

      const link = screen.getByText('strava').closest('a')
      expect(link).toHaveAttribute('href', 'https://strava.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders Spotify link', () => {
      render(<Footer locale="en" />)

      const link = screen.getByText('spotify').closest('a')
      expect(link).toHaveAttribute('href', 'https://spotify.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders Email link', () => {
      render(<Footer locale="en" />)

      const link = screen.getByText('email').closest('a')
      expect(link).toHaveAttribute('href', 'mailto:hello@lifeistempo.com')
    })
  })

  describe('Accessibility', () => {
    it('logo has accessible label', () => {
      render(<Footer locale="en" />)

      const logo = screen.getByLabelText('Life Is Tempo - Home')
      expect(logo.tagName).toBe('A')
    })

    it('renders lists for footer columns', () => {
      render(<Footer locale="en" />)

      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThanOrEqual(3)
    })

    it('external links have noopener noreferrer', () => {
      render(<Footer locale="en" />)

      const externalLinks = ['instagram', 'strava', 'spotify']
      externalLinks.forEach((linkText) => {
        const link = screen.getByText(linkText).closest('a')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Styling', () => {
    it('applies border-t to footer', () => {
      render(<Footer locale="en" />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('border-t')
      expect(footer).toHaveClass('border-gray-800')
    })

    it('applies dark background', () => {
      render(<Footer locale="en" />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-gray-950')
    })

    it('applies mono font to link text', () => {
      render(<Footer locale="en" />)

      const aboutText = screen.getByText('about')
      expect(aboutText).toHaveClass('font-mono')
    })
  })

  describe('Responsive Layout', () => {
    it('applies grid layout for columns', () => {
      const { container } = render(<Footer locale="en" />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-3')
    })
  })
})
