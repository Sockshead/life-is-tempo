import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  excerpt: z.string().optional(),
  category: z.enum(['training', 'dual-life', 'underground']),
  locale: z.enum(['en', 'es']),
  published: z.boolean().default(true),
  coverImage: z.string().optional(),
  bpm: z.number().int().positive().optional(),
  readTime: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
})

export type PostFrontmatter = z.infer<typeof postSchema>
