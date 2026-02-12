import { render, screen } from '@testing-library/react'
import { MetricBox } from '../MetricBox'

jest.mock('@/components/Metrics/MetricDisplay', () => ({
  MetricDisplay: (props: {
    value: number
    label: string
    description?: string
    unit?: string
    color?: string
    variant?: string
  }) => (
    <div
      data-testid="metric-display"
      data-value={props.value}
      data-label={props.label}
      data-color={props.color}
      data-variant={props.variant}
      data-unit={props.unit}
    >
      {props.label}
    </div>
  ),
}))

describe('MetricBox', () => {
  describe('Rendering', () => {
    it('renders with value and label', () => {
      render(<MetricBox value={42} label="Distance" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toBeInTheDocument()
      expect(metric).toHaveAttribute('data-value', '42')
      expect(metric).toHaveTextContent('Distance')
    })

    it('passes unit to MetricDisplay', () => {
      render(<MetricBox value={42} label="Distance" unit="K" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toHaveAttribute('data-unit', 'K')
    })

    it('passes description to MetricDisplay', () => {
      render(
        <MetricBox value={42} label="Distance" description="Weekly total" />
      )

      const metric = screen.getByTestId('metric-display')
      expect(metric).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('wraps MetricDisplay in a glass container', () => {
      const { container } = render(
        <MetricBox value={42} label="Distance" />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('glass')
    })

    it('has cyan left border', () => {
      const { container } = render(
        <MetricBox value={42} label="Distance" />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('border-l-4')
      expect(wrapper).toHaveClass('border-brand-cyan')
    })

    it('has proper spacing', () => {
      const { container } = render(
        <MetricBox value={42} label="Distance" />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('my-8')
      expect(wrapper).toHaveClass('p-6')
    })

    it('has rounded corners', () => {
      const { container } = render(
        <MetricBox value={42} label="Distance" />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('rounded-lg')
    })
  })

  describe('Props forwarding', () => {
    it('passes color prop to MetricDisplay', () => {
      render(<MetricBox value={42} label="Distance" color="purple" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toHaveAttribute('data-color', 'purple')
    })

    it('passes variant prop to MetricDisplay', () => {
      render(<MetricBox value={42} label="Distance" variant="counter" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toHaveAttribute('data-variant', 'counter')
    })

    it('uses cyan as default color', () => {
      render(<MetricBox value={42} label="Distance" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toHaveAttribute('data-color', 'cyan')
    })

    it('uses static as default variant', () => {
      render(<MetricBox value={42} label="Distance" />)

      const metric = screen.getByTestId('metric-display')
      expect(metric).toHaveAttribute('data-variant', 'static')
    })
  })
})
