# Component Catalog

**Last Updated**: 2026-02-12

---

## Overview

Life Is Tempo includes **32 React components** across 5 categories, with **637 tests** across 25 test suites providing comprehensive coverage.

---

## Components by Category

### Blog Components (7)

| Component | Description | Tests |
|-----------|-------------|-------|
| `CategoryFilter` | Filter posts by category with active state | 24 |
| `CategoryPageContent` | Full category page layout with filtered posts | - |
| `FeaturedPost` | Hero-style featured post card | 28 |
| `PostCard` | Blog post preview card with image, excerpt, metadata | 30 |
| `ReadingProgress` | Scroll-based reading progress bar | 24 |
| `RelatedPosts` | Grid of related posts based on category/tags | 22 |
| `TableOfContents` | Auto-generated table of contents from headings | 22 |

### Layout Components (7)

| Component | Description | Tests |
|-----------|-------------|-------|
| `Footer` | Global site footer with links and branding | 33 |
| `Header` | Global header with navigation and language switcher | 26 |
| `LanguageSwitcher` | Toggle between English and Spanish | 24 |
| `MobileMenu` | Responsive mobile navigation menu | 30 |
| `Navigation` | Main site navigation with active states | 22 |
| `PageLayout` | Page wrapper with consistent padding/max-width | 22 |
| `Section` | Reusable content section with heading | 21 |

### MDX Components (8)

| Component | Description | Tests |
|-----------|-------------|-------|
| `AudioEmbed` | Embedded audio player (Spotify, SoundCloud) | 18 |
| `BPMIndicator` | Animated BPM display for music references | 14 |
| `CalloutBox` | Highlighted content blocks (info, tip, warning, danger) | 24 |
| `ImageGrid` | Responsive image gallery grid | 17 |
| `MDXComponents` | Custom MDX component mappings for rendering | 41 |
| `MDXLayout` | Layout wrapper for MDX blog posts | 27 |
| `MetricBox` | Display training/performance metrics | 15 |
| `StravaEmbed` | Embedded Strava activity widget | 16 |

### Metrics Components (4)

| Component | Description | Tests |
|-----------|-------------|-------|
| `BPMCounter` | Animated beats-per-minute counter | 27 |
| `MetricDisplay` | Generic metric display with label and value | 33 |
| `ProgressBar` | Animated progress bar with customizable colors | 39 |
| `StatCard` | Statistics card with icon, value, and trend | 38 |

### UI Components (6)

| Component | Description | Tests |
|-----------|-------------|-------|
| `Badge` | Small label for categories, tags, status | - |
| `Button` | Reusable button with variants (primary, secondary, ghost) | - |
| `Card` | Content container with consistent styling | - |
| `Input` | Form input with label and validation | - |
| `Skeleton` | Loading placeholder with animation | - |
| `Toast` | Notification toast messages | - |

> UI components do not have tests yet.

---

## Directory Structure

```
components/
├── Blog/
│   ├── __tests__/              # 6 test files
│   ├── CategoryFilter.tsx
│   ├── CategoryPageContent.tsx
│   ├── FeaturedPost.tsx
│   ├── PostCard.tsx
│   ├── ReadingProgress.tsx
│   ├── RelatedPosts.tsx
│   └── TableOfContents.tsx
├── Layout/
│   ├── __tests__/              # 7 test files
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   ├── MobileMenu.tsx
│   ├── Navigation.tsx
│   ├── PageLayout.tsx
│   └── Section.tsx
├── MDX/
│   ├── __tests__/              # 8 test files
│   ├── AudioEmbed.tsx
│   ├── BPMIndicator.tsx
│   ├── CalloutBox.tsx
│   ├── ImageGrid.tsx
│   ├── MDXComponents.tsx
│   ├── MDXLayout.tsx
│   ├── MetricBox.tsx
│   └── StravaEmbed.tsx
├── Metrics/
│   ├── __tests__/              # 4 test files
│   ├── BPMCounter.tsx
│   ├── MetricDisplay.tsx
│   ├── ProgressBar.tsx
│   └── StatCard.tsx
└── UI/
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── Input.tsx
    ├── Skeleton.tsx
    └── Toast.tsx
```

---

## Testing

**Framework**: Jest 30.2.0 + Testing Library 16.3.2

**Coverage Threshold**: 80% (branches, functions, lines, statements)

**Running Tests**:
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage report
```

---

## Component Guidelines

### Code Style

```typescript
import { ReactNode } from 'react';

interface ComponentProps {
  title: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Component({
  title,
  children,
  variant = 'primary',
}: ComponentProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

### Naming Conventions

- Component files: PascalCase (`PostCard.tsx`)
- Component functions: PascalCase (`export function PostCard`)
- Props interfaces: `ComponentNameProps` (`PostCardProps`)
- Test files: `__tests__/ComponentName.test.tsx`

### When to Extract New Components

- Pattern repeats 3+ times
- Props exceed 7 (split into smaller components)
- Logic becomes complex (extract custom hooks)

---

## Related Documentation

- [Getting Started](../development/getting-started.md)
- [System Architecture](../architecture/system-overview.md)

---

**Last Updated**: 2026-02-12

**Issues**: https://github.com/Sockshead/life-is-tempo/issues
