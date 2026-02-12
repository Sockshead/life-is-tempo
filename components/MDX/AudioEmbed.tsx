import { cn } from '@/lib/utils'

interface AudioEmbedProps {
  platform: 'spotify' | 'soundcloud'
  url: string
  title?: string
}

/**
 * Responsive audio embed for Spotify and SoundCloud.
 * Wraps the iframe in a glass container with appropriate aspect ratio.
 */
export function AudioEmbed({ platform, url, title }: AudioEmbedProps) {
  const embedUrl =
    platform === 'spotify'
      ? url.replace('open.spotify.com', 'open.spotify.com/embed')
      : url

  return (
    <div className={cn('my-8 glass rounded-lg overflow-hidden border border-gray-800')}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-800">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan">
            {platform === 'spotify' ? 'Spotify' : 'SoundCloud'}
          </p>
          <p className="text-sm text-gray-300 mt-1">{title}</p>
        </div>
      )}
      <div className="aspect-[21/9] md:aspect-video">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title={title || `${platform} embed`}
          className="border-0"
        />
      </div>
    </div>
  )
}
