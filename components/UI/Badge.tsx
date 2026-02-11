import { HTMLAttributes, forwardRef } from 'react'

export type BadgeVariant = 'purple' | 'blue' | 'cyan'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  onRemove?: () => void
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  purple: 'bg-brand-purple/20 text-brand-purple border-brand-purple/30',
  blue: 'bg-brand-blue/20 text-brand-blue border-brand-blue/30',
  cyan: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'purple',
      size = 'md',
      dot = false,
      onRemove,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center gap-1.5 font-mono uppercase rounded-full border transition-all duration-200'

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    return (
      <span ref={ref} className={combinedClassName} {...props}>
        {dot && (
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              variant === 'purple'
                ? 'bg-brand-purple'
                : variant === 'blue'
                  ? 'bg-brand-blue'
                  : 'bg-brand-cyan'
            }`}
            aria-hidden="true"
          />
        )}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-brand-cyan rounded"
            aria-label={`Remove ${children}`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Category mapping helper (for blog categories)
export const categoryBadgeVariant: Record<string, BadgeVariant> = {
  'training': 'purple',
  'dual-life': 'blue',
  'underground': 'cyan',
  'training-chronicles': 'purple',
  'dual-life-tactics': 'blue',
  'underground-endurance': 'cyan',
}
