# Life Is Tempo - Project Documentation

**Last Updated**: 2026-02-11

---

## Project Overview

**Purpose**: Personal blog and newsletter platform documenting a training journey for Berlin 70.3 (Ironman) from Colombia while immersed in underground techno culture. Chronicles the intersection of endurance sports, techno music, and productivity.

**Target Audience**:
- Personal documentation and reflection
- Readers interested in endurance sports training
- Individuals exploring work-life balance through dual passions
- Techno culture enthusiasts

**Technology Stack**:
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Content**: MDX for blog posts
- **Internationalization**: next-intl (English/Spanish)
- **Type Safety**: TypeScript 5, Zod 4.3.6
- **Environment Validation**: @t3-oss/env-nextjs
- **Deployment**: Vercel (production)

**Architecture Type**: Frontend-only application with planned external service integrations (no backend APIs).

---

## Quick Start

### Development Setup

```bash
# Clone and install
git clone https://github.com/juancmandev/life-is-tempo.git
cd life-is-tempo
pnpm install

# Environment setup (all variables optional for development)
cp .env.example .env.local

# Run development server
pnpm dev  # Opens at http://localhost:3000

# Build for production
pnpm build && pnpm start
```

### Testing

```bash
# Run linting
pnpm lint

# Security audit
pnpm security-check  # Checks for dependency vulnerabilities
```

---

## Architecture Patterns

### Frontend-Only Design

**No Backend APIs**: All features must use external services or static generation.

**Current Architecture**:
- Static site generation (SSG) for blog posts
- Client-side interactions only
- External services for dynamic features (newsletter, analytics)

**Future External Integrations** (planned):
- Newsletter: Loops.so or Resend API
- Email service: Resend
- AI content assistance: OpenAI/Anthropic APIs
- Analytics: Google Analytics, Vercel Analytics

### Multi-Language Routing

**Pattern**: `app/[locale]/page.tsx` structure with next-intl

**Supported Locales**:
- `en` (English) - default
- `es` (Spanish)

**Routing Structure**:
```
/             → Redirects to /en or /es based on browser locale
/en           → English homepage
/es           → Spanish homepage
/en/about     → English about page
/es/acerca    → Spanish about page (localized path)
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

**Rate Limiting** (planned):
- API routes will implement rate limiting
- RATE_LIMIT_SECRET environment variable for protection

### Content-as-Code (MDX)

**Planned Structure** (not yet implemented):
```
content/
├── en/
│   └── posts/
│       └── 2026-02-11-first-post.mdx
└── es/
    └── posts/
        └── 2026-02-11-primer-post.mdx
```

**Frontmatter Schema** (to be implemented):
```yaml
---
title: "Post Title"
date: "2026-02-11"
author: "Juan Camilo"
category: "training-chronicles" | "dual-life-tactics" | "underground-endurance"
tags: ["training", "techno", "colombia", "berlin"]
excerpt: "Brief summary for preview..."
image: "/images/posts/featured.jpg"
---
```

**MDX Configuration**: Configured in `next.config.ts` with `@next/mdx`

---

## Development Workflows

### Local Development

**Starting Development Server**:
```bash
cd A:/repositories/life-is-tempo
pnpm dev  # Runs on http://localhost:3000
```

**Environment Variables**:
- **Required**: None for basic development
- **Optional**: See `.env.example` for complete list
- **Validation**: Automatic via `lib/env.ts` at build time

**Hot Reload**:
- Next.js Fast Refresh enabled
- CSP relaxed in development (strict in production)

### Code Standards

**TypeScript**:
- Strict mode enabled
- No implicit any
- All environment variables type-safe via Zod

**Tailwind CSS**:
- Use Tailwind utility classes (no custom CSS unless necessary)
- Responsive-first design
- Dark mode support (to be implemented)

**Component Organization** (when components are created):
```
components/
├── layout/         # Header, Footer, Navigation
├── ui/             # Buttons, Cards, Badges
├── blog/           # Post cards, categories, tags
└── forms/          # Newsletter signup, contact
```

**File Naming Conventions**:
- Components: PascalCase (e.g., `BlogPost.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Testing Strategy

**Current State**: No tests implemented yet

**Planned Testing**:
- E2E: Playwright (for critical user flows)
- Unit: Vitest or Jest (for utilities, components)
- Integration: Test newsletter signup, form validation

**Coverage Requirements** (when implemented):
- Features and bug fixes: Require tests
- Config changes, typos, docs: Tests optional

### Git Workflow

**Branch Strategy** (feature → develop → master):
- `master` - Production branch (auto-deployed to Vercel)
- `develop` - Staging branch (auto-deployed to Vercel as preview)
- `feat/*` - Feature branches (PR to develop triggers Vercel preview URL)
- `fix/*` - Bug fix branches
- `docs/*` - Documentation changes

**Commit Convention** (informal):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `chore:` - Maintenance tasks
- `security:` - Security improvements

**Before Committing**:
```bash
pnpm lint           # Run ESLint
pnpm security-check # Check dependency vulnerabilities
```

### Deployment

**Vercel Deployment**:
1. PRs to `develop` get automatic Vercel preview URLs
2. Merge to `develop` auto-deploys staging environment
3. Merge `develop` to `master` triggers production deployment
4. Environment variables configured in Vercel dashboard
5. Production URL: https://lifeistempo.com

