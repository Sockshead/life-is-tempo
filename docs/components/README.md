# Component Catalog

**Last Updated**: 2026-02-12

---

## Overview

Life Is Tempo has **32 React components** across 5 categories, with 637 tests across 25 test suites and Storybook documentation.

**Interactive docs**: Run `pnpm storybook` to browse components at `localhost:6006`.

---

## Component Inventory

### UI Components (6)

| Component | Props | Description |
|-----------|-------|-------------|
| **Button** | `variant`, `size`, `loading`, `disabled`, `href` | Polymorphic button/link with primary/secondary/ghost variants |
| **Card** | `glow`, `glass`, `hover` | Container with glass morphism, glow, and hover effects |
| **Badge** | `variant`, `size`, `dot`, `onRemove` | Label badges in purple/blue/cyan with optional dot and remove |
| **Input** | `type`, `label`, `error`, `success`, `helperText`, `maxLength` | Polymorphic input/textarea with validation states |
| **Skeleton** | `variant`, `width`, `height`, `rounded` | Loading placeholder with shimmer animation (text/card/image/custom) |
| **Toast** | `type`, `message`, `duration` | Context-based notifications (success/error/info/warning) via `useToast()` |

### Layout Components (7)

| Component | Props | Description |
|-----------|-------|-------------|
| **Header** | `locale` | Fixed header with scroll detection, nav, language switcher, mobile menu |
| **Footer** | `locale` | 3-column footer with social links, categories, copyright |
| **Navigation** | `locale`, `mobile`, `onLinkClick` | Nav items with active state detection (training/dual-life/underground) |
| **LanguageSwitcher** | `currentLocale` | EN/ES toggle preserving current path |
| **MobileMenu** | `isOpen`, `onClose`, `locale` | Slide-in drawer with overlay, ESC close, body scroll lock |
| **PageLayout** | `children`, `locale` | Header + main + Footer wrapper with skip-to-content link |
| **Section** | `children`, `py`, `id` | Responsive container with padding sizes (none/sm/md/lg/xl) |

### Blog Components (7)

| Component | Props | Description |
|-----------|-------|-------------|
| **PostCard** | `post`, `variant` | Blog card with default/featured/compact variants |
| **FeaturedPost** | `post` | Hero-style 16:9/21:9 post card with gradient cover |
| **CategoryFilter** | `categories`, `activeCategory`, `onCategoryChange` | Horizontal filter bar with category buttons |
| **CategoryPageContent** | `category`, `posts`, `locale` | Full category page layout with filtered posts |
| **ReadingProgress** | `category` | Fixed top progress bar colored by category |
| **RelatedPosts** | `currentPostSlug`, `category`, `posts`, `limit`, `locale` | Smart related posts (same category first, then recent) |
| **TableOfContents** | `items` | Sticky sidebar TOC with IntersectionObserver active tracking |

### Metrics Components (4)

| Component | Props | Description |
|-----------|-------|-------------|
| **BPMCounter** | `bpm`, `zone`, `size`, `showZone` | Pulsing heart icon synced to BPM with zone badges |
| **MetricDisplay** | `value`, `label`, `variant`, `color`, `size`, `icon`, `maxValue` | Animated metrics (static/counter/pulse/progress) |
| **ProgressBar** | `value`, `variant`, `color`, `size`, `showLabel`, `glow` | Linear and circular progress bars with gradient fill |
| **StatCard** | `title`, `description`, `metrics`, `columns`, `glass`, `glow` | Grid of MetricDisplay components in a Card |

### MDX Components (8)

| Component | Props | Description |
|-----------|-------|-------------|
| **AudioEmbed** | `platform`, `url`, `title` | Spotify/SoundCloud iframe embed |
| **BPMIndicator** | `bpm`, `label`, `inline` | Inline badge or block BPMCounter for MDX content |
| **CalloutBox** | `type`, `title`, `children` | Colored callout blocks (info/warning/tip/note) |
| **ImageGrid** | `images`, `columns` | 2 or 3 column image grid with hover zoom and captions |
| **MetricBox** | `value`, `label`, `description`, `unit`, `color`, `variant` | MDX wrapper around MetricDisplay |
| **StravaEmbed** | `activityId`, `title` | Strava activity iframe embed |

Additional MDX utilities (not standalone, no stories):
- **MDXComponents** — HTML element overrides for styled MDX rendering
- **MDXLayout** — Full blog post page layout with breadcrumbs, TOC, newsletter CTA

---

## Design Tokens

All components use the brand design system:

| Token | Value | Usage |
|-------|-------|-------|
| `brand-purple` | `#8B5CF6` | Training category, primary accents |
| `brand-blue` | `#3B82F6` | Dual-life category |
| `brand-cyan` | `#06B6D4` | Underground category, highlights |
| `brand-dark` | `#0a0a0a` | Background |

Fonts: **Bebas Neue** (display/headings), **JetBrains Mono** (body/mono).

---

## Related Documentation

- [Storybook Guide](../development/storybook.md) — Running and writing stories
- [System Architecture](../architecture/system-overview.md) — Component architecture overview
- [Getting Started](../development/getting-started.md) — Development setup

---

**Last Updated**: 2026-02-12

**Issues**: https://github.com/Sockshead/life-is-tempo/issues
