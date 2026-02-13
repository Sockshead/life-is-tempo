# Security Architecture

**Last Updated**: 2026-02-11

---

## Overview

Life Is Tempo implements a defense-in-depth security strategy with multiple layers of protection. This document details the security architecture, threat model, and implementation specifics.

## Security Posture

**Threat Model**: Personal blog with newsletter functionality
- **Primary Assets**: User email addresses (newsletter subscribers), site content
- **Attack Vectors**: XSS, CSRF, injection attacks, DDoS, supply chain vulnerabilities
- **Risk Level**: Low-medium (no financial transactions, no sensitive user data)

**Security Philosophy**:
- Security by default (headers applied globally)
- Principle of least privilege (minimal data collection)
- Defense in depth (multiple security layers)
- Transparent reporting (public security policy)

---

## Security Layers

### Layer 1: Network & Infrastructure (Vercel Edge)

**Vercel Platform Security**:
- **DDoS Protection**: Built-in at edge network level
- **TLS/SSL**: Automatic HTTPS with Let's Encrypt certificates
- **Edge Network**: Global CDN with geographic redundancy
- **Rate Limiting**: Edge-level rate limiting for static assets

**DNS Security**:
- DNSSEC support available through Vercel
- CAA records to restrict certificate issuance
- MX records configured for security@lifeistempo.com

**Platform Compliance**:
- SOC 2 Type II certified (Vercel)
- GDPR compliant infrastructure
- Data residency options available

### Layer 2: HTTP Security Headers

**Implementation Location**: `next.config.ts` - Applied globally to all routes

#### Content Security Policy (CSP)

**Purpose**: Prevent XSS, data injection, and unauthorized resource loading

