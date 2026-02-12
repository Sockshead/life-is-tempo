import { render, screen, waitFor } from '@testing-library/react'
import { ProgressBar } from '../ProgressBar'

describe('ProgressBar', () => {
  describe('Linear Variant', () => {
    it('renders linear progress bar', () => {
      render(<ProgressBar value={75} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeInTheDocument()
    })

    it('displays correct percentage', async () => {
      render(<ProgressBar value={75} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      // Wait for animation to complete
      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '75')
        },
        { timeout: 1500 }
      )
    })

    it('shows label when showLabel is true', () => {
      render(<ProgressBar value={60} variant="linear" showLabel />)

      expect(screen.getByText('Progress')).toBeInTheDocument()
      // Progress starts at 0% and animates to 60%
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeInTheDocument()
    })

    it('hides label when showLabel is false', () => {
      render(<ProgressBar value={60} variant="linear" showLabel={false} />)

      expect(screen.queryByText('Progress')).not.toBeInTheDocument()
    })

    it('applies color classes correctly', () => {
      const { container } = render(
        <ProgressBar value={50} variant="linear" color="purple" />
      )

      const fillBar = container.querySelector('.bg-gradient-to-r')
      expect(fillBar).toHaveClass('from-brand-purple')
      expect(fillBar).toHaveClass('to-brand-purple/50')
    })

    it('applies glow effect when enabled', () => {
      const { container } = render(
        <ProgressBar value={50} variant="linear" glow />
      )

      const fillBar = container.querySelector('.bg-gradient-to-r')
      expect(fillBar).toHaveClass('shadow-glow')
    })

    it('applies size classes correctly', () => {
      const { container: smContainer } = render(
        <ProgressBar value={50} variant="linear" size="sm" />
      )
      const { container: mdContainer } = render(
        <ProgressBar value={50} variant="linear" size="md" />
      )
      const { container: lgContainer } = render(
        <ProgressBar value={50} variant="linear" size="lg" />
      )

      expect(smContainer.querySelector('.h-1')).toBeInTheDocument()
      expect(mdContainer.querySelector('.h-2')).toBeInTheDocument()
      expect(lgContainer.querySelector('.h-3')).toBeInTheDocument()
    })
  })

  describe('Circular Variant', () => {
    it('renders circular progress indicator', () => {
      render(<ProgressBar value={75} variant="circular" />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeInTheDocument()
    })

    it('displays correct percentage', async () => {
      render(<ProgressBar value={75} variant="circular" />)

      const progressBar = screen.getByRole('progressbar')

      // Wait for animation to complete
      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '75')
        },
        { timeout: 1500 }
      )
    })

    it('shows percentage label when showLabel is true', () => {
      render(<ProgressBar value={60} variant="circular" showLabel />)

      expect(screen.getByText('60%')).toBeInTheDocument()
    })

    it('hides label when showLabel is false', () => {
      render(<ProgressBar value={60} variant="circular" showLabel={false} />)

      expect(screen.queryByText('60%')).not.toBeInTheDocument()
    })

    it('renders SVG with correct size for small', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" size="sm" />
      )

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '100')
      expect(svg).toHaveAttribute('height', '100')
    })

    it('renders SVG with correct size for medium', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" size="md" />
      )

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '140')
      expect(svg).toHaveAttribute('height', '140')
    })

    it('renders SVG with correct size for large', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" size="lg" />
      )

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '180')
      expect(svg).toHaveAttribute('height', '180')
    })

    it('applies color to stroke', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" color="cyan" />
      )

      const progressCircle = container.querySelectorAll('circle')[1]
      expect(progressCircle).toHaveClass('stroke-brand-cyan')
    })

    it('renders two circles (background and progress)', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" />
      )

      const circles = container.querySelectorAll('circle')
      expect(circles).toHaveLength(2)
    })
  })

  describe('Edge Cases', () => {
    it('handles 0% progress', async () => {
      render(<ProgressBar value={0} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '0')
        },
        { timeout: 1500 }
      )
    })

    it('handles 100% progress', async () => {
      render(<ProgressBar value={100} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '100')
        },
        { timeout: 1500 }
      )
    })

    it('clamps negative values to 0', async () => {
      render(<ProgressBar value={-10} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '0')
        },
        { timeout: 1500 }
      )
    })

    it('clamps values over 100 to 100', async () => {
      render(<ProgressBar value={150} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '100')
        },
        { timeout: 1500 }
      )
    })
  })

  describe('Accessibility', () => {
    it('sets correct ARIA attributes', () => {
      render(<ProgressBar value={75} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuemin', '0')
      expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    })

    it('updates aria-valuenow as animation progresses', async () => {
      render(<ProgressBar value={80} variant="linear" />)

      const progressBar = screen.getByRole('progressbar')

      // Initial state might be 0
      // After animation, should be 80
      await waitFor(
        () => {
          expect(progressBar).toHaveAttribute('aria-valuenow', '80')
        },
        { timeout: 1500 }
      )
    })
  })

  describe('Animation', () => {
    it('applies transition class to linear progress', () => {
      const { container } = render(
        <ProgressBar value={50} variant="linear" />
      )

      const fillBar = container.querySelector('.bg-gradient-to-r')
      expect(fillBar).toHaveClass('transition-all')
      expect(fillBar).toHaveClass('duration-1000')
      expect(fillBar).toHaveClass('ease-out')
    })

    it('applies transition class to circular progress', () => {
      const { container } = render(
        <ProgressBar value={50} variant="circular" />
      )

      const progressCircle = container.querySelectorAll('circle')[1]
      expect(progressCircle).toHaveClass('transition-all')
      expect(progressCircle).toHaveClass('duration-1000')
      expect(progressCircle).toHaveClass('ease-out')
    })
  })

  describe('Custom className', () => {
    it('applies custom className to linear variant', () => {
      const { container } = render(
        <ProgressBar
          value={50}
          variant="linear"
          className="custom-class"
        />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('applies custom className to circular variant', () => {
      const { container } = render(
        <ProgressBar
          value={50}
          variant="circular"
          className="custom-class"
        />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })
  })

  describe('Default Props', () => {
    it('uses linear variant by default', () => {
      const { container } = render(<ProgressBar value={50} />)

      expect(container.querySelector('.bg-gray-900')).toBeInTheDocument()
    })

    it('uses cyan color by default', () => {
      const { container } = render(<ProgressBar value={50} variant="linear" />)

      const fillBar = container.querySelector('.bg-gradient-to-r')
      expect(fillBar).toHaveClass('from-brand-cyan')
    })

    it('uses medium size by default', () => {
      const { container } = render(<ProgressBar value={50} variant="linear" />)

      expect(container.querySelector('.h-2')).toBeInTheDocument()
    })

    it('does not show label by default', () => {
      render(<ProgressBar value={50} variant="linear" />)

      expect(screen.queryByText('Progress')).not.toBeInTheDocument()
    })

    it('does not apply glow by default', () => {
      const { container } = render(<ProgressBar value={50} variant="linear" />)

      const fillBar = container.querySelector('.bg-gradient-to-r')
      expect(fillBar).not.toHaveClass('shadow-glow')
    })
  })
})
