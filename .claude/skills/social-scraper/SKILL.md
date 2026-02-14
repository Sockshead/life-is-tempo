---
name: social-scraper
version: 1.0.0
description: Scrape social media for inspiration and analytics - dual mode operation
tags: [social-media, scraping, content-intelligence, automation]
disable-model-invocation: true
---

# Social Media Intelligence Scraper

Bi-directional social media integration: monitors curated inspiration sources AND tracks your own account performance.

**Note**: This skill uses `disable-model-invocation: true`. Code examples throughout this file are conceptual flows that guide Claude's interpretation when the skill is invoked. They are not executable code.

## Dual Mode Operation

### Mode 1: Own Account Analytics
Fetches **your** posts for performance tracking:
- Recent posts (configurable days, default 7)
- Engagement metrics (likes, comments, shares, views)
- Best performing content analysis
- Audience insights and patterns
- Output: `content/analytics/{YYYY-MM-DD}.md`

### Mode 2: Inspiration Sources
Monitors **curated accounts** for trending content:
- Top posts by engagement from inspiration sources
- Emerging topics and hashtags
- Content formats that work (videos, carousels, threads)
- Cross-platform trend analysis
- Output: `content/inspiration/{YYYY-MM-DD}.md`

## Configuration Files

### config.json - Account Setup
```json
{
  "own_accounts": {
    "threads": "@ultra.choko",
    "twitter": "@ultrachoko",
    "instagram": "ultra.choko",
    "tiktok": "ultrachoko"
  },
  "inspiration_sources": {
    "athletes": ["@ironman703", "@berlinrunners"],
    "techno_culture": ["@berghain", "@djsets"],
    "dual_life": ["@productivity_athletes"],
    "agency_work": ["@designinspo"]
  },
  "output": {
    "inspiration_dir": "content/inspiration",
    "analytics_dir": "content/analytics"
  }
}
```

### inspiration-sources.json - Categorized Accounts
Detailed categorization of inspiration accounts for organized scraping.

## Usage

```bash
# Fetch both modes (default)
/social-scraper

# Only your own account analytics
/social-scraper --mode=own

# Only inspiration sources
/social-scraper --mode=inspiration

# Scrape past 14 days instead of 7
/social-scraper --days=14

# Test mode (dry run, no file writes)
/social-scraper --test
```

## How It Works

### Step 1: Load Configuration
```typescript
const config = JSON.parse(readFile('.claude/skills/social-scraper/config.json'))
const sources = JSON.parse(readFile('.claude/skills/social-scraper/inspiration-sources.json'))
```

### Step 2: Initialize Playwright MCP
```typescript
// Load Playwright MCP tools
ToolSearch('select:mcp__plugin_playwright_playwright__browser_navigate')
ToolSearch('select:mcp__plugin_playwright_playwright__browser_snapshot')
ToolSearch('select:mcp__plugin_playwright_playwright__browser_take_screenshot')
```

### Step 3A: Scrape Own Accounts (if --mode=own or default)
```typescript
for (const [platform, username] of Object.entries(config.own_accounts)) {
  // Navigate to profile
  await mcp__plugin_playwright_playwright__browser_navigate({
    url: getPlatformURL(platform, username)
  })

  // Capture recent posts
  const snapshot = await mcp__plugin_playwright_playwright__browser_snapshot()

  // Extract engagement metrics
  const metrics = parseEngagementMetrics(snapshot, platform)

  // Store in analytics array
  analyticsData.push({
    platform,
    username,
    metrics,
    topPosts: metrics.sort((a, b) => b.engagement - a.engagement).slice(0, 5)
  })
}
```

### Step 4B: Scrape Inspiration Sources (if --mode=inspiration or default)
```typescript
for (const [category, accounts] of Object.entries(sources)) {
  for (const account of accounts) {
    // Navigate to account
    await mcp__plugin_playwright_playwright__browser_navigate({
      url: getPlatformURL(detectPlatform(account), account)
    })

    // Capture top posts
    const snapshot = await mcp__plugin_playwright_playwright__browser_snapshot()

    // Extract trending content
    const trendingPosts = extractTopPosts(snapshot, days)

    // Store in inspiration array
    inspirationData.push({
      category,
      account,
      trendingPosts,
      topics: extractHashtags(trendingPosts),
      formats: analyzeFormats(trendingPosts)
    })
  }
}
```

### Step 5: Generate Output Files
```typescript
const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD

// Write analytics report
if (analyticsData.length > 0) {
  const analyticsReport = generateAnalyticsReport(analyticsData, date)
  writeFile(`${config.output.analytics_dir}/${date}.md`, analyticsReport)
}

// Write inspiration briefing
if (inspirationData.length > 0) {
  const inspirationBrief = generateInspirationBrief(inspirationData, date)
  writeFile(`${config.output.inspiration_dir}/${date}.md`, inspirationBrief)
}
```

## Output Templates

### Analytics Report (content/analytics/{date}.md)
```markdown
# Social Media Analytics - {date}

## Performance Summary
- Total Posts: {count}
- Total Engagement: {sum}
- Avg Engagement Rate: {percentage}

## Best Performing Content

### Threads (@ultra.choko)
1. **Post Title/Excerpt**
   - Engagement: {likes + comments + shares}
   - Posted: {timestamp}
   - Why it worked: {brief analysis}

## Insights & Patterns
- Time of day: {best posting times}
- Content types: {what formats performed best}
- Topics: {which themes got most engagement}

## Recommendations
- Double down on: {successful patterns}
- Experiment with: {underutilized opportunities}
- Avoid: {low-performing approaches}
```

