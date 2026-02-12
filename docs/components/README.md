# Component Catalog

**Last Updated**: 2026-02-11

---

## Overview

This directory catalogs all React components in Life Is Tempo. Components are organized by category (layout, UI, blog, forms) for easy discovery and maintenance.

**Current Status**: Components directory is empty. All UI is currently inline in page components (`app/[locale]/page.tsx`). Components will be extracted as patterns emerge (3+ uses).

---

## Component Organization

### Planned Directory Structure

```
components/
├── layout/          # Global layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── LanguageSwitcher.tsx
├── ui/              # Reusable UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Input.tsx
├── blog/            # Blog-specific components
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── CategoryFilter.tsx
│   └── TagList.tsx
├── forms/           # Form components
│   ├── NewsletterSignup.tsx
│   └── ContactForm.tsx
└── mdx/             # MDX custom components
    ├── Callout.tsx
    ├── StatsCard.tsx
    └── ImageGallery.tsx
```

---

## Component Documentation Template

Use this template when documenting new components:

```markdown
## [ComponentName]

**Purpose**: Brief description of what this component does

**Category**: layout | ui | blog | forms | mdx

**Location**: `components/[category]/ComponentName.tsx`

**Status**: ✅ Implemented | 🔄 Planned | 🚧 In Progress

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | string | - | Yes | Description |
| prop2 | number | 0 | No | Description |
| children | ReactNode | - | No | Description |

### Example Usage

\`\`\`typescript
import { ComponentName } from '@/components/[category]/ComponentName';

export default function Page() {
  return (
    <ComponentName
      prop1="value"
      prop2={42}
    >
      Children content
    </ComponentName>
  );
}
\`\`\`

### Variants

**Variant 1: Primary**
\`\`\`typescript
<ComponentName variant="primary" />
\`\`\`

**Variant 2: Secondary**
\`\`\`typescript
<ComponentName variant="secondary" />
\`\`\`

### Accessibility

- **ARIA Labels**: Describe ARIA attributes used
- **Keyboard Navigation**: Describe keyboard interactions
- **Screen Readers**: Describe screen reader support
- **Color Contrast**: WCAG compliance level (AA/AAA)

### Related Components

- [RelatedComponent1](#relatedcomponent1)
- [RelatedComponent2](#relatedcomponent2)

### Notes

- Performance considerations
- Browser compatibility notes
- Known limitations

---
```

---

## Planned Components

### Layout Components

#### Header

**Purpose**: Global site header with navigation and language switcher

**Status**: 🔄 Planned

**Features**:
- Logo/site title
- Main navigation links
- Language switcher (EN/ES)
- Responsive mobile menu

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| locale | 'en' \| 'es' | 'en' | Yes | Current language |
| pathname | string | - | Yes | Current page path |

**Example**:
```typescript
<Header locale="en" pathname="/about" />
```

#### Footer

**Purpose**: Global site footer with links and newsletter signup

**Status**: 🔄 Planned

**Features**:
- Social media links
- Site navigation
- Newsletter signup CTA
- Copyright notice

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| locale | 'en' \| 'es' | 'en' | Yes | Current language |

**Example**:
```typescript
<Footer locale="en" />
```

#### Navigation

**Purpose**: Main site navigation menu

**Status**: 🔄 Planned

**Features**:
- Link list with active state
- Responsive (desktop/mobile)
- Multi-language support

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| items | NavItem[] | - | Yes | Navigation items |
| pathname | string | - | Yes | Current path for active state |
| locale | 'en' \| 'es' | 'en' | Yes | Current language |

**Example**:
```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

<Navigation items={navItems} pathname="/about" locale="en" />
```

#### LanguageSwitcher

**Purpose**: Toggle between English and Spanish

**Status**: 🔄 Planned

**Features**:
- Current locale indicator
- Click to switch languages
- Preserves current page path

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| locale | 'en' \| 'es' | - | Yes | Current language |
| pathname | string | - | Yes | Current path |

**Example**:
```typescript
<LanguageSwitcher locale="en" pathname="/about" />
```

