import { render, screen } from '@testing-library/react'
import { MetricDisplay } from '../MetricDisplay'

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver

describe('MetricDisplay', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<MetricDisplay value={100} label="TEST METRIC" />)

      expect(screen.getByText('TEST METRIC')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders with unit suffix', () => {
      render(<MetricDisplay value={70.3} label="DISTANCE" unit="MI" />)

      expect(screen.getByText('MI')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <MetricDisplay
          value={214}
          label="DAYS REMAINING"
          description="Until race day"
        />
      )

      expect(screen.getByText('Until race day')).toBeInTheDocument()
    })

    it('renders with icon', () => {
      const icon = <span data-testid="test-icon">🏃</span>
      render(<MetricDisplay value={10} label="RUNS" icon={icon} />)

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders static variant without animation', () => {
      render(<MetricDisplay value={100} label="STATIC" variant="static" />)

      // Should show value immediately
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders pulse variant with animation class', () => {
      render(
        <MetricDisplay value={165} label="PULSE" variant="pulse" />
      )

      const valueElement = screen.getByText('165')
      expect(valueElement).toHaveClass('animate-pulse')
    })

    it('renders progress variant with progress bar', () => {
      render(
        <MetricDisplay
          value={45}
          maxValue={70}
          label="PROGRESS"
          variant="progress"
        />
      )

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      expect(screen.getByText('64% Complete')).toBeInTheDocument()
    })

    it('calculates progress percentage correctly', () => {
      render(
        <MetricDisplay
          value={50}
          maxValue={200}
          label="PROGRESS"
          variant="progress"
        />
      )

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '25')
    })
  })

  describe('Colors', () => {
    it('applies purple color class', () => {
      render(<MetricDisplay value={100} label="PURPLE" color="purple" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-brand-purple')
    })

    it('applies blue color class', () => {
      render(<MetricDisplay value={100} label="BLUE" color="blue" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-brand-blue')
    })

    it('applies cyan color class', () => {
      render(<MetricDisplay value={100} label="CYAN" color="cyan" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-brand-cyan')
    })

    it('applies white color class by default', () => {
      render(<MetricDisplay value={100} label="DEFAULT" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-white')
    })
  })

  describe('Sizes', () => {
    it('applies small size class', () => {
      render(<MetricDisplay value={100} label="SMALL" size="sm" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-3xl')
    })

    it('applies medium size class by default', () => {
      render(<MetricDisplay value={100} label="MEDIUM" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-5xl')
    })

    it('applies large size class', () => {
      render(<MetricDisplay value={100} label="LARGE" size="lg" />)

      const valueElement = screen.getByText('100')
      expect(valueElement).toHaveClass('text-7xl')
    })
  })

  describe('Accessibility', () => {
    it('provides comprehensive aria-label', () => {
      const { container } = render(
        <MetricDisplay
          value={70.3}
          label="DISTANCE"
          unit="MI"
          description="Race distance"
        />
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveAttribute(
        'aria-label',
        'DISTANCE 70.3 MI Race distance'
      )
    })

    it('sets aria-live for counter variant', () => {
      const { container } = render(
        <MetricDisplay value={100} label="COUNTER" variant="counter" />
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveAttribute('aria-live', 'polite')
    })

    it('does not set aria-live for static variant', () => {
      const { container } = render(
        <MetricDisplay value={100} label="STATIC" variant="static" />
      )

      const element = container.firstChild as HTMLElement
      expect(element).not.toHaveAttribute('aria-live')
    })

    it('includes progress information in aria-label', () => {
      const { container } = render(
        <MetricDisplay
          value={45}
          maxValue={70}
          label="PROGRESS"
          variant="progress"
        />
      )

      const element = container.firstChild as HTMLElement
      const ariaLabel = element.getAttribute('aria-label')
      expect(ariaLabel).toContain('64% of 70')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero value', () => {
      render(<MetricDisplay value={0} label="ZERO" />)

      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles decimal values', () => {
      render(<MetricDisplay value={70.3} label="DECIMAL" />)

      // Counter variant should eventually show decimal
      expect(screen.getByText(/70/)).toBeInTheDocument()
    })

    it('handles large numbers', () => {
      render(<MetricDisplay value={999999} label="LARGE" />)

      expect(screen.getByText('999999')).toBeInTheDocument()
    })

    it('handles progress at 0%', () => {
      render(
        <MetricDisplay
          value={0}
          maxValue={100}
          label="PROGRESS"
          variant="progress"
        />
      )

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '0')
    })

    it('handles progress at 100%', () => {
      render(
        <MetricDisplay
          value={100}
          maxValue={100}
          label="PROGRESS"
          variant="progress"
        />
      )

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '100')
      expect(screen.getByText('100% Complete')).toBeInTheDocument()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <MetricDisplay value={100} label="CUSTOM" className="custom-class" />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})
