---
skill: blog-infrastructure
description: Build blog post display and navigation components for Life Is Tempo
version: 1.0.0
tags: [blog, content, react, mdx]
dependencies: [design-system-architect, core-ui-components]
---

# Blog Infrastructure

Build components for displaying blog content - post cards, category filters, featured posts.

See orchestration plan for full details: C:\Users\juanc\.claude\plans\staged-enchanting-island.md

## Quick Reference

**Components to build**:
1. PostCard (3 variants: default, featured, compact)
2. CategoryFilter (tab navigation)
3. RelatedPosts (3-column grid)
4. ReadingProgress (top bar)
5. TableOfContents (sidebar)

**Key Patterns**:
- Category colors: training=purple, dual-life=blue, underground=cyan
- Card hover: -translate-y-1 + glow
- Typography: Bebas titles, Mono excerpts
