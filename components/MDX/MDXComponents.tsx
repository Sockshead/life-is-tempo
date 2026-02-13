import { cn } from '@/lib/utils'
import { MetricBox } from './MetricBox'
import { BPMIndicator } from './BPMIndicator'
import { AudioEmbed } from './AudioEmbed'
import { StravaEmbed } from './StravaEmbed'
import { ImageGrid } from './ImageGrid'
import { CalloutBox } from './CalloutBox'

/**
 * Custom MDX component mappings.
 * Maps standard HTML elements to styled components and registers
 * custom components for use in MDX content.
 */
export const mdxComponents = {
  // Headings with auto-generated IDs for TOC linking
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof props.children === 'string'
        ? props.children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        : undefined
    return (
      <h1
        id={id}
        className={cn(
          'font-display text-4xl md:text-5xl uppercase tracking-wide',
          'text-white mt-12 mb-6 first:mt-0'
        )}
        {...props}
      />
    )
  },

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof props.children === 'string'
        ? props.children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        : undefined
    return (
      <h2
        id={id}
        className={cn(
          'font-display text-3xl md:text-4xl uppercase tracking-wide',
          'text-white mt-10 mb-4',
          'border-b border-gray-800 pb-3'
        )}
        {...props}
      />
    )
  },

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof props.children === 'string'
        ? props.children
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        : undefined
    return (
      <h3
        id={id}
        className={cn(
          'font-display text-2xl md:text-3xl uppercase tracking-wide',
          'text-white mt-8 mb-3'
        )}
        {...props}
      />
    )
  },

  // Paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg"
      {...props}
    />
  ),

  // Links - external links open in new tab
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal =
      typeof props.href === 'string' && props.href.startsWith('http')
    return (
      <a
        className={cn(
          'text-brand-cyan underline underline-offset-4',
          'decoration-brand-cyan/40 hover:decoration-brand-cyan',
          'transition-colors duration-200'
        )}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      />
    )
  },

  // Code - inline and block
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = props.className && props.className.includes('language-')
    if (isBlock) {
      return <code className={props.className} {...props} />
    }
    return (
      <code
        className={cn(
          'bg-gray-800 text-brand-cyan px-1.5 py-0.5 rounded',
          'font-mono text-sm border border-gray-700'
        )}
        {...props}
      />
    )
  },

  // Pre (code block wrapper)
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'my-8 p-4 bg-gray-900 rounded-lg overflow-x-auto',
        'border border-gray-800 font-mono text-sm leading-relaxed'
      )}
      {...props}
    />
  ),

  // Blockquote
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'my-8 pl-6 border-l-4 border-brand-purple',
        'text-gray-400 italic text-lg'
      )}
      {...props}
    />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 space-y-3 list-none pl-0" {...props} />
  ),

  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 space-y-3 list-decimal pl-6 marker:text-brand-cyan marker:font-mono"
      {...props}
    />
  ),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300 pl-6 relative" {...props}>
      <span
        className="absolute left-0 top-1.5 text-brand-cyan text-xs"
        aria-hidden="true"
      >
        &#9632;
      </span>
      {props.children}
    </li>
  ),

  // Custom components
  MetricBox,
  BPMIndicator,
  AudioEmbed,
  StravaEmbed,
  ImageGrid,
  CalloutBox,
}
