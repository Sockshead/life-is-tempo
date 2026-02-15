# Life Is Tempo

## Parent Context

<- See **Global CLAUDE.md** (`C:/Users/juanc/.claude/CLAUDE.md`) for:
- System-wide patterns (git workflows, testing strategies, code standards)
- Cross-project conventions (planning, documentation governance)
- Shell/environment gotchas (Windows paths, Docker, pnpm)

> Next.js 16 blog & newsletter — Training journey for Berlin 70.3 (Ironman) from Colombia, intersecting endurance sports, techno music, and productivity.

## Quick Commands

```bash
cd A:/repositories/life-is-tempo
pnpm install              # Install dependencies
pnpm dev                  # localhost:3000
pnpm build && pnpm start  # Production build
pnpm lint                 # ESLint
pnpm security-check       # Dependency vulnerabilities
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Content**: MDX for blog posts
- **i18n**: next-intl (English/Spanish)
- **Type Safety**: TypeScript 5, Zod 4.3.6
- **Environment Validation**: @t3-oss/env-nextjs
- **Deployment**: Vercel (production) — https://lifeistempo.com

## Architecture

**Frontend-only** — no backend APIs. All dynamic features via external services.

### Multi-Language Routing
```
/             → Redirects based on browser locale
/en           → English homepage
/es           → Spanish homepage
/en/about     → English about page
/es/acerca    → Spanish about page (localized path)
```

### Content-as-Code (MDX)
Planned structure: `content/{locale}/posts/{date}-{slug}.mdx`

### Security-First
Security headers in `next.config.ts`: CSP (production only), HSTS, X-Frame-Options, nosniff, XSS protection. Environment variables validated at build time via Zod.

## Vault Notes

- Blog Architecture
- Content Strategy

## Git Workflow

- `master` — Production (auto-deployed to Vercel)
- `develop` — Staging (Vercel preview)
- `feat/*` / `fix/*` / `docs/*` — Feature branches (PR triggers preview URL)

## Recent Work

### 2026-02-14
- **Social Media Automation**: PR #27 merged to master
  - Playwright MCP integration for social media scraping
  - Multi-POV ghostwriting framework (3 personas)
  - Daily automation pipeline with Task Scheduler integration
  - 4 new skills: social-scraper, content-briefing, post-to-social, review-draft
  - Intent Layer optimization: 75% token reduction via progressive disclosure
  - New blog post: "Darkness: Waking Without Memory"

### 2026-02-11
- Comprehensive documentation generation
- GitHub Security Automation (Dependabot, secret scanning, code scanning)

### 2026-02-08
- Security hardening (CSP, HSTS, env validation, SECURITY.md)

### 2026-02-06
- Initial platform setup (Next.js 16, next-intl, Tailwind 4, MDX)

## External Resources

- **Repository**: https://github.com/juancmandev/life-is-tempo
- **Docs**: `docs/architecture/`, `docs/deployment/`, `docs/development/`

---

# Blog Architecture

## Frontend-Only Design

**No Backend APIs**: All features must use external services or static generation.

**Current**: Static site generation (SSG) for blog posts, client-side interactions only.

**Planned External Integrations**:
- Newsletter: Loops.so or Resend API
- Email: Resend
- AI content assistance: OpenAI/Anthropic APIs
- Analytics: Google Analytics, Vercel Analytics

## Multi-Language Routing

**Pattern**: `app/[locale]/page.tsx` structure with next-intl

**Adding Translations**:
1. Add keys to `messages/en.json` and `messages/es.json`
2. Use in components: `const t = useTranslations('namespace')`
3. Reference: `i18n/routing.ts` for pathname mappings

## Security Headers

Applied in `next.config.ts`:
- Content Security Policy (CSP) — Production only (relaxed in dev for hot reload)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy, Permissions-Policy

## Environment Validation

All variables validated at build time via Zod schemas in `lib/env.ts`. Empty strings treated as undefined. Optional server/client variable separation.

## Component Organization (Planned)

```
components/
├── layout/         # Header, Footer, Navigation
├── ui/             # Buttons, Cards, Badges
├── blog/           # Post cards, categories, tags
└── forms/          # Newsletter signup, contact
```

## Code Standards

- TypeScript strict mode, no implicit any
- Tailwind utility classes (no custom CSS unless necessary)
- Components: PascalCase, Utilities: camelCase, Constants: SCREAMING_SNAKE_CASE
- Extract reusable components after 3+ uses

## Known Constraints

- **No backend** — all dynamic features require external services
- **Components dir empty** — all UI in page components currently
- **Content dir planned** — MDX posts not yet implemented
- **CSP disabled in dev** — enables Next.js hot reload

---

# Content Strategy

## Target Audience

- Personal documentation and reflection
- Readers interested in endurance sports training
- Individuals exploring work-life balance through dual passions
- Techno culture enthusiasts

## Content Categories

| Category | Description |
|----------|-------------|
| training-chronicles | Training logs, race reports, progress updates |
| dual-life-tactics | Balancing sports, music, and career |
| underground-endurance | Intersection of techno culture and athletics |

## MDX Frontmatter Schema (Planned)

```yaml
---
title: "Post Title"
date: "2026-02-11"
author: "Juan Camilo"
category: "training-chronicles"
tags: ["training", "techno", "colombia", "berlin"]
excerpt: "Brief summary for preview..."
image: "/images/posts/featured.jpg"
---
```

## Newsletter Integration (Planned)

- Service: Loops.so or Resend API
- Environment variables: `NEWSLETTER_API_KEY`, `NEWSLETTER_AUDIENCE_ID`
- Double opt-in for GDPR compliance

## Deployment

1. PRs to `develop` get automatic Vercel preview URLs
2. Merge to `develop` auto-deploys staging
3. Merge `develop` to `master` triggers production
4. Production URL: https://lifeistempo.com
