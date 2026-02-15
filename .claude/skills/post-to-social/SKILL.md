---
name: post-to-social
version: 1.0.0
description: Cross-post published blog content to social platforms with platform-specific adaptations
tags: [social-media, distribution, automation, cross-posting]
disable-model-invocation: true
---

# Post to Social Media

Automatically cross-posts published blog content to social platforms with intelligent tone/format adaptation for each platform. Transforms long-form blog posts into platform-optimized snippets while maintaining voice consistency.

## Purpose

Takes a published blog post and:
- Extracts key insights and hooks
- Adapts tone/format per platform (Threads, X/Twitter, Instagram, LinkedIn)
- Generates platform-specific captions with optimal length
- Includes relevant hashtags and CTAs
- Schedules optimal posting times (based on analytics)
- Tracks engagement after posting

## Platforms Supported

### Threads (@ultra.choko)
- **Max length:** 500 characters
- **Tone:** Conversational, authentic, personal
- **Format:** Story-driven, vulnerability, relatability
- **Best for:** Personal insights, behind-the-scenes, community

### X/Twitter (@ultrachoko)
- **Max length:** 280 characters (or thread up to 10 tweets)
- **Tone:** Punchy, thought-provoking, quotable
- **Format:** Hook + insight + CTA, or threaded narrative
- **Best for:** Hot takes, quick tips, debate starters

### Instagram (@ultra.choko)
- **Caption length:** 2200 characters (first 125 visible)
- **Tone:** Inspirational, visual-first, aesthetic
- **Format:** Hook in first line, storytelling, emoji-friendly
- **Best for:** Training photos, race moments, visual stories

### LinkedIn (professional profile)
- **Max length:** 3000 characters
- **Tone:** Professional, value-driven, thought leadership
- **Format:** Insight + context + takeaway, paragraph breaks
- **Best for:** Career lessons, technical deep-dives, case studies

## How It Works

### Step 1: Load Blog Post

```typescript
// Accept file path as parameter
const postPath = args.file // e.g., "content/posts/en/my-post.mdx"
const postContent = readFile(postPath)

// Parse frontmatter
const { frontmatter, content } = parseMDX(postContent)

// Extract metadata
const metadata = {
  title: frontmatter.title,
  category: frontmatter.category,
  description: frontmatter.description,
  slug: frontmatter.slug,
  publishDate: frontmatter.date,
  keywords: frontmatter.keywords || [],
  series: frontmatter.series || null
}
```

### Step 2: Extract Key Insights

```typescript
// Identify the most shareable sections
const insights = extractShareableContent(content)

function extractShareableContent(markdown) {
  return {
    hook: extractFirstParagraph(markdown), // Opening hook
    keyPoints: extractBulletPoints(markdown), // Main takeaways
    quotes: extractBlockquotes(markdown), // Quotable moments
    stories: extractPersonalAnecdotes(markdown), // Story snippets
    data: extractMetrics(markdown), // BPM, pace, stats
    cta: extractFinalParagraph(markdown) // Call to action
  }
}
```

### Step 3: Generate Platform-Specific Adaptations

```typescript
const adaptations = {
  threads: adaptForThreads(insights, metadata),
  twitter: adaptForTwitter(insights, metadata),
  instagram: adaptForInstagram(insights, metadata),
  linkedin: adaptForLinkedIn(insights, metadata)
}

// Example: Threads adaptation
function adaptForThreads(insights, metadata) {
  // Threads = conversational, personal, story-driven

  const template = `${insights.hook}

${insights.stories[0] || insights.keyPoints[0]}

${metadata.category === 'training' ? '💪' : metadata.category === 'underground' ? '🎵' : '🧠'}

Read the full story: ${getBlogURL(metadata.slug)}`

  return {
    caption: template.slice(0, 500), // Enforce 500 char limit
    hashtags: selectHashtags(metadata.keywords, 3), // Max 3 for Threads
    tone: 'personal',
    estimatedEngagement: predictEngagement('threads', metadata.category)
  }
}

// Example: Twitter thread adaptation
function adaptForTwitter(insights, metadata) {
  // Twitter = punchy, quotable, threaded narrative

  const tweets = []

  // Tweet 1: Hook
  tweets.push(`${insights.hook.slice(0, 240)}

