import { cn } from '@/lib/utils'

type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface SectionProps {
  children: React.ReactNode
  py?: PaddingSize
  className?: string
  id?: string
}

const paddingStyles: Record<PaddingSize, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
  xl: 'py-32',
}

export function Section({ children, py = 'md', className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'max-w-7xl mx-auto px-6',
        paddingStyles[py],
        className
      )}
    >
      {children}
    </section>
  )
}
