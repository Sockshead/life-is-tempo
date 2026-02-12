import { cn } from '@/lib/utils'

interface StravaEmbedProps {
  activityId: string
  title?: string
}

/**
 * Strava activity embed for MDX content.
 * Renders a Strava activity iframe inside a glass container with purple accent.
 */
export function StravaEmbed({ activityId, title }: StravaEmbedProps) {
  return (
    <div
      className={cn(
        'my-8 p-6 glass rounded-lg border-l-4 border-brand-purple'
      )}
    >
      {title && (
        <div className="mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan">
            Strava Activity
          </p>
          <p className="text-sm text-gray-300 mt-1">{title}</p>
        </div>
      )}
      <iframe
        src={`https://www.strava.com/activities/${activityId}/embed/${activityId}`}
        height="405"
        width="100%"
        scrolling="no"
        className="rounded-lg"
        title={title || `Strava activity ${activityId}`}
      />
    </div>
  )
}
