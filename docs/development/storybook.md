# Storybook Guide

**Last Updated**: 2026-02-12

---

## Quick Start

```bash
# Run Storybook dev server
pnpm storybook          # Opens at http://localhost:6006

# Build static Storybook
pnpm build-storybook    # Output to storybook-static/
```

---

## Writing Stories

Stories use **CSF3 format** (Component Story Format 3) with the `@storybook/nextjs-vite` framework.

### Basic Template

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MyComponent } from './MyComponent'

const meta = {
  title: 'Category/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { /* props */ },
}
```

### Categories

Stories are organized by component category:
- `UI/*` — Button, Card, Badge, Input, Skeleton, Toast
- `Layout/*` — Header, Footer, Navigation, etc.
- `Blog/*` — PostCard, FeaturedPost, CategoryFilter, etc.
- `Metrics/*` — BPMCounter, MetricDisplay, ProgressBar, StatCard
- `MDX/*` — AudioEmbed, CalloutBox, ImageGrid, etc.

---

## next-intl Mocking

Components that use `next-intl` (Layout components) are mocked via Vite aliases in `.storybook/main.ts`:

- `next-intl` → `.storybook/mocks/next-intl.ts` (returns key as translation)
- `@/i18n/routing` → `.storybook/mocks/i18n-routing.tsx` (mock Link, usePathname, useRouter)

This mirrors the test mocking pattern used in Jest tests.

---

## Design Tokens in Storybook

Fonts are loaded via Google Fonts in `.storybook/preview-head.html`:
- **Bebas Neue** — Display/heading font
- **JetBrains Mono** — Body/monospace font

CSS variables are set in `:root` to match the app's `next/font` configuration.

Global styles (`app/globals.css`) are imported in `.storybook/preview.tsx`.

---

## MCP Addon

The `@storybook/addon-mcp` addon runs an MCP server within Storybook, enabling AI agents to interact with components. When Storybook is running, agents can retrieve story URLs and component documentation.

---

## Mock Data

Shared mock data for Blog stories is in `.storybook/mock-data.ts`:

```tsx
// Path is relative to story file location
import { mockPost, mockPosts } from '../../../.storybook/mock-data'
```

---

## Addons

| Addon | Purpose |
|-------|---------|
| `@storybook/addon-docs` | Auto-generated documentation from props |
| `@storybook/addon-a11y` | Accessibility violation detection |
| `@storybook/addon-mcp` | AI agent integration via MCP |
| `@chromatic-com/storybook` | Visual regression testing |