🧵 Thread 👇`)

  // Tweet 2-4: Key points
  insights.keyPoints.slice(0, 3).forEach((point, i) => {
    tweets.push(`${i + 2}/ ${point}`)
  })

  // Final tweet: CTA
  tweets.push(`Read the full breakdown:
${getBlogURL(metadata.slug)}

${selectHashtags(metadata.keywords, 2).join(' ')}`)

  return {
    tweets: tweets,
    threadLength: tweets.length,
    tone: 'punchy',
    estimatedEngagement: predictEngagement('twitter', metadata.category)
  }
}

// Example: Instagram caption
function adaptForInstagram(insights, metadata) {
  // Instagram = visual-first, inspirational, emoji-rich

  const emoji = getCategoryEmoji(metadata.category)

  const caption = `${emoji} ${insights.hook}

${insights.stories[0] || insights.quotes[0]}

${insights.keyPoints.slice(0, 2).map(p => `• ${p}`).join('\n')}

Link in bio for the full story 🔗

${selectHashtags(metadata.keywords, 10).join(' ')}`

  return {
    caption: caption.slice(0, 2200),
    firstLine: caption.slice(0, 125), // Preview
    hashtags: selectHashtags(metadata.keywords, 10),
    tone: 'inspirational',
    visualSuggestion: suggestImage(metadata.category),
    estimatedEngagement: predictEngagement('instagram', metadata.category)
  }
}

// Example: LinkedIn post
function adaptForLinkedIn(insights, metadata) {
  // LinkedIn = professional, value-driven, structured

  const post = `${metadata.title}

${insights.hook}

Key Takeaways:
${insights.keyPoints.slice(0, 3).map(p => `\n• ${p}`).join('')}

${insights.cta}

Read the full article: ${getBlogURL(metadata.slug)}

${selectHashtags(metadata.keywords, 3).join(' ')}`

  return {
    caption: post.slice(0, 3000),
    tone: 'professional',
    estimatedEngagement: predictEngagement('linkedin', metadata.category)
  }
}
```

### Step 4: Optimal Timing (from Analytics)

```typescript
// Load analytics to determine best posting time
const recentAnalytics = loadRecentAnalytics(7) // Last 7 days

function calculateOptimalTime(platform, category) {
  const performanceByTime = analyzePostingTimes(recentAnalytics, platform)

  // Find time slot with highest avg engagement
  const bestTime = performanceByTime.sort((a, b) =>
    b.avgEngagement - a.avgEngagement
  )[0]

  return {
    dayOfWeek: bestTime.day,
    hour: bestTime.hour,
    timezone: 'Europe/Berlin',
    confidence: bestTime.sampleSize > 5 ? 'high' : 'medium'
  }
}
```

### Step 5: Generate Publishing Plan

```typescript
const publishingPlan = {
  postTitle: metadata.title,
  blogURL: getBlogURL(metadata.slug),
  platforms: [
    {
      name: 'Threads',
      caption: adaptations.threads.caption,
      hashtags: adaptations.threads.hashtags,
      scheduledTime: calculateOptimalTime('threads', metadata.category),
      status: 'ready'
    },
    {
      name: 'Twitter',
      tweets: adaptations.twitter.tweets,
      threadLength: adaptations.twitter.threadLength,
      scheduledTime: calculateOptimalTime('twitter', metadata.category),
      status: 'ready'
    },
    {
      name: 'Instagram',
      caption: adaptations.instagram.caption,
      hashtags: adaptations.instagram.hashtags,
      visualSuggestion: adaptations.instagram.visualSuggestion,
      scheduledTime: calculateOptimalTime('instagram', metadata.category),
      status: 'needs_image'
    },
    {
      name: 'LinkedIn',
      caption: adaptations.linkedin.caption,
      scheduledTime: calculateOptimalTime('linkedin', metadata.category),
      status: 'ready'
    }
  ]
}
```

### Step 6: Output Publishing Instructions

```typescript
// Generate markdown report with copy-paste ready captions
const report = generatePublishingReport(publishingPlan)
writeFile(`content/social-posts/${metadata.slug}.md`, report)

// Also log to console for immediate use
console.log(report)
```

## Output Format

