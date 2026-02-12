---
skill: content-pages
description: Build About and Contact pages for Life Is Tempo
version: 1.0.0
tags: [nextjs, pages, forms, content]
dependencies: [core-ui-components, metrics-display, layout-components]
---

# Content Pages

Build About and Contact pages.

**Full specification**: C:\Users\juanc\.claude\plans\staged-enchanting-island.md

## Pages
1. `/[locale]/about` - About page with mission, metrics, social links
2. `/[locale]/contact` - Contact form with validation

## Features
- Contact form: Name, email, subject, message
- Security: Honeypot, rate limiting (lib/security.ts)
- Real-time validation
- Success/error toasts
- About metrics: Race stats, BPM ranges
