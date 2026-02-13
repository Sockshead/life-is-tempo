'use client'

import { useTranslations } from 'next-intl'
import type { Post } from '@/lib/blog-utils'
import { PostCard } from './PostCard'

interface CategoryPageContentProps {
  posts: Post[]
  categoryKey: string
  locale: string
}

export function CategoryPageContent({
  posts,
  categoryKey,
  locale,
}: CategoryPageContentProps) {
  const t = useTranslations('blog')
  const categoryName = t(`categories.${categoryKey}`)

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-5xl md:text-7xl uppercase gradient-text mb-6">
          {categoryName}
        </h1>
        <p className="font-mono text-gray-400 text-lg">{t('noPosts')}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-5xl md:text-7xl uppercase gradient-text mb-10">
        {categoryName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