```typescript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' *.googletagmanager.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: blob: *.googletagmanager.com *.google-analytics.com;
  connect-src 'self' *.googletagmanager.com *.google-analytics.com *.vercel-insights.com;
  frame-src 'self' www.strava.com open.spotify.com w.soundcloud.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
`;
```

**Policy Breakdown**:

| Directive | Value | Rationale |
|-----------|-------|-----------|
| `default-src` | 'self' | Only allow resources from same origin by default |
| `script-src` | 'self', GTM domains | Allow Google Tag Manager for analytics |
| `style-src` | 'self', 'unsafe-inline', Google Fonts | Tailwind requires inline styles, external fonts |
| `font-src` | 'self', Google Fonts | Web font loading |
| `img-src` | 'self', data:, blob:, analytics domains | Images, data URLs, analytics pixels |
| `connect-src` | 'self', analytics domains | API calls, analytics tracking |
| `frame-src` | 'self', Strava, Spotify, SoundCloud | Allow embedding training/music widgets |
| `frame-ancestors` | 'self' | Prevent embedding in iframes (clickjacking) |
| `base-uri` | 'self' | Prevent base tag injection |
| `form-action` | 'self' | Forms can only submit to same origin |

**Known Trade-offs**:
- `'unsafe-inline'` in `style-src`: Required for Tailwind CSS (consider nonce-based approach in future)
- CSP disabled in development: Allows Next.js hot reload without violations

#### Strict-Transport-Security (HSTS)

```
max-age=63072000; includeSubDomains; preload
```

**Purpose**: Force HTTPS connections for 2 years (63072000 seconds)

**Implementation**:
- `includeSubDomains`: Applies to all subdomains
- `preload`: Eligible for browser HSTS preload list
- **Preload Status**: Not yet submitted to https://hstspreload.org

**Consideration**: Preload is irreversible - only submit after confirming no HTTP-only subdomains needed

#### X-Frame-Options

```
SAMEORIGIN
```

**Purpose**: Prevent clickjacking attacks by controlling iframe embedding

**Options Considered**:
- `DENY`: Completely prevent embedding (too restrictive if we want embeddable content later)
- `SAMEORIGIN`: Allow embedding only from same origin (chosen)
- `ALLOW-FROM`: Deprecated, not used

#### X-Content-Type-Options

```
nosniff
```

**Purpose**: Prevent MIME type sniffing, enforce declared content types

**Impact**: Browsers trust `Content-Type` header without guessing, preventing MIME confusion attacks

#### X-XSS-Protection

```
1; mode=block
```

**Purpose**: Enable browser's built-in XSS filter (legacy header, CSP preferred)

**Status**: Deprecated in modern browsers (Chrome, Firefox), but included for older browsers

**Note**: CSP is primary XSS protection; this is defense-in-depth

#### Referrer-Policy

```
origin-when-cross-origin
```

**Purpose**: Control what information is sent in `Referer` header

**Behavior**:
- Same-origin requests: Full URL sent
- Cross-origin requests: Only origin sent (no path/query string)

**Privacy Consideration**: Balances analytics needs (knowing traffic sources) with user privacy

#### Permissions-Policy

```
camera=(), microphone=(), geolocation=()
```

**Purpose**: Disable unnecessary browser features to reduce attack surface

**Disabled Features**:
- Camera access: Not needed for blog
- Microphone access: Not needed for blog
- Geolocation: Not needed (we have user locale from browser, don't need precise location)

**Future Consideration**: Add more restrictive policies as browser support improves

### Layer 3: Application Security

#### Environment Variable Validation

**Implementation**: `lib/env.ts` using @t3-oss/env-nextjs and Zod

**Security Benefits**:
1. **Build-time validation**: Catches misconfigurations before deployment
2. **Type safety**: Prevents typos and incorrect environment variable names
3. **Required vs. optional**: Clear distinction between critical and optional config
4. **Server vs. client**: Enforces separation (prevents leaking server secrets to client)

**Example Schema**:
```typescript
server: {
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEWSLETTER_API_KEY: z.string().optional(),  // Server-only secret
  RATE_LIMIT_SECRET: z.string().optional(),   // Server-only secret
},
client: {
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),  // Public, prefixed
},
```

**Validation Rules**:
- Empty strings treated as undefined (fails required validation)
- Must prefix public variables with `NEXT_PUBLIC_`
- Server variables never exposed to client bundle
- Build fails if required variables missing

**Secret Management**:
- Development: Use `.env.local` (never commit)
- Production: Configure in Vercel dashboard
- CI/CD: Use GitHub Secrets (if adding CI)

#### Input Validation & Sanitization

**Current State**: Limited user input (no forms implemented yet)

**Planned Implementation** (Newsletter Signup):

```typescript
// Example: Newsletter signup validation
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  locale: z.enum(['en', 'es']),
});

export async function POST(request: Request) {
  const body = await request.json();

  // Validate input
  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.issues },
      { status: 400 }
    );
  }

  // Safe to use validated data
  const { email, locale } = result.data;
  // ... call external newsletter service
}
```

**Validation Principles**:
- Validate all user input at system boundaries
- Use Zod schemas for type-safe validation
- Return user-friendly error messages
- Never trust client-side validation alone

#### Rate Limiting (Planned)

**Planned Implementation**: API routes with `@upstash/ratelimit` or similar

**Target Routes**:
- Newsletter signup: 3 requests per 15 minutes per IP
- Contact form: 5 requests per hour per IP
- AI content generation (future): 10 requests per day per IP

**Example Implementation**:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '15 m'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // Process request
}
```

**Considerations**:
- Use Vercel KV (Redis) for rate limit storage
- Add `RATE_LIMIT_SECRET` environment variable
- Implement per-IP tracking (via `x-forwarded-for` header)
- Graceful degradation if rate limit service unavailable

#### MDX Content Security (Planned)

**Threat**: Malicious MDX content could execute arbitrary code during build

**Mitigation Strategies**:
1. **Content Validation**: Lint MDX files during build
2. **Component Allowlist**: Only allow specific React components in MDX
3. **No Dynamic Imports**: Disable dynamic imports in MDX content
4. **Build-time Sanitization**: Process MDX in isolated environment

**Example Configuration** (to be added to `next.config.ts`):
```typescript
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Add security-focused plugins
    ],
    rehypePlugins: [
      // Sanitize HTML output
    ],
  },
});
```

