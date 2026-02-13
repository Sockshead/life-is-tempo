import { HTMLAttributes, forwardRef } from 'react'

export type SkeletonVariant = 'text' | 'card' | 'image' | 'custom'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  rounded?: boolean
  className?: string
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  card: 'h-48 w-full rounded-lg',
  image: 'aspect-video w-full rounded-lg',
  custom: '',
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      rounded = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative overflow-hidden bg-gray-800'
    const shimmerStyles = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-700/50 before:to-transparent'

    const roundedClass = rounded ? 'rounded-lg' : ''
    const variantClass = variant !== 'custom' ? variantStyles[variant] : ''

    const combinedClassName = `${baseStyles} ${shimmerStyles} ${variantClass} ${roundedClass} ${className}`

    const computedStyle: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    }

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={computedStyle}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
