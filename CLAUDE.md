# Life Is Tempo - Project Documentation

**Last Updated**: 2026-02-12

---

## Project Overview

**Purpose**: Production-ready Next.js blog starter and personal platform documenting a training journey for Berlin 70.3 (Ironman) from Colombia while immersed in underground techno culture.

**Technology Stack**:
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Content**: MDX with gray-matter and next-mdx-remote
- **Internationalization**: next-intl (English/Spanish)
- **Type Safety**: TypeScript 5, Zod 4.3.6
- **Testing**: Jest 30.2.0, Testing Library 16.3.2
- **Icons**: lucide-react
- **Environment Validation**: @t3-oss/env-nextjs
- **Deployment**: Vercel (production)

**Architecture Type**: Frontend-only application with static site generation for blog posts.

---

## Quick Start

### Development Setup

```bash
git clone https://github.com/Sockshead/life-is-tempo.git
cd life-is-tempo
pnpm install
cp .env.example .env.local
pnpm dev  # http://localhost:3000
```

### Testing

```bash
pnpm test              # Run all 637 tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report (80% threshold)
pnpm lint              # ESLint
pnpm security-check    # Dependency vulnerabilities
```

---

## Architecture Patterns

### Frontend-Only Design

**No Backend APIs**: All features use external services or static generation.

**Current Architecture**:
- Static site generation (SSG) for blog posts
- MDX content with frontmatter parsing via gray-matter
- Client-side interactions only
- External services for dynamic features (analytics)

### Multi-Language Routing

**Pattern**: `app/[locale]/page.tsx` structure with next-intl

**Supported Locales**: `en` (default), `es`

**Routing Structure**:
```
/             -> Redirects to /en or /es based on browser locale
/en           -> English homepage
/es           -> Spanish homepage
/en/about     -> English about page
/es/acerca    -> Spanish about page (localized path)
```

**Adding Translations**:
1. Add keys to `messages/en.json` and `messages/es.json`
2. Use in components: `const t = useTranslations('namespace')`
3. Reference: See `i18n/routing.ts` for pathname mappings

### Security-First Design

**Security Headers** (applied in `next.config.ts`):
- Content Security Policy (CSP) - Production only
- Strict-Transport-Security (HSTS)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

**Environment Validation**:
- All environment variables validated at build time via Zod schemas
- Type-safe access through `lib/env.ts`
- Empty strings treated as undefined
- Optional server/client variable separation

**Security Utilities** (`lib/security.ts`):
- Email validation (RFC 5322)
- Input sanitization
- Rate limiting presets (utility functions, not wired to routes)
- Honeypot validation
- CORS header generation

### Content-as-Code (MDX)

**Current Structure**:
```
content/
└── posts/
    ├── en/
    │   ├── balancing-sets-and-intervals.mdx
    │   ├── first-tempo-training-in-bogota.mdx
    │   └── underground-endurance-warehouse-to-track.mdx
    └── es/
        ├── equilibrando-sets-e-intervalos.mdx
        ├── primer-tempo-entrenamiento-en-bogota.mdx
        └── resistencia-underground-del-warehouse-a-la-pista.mdx
```

**Frontmatter Schema**:
```yaml
---
title: "Post Title"
date: "2026-02-11"
author: "Ultra Choko"
category: "training-chronicles" | "dual-life-tactics" | "underground-endurance"
tags: ["training", "techno", "colombia", "berlin"]
excerpt: "Brief summary for preview..."
image: "/images/posts/featured.jpg"
---
```

---

## Component Architecture

### Directory Structure

```
components/
├── Blog/           # 7 components
│   ├── CategoryFilter.tsx
│   ├── CategoryPageContent.tsx
│   ├── FeaturedPost.tsx
│   ├── PostCard.tsx
│   ├── ReadingProgress.tsx
│   ├── RelatedPosts.tsx
│   └── TableOfContents.tsx
├── Layout/         # 7 components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   ├── MobileMenu.tsx
│   ├── Navigation.tsx
│   ├── PageLayout.tsx
│   └── Section.tsx
├── MDX/            # 8 components
│   ├── AudioEmbed.tsx
│   ├── BPMIndicator.tsx
│   ├── CalloutBox.tsx
│   ├── ImageGrid.tsx
│   ├── MDXComponents.tsx
│   ├── MDXLayout.tsx
│   ├── MetricBox.tsx
│   └── StravaEmbed.tsx
├── Metrics/        # 4 components
│   ├── BPMCounter.tsx
│   ├── MetricDisplay.tsx
│   ├── ProgressBar.tsx
│   └── StatCard.tsx
└── UI/             # 6 components
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── Input.tsx
    ├── Skeleton.tsx
    └── Toast.tsx
```

**Total**: 32 components across 5 categories.

---

## Development Workflows

### Code Standards

**TypeScript**: Strict mode, no implicit any, type-safe env vars via Zod.

