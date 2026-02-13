# Content Authoring Guide

**Last Updated**: 2026-02-11

---

## Overview

Life Is Tempo uses **MDX** (Markdown + JSX) for blog content. This guide covers writing, organizing, and publishing blog posts in both English and Spanish.

**What is MDX?**
- Markdown for text formatting (headings, lists, links, etc.)
- JSX for React components (custom UI elements, interactive widgets)
- Frontmatter for metadata (title, date, category, etc.)

---

## Content Structure

### Directory Organization

```
content/
├── en/                           # English content
│   └── posts/
│       ├── 2026-02-11-training-week-1.mdx
│       ├── 2026-02-18-techno-recovery.mdx
│       └── 2026-02-25-dual-life-balance.mdx
└── es/                           # Spanish content
    └── posts/
        ├── 2026-02-11-semana-entrenamiento-1.mdx
        ├── 2026-02-18-recuperacion-techno.mdx
        └── 2026-02-25-equilibrio-vida-dual.mdx
```

**File Naming Convention**:
```
YYYY-MM-DD-slug.mdx
```

**Examples**:
- `2026-02-11-first-70-3-training-session.mdx`
- `2026-02-11-primera-sesion-entrenamiento-70-3.mdx` (Spanish)

**Best Practices**:
- Date: ISO format (YYYY-MM-DD)
- Slug: Lowercase, hyphens, descriptive
- Same date for translated versions
- Different slugs for different languages

---

## Frontmatter Schema

### Required Fields

```yaml
---
title: "Post Title (60 chars max for SEO)"
date: "2026-02-11"
author: "Ultra Choko"
category: "training-chronicles"
tags: ["training", "running", "colombia"]
excerpt: "Brief 1-2 sentence summary for preview cards..."
---
```

### Optional Fields

```yaml
---
# Optional fields
image: "/images/posts/2026-02-11-training-week-1.jpg"
imageAlt: "Runner training at sunrise in Bogotá"
published: true  # Set to false for drafts
featured: false  # Set to true for homepage feature
readingTime: 5   # Minutes (auto-calculated if omitted)
---
```

### Complete Example

```yaml
---
title: "Training Week 1: Getting Started with 70.3 Prep"
date: "2026-02-11"
author: "Ultra Choko"
category: "training-chronicles"
tags: ["training", "triathlon", "70.3", "colombia", "berlin"]
excerpt: "First week of structured training for Berlin 70.3 from Bogotá. Learning to balance altitude training with techno nights."
image: "/images/posts/2026-02-11-training-week-1.jpg"
imageAlt: "Sunrise run in Bogotá with mountains in background"
published: true
featured: true
readingTime: 5
---
```

---

## Content Categories

### Training Chronicles (`training-chronicles`)

**Focus**: Training sessions, progress updates, race preparation

**Example Topics**:
- Weekly training logs
- Workout breakdowns (swim, bike, run)
- Nutrition experiments
- Race day experiences

**Tone**: Personal, reflective, data-driven

### Dual Life Tactics (`dual-life-tactics`)

**Focus**: Balancing training with techno culture, work-life integration

**Example Topics**:
- Recovery strategies after late nights
- Time management techniques
- Mental health and burnout prevention
- Productivity systems for athletes

**Tone**: Practical, tactical, how-to

### Underground Endurance (`underground-endurance`)

**Focus**: Techno culture, music, nightlife intersecting with athletic lifestyle

**Example Topics**:
- Berlin techno scene insights
- Music for training playlists
- Sleep optimization for night owls
- Cultural experiences in Colombia and Germany

**Tone**: Cultural commentary, storytelling, experiential

---

## Writing MDX Content

### Basic Markdown Syntax

```markdown
# Heading 1 (Reserved for post title in frontmatter)

## Heading 2 (Main sections)

### Heading 3 (Subsections)

**Bold text** and *italic text*

- Unordered list item
- Another item
  - Nested item

1. Ordered list
2. Second item

[Link text](https://example.com)

![Image alt text](/images/photo.jpg)

> Blockquote for emphasis or quotes

`Inline code` for commands or variables

\`\`\`typescript
// Code block with syntax highlighting
function example() {
  return "Hello World";
}
\`\`\`
```

### Custom React Components (Future)

**Callout Component**:
```mdx
<Callout type="info">
  💡 **Tip**: Start easy and build gradually!
</Callout>

<Callout type="warning">
  ⚠️ **Warning**: Don't skip recovery days!
</Callout>
```

**Stats Display**:
```mdx
<StatsCard>
  <Stat label="Distance" value="21 km" />
  <Stat label="Pace" value="5:30 /km" />
  <Stat label="Heart Rate" value="165 bpm" />
</StatsCard>
```

**Image Gallery**:
```mdx
<ImageGallery>
  <Image src="/images/training-1.jpg" alt="Morning run" />
  <Image src="/images/training-2.jpg" alt="Post-workout" />
  <Image src="/images/training-3.jpg" alt="Recovery meal" />
</ImageGallery>
```

**YouTube Embed**:
```mdx
<YouTubeEmbed videoId="dQw4w9WgXcQ" title="Training video" />
```

