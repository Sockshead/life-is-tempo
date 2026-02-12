import { render, screen } from '@testing-library/react'
import { StatCard } from '../StatCard'

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver

describe('StatCard', () => {
  const mockMetrics = [
    { value: 70.3, label: 'DISTANCE', unit: 'MI', variant: 'counter' as const },
    { value: 1.9, label: 'SWIM', unit: 'K', variant: 'static' as const },
    { value: 90, label: 'BIKE', unit: 'K', variant: 'static' as const },
  ]

  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  describe('Rendering', () => {
    it('renders with metrics array', () => {
      render(<StatCard metrics={mockMetrics} />)

      expect(screen.getByText('DISTANCE')).toBeInTheDocument()
      expect(screen.getByText('SWIM')).toBeInTheDocument()
      expect(screen.getByText('BIKE')).toBeInTheDocument()
    })

    it('renders with title', () => {
      render(<StatCard title="Race Stats" metrics={mockMetrics} />)

      expect(screen.getByText('Race Stats')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <StatCard
          title="Race Stats"
          description="2026 Ironman 70.3 Training Metrics"
          metrics={mockMetrics}
        />
      )

      expect(screen.getByText('2026 Ironman 70.3 Training Metrics')).toBeInTheDocument()
    })

    it('renders without title and description', () => {
      const { container } = render(<StatCard metrics={mockMetrics} />)

      const header = container.querySelector('h3')
      expect(header).not.toBeInTheDocument()
    })
  })

  describe('Grid Layout', () => {
    it('applies 2-column grid classes', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} columns={2} />
      )

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
    })

    it('applies 3-column grid classes by default', () => {
      const { container } = render(<StatCard metrics={mockMetrics} />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('applies 4-column grid classes', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} columns={4} />
      )

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-4')
    })
  })

  describe('Card Props', () => {
    it('passes glass prop to Card component', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} glass />
      )

      // Card with glass prop should have specific class
      const card = container.firstChild
      expect(card).toHaveClass('glass')
    })

    it('passes glow prop to Card component', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} glow />
      )

      // Card with glow prop should have hover:box-glow class
      const card = container.firstChild
      expect(card).toHaveClass('hover:box-glow')
    })

    it('applies both glass and glow', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} glass glow />
      )

      const card = container.firstChild
      expect(card).toHaveClass('glass')
      expect(card).toHaveClass('hover:box-glow')
    })
  })

  describe('Metrics Rendering', () => {
    it('renders all metrics in array', () => {
      render(<StatCard metrics={mockMetrics} />)

      expect(screen.getByText('DISTANCE')).toBeInTheDocument()
      expect(screen.getByText('SWIM')).toBeInTheDocument()
      expect(screen.getByText('BIKE')).toBeInTheDocument()
    })

    it('renders metric values', () => {
      render(<StatCard metrics={mockMetrics} />)

      // Static metrics show immediately
      expect(screen.getByText('1.9')).toBeInTheDocument()
      expect(screen.getByText('90')).toBeInTheDocument()
      // Counter starts at 0 (will count up)
      expect(screen.getByLabelText(/DISTANCE/)).toBeInTheDocument()
    })

    it('renders metric units', () => {
      render(<StatCard metrics={mockMetrics} />)

      const miUnits = screen.getAllByText('MI')
      expect(miUnits).toHaveLength(1)

      const kUnits = screen.getAllByText('K')
      expect(kUnits).toHaveLength(2)
    })

    it('applies metric variants correctly', () => {
      const { container } = render(<StatCard metrics={mockMetrics} />)

      // Counter variant should have aria-live
      const elements = container.querySelectorAll('[aria-live="polite"]')
      expect(elements.length).toBeGreaterThan(0)
    })

    it('renders metrics with custom colors', () => {
      const coloredMetrics = [
        { value: 100, label: 'PURPLE', color: 'purple' as const },
        { value: 200, label: 'BLUE', color: 'blue' as const },
        { value: 300, label: 'CYAN', color: 'cyan' as const },
      ]

      render(<StatCard metrics={coloredMetrics} />)

      expect(screen.getByText(/100/)).toHaveClass('text-brand-purple')
      expect(screen.getByText(/200/)).toHaveClass('text-brand-blue')
      expect(screen.getByText(/300/)).toHaveClass('text-brand-cyan')
    })

    it('renders metrics with icons', () => {
      const metricsWithIcons = [
        {
          value: 100,
          label: 'WITH ICON',
          icon: <span data-testid="metric-icon">🏃</span>,
        },
      ]

      render(<StatCard metrics={metricsWithIcons} />)

      expect(screen.getByTestId('metric-icon')).toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('renders with empty metrics array', () => {
      const { container } = render(<StatCard metrics={[]} />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid?.children.length).toBe(0)
    })

    it('renders with single metric', () => {
      const singleMetric = [
        { value: 100, label: 'SINGLE' },
      ]

      render(<StatCard metrics={singleMetric} />)

      expect(screen.getByText('SINGLE')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })
  })

  describe('Typography', () => {
    it('applies display font to title', () => {
      render(<StatCard title="Race Stats" metrics={mockMetrics} />)

      const title = screen.getByText('Race Stats')
      expect(title).toHaveClass('font-display')
      expect(title).toHaveClass('text-2xl')
    })

    it('applies mono font to description', () => {
      render(
        <StatCard
          description="Training Metrics"
          metrics={mockMetrics}
        />
      )

      const description = screen.getByText('Training Metrics')
      expect(description).toHaveClass('font-mono')
      expect(description).toHaveClass('text-sm')
    })
  })

  describe('Spacing', () => {
    it('applies correct padding to card', () => {
      const { container } = render(<StatCard metrics={mockMetrics} />)

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('p-6')
    })

    it('applies correct gap between metrics', () => {
      const { container } = render(<StatCard metrics={mockMetrics} />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('gap-6')
    })

    it('applies correct margin below header', () => {
      const { container } = render(
        <StatCard title="Title" metrics={mockMetrics} />
      )

      // Select the header div containing title/description
      const header = container.querySelector('.mb-6')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('mb-6')
    })
  })

  describe('Custom className', () => {
    it('applies custom className to Card', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} className="custom-class" />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('preserves base classes when custom className is added', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} className="custom-class" />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('p-6')
      expect(card).toHaveClass('rounded-lg')
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('Responsive Behavior', () => {
    it('applies responsive grid classes for 2 columns', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} columns={2} />
      )

      const grid = container.querySelector('.grid')
      // Mobile: 1 column
      expect(grid).toHaveClass('grid-cols-1')
      // Small screens: 2 columns
      expect(grid).toHaveClass('sm:grid-cols-2')
    })

    it('applies responsive grid classes for 3 columns', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} columns={3} />
      )

      const grid = container.querySelector('.grid')
      // Mobile: 1 column
      expect(grid).toHaveClass('grid-cols-1')
      // Small screens: 2 columns
      expect(grid).toHaveClass('sm:grid-cols-2')
      // Large screens: 3 columns
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('applies responsive grid classes for 4 columns', () => {
      const { container } = render(
        <StatCard metrics={mockMetrics} columns={4} />
      )

      const grid = container.querySelector('.grid')
      // Mobile: 1 column
      expect(grid).toHaveClass('grid-cols-1')
      // Small screens: 2 columns
      expect(grid).toHaveClass('sm:grid-cols-2')
      // Large screens: 4 columns
      expect(grid).toHaveClass('lg:grid-cols-4')
    })
  })
})
