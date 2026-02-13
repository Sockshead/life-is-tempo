# Life Is Tempo

A production-ready Next.js blog starter with i18n, MDX, a custom design system, and 637 tests out of the box.

[![Deployed on Vercel](https://img.shields.io/badge/deployed-vercel-black?logo=vercel)](https://lifeistempo.com)
[![Security Headers](https://img.shields.io/badge/security-hardened-green?logo=shield)](./SECURITY.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-637%20passing-brightgreen)](./docs/development/getting-started.md)

---

## What You Get

- **32 React components** across 5 categories (Blog, Layout, MDX, Metrics, UI)
- **637 tests** across 25 test suites with 80% coverage threshold
- **6 MDX blog posts** (3 English + 3 Spanish) as starter content
- **Full i18n** with next-intl (English/Spanish, localized routing)
- **Custom design system** with colors, typography, glassmorphism effects
- **Security headers** (CSP, HSTS, X-Frame-Options, and more)
- **CI/CD pipeline** with Vercel auto-deploy (develop = staging, master = production)
- **Vercel-ready** with zero configuration needed

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework (App Router) |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| next-intl | 4.8.2 | Multi-language support (EN/ES) |
| MDX | @next/mdx 3.1.1 | Markdown with JSX components |
| Jest | 30.2.0 | Testing framework |
| Testing Library | 16.3.2 | Component testing |
| Zod | 4.3.6 | Schema validation |
| gray-matter | latest | Frontmatter parsing |
| next-mdx-remote | latest | MDX rendering |
| lucide-react | latest | Icon library |
| @t3-oss/env-nextjs | 0.13.10 | Environment variable validation |

---

## Use as Template

```bash
# Clone
git clone https://github.com/Sockshead/life-is-tempo.git my-blog
cd my-blog

# Install
pnpm install

# Start developing
pnpm dev
```

### Customize

1. Replace content in `content/posts/en/` and `content/posts/es/` with your own MDX posts
2. Update `messages/en.json` and `messages/es.json` with your copy
3. Edit `app/[locale]/page.tsx` for your homepage
4. Swap colors in the design system (Tailwind config)
5. Configure your domain in Vercel

---

## Getting Started

### Prerequisites

- **Node.js** 18.17+ or 20.x LTS
- **pnpm** 8.0+
- **Git** 2.30+

### Install & Run

```bash
pnpm install
cp .env.example .env.local   # All variables optional for development
pnpm dev                      # http://localhost:3000
```

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Jest test suite |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm security-check` | Check for dependency vulnerabilities |

---

## Project Structure

```
life-is-tempo/
├── app/
│   └── [locale]/              # Multi-language routes (en/es)
│       ├── layout.tsx
│       ├── page.tsx
│       └── blog/              # Blog pages
├── components/
│   ├── Blog/                  # 7 components (PostCard, FeaturedPost, CategoryFilter, ...)
│   ├── Layout/                # 7 components (Header, Footer, Navigation, MobileMenu, ...)
│   ├── MDX/                   # 8 components (CalloutBox, AudioEmbed, StravaEmbed, ...)
│   ├── Metrics/               # 4 components (BPMCounter, StatCard, ProgressBar, ...)
│   └── UI/                    # 6 components (Button, Card, Badge, Input, Skeleton, Toast)
├── content/
│   └── posts/
│       ├── en/                # 3 English MDX posts
│       └── es/                # 3 Spanish MDX posts
├── lib/                       # Utilities (env validation, security, blog helpers)
├── messages/                  # i18n translations (en.json, es.json)
├── i18n/                      # next-intl routing and config
├── public/                    # Static assets
└── docs/                      # Architecture, deployment, and dev guides
```

---

## Components

| Category | Count | Components |
|----------|-------|------------|
| **Blog** | 7 | CategoryFilter, CategoryPageContent, FeaturedPost, PostCard, ReadingProgress, RelatedPosts, TableOfContents |
| **Layout** | 7 | Footer, Header, LanguageSwitcher, MobileMenu, Navigation, PageLayout, Section |
| **MDX** | 8 | AudioEmbed, BPMIndicator, CalloutBox, ImageGrid, MDXComponents, MDXLayout, MetricBox, StravaEmbed |
| **Metrics** | 4 | BPMCounter, MetricDisplay, ProgressBar, StatCard |
| **UI** | 6 | Badge, Button, Card, Input, Skeleton, Toast |

---

## Design System

- **Colors**: Custom palette with accent colors for training/techno themes
- **Typography**: System font stack with responsive sizing
- **Effects**: Glassmorphism, gradient overlays, animated BPM counters
- **Layout**: Responsive grid with mobile-first breakpoints
- **Dark mode**: Planned

---

## Deployment

This project deploys to Vercel with a promotion pipeline:

```
Feature Branch → PR to develop (preview URL) → develop (staging) → master (production)
```

- **Production**: https://lifeistempo.com (auto-deploys on merge to `master`)
- **Staging**: Auto-deploys on merge to `develop`
- **Preview**: Automatic per-PR deployments

No environment variables are required for basic deployment. See [Environment Variables](./docs/deployment/environment-variables.md) for optional configuration.

---

## Documentation

- [System Architecture](./docs/architecture/system-overview.md)
- [Security Architecture](./docs/architecture/security-architecture.md)
- [Architecture Diagrams](./docs/architecture/diagrams.md)
- [Vercel Deployment](./docs/deployment/vercel-deployment.md)
- [Environment Variables](./docs/deployment/environment-variables.md)
- [Getting Started](./docs/development/getting-started.md)
- [Content Authoring](./docs/development/content-authoring.md)
- [Internationalization](./docs/development/internationalization.md)
- [Component Catalog](./docs/components/README.md)

---

## Security

Security headers are applied globally via `next.config.ts`: CSP (production only), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.

See [SECURITY.md](./SECURITY.md) for the vulnerability reporting process.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the branch strategy, CI/CD workflow, and PR process.

---

## License

[MIT](./LICENSE)

---

Built by **Ultra Choko**