---

## Writing Workflow

### 1. Create New Post

```bash
# Navigate to project
cd A:/repositories/life-is-tempo

# Create English version
touch content/en/posts/$(date +%Y-%m-%d)-my-post-slug.mdx

# Create Spanish version (optional, can translate later)
touch content/es/posts/$(date +%Y-%m-%d)-mi-slug-articulo.mdx
```

### 2. Write Frontmatter

```yaml
---
title: "Your Post Title"
date: "2026-02-11"
author: "Ultra Choko"
category: "training-chronicles"
tags: ["training", "triathlon"]
excerpt: "Brief summary..."
published: false  # Draft mode
---
```

### 3. Write Content

```markdown
## Introduction

Write your opening paragraph...

## Main Content

### Subsection 1

Content here...

### Subsection 2

More content...

## Conclusion

Wrap up...
```

### 4. Add Images

```bash
# Place images in public directory
cp ~/Downloads/training-photo.jpg public/images/posts/2026-02-11-training-photo.jpg
```

**Reference in MDX**:
```markdown
![Training session](/images/posts/2026-02-11-training-photo.jpg)
```

**Or use Next.js Image component** (better performance):
```mdx
import Image from 'next/image';

<Image
  src="/images/posts/2026-02-11-training-photo.jpg"
  alt="Training session"
  width={800}
  height={600}
/>
```

### 5. Preview Locally

```bash
# Start dev server
pnpm dev

# Visit post URL:
# http://localhost:3000/en/posts/my-post-slug
# http://localhost:3000/es/posts/mi-slug-articulo
```

### 6. Publish

```yaml
---
# Set published to true
published: true
---
```

```bash
# Commit and push
git add content/
git commit -m "feat: add training week 1 post"
git push origin master
```

---

## Multi-Language Content

### Translation Workflow

**Option A: Write Both Simultaneously**

Good for:
- Short posts
- Fully bilingual authors
- Time-sensitive content

**Workflow**:
1. Write English version
2. Immediately write Spanish version
3. Commit both together

**Option B: Translate Later**

Good for:
- Long-form content
- Editing-heavy posts
- Using AI translation assistance

**Workflow**:
1. Write and publish English version
2. Use AI to draft Spanish translation
3. Edit translation for accuracy and tone
4. Publish Spanish version

### Translation Best Practices

**Do**:
- ✅ Translate meaning, not word-for-word
- ✅ Adapt cultural references (e.g., "Thanksgiving" → "Día de Acción de Gracias" with context)
- ✅ Use native-sounding idioms
- ✅ Maintain same tone (personal, technical, casual, etc.)

**Don't**:
- ❌ Use Google Translate without editing
- ❌ Translate technical terms unnecessarily (e.g., "triathlon" same in both languages)
- ❌ Change post structure between languages
- ❌ Omit sections in one language

### AI Translation Tools

**Recommended**:
- **Claude (Anthropic)**: Best for long-form, context-aware translation
- **GPT-4 (OpenAI)**: Good for technical content
- **DeepL**: Best free option (better than Google Translate)

**Example Prompt**:
```
Translate this blog post from English to Spanish for a Latin American audience.
Maintain the personal, conversational tone. Adapt cultural references where needed.
Keep technical terms in English where commonly used (e.g., "triathlon", "70.3").

[Paste English content]
```

---

## SEO Optimization

### Title Best Practices

**Length**: 50-60 characters (for Google search results)

**Format**:
```
Action/Topic: Specific Benefit or Detail
```

**Examples**:
- ✅ "Training Week 1: Getting Started with 70.3 Prep"
- ✅ "Dual Life: Balancing Techno Nights and Morning Runs"
- ❌ "My First Week" (too vague)
- ❌ "An Extremely Long Title That Will Get Cut Off In Search Results Because It Exceeds Character Limits"

### Excerpt Best Practices

**Length**: 120-160 characters (for meta description)

**Format**: Brief summary with keywords, enticing hook

**Examples**:
- ✅ "First week of structured training for Berlin 70.3 from Bogotá. Learning to balance altitude training with techno nights."
- ❌ "This is my first post about training." (too short, not descriptive)

### Tag Selection

**Best Practices**:
- Use 3-5 tags per post
- Mix broad and specific tags
- Consistent tag names (lowercase, singular)

**Example Tag Strategy**:
```yaml
tags: ["training", "triathlon", "colombia", "berlin", "70.3"]
# Broad: training, triathlon
# Location: colombia, berlin
# Specific: 70.3
```

### Internal Linking

**Add links to related posts**:
```markdown
Read more about [my nutrition strategy](/en/posts/nutrition-for-altitude-training).

See also: [Recovery techniques](/en/posts/recovery-techniques)
```

---

## Image Guidelines

### Image Specifications

| Use Case | Recommended Size | Format | Max File Size |
|----------|------------------|--------|---------------|
| Featured image | 1200x630px | WebP or JPG | 200 KB |
| In-content image | 800x600px | WebP or JPG | 150 KB |
| Gallery image | 600x400px | WebP or JPG | 100 KB |

