'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type ProgressVariant = 'linear' | 'circular'
type ProgressColor = 'purple' | 'blue' | 'cyan'

interface ProgressBarProps {
  /**
   * Progress value (0-100)
   */
  value: number
  /**
   * Display variant
   */
  variant?: ProgressVariant
  /**
   * Color theme
   */
  color?: ProgressColor
  /**
   * Size of the progress indicator
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Show percentage label
   */
  showLabel?: boolean
  /**
   * Enable glow effect
   */
  glow?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

const colorClasses: Record<ProgressColor, { bg: string; stroke: string }> = {
  purple: {
    bg: 'from-brand-purple to-brand-purple/50',
    stroke: 'stroke-brand-purple',
  },
  blue: {
    bg: 'from-brand-blue to-brand-blue/50',
    stroke: 'stroke-brand-blue',
  },
  cyan: {
    bg: 'from-brand-cyan to-brand-cyan/50',
    stroke: 'stroke-brand-cyan',
  },
}

const linearSizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const circularSizeConfig = {
  sm: { radius: 40, strokeWidth: 4, size: 100 },
  md: { radius: 60, strokeWidth: 6, size: 140 },
  lg: { radius: 80, strokeWidth: 8, size: 180 },
}

/**
 * Linear progress bar component with animated fill
 */
function LinearProgress({
  value,
  color,
  size,
  showLabel,
  glow,
  className,
}: Omit<ProgressBarProps, 'variant'> & Required<Pick<ProgressBarProps, 'color' | 'size'>>) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Animate width from 0 to value
    const timer = setTimeout(() => {
      setWidth(Math.min(Math.max(value, 0), 100))
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-gray-400">Progress</span>
          <span className="font-mono text-sm text-white">{Math.round(width)}%</span>
        </div>
      )}

      <div
        className={cn(
          'w-full bg-gray-900 rounded-full overflow-hidden',
          linearSizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            `bg-gradient-to-r ${colorClasses[color].bg}`,
            glow && 'shadow-glow'
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Circular progress indicator with SVG stroke animation
 */
function CircularProgress({
  value,
  color,
  size,
  showLabel,
  className,
}: Omit<ProgressBarProps, 'variant' | 'glow'> & Required<Pick<ProgressBarProps, 'color' | 'size'>>) {
  const [offset, setOffset] = useState(0)
  const config = circularSizeConfig[size]
  const { radius, strokeWidth, size: svgSize } = config

  const circumference = 2 * Math.PI * radius
  const percentage = Math.min(Math.max(value, 0), 100)

  useEffect(() => {
    // Animate stroke offset from full circle to percentage
    const timer = setTimeout(() => {
      const newOffset = circumference - (percentage / 100) * circumference
      setOffset(newOffset)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage, circumference])

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={svgSize}
        height={svgSize}
        className="transform -rotate-90"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-900"
        />

        {/* Progress circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-out',
            colorClasses[color].stroke
          )}
        />
      </svg>

      {/* Center label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Animated progress indicator with linear and circular variants
 *
 * @example
 * // Linear progress bar
 * <ProgressBar value={75} variant="linear" color="purple" showLabel />
 *
 * // Circular progress indicator
 * <ProgressBar value={60} variant="circular" color="cyan" size="lg" showLabel />
 *
 * // With glow effect
 * <ProgressBar value={85} variant="linear" glow />
 */
export function ProgressBar({
  value,
  variant = 'linear',
  color = 'cyan',
  size = 'md',
  showLabel = false,
  glow = false,
  className,
}: ProgressBarProps) {
  if (variant === 'circular') {
    return (
      <CircularProgress
        value={value}
        color={color}
        size={size}
        showLabel={showLabel}
        className={className}
      />
    )
  }

  return (
    <LinearProgress
      value={value}
      color={color}
      size={size}
      showLabel={showLabel}
      glow={glow}
      className={className}
    />
  )
}
