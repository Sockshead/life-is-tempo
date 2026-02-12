import { render, screen } from '@testing-library/react'
import { ReadingProgress } from '../ReadingProgress'

describe('ReadingProgress', () => {
  describe('Rendering', () => {
    it('renders the progress bar container', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toBeInTheDocument()
    })

    it('renders with 0 progress initially', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    })

    it('renders fixed at top of viewport', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('fixed')
      expect(progressbar).toHaveClass('top-0')
      expect(progressbar).toHaveClass('left-0')
      expect(progressbar).toHaveClass('right-0')
      expect(progressbar).toHaveClass('z-50')
    })

    it('renders with h-1 height', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('h-1')
    })

    it('renders background track', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('bg-gray-900')
    })
  })

  describe('ARIA attributes', () => {
    it('has role="progressbar"', () => {
      render(<ReadingProgress />)

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('has aria-valuemin of 0', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    })

    it('has aria-valuemax of 100', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    })

    it('has aria-label', () => {
      render(<ReadingProgress />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-label', 'Reading progress')
    })
  })

  describe('Category colors', () => {
    it('uses cyan color by default (no category)', () => {
      const { container } = render(<ReadingProgress />)

      const fill = container.querySelector('.bg-brand-cyan')
      expect(fill).toBeInTheDocument()
    })

    it('uses purple color for training category', () => {
      const { container } = render(<ReadingProgress category="training" />)

      const fill = container.querySelector('.bg-brand-purple')
      expect(fill).toBeInTheDocument()
    })

    it('uses blue color for dual-life category', () => {
      const { container } = render(<ReadingProgress category="dual-life" />)

      const fill = container.querySelector('.bg-brand-blue')
      expect(fill).toBeInTheDocument()
    })

    it('uses cyan color for underground category', () => {
      const { container } = render(<ReadingProgress category="underground" />)

      const fill = container.querySelector('.bg-brand-cyan')
      expect(fill).toBeInTheDocument()
    })
  })

  describe('Fill bar', () => {
    it('renders fill element with transition classes', () => {
      const { container } = render(<ReadingProgress />)

      const fill = container.querySelector('.transition-all')
      expect(fill).toBeInTheDocument()
      expect(fill).toHaveClass('duration-150')
    })

    it('renders fill element with h-full', () => {
      const { container } = render(<ReadingProgress />)

      const fill = container.querySelector('.h-full')
      expect(fill).toBeInTheDocument()
    })

    it('sets initial width to 0%', () => {
      const { container } = render(<ReadingProgress />)

      const fill = container.querySelector('.h-full')
      expect(fill).toHaveStyle({ width: '0%' })
    })
  })

  describe('Custom className', () => {
    it('applies custom className to the container', () => {
      render(<ReadingProgress className="custom-class" />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('custom-class')
    })

    it('preserves base classes when custom className is added', () => {
      render(<ReadingProgress className="custom-class" />)

      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveClass('fixed')
      expect(progressbar).toHaveClass('top-0')
      expect(progressbar).toHaveClass('h-1')
      expect(progressbar).toHaveClass('custom-class')
    })
  })
})