---

### UI Components

#### Button

**Purpose**: Reusable button component with variants

**Status**: 🔄 Planned

**Variants**:
- `primary` - Main action button (blue)
- `secondary` - Secondary action (gray)
- `danger` - Destructive action (red)
- `ghost` - Minimal styling

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | Button text/content |
| onClick | () => void | - | No | Click handler |
| variant | 'primary' \| 'secondary' \| 'danger' \| 'ghost' | 'primary' | No | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | No | Button size |
| disabled | boolean | false | No | Disabled state |
| type | 'button' \| 'submit' \| 'reset' | 'button' | No | HTML button type |

**Example**:
```typescript
<Button variant="primary" onClick={() => alert('Clicked')}>
  Click Me
</Button>
```

**Accessibility**:
- Keyboard accessible (Enter/Space to activate)
- Focus visible (outline)
- Disabled state announced to screen readers

#### Card

**Purpose**: Content container with consistent styling

**Status**: 🔄 Planned

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| title | string | - | No | Card title |
| children | ReactNode | - | Yes | Card content |
| image | string | - | No | Featured image URL |
| href | string | - | No | Makes card clickable/linked |

**Example**:
```typescript
<Card
  title="Training Week 1"
  image="/images/training.jpg"
  href="/posts/training-week-1"
>
  First week of training content...
</Card>
```

#### Badge

**Purpose**: Small label for categories, tags, status

**Status**: 🔄 Planned

**Variants**:
- `default` - Gray background
- `primary` - Blue background
- `success` - Green background
- `warning` - Yellow background
- `danger` - Red background

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | Badge text |
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' | 'default' | No | Visual style |

**Example**:
```typescript
<Badge variant="primary">Training</Badge>
<Badge variant="success">Published</Badge>
```

---

### Blog Components

#### PostCard

**Purpose**: Blog post preview card for listing pages

**Status**: 🔄 Planned

**Features**:
- Featured image
- Title and excerpt
- Category badge
- Read time
- Date
- Link to full post

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| title | string | - | Yes | Post title |
| excerpt | string | - | Yes | Post summary |
| image | string | - | No | Featured image URL |
| category | string | - | Yes | Post category |
| date | string | - | Yes | Publication date (ISO format) |
| readingTime | number | - | Yes | Minutes to read |
| href | string | - | Yes | Link to full post |
| locale | 'en' \| 'es' | 'en' | Yes | Language for formatting |

**Example**:
```typescript
<PostCard
  title="Training Week 1"
  excerpt="First week of structured training..."
  image="/images/posts/week-1.jpg"
  category="training-chronicles"
  date="2026-02-11"
  readingTime={5}
  href="/en/posts/training-week-1"
  locale="en"
/>
```

#### PostList

**Purpose**: Grid of post cards with filtering

**Status**: 🔄 Planned

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| posts | Post[] | - | Yes | Array of post data |
| category | string | - | No | Filter by category |
| tag | string | - | No | Filter by tag |
| locale | 'en' \| 'es' | 'en' | Yes | Language |

**Example**:
```typescript
<PostList
  posts={allPosts}
  category="training-chronicles"
  locale="en"
/>
```

---

### Form Components

#### NewsletterSignup

**Purpose**: Email capture form for newsletter

**Status**: 🔄 Planned

**Features**:
- Email input with validation
- Submit button
- Loading state
- Success/error messages
- Privacy disclaimer

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| locale | 'en' \| 'es' | 'en' | Yes | Language for text |
| inline | boolean | false | No | Compact inline layout |

**Example**:
```typescript
<NewsletterSignup locale="en" inline={false} />
```

**Accessibility**:
- Form labels properly associated with inputs
- Error messages announced to screen readers
- Keyboard navigable
- Focus management on submit

---

### MDX Components

#### Callout

**Purpose**: Highlighted content blocks (tips, warnings, info)

**Status**: 🔄 Planned

