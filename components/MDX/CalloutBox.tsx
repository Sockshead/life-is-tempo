import { cn } from '@/lib/utils'

interface CalloutBoxProps {
  type?: 'info' | 'warning' | 'tip' | 'note'
  title?: string
  children: React.ReactNode
}

const calloutConfig: Record<
  string,
  { borderClass: string; titleClass: string; icon: string }
> = {
  info: {
    borderClass: 'border-brand-cyan',
    titleClass: 'text-brand-cyan',
    icon: 'i',
  },
  warning: {
    borderClass: 'border-yellow-500',
    titleClass: 'text-yellow-500',
    icon: '!',
  },
  tip: {
    borderClass: 'border-green-500',
    titleClass: 'text-green-500',
    icon: '*',
  },
  note: {
    borderClass: 'border-brand-purple',
    titleClass: 'text-brand-purple',
    icon: '#',
  },
}

/**
 * Styled callout box for MDX content.
 * Renders a glass container with a colored left border, icon, optional title, and children.
 */
export function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const config = calloutConfig[type]

  return (
    <div
      className={cn(
        'my-8 p-6 glass rounded-lg border-l-4',
        config.borderClass
      )}
      role="note"
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            'border font-mono font-bold text-sm',
            config.borderClass,
            config.titleClass
          )}
          aria-hidden="true"
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p
              className={cn(
                'font-display uppercase tracking-wide text-lg mb-2',
                config.titleClass
              )}
            >
              {title}
            </p>
          )}
          <div className="text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