```markdown
# Social Media Distribution Plan

**Post:** {title}
**URL:** {blog_url}
**Published:** {date}
**Category:** {category}

---

## 🧵 Threads (@ultra.choko)

**Scheduled Time:** {day} at {time} (Europe/Berlin)
**Estimated Engagement:** {prediction}

**Caption:**
```
{caption_text}

{hashtags}
```

**Character Count:** {count}/500

---

## 🐦 X/Twitter (@ultrachoko)

**Scheduled Time:** {day} at {time} (Europe/Berlin)
**Thread Length:** {count} tweets
**Estimated Engagement:** {prediction}

**Tweet 1:**
```
{tweet_1_text}
```

**Tweet 2:**
```
{tweet_2_text}
```

**Tweet 3:**
```
{tweet_3_text}
```

{...remaining tweets}

**Final Tweet:**
```
{final_tweet_with_link}
```

---

## 📸 Instagram (@ultra.choko)

**Scheduled Time:** {day} at {time} (Europe/Berlin)
**Estimated Engagement:** {prediction}
**Visual Suggestion:** {image_type}

**Caption:**
```
{caption_text}

{hashtags}
```

**First 125 chars (preview):**
> {preview_text}

**Character Count:** {count}/2200

---

## 💼 LinkedIn (Professional Profile)

**Scheduled Time:** {day} at {time} (Europe/Berlin)
**Estimated Engagement:** {prediction}

**Post:**
```
{linkedin_post}
```

**Character Count:** {count}/3000

---

## 📊 Engagement Tracking

Check back in 24/48 hours to measure performance:

| Platform | Predicted | Actual | Variance |
|----------|-----------|--------|----------|
| Threads  | {est} | - | - |
| Twitter  | {est} | - | - |
| Instagram | {est} | - | - |
| LinkedIn | {est} | - | - |

**Next Steps:**
1. Copy captions to respective platforms
2. Schedule posts for optimal times
3. Track engagement after 24h
4. Update analytics with actual performance

---

**Generated by:** /post-to-social skill
**Next:** Run /social-scraper tomorrow to track results
```

## Usage

```bash
# Generate social posts for a published blog post
/post-to-social --file=content/posts/en/my-post.mdx

# Generate for Spanish version
/post-to-social --file=content/posts/es/mi-post.mdx

# Skip specific platforms
/post-to-social --file=content/posts/en/my-post.mdx --platforms=threads,twitter

# Dry run (preview only, no file write)
/post-to-social --file=content/posts/en/my-post.mdx --preview
```

## Platform-Specific Optimizations

### Hashtag Strategy

```typescript
function selectHashtags(keywords, maxCount) {
  // Priority order:
  // 1. Brand hashtags (always include)
  const brandHashtags = ['#LifeIsTempo', '#DualLife']

  // 2. Category-specific
  const categoryHashtags = {
    training: ['#IronmanTraining', '#Triathlon', '#EnduranceAthlete'],
    'dual-life': ['#WorkLifeBalance', '#AthleteLife', '#ProductivityHacks'],
    underground: ['#TechnoMusic', '#BerlinNights', '#UndergroundCulture']
  }

  // 3. Trending hashtags (from recent analytics)
  const trendingHashtags = getRecentTrendingHashtags()

  // Combine and deduplicate
  const allHashtags = [...brandHashtags, ...categoryHashtags[category], ...trendingHashtags]

  // Return top N by relevance score
  return allHashtags.slice(0, maxCount)
}
```

### Tone Adaptation Logic

```typescript
const toneProfiles = {
  threads: {
    voice: 'conversational',
    pronouns: 'I/you',
    sentenceLength: 'medium',
    emotionalDepth: 'high',
    vulnerability: 'yes',
    emojis: 'minimal (1-2 per post)'
  },
  twitter: {
    voice: 'punchy',
    pronouns: 'I/you',
    sentenceLength: 'short',
    emotionalDepth: 'medium',
    vulnerability: 'selective',
    emojis: 'strategic (hooks only)'
  },
  instagram: {
    voice: 'inspirational',
    pronouns: 'I/we',
    sentenceLength: 'varied',
    emotionalDepth: 'high',
    vulnerability: 'yes',
    emojis: 'generous (3-5 per post)'
  },
  linkedin: {
    voice: 'professional',
    pronouns: 'I/we',
    sentenceLength: 'long',
    emotionalDepth: 'medium',
    vulnerability: 'professional only',
    emojis: 'none or minimal'
  }
}
```

