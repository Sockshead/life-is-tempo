import { render, screen } from '@testing-library/react'
import { BPMCounter } from '../BPMCounter'

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver as any

describe('BPMCounter', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  describe('Rendering', () => {
    it('renders with BPM value', () => {
      render(<BPMCounter bpm={130} />)

      expect(screen.getByText('HEART RATE')).toBeInTheDocument()
      expect(screen.getByText(/130/)).toBeInTheDocument()
      expect(screen.getByText('BPM')).toBeInTheDocument()
    })

    it('renders heart icon', () => {
      const { container } = render(<BPMCounter bpm={130} />)

      // Lucide Heart icon should be present
      const heartIcon = container.querySelector('svg')
      expect(heartIcon).toBeInTheDocument()
    })

    it('shows zone badge by default', () => {
      render(<BPMCounter bpm={130} zone="moderate" />)

      expect(screen.getByText('AEROBIC')).toBeInTheDocument()
      expect(screen.getByText('Zone')).toBeInTheDocument()
    })

    it('hides zone badge when showZone is false', () => {
      render(<BPMCounter bpm={130} zone="moderate" showZone={false} />)

      expect(screen.queryByText('AEROBIC')).not.toBeInTheDocument()
      expect(screen.queryByText('Zone')).not.toBeInTheDocument()
    })
  })

  describe('Heart Rate Zones', () => {
    it('displays low zone correctly', () => {
      render(<BPMCounter bpm={110} zone="low" />)

      expect(screen.getByText('RECOVERY')).toBeInTheDocument()
      const bpmValue = screen.getByText(/110/)
      expect(bpmValue).toHaveClass('text-brand-blue')
    })

    it('displays moderate zone correctly', () => {
      render(<BPMCounter bpm={130} zone="moderate" />)

      expect(screen.getByText('AEROBIC')).toBeInTheDocument()
      const bpmValue = screen.getByText(/130/)
      expect(bpmValue).toHaveClass('text-brand-cyan')
    })

    it('displays high zone correctly', () => {
      render(<BPMCounter bpm={155} zone="high" />)

      expect(screen.getByText('THRESHOLD')).toBeInTheDocument()
      const bpmValue = screen.getByText(/155/)
      expect(bpmValue).toHaveClass('text-brand-purple')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<BPMCounter bpm={130} size="sm" />)

      const bpmValue = screen.getByText(/130/)
      expect(bpmValue).toHaveClass('text-3xl')
    })

    it('applies medium size classes by default', () => {
      render(<BPMCounter bpm={130} />)

      const bpmValue = screen.getByText(/130/)
      expect(bpmValue).toHaveClass('text-5xl')
    })

    it('applies large size classes', () => {
      render(<BPMCounter bpm={130} size="lg" />)

      const bpmValue = screen.getByText(/130/)
      expect(bpmValue).toHaveClass('text-7xl')
    })
  })

  describe('Pulse Animation', () => {
    it('calculates pulse duration from BPM', () => {
      const { container } = render(<BPMCounter bpm={120} />)

      const heartIcon = container.querySelector('svg')
      // At 120 BPM: duration = (60 / 120) * 2 = 1s
      expect(heartIcon).toHaveStyle({ animationDuration: '1s' })
    })

    it('calculates pulse duration for different BPM values', () => {
      const { container, rerender } = render(<BPMCounter bpm={60} />)

      let heartIcon = container.querySelector('svg')
      // At 60 BPM: duration = (60 / 60) * 2 = 2s
      expect(heartIcon).toHaveStyle({ animationDuration: '2s' })

      rerender(<BPMCounter bpm={150} />)
      heartIcon = container.querySelector('svg')
      // At 150 BPM: duration = (60 / 150) * 2 = 0.8s
      expect(heartIcon).toHaveStyle({ animationDuration: '0.8s' })
    })

    it('applies animate-pulse class to heart icon', () => {
      const { container } = render(<BPMCounter bpm={130} />)

      const heartIcon = container.querySelector('svg')
      expect(heartIcon).toHaveClass('animate-pulse')
    })
  })

  describe('Accessibility', () => {
    it('provides comprehensive aria-label', () => {
      const { container } = render(<BPMCounter bpm={130} zone="moderate" />)

      const element = container.firstChild as HTMLElement
      expect(element).toHaveAttribute(
        'aria-label',
        'Heart rate 130 beats per minute, Aerobic zone'
      )
    })

    it('hides heart icon from screen readers', () => {
      const { container } = render(<BPMCounter bpm={130} />)

      const heartIcon = container.querySelector('svg')
      expect(heartIcon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Edge Cases', () => {
    it('handles low BPM values', () => {
      render(<BPMCounter bpm={40} zone="low" />)

      expect(screen.getByText(/40/)).toBeInTheDocument()
    })

    it('handles high BPM values', () => {
      render(<BPMCounter bpm={200} zone="high" />)

      expect(screen.getByText(/200/)).toBeInTheDocument()
    })

    it('handles BPM value of 0', () => {
      render(<BPMCounter bpm={0} />)

      expect(screen.getByText(/0/)).toBeInTheDocument()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <BPMCounter bpm={130} className="custom-class" />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})
