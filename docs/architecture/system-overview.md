# System Architecture Overview

**Last Updated**: 2026-02-11

---

## High-Level Architecture

Life Is Tempo is a **frontend-only** application built with Next.js 16 App Router. There are no backend APIs - all dynamic functionality is achieved through external service integrations.

### Architecture Type

**Static Site Generation (SSG) + External Services**

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│  (Chrome, Firefox, Safari, etc.)                            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                Vercel Edge Network                           │
│  • CDN (Global)                                             │
│  • Security Headers                                          │
│  • Static Asset Delivery                                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js 16 Application                          │
│  • Server-Side Rendering (SSR)                              │
│  • Static Site Generation (SSG)                              │
│  • Multi-language Routing (next-intl)                        │
│  • Security Middleware                                       │
│  • MDX Content Processing                                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ API Calls (Future)
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services                               │
│                                                              │
│  • Newsletter: Loops.so / Resend                            │
│  • Analytics: Google Analytics, Vercel Analytics            │
│  • AI Content: OpenAI / Anthropic (planned)                 │
│  • Email: Resend (planned)                                  │
│  • Affiliate: Amazon Associates (planned)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |

### Content & Internationalization

| Technology | Version | Purpose |
|------------|---------|---------|
| MDX | @next/mdx 3.1.1 | Markdown with JSX components |
| next-intl | 4.8.2 | Multi-language support (EN/ES) |

### Type Safety & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| Zod | 4.3.6 | Schema validation |
| @t3-oss/env-nextjs | 0.13.10 | Environment variable validation |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| Jest | 30.2.0 | Testing framework |
| @testing-library/react | 16.3.2 | Component testing |
| @testing-library/jest-dom | 6.9.1 | DOM matchers |
| @testing-library/user-event | 14.6.1 | User interaction simulation |

### Content Processing

| Technology | Purpose |
|------------|---------|
| gray-matter | Frontmatter parsing |
| next-mdx-remote | MDX rendering |
| lucide-react | Icon library |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code quality and linting |
| pnpm | Package manager |
| TypeScript | Static type checking |

---

## Core Architectural Patterns

### 1. Frontend-Only Design

**Philosophy**: No backend APIs, rely on external services for dynamic features.

**Benefits**:
- Simplified deployment (static hosting)
- Lower operational costs
- Better security posture (smaller attack surface)
- Easier scaling (CDN-based)

**Trade-offs**:
- Dependency on external services
- Limited custom business logic
- API key management required for integrations

**Future Considerations**:
- If complex business logic needed, consider adding Next.js API routes
- If database required, consider Vercel Postgres or external database service

### 2. Multi-Language Routing

**Implementation**: `app/[locale]/` dynamic routing with next-intl

**Locale Detection**:
1. User visits `/`
2. Middleware detects browser locale (`Accept-Language` header)
3. Redirects to `/en` or `/es`
4. Subsequent navigation maintains locale

**Path Localization**:
```typescript
// i18n/routing.ts
pathnames: {
  '/': '/',
  '/about': {
    en: '/about',    // English path
    es: '/acerca',   // Spanish path
  },
}
```

**Benefits**:
- SEO-friendly URLs in each language
- Automatic browser locale detection
- Type-safe navigation with locale preservation

### 3. Security-First Architecture

**Defense in Depth**:

```
┌─────────────────────────────────────────────────────┐
│ Layer 1: Vercel Edge Network                        │
│  • DDoS protection                                  │
│  • TLS/SSL termination                              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ Layer 2: Next.js Security Headers                   │
│  • Content Security Policy (CSP)                    │
│  • Strict-Transport-Security (HSTS)                 │
│  • X-Frame-Options, X-Content-Type-Options          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ Layer 3: Application Layer                          │
│  • Input validation (Zod schemas)                   │
│  • Environment variable validation                  │
│  • Rate limiting (API routes, planned)              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ Layer 4: External Services                          │
│  • API key rotation                                 │
│  • Service-level security (OAuth, API tokens)       │
└─────────────────────────────────────────────────────┘
```

**Security Headers Configuration** (see `next.config.ts`):
- CSP: Whitelist trusted domains for scripts, styles, images
- HSTS: Force HTTPS for 2 years (includeSubDomains, preload)
- X-Frame-Options: SAMEORIGIN (prevent clickjacking)
- X-Content-Type-Options: nosniff (prevent MIME sniffing)
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: Disable camera, microphone, geolocation

**Environment Validation**:
- Build-time validation via Zod schemas
- Type-safe access through `lib/env.ts`
- Server vs. client variable separation
- Empty strings treated as undefined

### 4. Content-as-Code (MDX)

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

**Content Flow**:

```
┌──────────────┐
│ Author writes│
│ MDX content  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Commit to git        │
│ (content/en/ or es/) │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Push to GitHub       │
│ Triggers deployment  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Vercel Build         │
│ • Processes MDX      │
│ • Generates HTML     │
│ • Optimizes images   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Deploy to CDN        │
│ Static HTML + assets │
└──────────────────────┘
```

**Benefits**:
- Version-controlled content
- Fast builds (only changed files processed)
- No database required
- Type-safe content with frontmatter validation

---

## Data Flow

### Static Content (Current)

```
Build Time                Runtime
──────────────────────   ────────────────────
┌─────────────────┐
│ Translation     │
│ Files (JSON)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ Next.js Build   │─────→│ Static HTML  │
│ Process         │      │ (Vercel CDN) │
└─────────────────┘      └──────┬───────┘
                                 │
                                 ▼
                         ┌──────────────┐
                         │ User Browser │
                         └──────────────┘
```

### Dynamic Content (Planned)

