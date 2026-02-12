'use client'

import { MetricDisplay } from '@/components/Metrics/MetricDisplay'
import { cn } from '@/lib/utils'

interface MetricBoxProps {
  value: number
  label: string
  description?: string
  unit?: string
  color?: 'purple' | 'blue' | 'cyan'
  variant?: 'static' | 'counter' | 'pulse'
}

/**
 * MDX-friendly wrapper around MetricDisplay.
 * Renders the metric inside a glass container with a cyan left border.
 */
export function MetricBox({
  value,
  label,
  description,
  unit,
  color = 'cyan',
  variant = 'static',
}: MetricBoxProps) {
  return (
    <div
      className={cn(
        'my-8 p-6 glass rounded-lg border-l-4 border-brand-cyan'
      )}
    >
      <MetricDisplay
        value={value}
        label={label}
        description={description}
        unit={unit}
        color={color}
        variant={variant}
      />
    </div>
  )
}
