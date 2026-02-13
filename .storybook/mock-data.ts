import type { Post } from '../lib/blog-utils'

export const mockPost: Post = {
  slug: 'finding-tempo-in-the-mountains',
  title: 'Finding Tempo in the Mountains',
  excerpt:
    'A 3-hour climb through the Andes taught me more about pacing than any training plan. Here is what the mountains revealed about endurance and rhythm.',
  category: 'training',
  publishedAt: '2026-02-01',
  readTime: 8,
  bpm: 142,
  locale: 'en',
  featured: true,
  tags: ['running', 'altitude', 'pacing'],
}

export const mockPostDualLife: Post = {
  slug: 'berghain-to-brick-sessions',
  title: 'From Berghain to Brick Sessions',
  excerpt:
    'How underground techno nights and 5am swim sets coexist in the same life. The art of dual identity and finding balance.',
  category: 'dual-life',
  publishedAt: '2026-01-25',
  readTime: 6,
  bpm: 128,
  locale: 'en',
  tags: ['techno', 'swimming', 'lifestyle'],
}

export const mockPostUnderground: Post = {
  slug: 'the-warehouse-workout',
  title: 'The Warehouse Workout',
  excerpt:
    'When the DJ drops a relentless 140 BPM set, something shifts in your training mindset. Exploring the connection between electronic music and endurance.',
  category: 'underground',
  publishedAt: '2026-01-18',
  readTime: 5,
  bpm: 140,
  locale: 'en',
  tags: ['techno', 'training', 'mindset'],
}

export const mockPosts: Post[] = [
  mockPost,
  mockPostDualLife,
  mockPostUnderground,
  {
    slug: 'race-week-nutrition',
    title: 'Race Week Nutrition Guide',
    excerpt: 'Everything I eat in the final 7 days before a half ironman.',
    category: 'training',
    publishedAt: '2026-01-10',
    readTime: 10,
    locale: 'en',
    tags: ['nutrition', 'race-prep'],
  },
  {
    slug: 'vinyl-and-vo2max',
    title: 'Vinyl & VO2Max',
    excerpt: 'The unexpected parallels between collecting records and collecting miles.',
    category: 'dual-life',
    publishedAt: '2026-01-05',
    readTime: 4,
    bpm: 135,
    locale: 'en',
    tags: ['vinyl', 'running'],
  },
]