**Tailwind CSS**: Utility classes, responsive-first, dark mode planned.

**File Naming**:
- Components: PascalCase (e.g., `PostCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)

### Testing Strategy

**Current State**: 637 tests across 25 test suites.

**Framework**: Jest 30.2.0 + Testing Library 16.3.2

**Coverage Threshold**: 80% (branches, functions, lines, statements)

**Test Organization**: `components/{Category}/__tests__/{Component}.test.tsx`

**Tested Categories**: Blog (6 suites), Layout (7 suites), MDX (8 suites), Metrics (4 suites). UI components not yet tested.

### Git Workflow

**Branch Strategy** (feature -> develop -> master):
- `master` - Production (auto-deployed to Vercel)
- `develop` - Staging (auto-deployed to Vercel as preview)
- `feat/*`, `fix/*`, `docs/*` - Feature/fix/docs branches

**Commit Convention**: `feat:`, `fix:`, `docs:`, `chore:`, `security:`

**Before Committing**:
```bash
pnpm lint
pnpm test
pnpm security-check
```

### Deployment

**Vercel Pipeline**:
1. PRs to `develop` get automatic preview URLs
2. Merge to `develop` auto-deploys staging
3. Merge `develop` to `master` triggers production deployment
4. Production URL: https://lifeistempo.com

---

## Code Standards

### Abstraction Rules

- Don't create abstractions until pattern repeats 3+ times
- Three similar lines is better than premature abstraction
- Prefer standard library over external dependencies when equivalent

### Code Cleanup Policies

- Don't add features beyond what was requested
- Only add comments where logic isn't self-evident
- Don't add error handling for impossible scenarios
- Trust framework guarantees (Next.js, React)
- Only validate at system boundaries

### Security Standards

- Never commit secrets to version control (use `.env.local`)
- Validate all user input at system boundaries
- Follow OWASP top 10 best practices

---

## Recent Work

### 2026-02-12: Documentation Refresh
- Refreshed all markdown files with accurate project state
- Updated branding to Ultra Choko
- Created LICENSE file (MIT)
- Fixed false claims about empty components and missing tests
- Updated GitHub URLs from juancmandev to Sockshead

### 2026-02-11: Phase 2 Components with Full Test Coverage
- Implemented 32 components across 5 categories
- 637 tests across 25 test suites
- 6 MDX blog posts (3 EN + 3 ES)
- Jest 30 + Testing Library setup with 80% coverage threshold

### 2026-02-11: CI/CD Migration to Vercel
- Migrated from GitHub Pages to Vercel
- Automatic deployments: develop (staging), master (production)
- Preview deployments per PR

### 2026-02-08: Security Hardening
- Comprehensive security headers (CSP, HSTS, X-Frame-Options)
- Environment variable validation with @t3-oss/env-nextjs
- Security utilities in lib/security.ts
- Automated dependency scanning via Dependabot

### 2026-02-06: Initial Platform Setup
- Next.js 16 with App Router
- Multi-language support with next-intl
- Tailwind CSS 4 configuration
- MDX integration

---

## Known Gotchas

### Architecture Constraints

**No Backend APIs**: All dynamic features require external services. Rate limiting utilities exist in `lib/security.ts` but are not wired to any routes (no API routes exist).

### Development Environment

**CSP in Development**: Disabled in development mode for Next.js hot reload. Strict CSP enforced in production.

**Environment Variables**: All optional for development. Validation only strict on production build.

### Internationalization

**Locale Path Mapping**: English uses `/about`, Spanish uses `/acerca`. Defined in `i18n/routing.ts`.

**Translation Keys**: Nested structure (`homepage.hero.title`). Keep consistent across `messages/en.json` and `messages/es.json`.

### Test Coverage Gap

**UI Components**: The 6 UI components (Badge, Button, Card, Input, Skeleton, Toast) do not have tests yet. All other 26 components have comprehensive test coverage.

---

## Reference Documentation

### Internal
- Architecture: `docs/architecture/system-overview.md`
- Security: `SECURITY.md`, `SECURITY_CHECKLIST.md`
- Deployment: `docs/deployment/vercel-deployment.md`
- Development: `docs/development/getting-started.md`
- Components: `docs/components/README.md`

### External
- Next.js: https://nextjs.org/docs
- next-intl: https://next-intl-docs.vercel.app
- Tailwind CSS: https://tailwindcss.com/docs
- MDX: https://mdxjs.com
- Vercel: https://vercel.com/docs

---

## Contact & Support

- **Repository**: https://github.com/Sockshead/life-is-tempo
- **Website**: https://lifeistempo.com
- **Security**: security@lifeistempo.com
- **Maintainer**: Ultra Choko (@Sockshead)

---

**Documentation Standard**: This file follows global CLAUDE.md governance. Project-specific patterns only. System-level patterns belong in `~/.claude/CLAUDE.md`. Long-form guides belong in `docs/`.