**Content Review Process**:
- All MDX content authored by trusted user (site owner)
- No user-generated content accepted
- Git history provides audit trail

### Layer 4: Dependency Security

#### Automated Scanning

**Dependabot** (GitHub):
- **Frequency**: Daily scans
- **Scope**: Production and development dependencies
- **Action**: Automatic PRs for security updates
- **Priority**: Critical and high-severity vulnerabilities

**GitHub Secret Scanning**:
- Scans commits for accidentally committed secrets
- Alerts on API keys, tokens, credentials
- Prevents secrets from reaching production

**GitHub Code Scanning** (Planned):
- CodeQL analysis for security vulnerabilities
- Runs on push to master and PRs
- Detects: SQL injection, XSS, insecure randomness, etc.

#### Manual Audit Process

**Before Adding New Dependencies**:
```bash
# Check package health
pnpm audit <package-name>

# Review package metadata
pnpm view <package-name> homepage
pnpm view <package-name> repository

# Check download counts and maintenance
pnpm view <package-name> version
pnpm view <package-name> time
```

**Regular Maintenance**:
```bash
# Weekly: Check for vulnerabilities
pnpm audit --audit-level=high

# Monthly: Update dependencies
pnpm update

# Quarterly: Review dependency tree
pnpm list --depth=0
```

**Dependency Review Criteria**:
- Active maintenance (commits within 6 months)
- High download count (> 100k weekly)
- No recent security advisories
- Permissive license (MIT, Apache 2.0)
- Minimal transitive dependencies

---

## Vulnerability Management

### Reporting Process

**Public Disclosure**:
1. GitHub Security Advisories: https://github.com/juancmandev/life-is-tempo/security
2. Email: security@lifeistempo.com

**Response Timeline**:
- Initial response: 48 hours
- Severity assessment: 7 days
- Critical fix: 14 days
- High/medium fix: 30 days

**Severity Levels**:

| Severity | Description | Examples |
|----------|-------------|----------|
| Critical | Exploitable, high impact | RCE, authentication bypass |
| High | Exploitable, medium impact | XSS, SQL injection |
| Medium | Hard to exploit or low impact | Information disclosure |
| Low | Theoretical or requires unlikely conditions | Timing attacks |

### Incident Response Plan

**Detection Sources**:
- Automated scans (Dependabot, CodeQL)
- Security researcher reports
- User reports (GitHub issues)
- Monitoring alerts (uptime, error tracking)

**Response Steps**:
1. **Triage** (within 1 hour)
   - Assess severity
   - Identify affected versions
   - Determine if actively exploited

2. **Containment** (within 24 hours for critical)
   - Deploy hotfix to production
   - Notify affected users (if any)
   - Document incident

3. **Remediation** (within 7 days)
   - Root cause analysis
   - Implement comprehensive fix
   - Add regression tests

4. **Post-Incident** (within 14 days)
   - Public disclosure (if external report)
   - Update security documentation
   - Implement preventive measures

---

## Security Testing

### Current Testing

**Static Analysis**:
- ESLint with security plugins (planned)
- TypeScript strict mode (enabled)
- Dependency audits (`pnpm audit`)

**Manual Testing**:
- Security header verification (browser DevTools)
- CSP policy validation (CSP Evaluator)
- Environment variable validation (build-time)

### Planned Testing

**Automated Security Tests**:
- OWASP ZAP scan (on each deployment)
- Lighthouse security audit (CI/CD)
- npm audit in pre-commit hook

**Penetration Testing**:
- Self-assessment using OWASP Top 10 checklist
- Third-party security audit (if budget allows)
- Bug bounty program (future consideration)

---

## Compliance & Privacy

### Data Collection

**What We Collect**:
- Newsletter subscribers: Email addresses only
- Analytics: Anonymous page views, user agent, referrer (optional)
- Logs: IP addresses in Vercel logs (7-day retention)

**What We Don't Collect**:
- No authentication (no passwords stored)
- No payment information (affiliate income only)
- No personal identification beyond email
- No tracking cookies (analytics only)

