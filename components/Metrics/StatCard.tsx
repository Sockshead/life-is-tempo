'use client'

import { Card } from '@/components/UI/Card'
import { MetricDisplay } from './MetricDisplay'
import { cn } from '@/lib/utils'

interface StatMetric {
  value: number
  label: string
  unit?: string
  variant?: 'static' | 'counter' | 'pulse'
  color?: 'purple' | 'blue' | 'cyan' | 'white'
  icon?: React.ReactNode
}

interface StatCardProps {
  /**
   * Optional card title
   */
  title?: string
  /**
   * Optional card description
   */
  description?: string
  /**
   * Array of metrics to display
   */
  metrics: StatMetric[]
  /**
   * Number of columns in grid layout
   */
  columns?: 2 | 3 | 4
  /**
   * Enable glass morphism effect
   */
  glass?: boolean
  /**
   * Enable glow effect
   */
  glow?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

/**
 * Card layout for displaying grouped metrics in a grid
 *
 * @example
 * <StatCard
 *   title="Race Stats"
 *   description="2026 Ironman 70.3 Training Metrics"
 *   columns={3}
 *   glass
 *   glow
 *   metrics={[
 *     { value: 70.3, label: "DISTANCE", unit: "MI", variant: "counter" },
 *     { value: 1.9, label: "SWIM", unit: "K", variant: "static" },
 *     { value: 90, label: "BIKE", unit: "K", variant: "static" },
 *   ]}
 * />
 */
export function StatCard({
  title,
  description,
  metrics,
  columns = 3,
  glass = false,
  glow = false,
  className,
}: StatCardProps) {
  return (
    <Card
      glass={glass}
      glow={glow}
      className={cn('p-6 rounded-lg', className)}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-2xl text-white mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="font-mono text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Metrics Grid */}
      <div
        className={cn(
          'grid gap-6',
          columnClasses[columns]
        )}
      >
        {metrics.map((metric, index) => (
          <MetricDisplay
            key={`${metric.label}-${index}`}
            value={metric.value}
            label={metric.label}
            unit={metric.unit}
            variant={metric.variant}
            color={metric.color}
            icon={metric.icon}
          />
        ))}
      </div>
    </Card>
  )
}
