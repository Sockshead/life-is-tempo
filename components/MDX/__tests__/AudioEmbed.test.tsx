import { render, screen } from '@testing-library/react'
import { AudioEmbed } from '../AudioEmbed'

describe('AudioEmbed', () => {
  describe('Spotify', () => {
    it('transforms Spotify URL to embed URL in iframe src', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const iframe = screen.getByTitle('spotify embed')
      expect(iframe).toHaveAttribute(
        'src',
        'https://open.spotify.com/embed/track/123'
      )
    })

    it('shows "Spotify" label when title is provided', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
          title="My Track"
        />
      )

      expect(screen.getByText('Spotify')).toBeInTheDocument()
    })
  })

  describe('SoundCloud', () => {
    it('passes SoundCloud URL through unchanged', () => {
      render(
        <AudioEmbed
          platform="soundcloud"
          url="https://soundcloud.com/artist/track"
        />
      )

      const iframe = screen.getByTitle('soundcloud embed')
      expect(iframe).toHaveAttribute(
        'src',
        'https://soundcloud.com/artist/track'
      )
    })

    it('shows "SoundCloud" label when title is provided', () => {
      render(
        <AudioEmbed
          platform="soundcloud"
          url="https://soundcloud.com/artist/track"
          title="My Mix"
        />
      )

      expect(screen.getByText('SoundCloud')).toBeInTheDocument()
    })
  })

  describe('Title', () => {
    it('renders title text when provided', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
          title="Awesome Track"
        />
      )

      expect(screen.getByText('Awesome Track')).toBeInTheDocument()
    })

    it('does not render title section when title is omitted', () => {
      const { container } = render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const titleSection = container.querySelector('.border-b.border-gray-800')
      expect(titleSection).not.toBeInTheDocument()
    })
  })

  describe('iframe attributes', () => {
    it('has loading="lazy"', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const iframe = screen.getByTitle('spotify embed')
      expect(iframe).toHaveAttribute('loading', 'lazy')
    })

    it('has correct allow attributes', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const iframe = screen.getByTitle('spotify embed')
      expect(iframe).toHaveAttribute(
        'allow',
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      )
    })

    it('defaults title to "{platform} embed" when no title prop', () => {
      render(
        <AudioEmbed
          platform="soundcloud"
          url="https://soundcloud.com/artist/track"
        />
      )

      expect(screen.getByTitle('soundcloud embed')).toBeInTheDocument()
    })

    it('uses title prop for iframe title when provided', () => {
      render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
          title="Custom Title"
        />
      )

      expect(screen.getByTitle('Custom Title')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has glass and rounded-lg classes', () => {
      const { container } = render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('glass')
      expect(wrapper).toHaveClass('rounded-lg')
    })

    it('has border border-gray-800 classes', () => {
      const { container } = render(
        <AudioEmbed
          platform="spotify"
          url="https://open.spotify.com/track/123"
        />
      )

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('border')
      expect(wrapper).toHaveClass('border-gray-800')
    })
  })
})
