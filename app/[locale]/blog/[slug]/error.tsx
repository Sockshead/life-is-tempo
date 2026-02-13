'use client'

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="font-display text-4xl uppercase text-brand-purple mb-4">
          Something went wrong
        </h2>
        <p className="font-mono text-sm text-gray-400 mb-6">
          {error.message || 'Failed to load this blog post. It may have been removed or contain a formatting error.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-mono text-sm rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
