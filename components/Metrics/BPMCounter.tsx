'use client'

import { Heart } from 'lucide-react'
import { useCountUp } from './hooks/useCountUp'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/UI/Badge'

type BPMZone = 'low' | 'moderate' | 'high'

interface BPMCounterProps {
  /**
   * Beats per minute value
   */
  bpm: number
  /**
   * Heart rate zone classification
   * - low: < 120 BPM (recovery/easy)
   * - moderate: 120-140 BPM (aerobic)
   * - high: > 140 BPM (threshold/VO2max)
   */
  zone?: BPMZone
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Show zone badge
   */
  showZone?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

const zoneConfig: Record<BPMZone, { color: string; label: string; badgeVariant: 'blue' | 'cyan' | 'purple' }> = {
  low: {
    color: 'text-brand-blue',
    label: 'Recovery',
    badgeVariant: 'blue',
  },
  moderate: {
    color: 'text-brand-cyan',
    label: 'Aerobic',
    badgeVariant: 'cyan',
  },
  high: {
    color: 'text-brand-purple',
    label: 'Threshold',
    badgeVariant: 'purple',
  },
}

const sizeConfig = {
  sm: {
    value: 'text-3xl',
    icon: 20,
  },
  md: {
    value: 'text-5xl',
    icon: 28,
  },
  lg: {
    value: 'text-7xl',
    icon: 36,
  },
}

/**
 * Specialized BPM (beats per minute) display with heart icon and pulse animation
 * Pulse duration is synchronized to actual BPM value
 *
 * @example
 * // Low intensity zone
 * <BPMCounter bpm={110} zone="low" showZone />
 *
 * // Moderate intensity
 * <BPMCounter bpm={130} zone="moderate" />
 *
 * // High intensity threshold
 * <BPMCounter bpm={155} zone="high" size="lg" />
 */
export function BPMCounter({
  bpm,
  zone = 'moderate',
  size = 'md',
  showZone = true,
  className,
}: BPMCounterProps) {
  const [count, ref] = useCountUp(bpm, {
    duration: 2000,
    decimals: 0,
  })

  // Calculate pulse duration from BPM: 60 seconds / BPM * 2 (for full pulse cycle)
  const pulseDuration = (60 / bpm) * 2

  const config = zoneConfig[zone]
  const sizeStyle = sizeConfig[size]

  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-3', className)}
      aria-label={`Heart rate ${count} beats per minute, ${config.label} zone`}
    >
      {/* Label */}
      <div className="font-mono text-xs uppercase tracking-widest text-brand-cyan">
        HEART RATE
      </div>

      {/* BPM Display */}
      <div className="flex items-center gap-3">
        {/* Pulsing Heart Icon */}
        <Heart
          className={cn(
            'animate-pulse flex-shrink-0',
            config.color
          )}
          size={sizeStyle.icon}
          fill="currentColor"
          style={{
            animationDuration: `${pulseDuration}s`,
          }}
          aria-hidden="true"
        />

        {/* BPM Value */}
        <div className={cn('font-display', sizeStyle.value, config.color)}>
          {count}
          <span className="text-xl ml-1 opacity-70">BPM</span>
        </div>
      </div>

      {/* Zone Badge */}
      {showZone && (
        <div className="flex items-center gap-2">
          <Badge variant={config.badgeVariant} className="font-mono text-xs">
            {config.label.toUpperCase()}
          </Badge>
          <span className="font-mono text-xs text-gray-500">
            Zone
          </span>
        </div>
      )}
    </div>
  )
}
