import { render, screen } from '@testing-library/react'
import { BPMIndicator } from '../BPMIndicator'

jest.mock('@/components/Metrics/BPMCounter', () => ({
  BPMCounter: ({
    bpm,
    size,
    showZone,
  }: {
    bpm: number
    size?: string
    showZone?: boolean
  }) => (
    <div
      data-testid="bpm-counter"
      data-bpm={bpm}
      data-size={size}
      data-show-zone={showZone}
    >
      {bpm}
    </div>
  ),
}))

describe('BPMIndicator', () => {
  describe('Default mode (inline=false)', () => {
    it('renders BPMCounter', () => {
      render(<BPMIndicator bpm={128} />)

      expect(screen.getByTestId('bpm-counter')).toBeInTheDocument()
    })

    it('passes bpm to BPMCounter', () => {
      render(<BPMIndicator bpm={140} />)

      const counter = screen.getByTestId('bpm-counter')
      expect(counter).toHaveAttribute('data-bpm', '140')
    })

    it('passes size="lg" to BPMCounter', () => {
      render(<BPMIndicator bpm={128} />)

      const counter = screen.getByTestId('bpm-counter')
      expect(counter).toHaveAttribute('data-size', 'lg')
    })

    it('passes showZone={false} to BPMCounter', () => {
      render(<BPMIndicator bpm={128} />)

      const counter = screen.getByTestId('bpm-counter')
      expect(counter).toHaveAttribute('data-show-zone', 'false')
    })

    it('renders label when provided', () => {
      render(<BPMIndicator bpm={128} label="Warm-up pace" />)

      expect(screen.getByText('Warm-up pace')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
      const { container } = render(<BPMIndicator bpm={128} />)

      const labelParagraphs = container.querySelectorAll('.font-mono.text-sm.text-gray-400')
      expect(labelParagraphs.length).toBe(0)
    })

    it('has glass and rounded-lg classes', () => {
      const { container } = render(<BPMIndicator bpm={128} />)

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('glass')
      expect(wrapper).toHaveClass('rounded-lg')
    })
  })

  describe('Inline mode', () => {
    it('renders span with BPM text', () => {
      render(<BPMIndicator bpm={130} inline />)

      expect(screen.getByText('130 BPM')).toBeInTheDocument()
    })

    it('has rounded-full class', () => {
      const { container } = render(<BPMIndicator bpm={130} inline />)

      const span = container.querySelector('span')
      expect(span).toHaveClass('rounded-full')
    })

    it('has font-mono and text-brand-purple classes', () => {
      const { container } = render(<BPMIndicator bpm={130} inline />)

      const span = container.querySelector('span')
      expect(span).toHaveClass('font-mono')
      expect(span).toHaveClass('text-brand-purple')
    })

    it('does not render BPMCounter', () => {
      render(<BPMIndicator bpm={130} inline />)

      expect(screen.queryByTestId('bpm-counter')).not.toBeInTheDocument()
    })
  })
})
