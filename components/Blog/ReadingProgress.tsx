'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface ReadingProgressProps {
  category?: 'training' | 'dual-life' | 'underground'
  className?: string
}

const categoryColorClasses: Record<string, string> = {
  training: 'bg-brand-purple',
  'dual-life': 'bg-brand-blue',
  underground: 'bg-brand-cyan',
}

/**
 * Fixed-position reading progress bar at the top of the viewport.
 * Color matches the post category. Defaults to cyan when no category is provided.
 * Tracks scroll position relative to total document height.
 */
export function ReadingProgress({ category, className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollable = documentHeight - windowHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const raw = (scrollTop / scrollable) * 100
      setProgress(Math.min(100, Math.max(0, raw)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const colorClass = category
    ? categoryColorClasses[category] ?? 'bg-brand-cyan'
    : 'bg-brand-cyan'

  return (
    <div
      className={cn('fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50', className)}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn('h-full transition-all duration-150', colorClass)}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