### Optimization Tools

**Before Uploading**:
```bash
# Convert to WebP (best compression)
cwebp input.jpg -q 80 -o output.webp

# Or use online tools:
# - Squoosh.app (Google's image optimizer)
# - TinyPNG.com (lossy compression)
```

### Alt Text Best Practices

**Format**: Describe image content concisely (< 125 characters)

**Examples**:
- ✅ "Runner training at sunrise in Bogotá with Andes mountains in background"
- ✅ "Post-workout meal: quinoa bowl with avocado and grilled chicken"
- ❌ "image123.jpg" (not descriptive)
- ❌ "A picture showing the scene described earlier in text" (too vague)

### Copyright & Attribution

**Original Photos**: No attribution needed (your own photos)

**Stock Photos**: Include attribution if required

```markdown
![Description](/images/photo.jpg)
*Photo by [Photographer Name](https://unsplash.com/@username) on Unsplash*
```

---

## Code Blocks

### Syntax Highlighting

**Supported Languages**: JavaScript, TypeScript, Python, Bash, JSON, YAML, etc.

**Example**:
````markdown
```typescript
// TypeScript example
interface Training {
  distance: number;
  duration: string;
  intensity: 'easy' | 'moderate' | 'hard';
}

const todayTraining: Training = {
  distance: 10,
  duration: '1:00:00',
  intensity: 'moderate',
};
```
````

### Terminal Commands

```bash
# Use bash for terminal examples
pnpm install
pnpm dev
```

### Highlighting Lines

````markdown
```typescript {3-5}
function example() {
  // Normal line
  // Highlighted line
  // Highlighted line
  // Highlighted line
  // Normal line
}
```
````

---

## Publishing Checklist

### Pre-Publish

- [ ] Frontmatter complete and accurate
- [ ] Title SEO-optimized (50-60 chars)
- [ ] Excerpt written (120-160 chars)
- [ ] 3-5 relevant tags added
- [ ] Featured image added and optimized
- [ ] All images have descriptive alt text
- [ ] Internal links to related posts added
- [ ] Code blocks have syntax highlighting
- [ ] Spell-checked and proofread
- [ ] Preview looks good locally (`pnpm dev`)

### Post-Publish

- [ ] Verify post live on production URL
- [ ] Test all links (internal and external)
- [ ] Check images load correctly
- [ ] Verify mobile responsive design
- [ ] Share on social media (if applicable)
- [ ] Monitor analytics for engagement

---

## Content Ideas

### Training Chronicles

- Weekly training logs
- Race reports
- Workout breakdowns (swim/bike/run specifics)
- Gear reviews
- Injury prevention and recovery
- Nutrition experiments
- Mental training techniques

### Dual Life Tactics

- Time management strategies
- Sleep optimization for shift workers
- Productivity systems for athletes
- Balancing social life and training
- Travel tips for triathletes
- Work-from-home training schedules

### Underground Endurance

- Berlin techno scene guide
- Music and performance psychology
- Cultural commentary (Colombia vs Germany)
- Expat athlete experiences
- Nightlife and recovery strategies
- Community building in endurance sports

---

## Advanced Features (Future)

### Series Posts

**Link related posts together**:
```yaml
---
series: "Berlin 70.3 Journey"
seriesOrder: 1
---
```

**Render series navigation**:
```markdown
**Previous**: [Week 0: Planning](/posts/week-0-planning)
**Next**: [Week 2: Building Base](/posts/week-2-building-base)
```

### Interactive Components

**Embed Strava activities** (planned):
```mdx
<StravaEmbed activityId="123456789" />
```

**Interactive training calendar** (planned):
```mdx
<TrainingCalendar month="February" year="2026" />
```

### Newsletter Integration

**Add newsletter signup CTAs**:
```mdx
<NewsletterCTA>
  Get weekly training updates and techno culture insights!
</NewsletterCTA>
```

---

## Troubleshooting

### Post Not Appearing

**Check**:
1. `published: true` in frontmatter
2. Date not in future
3. File in correct directory (`content/en/posts/` or `content/es/posts/`)
4. File extension is `.mdx` not `.md`

### Markdown Not Rendering

**Check**:
1. Proper frontmatter delimiters (`---`)
2. No syntax errors in frontmatter (YAML formatting)
3. MDX components properly imported

### Images Not Loading

**Check**:
1. Image in `/public` directory
2. Path starts with `/` (e.g., `/images/photo.jpg` not `images/photo.jpg`)
3. File extension correct (case-sensitive on Linux)
4. File size < 1 MB (optimize if larger)

---

## Related Documentation

- [Getting Started Guide](./getting-started.md) - Development setup
- [Internationalization Guide](./internationalization.md) - Multi-language setup
- [System Architecture](../architecture/system-overview.md) - MDX content flow

---

**Last Updated**: 2026-02-11

**Need Help?**
- MDX Documentation: https://mdxjs.com
- Markdown Guide: https://www.markdownguide.org
- Project Issues: https://github.com/Sockshead/life-is-tempo/issues
