import { HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glow?: boolean
  glass?: boolean
  hover?: boolean
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, glow = false, glass = false, hover = true, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-lg p-6 transition-all duration-300'

    const backgroundStyles = glass
      ? 'glass'
      : 'bg-gray-900 border border-gray-800'

    const hoverStyles = hover
      ? 'hover:-translate-y-1 hover:shadow-2xl'
      : ''

    const glowStyles = glow ? 'hover:box-glow' : ''

    const combinedClassName = `${baseStyles} ${backgroundStyles} ${hoverStyles} ${glowStyles} ${className}`

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
