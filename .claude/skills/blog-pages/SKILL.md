---
skill: blog-pages
description: Build blog index and post pages for Life Is Tempo
version: 1.0.0
tags: [nextjs, pages, blog, routing]
dependencies: [blog-infrastructure, mdx-content-system]
---

# Blog Pages

Build Next.js pages for blog content.

**Full specification**: C:\Users\juanc\.claude\plans\staged-enchanting-island.md

## Pages
1. `/[locale]/blog` - Blog index with category filter
2. `/[locale]/blog/[slug]` - Individual post page
3. `/[locale]/blog/[category]` - Category archive

## Features
- Static generation with ISR
- SEO metadata (Open Graph, Twitter Cards)
- Bilingual support (EN/ES)
- Category filtering
- Related posts