### Inspiration Briefing (content/inspiration/{date}.md)
```markdown
# Content Inspiration - {date}

## Trending Topics

### Athletes
- **Topic 1:** {description}
  - Source: @ironman703
  - Engagement: {metrics}
  - Format: {video/carousel/thread}
  - Unique angle: {what made it stand out}

### Techno Culture
- **Topic 1:** {description}
  - Source: @berghain
  - Engagement: {metrics}

## Cross-Platform Trends
- {pattern observed across multiple sources}

## Content Ideas for Life is Tempo
1. **{Topic}** (Category: {dual-life/training/underground})
   - Inspiration: Combine {source 1 insight} + {source 2 insight}
   - Unique value: {your agency expertise angle}
   - Format: {recommended approach}

## Hashtag Analysis
- Rising: {emerging hashtags}
- Stable: {consistently popular}
- Declining: {avoid these}
```

## Error Handling

### Rate Limiting
```typescript
if (rateLimitDetected) {
  log.warn(`Rate limit hit on ${platform}. Skipping for now.`)
  log.warn(`Recommendation: Upgrade to official API for ${platform}`)
  continue // Skip to next account
}
```

### Network Failures
```typescript
try {
  await mcp__plugin_playwright_playwright__browser_navigate({ url })
} catch (error) {
  log.error(`Failed to load ${url}: ${error.message}`)
  log.warn(`Retrying in 5 seconds...`)
  await sleep(5000)
  // Retry logic with exponential backoff
}
```

### Missing Configuration
```typescript
if (!config.own_accounts || Object.keys(config.own_accounts).length === 0) {
  log.warn('No own accounts configured. Set them in config.json')
  log.warn('Only inspiration mode will run.')
  mode = 'inspiration' // Force inspiration-only mode
}
```

## Platform-Specific Notes

### Threads
- Login required for API access
- Use Playwright for free scraping
- Rate limit: ~50 requests/hour

### Twitter/X
- Public profiles accessible
- Rate limit: ~100 requests/15min (unauthenticated)
- Consider upgrading to API for higher limits

### Instagram
- Public profiles only via Playwright
- Rate limit: strict, use sparingly
- Photos/videos load lazily (scroll to trigger)

### TikTok
- Public "For You" page accessible
- Rate limit: ~30 requests/hour
- Video previews auto-play (wait for load)

## Integration with Other Skills

### → /content-briefing
Analyzes output from this skill to generate topic suggestions:
```bash
/social-scraper  # Generate today's data
/content-briefing  # Analyze past 7 days of scraped data
```

### → /ghostwriter
Use insights to inform content creation:
```bash
# After reviewing briefing
/ghostwriter --persona=ultra-choko --topic="topic from briefing" --category=dual-life
```

### → /post-to-social
Track performance of published content:
```bash
/post-to-social --file=content/posts/en/my-post.mdx
# Next day
/social-scraper --mode=own  # See how it performed
```

## Future Enhancements (Phase 2)

When upgrading to official APIs:
1. Replace Playwright calls with API endpoints
2. Add authentication tokens to config.json
3. Access richer analytics (impressions, demographics)
4. Enable posting functionality (not just scraping)

Example API upgrade:
```typescript
// Phase 2: Official Twitter API v2
const client = new TwitterApi(process.env.TWITTER_API_KEY)
const timeline = await client.v2.userTimeline(username, { max_results: 50 })
```

## Troubleshooting

### "No Playwright MCP tools found"
→ Ensure mcp.json has playwright server configured
→ Restart Claude Code to reload MCP servers

### "Failed to navigate to URL"
→ Check internet connection
→ Verify URL is correct and publicly accessible
→ Platform may be blocking automated access (try with delay)

### "Empty analytics/inspiration file"
→ Check if accounts are public
→ Verify config.json has correct usernames
→ Platform may have changed HTML structure (update selectors)

### "Rate limit exceeded"
→ Reduce scraping frequency (increase days between runs)
→ Scrape fewer accounts per run
→ Consider upgrading to official API

## Best Practices

1. **Respect Rate Limits**
   - Don't scrape same account multiple times per day
   - Add delays between requests (2-5 seconds)
   - Cache results to avoid duplicate fetches

2. **Data Privacy**
   - Only scrape public profiles
   - Don't store personal info from comments
   - Respect platform terms of service

3. **Automation**
   - Run daily via Task Scheduler (8 AM recommended)
   - Review outputs weekly to ensure quality
   - Adjust inspiration sources monthly based on relevance

4. **Incremental Approach**
   - Start with 2-3 accounts per category
   - Add more sources as you validate value
   - Remove sources that consistently produce low-quality insights

## Success Metrics

After 30 days of daily scraping:
- ✅ 30 analytics reports generated
- ✅ 30 inspiration briefings generated
- ✅ Identified 3+ high-performing content patterns
- ✅ Generated 10+ blog topic ideas from inspiration
- ✅ Zero rate limit violations
- ✅ All configured platforms scraped successfully

## Dependencies

**Required:**
- Playwright MCP server (configured in .claude/mcp.json)
- config.json (account configuration)
- inspiration-sources.json (curated account lists)

**Optional:**
- templates/analytics-output.md (custom analytics format)
- templates/inspiration-output.md (custom inspiration format)

**Output Directories:**
- content/inspiration/ (auto-created if missing)
- content/analytics/ (auto-created if missing)

## Related Skills

- `/content-briefing` - Analyzes scraped data to suggest topics
- `/ghostwriter` - Uses insights to create content
- `/post-to-social` - Cross-posts published content
- `/brainstorming` - Combines scraping insights with creative ideation
