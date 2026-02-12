'use client'

import { BPMCounter } from '@/components/Metrics/BPMCounter'
import { cn } from '@/lib/utils'

interface BPMIndicatorProps {
  bpm: number
  label?: string
  inline?: boolean
}

/**
 * BPM display for MDX content.
 * Inline mode renders a compact badge-like element.
 * Block mode renders the full BPMCounter in a glass container.
 */
export function BPMIndicator({
  bpm,
  label,
  inline = false,
}: BPMIndicatorProps) {
  if (inline) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1',
          'bg-brand-purple/20 rounded-full',
          'font-mono text-sm text-brand-purple'
        )}
      >
        {bpm} BPM
      </span>
    )
  }

  return (
    <div className={cn('my-8 p-6 glass rounded-lg text-center')}>
      <BPMCounter bpm={bpm} size="lg" showZone={false} />
      {label && (
        <p className="mt-4 font-mono text-sm text-gray-400">{label}</p>
      )}
    </div>
  )
}