### GDPR Compliance

**Data Subject Rights**:
- Right to access: Email security@lifeistempo.com
- Right to deletion: Unsubscribe link in newsletters
- Right to portability: Email addresses exportable

**Legal Basis**:
- Newsletter: Consent (double opt-in)
- Analytics: Legitimate interest (anonymous)

**Data Retention**:
- Newsletter emails: Until unsubscribe
- Analytics: 26 months (Google Analytics default)
- Logs: 7 days (Vercel default)

### Cookie Policy

**Current Cookies** (optional, based on configuration):
- Google Analytics: `_ga`, `_gid` (third-party analytics)
- Vercel Analytics: Minimal, privacy-focused

**Cookie Banner**: Not required (no tracking cookies without consent)

**Future Consideration**: Add cookie consent banner if adding more tracking

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables validated (`pnpm build` succeeds)
- [ ] Security headers configured (`next.config.ts`)
- [ ] No secrets in git history (`git log --all -- '*.env*'`)
- [ ] Dependencies updated (`pnpm update`)
- [ ] Security audit clean (`pnpm audit --audit-level=high`)

### Post-Deployment

- [ ] HTTPS working (https://lifeistempo.com)
- [ ] Security headers present (check with https://securityheaders.com)
- [ ] CSP policy enforced (check browser console)
- [ ] Dependabot enabled (GitHub repository settings)
- [ ] Secret scanning enabled (GitHub repository settings)

### Regular Maintenance

**Weekly**:
- [ ] Review Dependabot PRs
- [ ] Check Vercel deployment logs for errors

**Monthly**:
- [ ] Update dependencies (`pnpm update`)
- [ ] Security audit (`pnpm audit`)
- [ ] Review CSP policy (add new domains if needed)

**Quarterly**:
- [ ] Review and update security documentation
- [ ] Test incident response plan
- [ ] Review access controls (GitHub collaborators)

---

## Known Security Considerations

### External Service Dependencies

**Newsletter Service (Loops.so / Resend)**:
- **Risk**: Service compromise could leak email addresses
- **Mitigation**: Choose reputable providers, review security policies
- **Action**: Minimal data sharing (email only, no additional metadata)

**Google Analytics**:
- **Risk**: Third-party tracking, potential privacy concerns
- **Mitigation**: Anonymous analytics, no PII collected
- **Alternative**: Consider privacy-friendly alternatives (Plausible, Fathom)

**Vercel Platform**:
- **Risk**: Dependency on single hosting provider
- **Mitigation**: Static site generation (easy to migrate to any host)
- **Backup**: Git repository contains all source code and content

### Trade-offs & Accepted Risks

**`'unsafe-inline'` in CSP `style-src`**:
- **Risk**: Allows inline styles, potential XSS vector
- **Reason**: Required for Tailwind CSS (no nonce support in current setup)
- **Mitigation**: Strict CSP on scripts, no user-generated content
- **Future**: Consider nonce-based approach or CSS extraction

**No Rate Limiting Yet**:
- **Risk**: Potential abuse of API routes (when added)
- **Impact**: Low (no API routes yet, static site)
- **Plan**: Implement before adding newsletter signup

**Single Maintainer**:
- **Risk**: Security updates may be delayed
- **Mitigation**: Dependabot automates dependency updates
- **Action**: Monitor GitHub notifications daily

---

## Security Contact

**Reporting Vulnerabilities**:
- Email: security@lifeistempo.com
- GitHub: https://github.com/juancmandev/life-is-tempo/security

**General Inquiries**:
- GitHub Issues: https://github.com/juancmandev/life-is-tempo/issues

---

## Related Documentation

- [System Overview](./system-overview.md) - High-level architecture
- [SECURITY.md](../../SECURITY.md) - Public security policy
- [SECURITY_CHECKLIST.md](../../SECURITY_CHECKLIST.md) - Security verification checklist
- [Environment Variables](../deployment/environment-variables.md) - Configuration guide

---

**Last Reviewed**: 2026-02-11
