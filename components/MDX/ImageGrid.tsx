import { cn } from '@/lib/utils'

interface ImageGridImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGridProps {
  images: ImageGridImage[]
  columns?: 2 | 3
}

const gridClasses: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
}

/**
 * Responsive image grid for MDX content.
 * Supports 2 or 3 column layouts with optional captions.
 * Uses <img> instead of next/image since MDX images may be external URLs.
 */
export function ImageGrid({ images, columns = 2 }: ImageGridProps) {
  return (
    <div className={cn('my-8 grid gap-4', gridClasses[columns])}>
      {images.map((image, index) => (
        <figure key={index} className="group overflow-hidden rounded-lg">
          <div className="overflow-hidden rounded-lg bg-gray-900">
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'w-full h-auto object-cover',
                'transition-transform duration-300',
                'group-hover:scale-105'
              )}
              loading="lazy"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-2 text-center font-mono text-xs text-gray-500">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
