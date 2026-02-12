'use client'

import { cn } from '@/lib/utils'

export interface CategoryFilterProps {
  categories: Array<{
    id: string
    label: string
    color: 'purple' | 'blue' | 'cyan'
  }>
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  className?: string
}

const activeBgClasses: Record<string, string> = {
  purple: 'bg-brand-purple text-gray-950',
  blue: 'bg-brand-blue text-gray-950',
  cyan: 'bg-brand-cyan text-gray-950',
}

const hoverTextClasses: Record<string, string> = {
  purple: 'hover:text-brand-purple',
  blue: 'hover:text-brand-blue',
  cyan: 'hover:text-brand-cyan',
}

/**
 * Horizontal filter bar for blog categories.
 * Includes an "All" button and one button per category.
 * Scrolls horizontally on mobile.
 */
export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  const baseButton = 'px-6 py-2 rounded-full font-mono uppercase text-sm transition-all duration-200 whitespace-nowrap'

  return (
    <nav
      className={cn('flex gap-4 overflow-x-auto pb-2', className)}
      aria-label="Filter posts by category"
    >
      {/* All button */}
      <button
        type="button"
        onClick={() => onCategoryChange(null)}
        className={cn(
          baseButton,
          activeCategory === null
            ? 'bg-brand-cyan text-gray-950'
            : 'bg-gray-800 text-gray-400 hover:text-brand-cyan',
        )}
        aria-pressed={activeCategory === null}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => {
        const isActive = activeCategory === category.id
        const activeClass = activeBgClasses[category.color] ?? 'bg-brand-cyan text-gray-950'
        const hoverClass = hoverTextClasses[category.color] ?? 'hover:text-brand-cyan'

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              baseButton,
              isActive
                ? activeClass
                : cn('bg-gray-800 text-gray-400', hoverClass),
            )}
            aria-pressed={isActive}
          >
            {category.label}
          </button>
        )
      })}
    </nav>
  )
}
