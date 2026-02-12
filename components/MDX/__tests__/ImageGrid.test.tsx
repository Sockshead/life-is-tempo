import { render, screen } from '@testing-library/react'
import { ImageGrid } from '../ImageGrid'

const sampleImages = [
  { src: '/images/photo1.jpg', alt: 'First photo', caption: 'Caption one' },
  { src: '/images/photo2.jpg', alt: 'Second photo', caption: 'Caption two' },
  { src: '/images/photo3.jpg', alt: 'Third photo' },
]

describe('ImageGrid', () => {
  describe('Grid columns', () => {
    it('defaults to 2-column grid with grid-cols-1 sm:grid-cols-2 classes', () => {
      const { container } = render(
        <ImageGrid images={sampleImages.slice(0, 2)} />
      )

      const grid = container.firstElementChild
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
    })

    it('renders 3-column grid with grid-cols-1 sm:grid-cols-3 classes', () => {
      const { container } = render(
        <ImageGrid images={sampleImages} columns={3} />
      )

      const grid = container.firstElementChild
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-3')
    })
  })

  describe('Images', () => {
    it('renders correct number of images', () => {
      render(<ImageGrid images={sampleImages} />)

      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(3)
    })

    it('renders images with correct src and alt attributes', () => {
      render(<ImageGrid images={sampleImages} />)

      const firstImage = screen.getByAltText('First photo')
      expect(firstImage).toHaveAttribute('src', '/images/photo1.jpg')

      const secondImage = screen.getByAltText('Second photo')
      expect(secondImage).toHaveAttribute('src', '/images/photo2.jpg')
    })

    it('has loading="lazy" on images', () => {
      render(<ImageGrid images={sampleImages} />)

      const images = screen.getAllByRole('img')
      images.forEach((image) => {
        expect(image).toHaveAttribute('loading', 'lazy')
      })
    })

    it('has group-hover:scale-105 class on images', () => {
      render(<ImageGrid images={sampleImages} />)

      const images = screen.getAllByRole('img')
      images.forEach((image) => {
        expect(image).toHaveClass('group-hover:scale-105')
      })
    })
  })

  describe('Captions', () => {
    it('renders captions when provided', () => {
      render(<ImageGrid images={sampleImages} />)

      expect(screen.getByText('Caption one')).toBeInTheDocument()
      expect(screen.getByText('Caption two')).toBeInTheDocument()
    })

    it('does not render figcaption when caption is omitted', () => {
      const imagesWithoutCaptions = [
        { src: '/images/photo1.jpg', alt: 'Photo one' },
        { src: '/images/photo2.jpg', alt: 'Photo two' },
      ]

      const { container } = render(
        <ImageGrid images={imagesWithoutCaptions} />
      )

      const figcaptions = container.querySelectorAll('figcaption')
      expect(figcaptions).toHaveLength(0)
    })

    it('has font-mono and text-xs classes on captions', () => {
      render(<ImageGrid images={sampleImages} />)

      const caption = screen.getByText('Caption one')
      expect(caption).toHaveClass('font-mono')
      expect(caption).toHaveClass('text-xs')
    })
  })

  describe('Structure', () => {
    it('renders figure elements', () => {
      const { container } = render(<ImageGrid images={sampleImages} />)

      const figures = container.querySelectorAll('figure')
      expect(figures).toHaveLength(3)
    })
  })

  describe('Styling', () => {
    it('has my-8 and gap-4 classes on the grid', () => {
      const { container } = render(
        <ImageGrid images={sampleImages} />
      )

      const grid = container.firstElementChild
      expect(grid).toHaveClass('my-8')
      expect(grid).toHaveClass('gap-4')
    })
  })
})
