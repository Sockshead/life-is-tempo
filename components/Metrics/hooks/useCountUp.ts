'use client'

import { useEffect, useRef, useState } from 'react'

export interface UseCountUpOptions {
  /**
   * Duration of the count-up animation in milliseconds
   * @default 2000
   */
  duration?: number
  /**
   * Number of decimal places to show
   * @default 0
   */
  decimals?: number
  /**
   * Whether to start animation immediately or wait for viewport visibility
   * @default false (waits for viewport)
   */
  immediate?: boolean
}

/**
 * Hook for animating number count-up with Intersection Observer support
 * Respects prefers-reduced-motion user preference
 *
 * @param end - Target value to count up to
 * @param options - Configuration options
 * @returns Tuple of [current value, ref to attach to element]
 *
 * @example
 * const [count, ref] = useCountUp(100, { duration: 2000, decimals: 1 })
 * return <div ref={ref}>{count}</div>
 */
export function useCountUp(
  end: number,
  options: UseCountUpOptions = {}
): [number, React.RefObject<HTMLDivElement | null>] {
  const { duration = 2000, decimals = 0, immediate = false } = options

  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(immediate)
  const ref = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | undefined>(undefined)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    // Set up Intersection Observer if not immediate
    if (!immediate && ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
              setHasStarted(true)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [end, immediate, hasStarted, prefersReducedMotion])

  useEffect(() => {
    // Only animate if started and not reduced motion
    if (!hasStarted || prefersReducedMotion) {
      if (prefersReducedMotion) {
        setCount(end)
      }
      return
    }

    const steps = 60 // 60 steps for smooth 60fps animation
    const stepDuration = duration / steps
    const increment = end / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++

      if (currentStep >= steps) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(prev => {
          const nextValue = increment * currentStep
          return Number(nextValue.toFixed(decimals))
        })
      }
    }, stepDuration)

    frameRef.current = timer as unknown as number

    return () => {
      if (frameRef.current) {
        clearInterval(frameRef.current)
      }
    }
  }, [hasStarted, end, duration, decimals, prefersReducedMotion])

  return [count, ref]
}