**Types**:
- `info` - Informational (blue)
- `tip` - Helpful tip (green)
- `warning` - Warning/caution (yellow)
- `danger` - Critical warning (red)

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| type | 'info' \| 'tip' \| 'warning' \| 'danger' | 'info' | No | Callout style |
| title | string | - | No | Callout title |
| children | ReactNode | - | Yes | Callout content |

**Example**:
```mdx
<Callout type="tip" title="Pro Tip">
  Start your long runs early to avoid the heat!
</Callout>
```

#### StatsCard

**Purpose**: Display training stats in organized grid

**Status**: 🔄 Planned

**Props**:
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| stats | Stat[] | - | Yes | Array of stat objects |

**Stat Object**:
| Property | Type | Description |
|----------|------|-------------|
| label | string | Stat label (e.g., "Distance") |
| value | string | Stat value (e.g., "21 km") |
| icon | ReactNode | Optional icon |

**Example**:
```mdx
<StatsCard
  stats={[
    { label: "Distance", value: "21 km" },
    { label: "Time", value: "1:45:30" },
    { label: "Pace", value: "5:00 /km" },
  ]}
/>
```

---

## Component Development Guidelines

### Creation Checklist

When creating a new component:

- [ ] Component extracted after 3+ uses of pattern
- [ ] TypeScript interface for props defined
- [ ] JSDoc comments added for complex props
- [ ] Default props specified where appropriate
- [ ] Accessibility attributes included (ARIA, keyboard support)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Both locales tested (English and Spanish)
- [ ] Documentation added to this file
- [ ] Example usage provided

### Code Style

**Component Structure**:
```typescript
import { ReactNode } from 'react';

interface ComponentProps {
  /** Description of prop */
  title: string;
  /** Description of prop */
  children: ReactNode;
  /** Description of prop */
  variant?: 'primary' | 'secondary';
}

/**
 * Component description
 *
 * @example
 * <Component title="Example" variant="primary">
 *   Content
 * </Component>
 */
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

**Naming Conventions**:
- Component files: PascalCase (`Button.tsx`)
- Component functions: PascalCase (`export function Button`)
- Props interfaces: ComponentNameProps (`ButtonProps`)
- CSS modules (if used): camelCase (`button.module.css`)

### Styling Guidelines

**Use Tailwind CSS**:
```typescript
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
```

**Conditional Classes**:
```typescript
<button
  className={`
    px-4 py-2 rounded-lg
    ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
  `}
>
  Button
</button>
```

**Responsive Design**:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

### Accessibility Requirements

**All components must**:
- ✅ Be keyboard navigable
- ✅ Have appropriate ARIA attributes
- ✅ Support screen readers
- ✅ Meet WCAG 2.1 AA color contrast (4.5:1)
- ✅ Have focus visible states
- ✅ Announce dynamic content changes

**Example**:
```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {children}
</button>
```

---

## Testing Components

### Manual Testing Checklist

For each component:

- [ ] Renders correctly in English
- [ ] Renders correctly in Spanish
- [ ] Responsive on mobile (375px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1280px width)
- [ ] All props work as expected
- [ ] Default props applied correctly
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA (check with browser tools)

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest, macOS and iOS)
- Edge (latest)

---

## Component Maintenance

### When to Refactor

Refactor components when:
- Used in 3+ different places with slight variations → Create variants
- Props become too numerous (> 7) → Split into smaller components
- Logic becomes complex → Extract custom hooks
- Styling is inconsistent → Establish design tokens

### Deprecation Process

When deprecating a component:

1. Mark as deprecated in documentation
2. Add JSDoc `@deprecated` tag
3. Provide migration path to new component
4. Remove after 2 release cycles (or when all uses replaced)

**Example**:
```typescript
/**
 * @deprecated Use `NewButton` instead. Will be removed in v2.0.0
 */
export function OldButton() {
  // ...
}
```

---

## Related Documentation

- [Getting Started Guide](../development/getting-started.md) - Development setup
- [System Architecture](../architecture/system-overview.md) - Component architecture overview

---

**Last Updated**: 2026-02-11

**Need Help?**
- Project Issues: https://github.com/juancmandev/life-is-tempo/issues