**Environment Variables in Vercel**:
- See `docs/deployment/environment-variables.md` for complete list
- All variables optional for basic deployment
- Newsletter/analytics require respective API keys

---

## Code Standards

### Abstraction Rules

- **Don't create abstractions until pattern repeats 3+ times**
- Three similar lines of code is better than premature abstraction
- Prefer standard library over external dependencies when equivalent

### Code Cleanup Policies

- Don't add features beyond what was requested
- Only add comments where logic isn't self-evident
- Don't add error handling for impossible scenarios
- Trust framework guarantees (Next.js, React)
- Only validate at system boundaries (user input, external APIs)

### Dependency Management

- Use pnpm for package management (defined in `packageManager` field)
- Keep dependencies minimal and up-to-date
- Run `pnpm audit` before adding new dependencies
- Document non-obvious dependency choices

### Security Standards

- Never commit secrets to version control (use `.env.local`)
- Validate all user input at system boundaries
- Use parameterized queries (if database added)
- Follow OWASP top 10 best practices
- Sanitize MDX content (when implemented)

---

## Recent Work

### 2026-02-11: Comprehensive Documentation Generation
- Created project CLAUDE.md with development patterns
- Generated docs/ folder with architecture and deployment guides
- Created Mermaid diagrams for system architecture
- Enhanced README with documentation links
- **Source**: docs-generation plan

### 2026-02-11: GitHub Security Automation
- Automated Dependabot, secret scanning, and code scanning setup
- Verified security features via GitHub API
- Created comprehensive SECURITY_CHECKLIST.md
- **Source**: GITHUB_SETUP.md

### 2026-02-08: Security Hardening Implementation
- Implemented comprehensive security headers (CSP, HSTS, X-Frame-Options)
- Added environment variable validation with @t3-oss/env-nextjs
- Created SECURITY.md with vulnerability reporting process
- Set up automated dependency scanning
- **Source**: SECURITY_CHECKLIST.md

### 2026-02-06: Initial Platform Setup
- Next.js 16 project initialization with App Router
- Multi-language support with next-intl (English/Spanish)
- Tailwind CSS 4 configuration
- MDX integration for blog content
- Basic project structure and routing

---

## Known Gotchas

### Architecture Constraints

**No Backend APIs**:
- All dynamic features require external services
- Newsletter requires Loops.so or Resend integration
- AI content features need OpenAI/Anthropic API keys
- Cannot implement server-side authentication without adding backend

### Empty Directories

**Components Directory**:
- `components/` directory is currently empty
- All UI currently in page components (`app/[locale]/page.tsx`)
- Extract reusable components as patterns emerge (3+ uses)

**Content Directory**:
- `content/` directory structure planned but not created
- MDX blog posts not yet implemented
- First post creation will establish directory structure

### External Service Dependencies

**Newsletter Integration**:
- Requires external service (Loops.so recommended)
- Environment variables: `NEWSLETTER_API_KEY`, `NEWSLETTER_AUDIENCE_ID`
- Double opt-in pattern recommended for GDPR compliance

**Analytics**:
- Google Analytics: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Vercel Analytics: `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
- Both optional, no impact on core functionality

### Development Environment

**CSP in Development**:
- Content Security Policy disabled in development mode
- Enables Next.js hot reload without CSP violations
- Strict CSP enforced in production builds

**Environment Variables**:
- All variables optional for development
- Missing variables don't break local development
- Validation only fails on production build if required variables missing

### Internationalization

**Locale Path Mapping**:
- English uses `/about`, Spanish uses `/acerca`
- Path mappings defined in `i18n/routing.ts`
- Add new path mappings when creating locale-specific routes

**Translation Keys**:
- Nested structure: `homepage.hero.title`
- Keep keys consistent across `messages/en.json` and `messages/es.json`
- Missing translations show error in development (safe in production)

---

## Reference Documentation

### Internal Documentation
- Architecture: `docs/architecture/system-overview.md`
- Deployment: `docs/deployment/vercel-deployment.md`
- Development: `docs/development/getting-started.md`
- Security: `SECURITY.md`, `SECURITY_CHECKLIST.md`
- Setup: `GITHUB_SETUP.md`

### External Resources
- Next.js Docs: https://nextjs.org/docs
- next-intl Docs: https://next-intl-docs.vercel.app
- Tailwind CSS: https://tailwindcss.com/docs
- MDX: https://mdxjs.com
- Vercel Deployment: https://vercel.com/docs

---

## Planning Files

Active plans stored in `A:/planning/` with naming convention `{project}-{topic}-{YYYYMMDD}.md`:
- `frontend-docs-generation-20260211.md` - Documentation generation plan

---

## Contact & Support

- **Repository**: https://github.com/juancmandev/life-is-tempo
- **Website**: https://lifeistempo.com
- **Security**: security@lifeistempo.com
- **Author**: Juan Carlos Martínez (@juancmandev)

---

**Documentation Standard**: This file follows global CLAUDE.md governance. Project-specific patterns only. System-level patterns belong in `~/.claude/CLAUDE.md`. Long-form guides belong in `docs/`.
