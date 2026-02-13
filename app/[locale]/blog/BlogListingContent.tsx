'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { Post } from '@/lib/blog-utils'
import { getFeaturedPost, filterPostsByCategory } from '@/lib/blog-utils'
import { FeaturedPost } from '@/components/Blog/FeaturedPost'
import { PostCard } from '@/components/Blog/PostCard'
import { CategoryFilter } from '@/components/Blog/CategoryFilter'

interface BlogListingContentProps {
  posts: Post[]
  locale: string
}

const categories = [
  { id: 'training', label: 'Training Chronicles', color: 'purple' as const },
  { id: 'dual-life', label: 'Dual Life Tactics', color: 'blue' as const },
  { id: 'underground', label: 'Underground Endurance', color: 'cyan' as const },
]

export function BlogListingContent({ posts, locale }: BlogListingContentProps) {
  const t = useTranslations('blog')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const featured = getFeaturedPost(posts)
  const filteredPosts = filterPostsByCategory(posts, activeCategory)
  const nonFeaturedPosts = activeCategory
    ? filteredPosts
    : filteredPosts.filter((p) => p.slug !== featured?.slug)

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-5xl md:text-7xl uppercase gradient-text mb-6">
          {t('title')}
        </h1>
        <p className="font-mono text-gray-400 text-lg">{t('noPosts')}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-5xl md:text-7xl uppercase gradient-text mb-10">
        {t('title')}
      </h1>

      {/* Featured Post */}
      {featured && !activeCategory && (
        <div className="mb-12">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Category Filter */}
      <CategoryFilter
        categories={categories.map((c) => ({
          ...c,
          label: t(`categories.${c.id}`),
        }))}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        className="mb-10"
      />

      {/* Post Grid */}
      {nonFeaturedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonFeaturedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-gray-400 text-center py-12">
          {t('noPosts')}
        </p>
      )}
    </div>
  )
}
