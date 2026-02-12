import { render, screen } from '@testing-library/react'
import { StravaEmbed } from '../StravaEmbed'

describe('StravaEmbed', () => {
  describe('Embed URL', () => {
    it('constructs correct Strava embed URL from activityId', () => {
      render(<StravaEmbed activityId="1234567890" />)

      const iframe = screen.getByTitle('Strava activity 1234567890')
      expect(iframe).toHaveAttribute(
        'src',
        'https://www.strava.com/activities/1234567890/embed/1234567890'
      )
    })

    it('iframe src matches expected pattern with different activityId', () => {
      render(<StravaEmbed activityId="9876543210" />)

      const iframe = screen.getByTitle('Strava activity 9876543210')
      expect(iframe).toHaveAttribute(
        'src',
        'https://www.strava.com/activities/9876543210/embed/9876543210'
      )
    })
  })

  describe('Title section', () => {
    it('renders title when provided', () => {
      render(<StravaEmbed activityId="123" title="Morning Run" />)

      expect(screen.getByText('Morning Run')).toBeInTheDocument()
    })

    it('does not render title section when title is omitted', () => {
      const { container } = render(<StravaEmbed activityId="123" />)

      const titleSection = container.querySelector('.mb-4')
      expect(titleSection).not.toBeInTheDocument()
    })

    it('shows "Strava Activity" label when title section is rendered', () => {
      render(<StravaEmbed activityId="123" title="Evening Ride" />)

      expect(screen.getByText('Strava Activity')).toBeInTheDocument()
    })
  })

  describe('iframe attributes', () => {
    it('has height="405" and width="100%"', () => {
      render(<StravaEmbed activityId="123" />)

      const iframe = screen.getByTitle('Strava activity 123')
      expect(iframe).toHaveAttribute('height', '405')
      expect(iframe).toHaveAttribute('width', '100%')
    })

    it('has scrolling="no"', () => {
      render(<StravaEmbed activityId="123" />)

      const iframe = screen.getByTitle('Strava activity 123')
      expect(iframe).toHaveAttribute('scrolling', 'no')
    })

    it('defaults title to "Strava activity {activityId}" when no title prop', () => {
      render(<StravaEmbed activityId="456789" />)

      expect(
        screen.getByTitle('Strava activity 456789')
      ).toBeInTheDocument()
    })

    it('uses title prop for iframe title when provided', () => {
      render(<StravaEmbed activityId="123" title="Half Marathon PR" />)

      expect(screen.getByTitle('Half Marathon PR')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has glass and rounded-lg classes', () => {
      const { container } = render(<StravaEmbed activityId="123" />)

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('glass')
      expect(wrapper).toHaveClass('rounded-lg')
    })

    it('has border-l-4 and border-brand-purple classes', () => {
      const { container } = render(<StravaEmbed activityId="123" />)

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('border-l-4')
      expect(wrapper).toHaveClass('border-brand-purple')
    })
  })
})