## Integration Workflow

```bash
# Full content pipeline
1. /ghostwriter --topic="compression and consciousness" --persona=ultra-choko
2. /review-draft content/posts/en/my-draft.mdx
3. # Revise based on feedback
4. git commit -m "feat(blog): add consciousness post"
5. git push origin feature/my-post
6. # After merge & deploy
7. /post-to-social --file=content/posts/en/compression-consciousness.mdx
8. # Copy captions to platforms
9. # Next day
10. /social-scraper --mode=own  # Track engagement
```

## Future Enhancements (Phase 2)

### Automated Posting (with Official APIs)

```typescript
// Phase 2: Auto-post via APIs
async function autoPost(platform, content, scheduledTime) {
  switch (platform) {
    case 'threads':
      // Threads API (when available)
      await threadsAPI.post(content.caption)
      break

    case 'twitter':
      // Twitter API v2
      const client = new TwitterApi(process.env.TWITTER_API_KEY)
      if (content.tweets.length > 1) {
        await client.v2.tweetThread(content.tweets)
      } else {
        await client.v2.tweet(content.tweets[0])
      }
      break

    case 'instagram':
      // Meta Graph API
      await metaAPI.createPost({
        caption: content.caption,
        image_url: content.imageURL
      })
      break

    case 'linkedin':
      // LinkedIn API
      await linkedInAPI.createPost({
        author: `urn:li:person:${userId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content.caption }
          }
        }
      })
      break
  }
}
```

### A/B Testing

```typescript
// Generate multiple caption variants
const variants = {
  threadA: generateCaption({ hook: 'question', cta: 'strong' }),
  threadB: generateCaption({ hook: 'story', cta: 'soft' })
}

// Post variant A on Monday, variant B on Tuesday
// Track which performs better
```

### Performance Prediction Model

```typescript
// ML-based engagement prediction
function predictEngagement(platform, category, content) {
  // Train model on historical data
  const model = trainModel(historicalAnalytics)

  // Feature extraction
  const features = {
    wordCount: content.length,
    sentimentScore: analyzeSentiment(content),
    hashtagCount: content.hashtags.length,
    hasQuestion: content.includes('?'),
    hasNumbers: /\d+/.test(content),
    category: category,
    platform: platform,
    dayOfWeek: getDayOfWeek(),
    timeOfDay: getHour()
  }

  // Predict
  return model.predict(features)
}
```

## Troubleshooting

### "No blog post found at path"
→ Check file path is relative to project root
→ Ensure file has .mdx extension

### "Failed to parse frontmatter"
→ Verify frontmatter has required fields (title, description, category)
→ Check YAML syntax is valid

### "Hashtags not relevant"
→ Update keywords in post frontmatter
→ Customize hashtag strategy in selectHashtags()

## Best Practices

1. **Timing Matters**
   - Use analytics to find optimal posting times
   - Stagger posts across platforms (don't post all at once)
   - Consider time zone of target audience

2. **Platform-Native Feel**
   - Don't copy-paste same caption everywhere
   - Respect platform culture and norms
   - Match tone to platform expectations

3. **CTA Optimization**
   - Threads: Conversational question
   - Twitter: Direct link
   - Instagram: "Link in bio"
   - LinkedIn: "Read full article"

4. **Engagement Tracking**
   - Always track results after 24/48 hours
   - Feed data back to /social-scraper analytics
   - Iterate based on performance

## Success Metrics

After 30 days of cross-posting:
- ✅ Published 8+ blog posts
- ✅ Generated 32+ social posts (4 platforms × 8 posts)
- ✅ Identified best-performing platform per category
- ✅ Optimized posting times based on data
- ✅ 20%+ increase in blog traffic from social referrals

## Related Skills

- `/ghostwriter` - Creates the blog content to distribute
- `/social-scraper` - Tracks engagement after posting
- `/content-briefing` - Informs topics that perform well

---

**Philosophy:**

> "One piece of content, infinite distribution angles. This skill ensures your hard work on blog posts doesn't end at publish—it amplifies reach across every platform where your audience lives."
