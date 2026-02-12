'use client'

import { useCountUp } from './hooks/useCountUp'
import { cn } from '@/lib/utils'

type MetricVariant = 'static' | 'counter' | 'pulse' | 'progress'
type MetricColor = 'purple' | 'blue' | 'cyan' | 'white'
type MetricSize = 'sm' | 'md' | 'lg'

interface MetricDisplayProps {
  /**
   * Numeric value to display
   */
  value: number
  /**
   * Label text shown above the value
   */
  label: string
  /**
   * Optional description shown below the value
   */
  description?: string
  /**
   * Optional unit suffix (e.g., "MI", "BPM", "K")
   */
  unit?: string
  /**
   * Display variant
   * - static: No animation
   * - counter: Count-up animation on viewport entry
   * - pulse: Continuous pulse animation
   * - progress: Shows progress bar below
   */
  variant?: MetricVariant
  /**
   * Color theme for the value
   */
  color?: MetricColor
  /**
   * Size of the value display
   */
  size?: MetricSize
  /**
   * Optional icon element to display
   */
  icon?: React.ReactNode
  /**
   * Maximum value for progress variant (calculates percentage)
   */
  maxValue?: number
  /**
   * Additional CSS classes
   */
  className?: string
}

const sizeClasses: Record<MetricSize, string> = {
  sm: 'text-3xl',
  md: 'text-5xl',
  lg: 'text-7xl',
}

const colorClasses: Record<MetricColor, string> = {
  purple: 'text-brand-purple',
  blue: 'text-brand-blue',
  cyan: 'text-brand-cyan',
  white: 'text-white',
}

const gradientClasses: Record<MetricColor, string> = {
  purple: 'bg-gradient-to-r from-brand-purple to-brand-purple/50',
  blue: 'bg-gradient-to-r from-brand-blue to-brand-blue/50',
  cyan: 'bg-gradient-to-r from-brand-cyan to-brand-cyan/50',
  white: 'bg-gradient-to-r from-white to-white/50',
}

/**
 * Versatile metric display component with multiple visualization variants
 *
 * @example
 * // Static display
 * <MetricDisplay value={70.3} label="RACE DISTANCE" unit="MI" variant="static" />
 *
 * // Animated counter
 * <MetricDisplay value={214} label="DAYS REMAINING" variant="counter" color="cyan" />
 *
 * // Pulsing value
 * <MetricDisplay value={165} label="MAX HR" unit="BPM" variant="pulse" />
 *
 * // Progress indicator
 * <MetricDisplay value={45} maxValue={70} label="TRAINING PROGRESS" variant="progress" />
 */
export function MetricDisplay({
  value,
  label,
  description,
  unit,
  variant = 'static',
  color = 'white',
  size = 'md',
  icon,
  maxValue,
  className,
}: MetricDisplayProps) {
  const [count, ref] = useCountUp(value, {
    duration: 2000,
    decimals: value % 1 !== 0 ? 1 : 0,
    immediate: false,
  })

  const displayValue = variant === 'counter' ? count : value
  const percentage = maxValue ? Math.round((value / maxValue) * 100) : 0

  const ariaLabel = [
    label,
    displayValue,
    unit,
    description,
    variant === 'progress' && maxValue ? `${percentage}% of ${maxValue}` : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={variant === 'counter' ? ref : null}
      className={cn('flex flex-col', className)}
      aria-label={ariaLabel}
      aria-live={variant === 'counter' ? 'polite' : undefined}
    >
      {/* Label */}
      <div className="font-mono text-xs uppercase tracking-widest text-brand-cyan mb-2">
        {label}
      </div>

      {/* Value Container */}
      <div className="flex items-baseline gap-2">
        {icon && <div className="flex-shrink-0">{icon}</div>}

        <div
          className={cn(
            'font-display',
            sizeClasses[size],
            colorClasses[color],
            variant === 'pulse' && 'animate-pulse'
          )}
        >
          {displayValue}
          {unit && <span className="text-xl ml-1 opacity-70">{unit}</span>}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="font-mono text-sm text-gray-400 mt-2">
          {description}
        </div>
      )}

      {/* Progress Bar */}
      {variant === 'progress' && maxValue && (
        <div className="mt-4">
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000 ease-out',
                gradientClasses[color]
              )}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="text-xs font-mono text-gray-500 mt-1">
            {percentage}% Complete
          </div>
        </div>
      )}
    </div>
  )
}
