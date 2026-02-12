import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadTime, generateExcerpt } from './blog-utils'
import { postSchema, type PostFrontmatter } from './schemas/post'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Check if a directory exists and is actually a directory.
 * Returns false if the path does not exist or is not a directory.
 */
function ensureDirectory(dirPath: string): boolean {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
  } catch {
    return false
  }
}

/**
 * Read and parse a single MDX post by slug and locale.
 * Validates frontmatter against the post schema.
 * Auto-generates readTime and excerpt if not provided.
 */
export function getPostBySlug(
  slug: string,
  locale: string
): { frontmatter: PostFrontmatter; content: string } {
  const filePath = path.join(postsDirectory, locale, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const validated = postSchema.parse({ ...data, slug, locale })

  if (!validated.readTime) {
    validated.readTime = calculateReadTime(content)
  }

  if (!validated.excerpt) {
    validated.excerpt = generateExcerpt(content)
  }

  return { frontmatter: validated, content }
}

/**
 * Get all posts for a given locale, sorted by date (newest first).
 * Returns an empty array if the locale directory does not exist.
 */
export function getAllPosts(
  locale: string
): Array<{ frontmatter: PostFrontmatter; content: string }> {
  const postsPath = path.join(postsDirectory, locale)

  if (!ensureDirectory(postsPath)) {
    return []
  }

  const filenames = fs.readdirSync(postsPath).filter((f) => f.endsWith('.mdx'))

  return filenames
    .map((f) => getPostBySlug(f.replace(/\.mdx$/, ''), locale))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

/**
 * Get all posts filtered by category for a given locale.
 */
export function getPostsByCategory(
  category: string,
  locale: string
): Array<{ frontmatter: PostFrontmatter; content: string }> {
  return getAllPosts(locale).filter(
    (p) => p.frontmatter.category === category
  )
}

/**
 * Get all post slugs for a given locale.
 * Useful for generateStaticParams in Next.js.
 * Returns an empty array if the locale directory does not exist.
 */
export function getPostSlugs(locale: string): string[] {
  const postsPath = path.join(postsDirectory, locale)

  if (!ensureDirectory(postsPath)) {
    return []
  }

  return fs
    .readdirSync(postsPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
