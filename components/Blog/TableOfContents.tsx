'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

export interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

/**
 * Sticky sidebar table of contents for blog post pages.
 * Tracks active heading via IntersectionObserver and provides smooth scroll navigation.
 * Level 3 headings are indented to reflect document hierarchy.
 */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    )

    for (const element of headingElements) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [items])

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (items.length === 0) {
    return null
  }

  return (
    <nav
      className={cn('sticky top-24', className)}
      aria-label="Table of contents"
    >
      <h2 className="font-display text-xl uppercase mb-4 text-gray-300">
        Table of Contents
      </h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                'text-left font-mono text-sm transition-colors duration-200 w-full',
                item.level === 3 && 'ml-4',
                activeId === item.id
                  ? 'text-brand-cyan font-bold'
                  : 'text-gray-400 hover:text-brand-cyan',
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
