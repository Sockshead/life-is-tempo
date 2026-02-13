# Sitemap - Route Inventory

All routes in the Life Is Tempo application, organized by status and purpose.

---

## Locales

| Locale | Code | URL Prefix |
|--------|------|------------|
| English (default) | `en` | `/en` |
| Spanish | `es` | `/es` |

The root path (`/`) redirects to the user's preferred locale based on browser settings.

---

## Production Routes

Routes that serve end-user content.

| Route Pattern | EN Path | ES Path | Description | Priority | Change Frequency |
|---------------|---------|---------|-------------|----------|------------------|
| `/[locale]` | `/en` | `/es` | Homepage | 1.0 | weekly |
| `/[locale]/blog/[slug]` | `/en/blog/[slug]` | `/es/blog/[slug]` | Individual blog post | 0.8 | monthly |

### Route Details

**Homepage** (`app/[locale]/page.tsx`)
- Main landing page with hero, featured content, and newsletter signup
- Fully implemented with internationalized content

**Blog Post** (`app/[locale]/blog/[slug]/`)
- Dynamic route for individual blog posts (MDX content)
- Includes error boundary (`error.tsx`) with static error message
- No blog content published yet; route structure is ready

---

## Development/Test Routes

Routes used for testing during development. Exclude from production sitemap generation.

| Route Pattern | Path | Description |
|---------------|------|-------------|
| `/[locale]/test/components` | `/en/test/components` | Component rendering tests |
| `/[locale]/test/design-system` | `/en/test/design-system` | Design system visual tests |
| `/[locale]/test-metrics` | `/en/test-metrics` | Metrics display tests |

---

## Planned Routes (Not Yet Implemented)

Routes defined in `i18n/routing.ts` pathnames but without corresponding `page.tsx` files.

| Route Pattern | EN Path | ES Path | Priority | Change Frequency |
|---------------|---------|---------|----------|------------------|
| `/[locale]/about` | `/en/about` | `/es/acerca` | 0.8 | monthly |
| `/[locale]/training` | `/en/training` | `/es/training` | 0.7 | weekly |
| `/[locale]/dual-life` | `/en/dual-life` | `/es/dual-life` | 0.7 | weekly |
| `/[locale]/underground` | `/en/underground` | `/es/underground` | 0.7 | weekly |

Additional routes to consider:

| Route | Description | Priority | Change Frequency |
|-------|-------------|----------|------------------|
| `/[locale]/blog` | Blog index with post listing and category filters | 0.9 | daily |
| `/[locale]/contact` | Contact form | 0.5 | yearly |

---

## Implementing `app/sitemap.ts`

When ready to generate an XML sitemap for search engines, create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

const BASE_URL = 'https://lifeistempo.com'
const LOCALES = ['en', 'es'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    // Add more static pages here
  ]

  for (const locale of LOCALES) {
    for (const page of staticPages) {
      routes.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    }
  }

  // Dynamic blog posts (when MDX content is available)
  // const posts = await getBlogPosts()
  // for (const post of posts) {
  //   for (const locale of LOCALES) {
  //     routes.push({
  //       url: `${BASE_URL}/${locale}/blog/${post.slug}`,
  //       lastModified: post.updatedAt,
  //       changeFrequency: 'monthly',
  //       priority: 0.8,
  //     })
  //   }
  // }

  return routes
}
```

### Notes

- Place `sitemap.ts` at `app/sitemap.ts` (outside `[locale]` segment)
- Next.js automatically serves it at `/sitemap.xml`
- Update the static pages list as new routes are added
- Uncomment the blog posts section once MDX content system is live
- Locale-specific path mappings (e.g., `/es/acerca`) should use the localized paths in the sitemap