```
Runtime
───────────────────────────────────────────

┌──────────────┐
│ User Browser │
└──────┬───────┘
       │
       │ Form Submit
       ▼
┌──────────────────────┐
│ Next.js API Route    │
│ (newsletter signup)  │
└──────┬───────────────┘
       │
       │ API Call
       ▼
┌──────────────────────┐
│ External Service     │
│ (Loops.so / Resend)  │
└──────┬───────────────┘
       │
       │ Response
       ▼
┌──────────────────────┐
│ User Confirmation    │
└──────────────────────┘
```

---

## Deployment Architecture

### Vercel Platform

**Production Environment**:
- **Deployment**: Automatic on push to `master` branch
- **Domain**: https://lifeistempo.com
- **Edge Network**: Global CDN (30+ regions)
- **Build**: Next.js production build (`pnpm build`)
- **Runtime**: Node.js 18+ (Vercel serverless)

**Preview Environments**:
- Automatic preview deployments for pull requests
- Unique URL per PR (e.g., `life-is-tempo-git-feat-xyz.vercel.app`)
- Full production parity (same build process)

**Environment Variables**:
- Configured in Vercel dashboard
- Separate values for Production vs Preview
- All variables optional for basic deployment

### Build Process

```
┌──────────────────┐
│ Git Push         │
│ (master branch)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ Vercel Build                 │
│ 1. Install deps (pnpm)       │
│ 2. Validate env vars (Zod)   │
│ 3. Build Next.js (SSG/SSR)   │
│ 4. Process MDX content       │
│ 5. Optimize images/assets    │
│ 6. Generate static HTML      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Deploy to Edge Network       │
│ • Upload static assets       │
│ • Configure edge functions   │
│ • Update DNS routing         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Production Live              │
│ https://lifeistempo.com      │
└──────────────────────────────┘
```

**Build Performance**:
- Average build time: 1-2 minutes
- Incremental static regeneration (ISR) not used (full static)
- Cold start: N/A (static assets served from CDN)

---

## Scalability Considerations

### Current Scale (Frontend-Only)

**Strengths**:
- Unlimited horizontal scaling (CDN-based)
- Near-zero cost at low traffic
- Global performance (edge network)
- No database bottlenecks

**Limitations**:
- No server-side business logic
- Limited dynamic features
- Dependency on external service limits

### Future Scaling Options

**If Adding Backend APIs**:
1. **Serverless Functions** (Vercel/AWS Lambda)
   - Keep frontend-only for most pages
   - Add API routes for specific features (newsletter, contact form)
   - Cold start consideration (~100-500ms)

2. **Database Layer** (if needed)
   - Vercel Postgres (serverless database)
   - Supabase (PostgreSQL with real-time features)
   - PlanetScale (MySQL with branching)

3. **Caching Strategy**:
   - CDN caching for static assets (current)
   - Edge caching for API responses (if added)
   - Browser caching with cache-control headers

**Traffic Estimates**:
- Current: Personal blog (low traffic expected)
- No need for advanced caching or database optimization yet
- Monitor Vercel Analytics for growth trends

---

## Security Architecture

See [security-architecture.md](./security-architecture.md) for detailed security implementation.

**Key Security Features**:
- Comprehensive security headers (CSP, HSTS, etc.)
- Environment variable validation at build time
- Automated dependency scanning (Dependabot)
- Secret scanning (GitHub)
- Code scanning (CodeQL, planned)
- Rate limiting utilities available in `lib/security.ts` (not wired to routes)

---

## Future Architecture Considerations

### When to Add Backend APIs

**Consider adding Next.js API routes when**:
- Complex server-side logic needed (e.g., payment processing)
- Database access required (user accounts, comments)
- Real-time features needed (WebSocket, Server-Sent Events)
- Heavy computation best done server-side

**Keep frontend-only for**:
- Blog content (static MDX)
- Newsletter signup (external service)
- Analytics (client-side tracking)
- Simple forms (external service)

### Component Architecture

**32 components across 5 categories**:
```
components/
├── Blog/           # 7 components (PostCard, FeaturedPost, CategoryFilter, ...)
├── Layout/         # 7 components (Header, Footer, Navigation, MobileMenu, ...)
├── MDX/            # 8 components (CalloutBox, AudioEmbed, StravaEmbed, ...)
├── Metrics/        # 4 components (BPMCounter, StatCard, ProgressBar, ...)
└── UI/             # 6 components (Button, Card, Badge, Input, Skeleton, Toast)
```

**Component Design Principles**:
- Extract components after pattern repeats 3+ times
- Prefer composition over boolean props
- Keep components small and focused
- Use TypeScript for prop validation
- Document props with JSDoc comments

---

## Monitoring & Observability

### Current Monitoring

**Vercel Analytics** (optional):
- Page load performance
- Core Web Vitals
- Geographic distribution
- Top pages/referrers

**Google Analytics** (optional):
- User behavior tracking
- Traffic sources
- Page views and sessions
- Custom events (newsletter signups, etc.)

### Planned Monitoring

**Error Tracking** (to be added):
- Sentry or similar error tracking service
- Client-side error reporting
- Source map upload for stack traces

**Uptime Monitoring** (to be added):
- External uptime service (UptimeRobot, Pingdom)
- Status page for transparency
- Automated alerts for downtime

---

## Related Documentation

- [Security Architecture](./security-architecture.md) - Detailed security implementation
- [Routing Structure Diagram](./routing-structure.mmd) - Mermaid diagram of routing
- [Deployment Guide](../deployment/vercel-deployment.md) - Step-by-step deployment
- [Environment Variables](../deployment/environment-variables.md) - Configuration reference

---

**Last Reviewed**: 2026-02-12
