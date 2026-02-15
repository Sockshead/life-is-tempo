---
name: content-briefing
version: 1.0.0
description: Analyze scraped social data and generate ranked content ideas with unique value synthesis
tags: [content-strategy, analytics, topic-generation, automation]
disable-model-invocation: true
---

# Content Briefing Generator

Transforms raw social media intelligence into actionable content ideas. Analyzes 7 days of scraped data to identify trends, cross-reference with your performance patterns, and generate ranked topic suggestions with unique value angles.

## Purpose

Takes outputs from `/social-scraper` and produces:
- Trending topic analysis across inspiration sources
- Performance correlation with your own content
- Ranked content ideas aligned with blog categories
- Unique value synthesis (inspiration + your agency expertise)
- Publishing timeline recommendations

## How It Works

### Step 1: Load Scraped Data (Past 7 Days)

```typescript
const days = 7
const inspirationFiles = []
const analyticsFiles = []

// Load inspiration briefings
for (let i = 0; i < days; i++) {
  const date = getDateMinusDays(i) // YYYY-MM-DD format
  const inspirationPath = `content/inspiration/${date}.md`
  const analyticsPath = `content/analytics/${date}.md`

  if (fileExists(inspirationPath)) {
    inspirationFiles.push({
      date,
      content: readFile(inspirationPath)
    })
  }

  if (fileExists(analyticsPath)) {
    analyticsFiles.push({
      date,
      content: readFile(analyticsPath)
    })
  }
}
```

### Step 2: Extract Trending Topics

```typescript
// Parse all inspiration files
const trendingTopics = new Map()

for (const file of inspirationFiles) {
  const topics = extractTopics(file.content)

  for (const topic of topics) {
    if (trendingTopics.has(topic.name)) {
      // Topic appeared multiple days - higher priority
      trendingTopics.get(topic.name).frequency++
      trendingTopics.get(topic.name).sources.push({
        date: file.date,
        source: topic.source,
        engagement: topic.engagement
      })
    } else {
      trendingTopics.set(topic.name, {
        frequency: 1,
        category: topic.category,
        sources: [{
          date: file.date,
          source: topic.source,
          engagement: topic.engagement
        }],
        formats: [topic.format],
        hashtags: topic.hashtags
      })
    }
  }
}
```

### Step 3: Correlate with Own Performance

```typescript
// Parse all analytics files
const performancePatterns = {
  topicsThatWorked: [],
  formatsThatWorked: [],
  timingInsights: [],
  engagementDrivers: []
}

for (const file of analyticsFiles) {
  const bestPosts = extractBestPerformingPosts(file.content)

  for (const post of bestPosts) {
    performancePatterns.topicsThatWorked.push({
      topic: post.topic,
      engagement: post.engagement,
      format: post.format,
      platform: post.platform
    })
  }
}

// Cross-reference: Which trending topics align with what worked for you?
const synergisticTopics = []

for (const [topicName, topicData] of trendingTopics.entries()) {
  const similarPerformance = performancePatterns.topicsThatWorked.filter(
    p => topicOverlaps(p.topic, topicName)
  )

  if (similarPerformance.length > 0) {
    synergisticTopics.push({
      topic: topicName,
      trendingData: topicData,
      yourPerformance: similarPerformance,
      synergy: 'high' // Both trending AND you perform well on it
    })
  }
}
```

### Step 4: Generate Unique Value Angles

```typescript
// For each trending topic, identify unique value opportunity
const contentIdeas = []

for (const [topicName, topicData] of trendingTopics.entries()) {
  // What's the gap? What are inspiration sources NOT covering?
  const commonAngles = extractCommonAngles(topicData.sources)

  // How can you combine inspiration with YOUR expertise?
  const uniqueAngle = synthesizeUniqueValue({
    topic: topicName,
    inspirationAngles: commonAngles,
    yourExpertise: {
      agency: ['web development', 'system architecture', 'tech consulting'],
      athletic: ['Ironman training', 'endurance psychology', 'data tracking'],
      cultural: ['techno scene', 'Berlin underground', 'consciousness']
    },
    blogCategories: ['training', 'dual-life', 'underground']
  })

  contentIdeas.push({
    topic: topicName,
    category: mapToCategory(topicName),
    priority: calculatePriority(topicData, synergisticTopics),
    uniqueAngle: uniqueAngle,
    inspirationSources: topicData.sources,
    suggestedFormat: topicData.formats[0],
    estimatedAppeal: estimateAudience(topicName),
    keywords: topicData.hashtags
  })
}
```

### Step 5: Rank & Prioritize

```typescript
// Ranking algorithm
contentIdeas.sort((a, b) => {
  // Priority score (0-100)
  const scoreA = calculateScore(a)
  const scoreB = calculateScore(b)
  return scoreB - scoreA
})

// Conceptual scoring criteria - guides Claude's prioritization (not hardcoded values)
function calculateScore(idea) {
  let score = 0

  // Trending frequency (0-30 points)
  score += Math.min(idea.frequency * 5, 30)

  // Your past performance on similar topics (0-25 points)
  const synergy = synergisticTopics.find(s => s.topic === idea.topic)
  if (synergy) {
    score += 25
  }

  // Unique value potential (0-20 points)
  if (idea.uniqueAngle.strength === 'strong') score += 20
  else if (idea.uniqueAngle.strength === 'medium') score += 10

  // Audience alignment (0-15 points)
  if (idea.estimatedAppeal === 'high') score += 15
  else if (idea.estimatedAppeal === 'medium') score += 8

  // Timeliness (0-10 points)
  if (idea.timeliness === 'urgent') score += 10
  else if (idea.timeliness === 'current') score += 5

  return score
}
```

### Step 6: Generate Briefing

```typescript
const today = new Date().toISOString().split('T')[0]
const briefing = generateBriefing({
  date: today,
  period: `${days} days`,
  topicCount: trendingTopics.size,
  contentIdeas: contentIdeas.slice(0, 10), // Top 10 ideas
  performanceInsights: performancePatterns,
  quickWins: contentIdeas.filter(i => i.effort === 'low').slice(0, 3),
  seriesOpportunities: identifySeriesPotential(contentIdeas)
})

// Write output
writeFile(`content/briefings/${today}.md`, briefing)
```

## Output Format

```markdown
# Content Briefing - {date}

> **Analysis Period:** {start_date} to {end_date} ({days} days)
> **Inspiration Sources:** {source_count} accounts
> **Analytics Data:** {post_count} posts analyzed
> **Generated:** {timestamp}

---

## 🎯 Top 10 Content Ideas (Ranked)

### 1. {Topic Title} [Score: 95/100] ⭐️ HIGH PRIORITY

**Category:** Dual Life

**Why This Topic:**
- Trending across {count} sources ({source_names})
- YOU performed well on similar content ({your_post_example} - {engagement})
- Rising momentum: {trend_graph}

**Unique Value Angle:**
> Combine {inspiration_insight_1} from @productivity_athletes with your agency expertise on {tech_topic}. Title: "How I Use Git Branching Strategy for Training Periodization"

**Inspiration Sources:**
- @productivity_athletes: "{quote}" ({engagement})
- @corporateathlete: "{quote}" ({engagement})

**Your Edge:**
- Technical depth: Actual code examples mapped to training
- Personal proof: Your own data from Strava + GitHub
- Synthesis: No one else bridges dev workflows → endurance training

**Suggested Format:** Long-form blog post (2000 words) + Twitter thread summary

**Keywords/Hashtags:** #{hashtag}, #{hashtag}, #{hashtag}

**Estimated Effort:** Medium (2-3 hours)
**Estimated Appeal:** High (overlaps: developers + endurance athletes)

**Publishing Timeline:** Publish within 7 days (trend is current)

---

### 2. {Topic Title} [Score: 88/100] ⭐️ HIGH PRIORITY

{same structure}

---

### 3. {Topic Title} [Score: 82/100] 🔥 MEDIUM-HIGH PRIORITY

{same structure}

---

## 📊 Performance Insights

### What's Working for You

**Top Performing Topics (Last 7 Days):**
1. {topic} - {avg_engagement} avg engagement
2. {topic} - {avg_engagement} avg engagement
3. {topic} - {avg_engagement} avg engagement

**Best Formats:**
- {format}: {avg_engagement}
- {format}: {avg_engagement}

**Optimal Posting Times:**
- {day} at {time}: {avg_engagement}
- {day} at {time}: {avg_engagement}

### Correlation Analysis

**High Synergy Topics:**
- {topic}: Trending AND you perform well (double down!)
- {topic}: Trending AND you perform well

**Emerging Opportunities:**
- {topic}: Trending, but you haven't covered yet (test!)
- {topic}: Trending, but you haven't covered yet

---

## 🚀 Quick Wins (Low Effort, High Impact)

### 1. {Quick Topic}
- **Inspiration:** {source}
- **Your Angle:** {one_sentence}
- **Format:** Twitter thread (8 tweets)
- **Effort:** 30 minutes
- **Can Publish:** This week

### 2. {Quick Topic}
{same structure}

### 3. {Quick Topic}
{same structure}

---

## 📚 Series Opportunities

### Series 1: "{Series Title}"
**Arc:** {5_part_progression}

**Part 1:** {topic_1} (Intro hook)
**Part 2:** {topic_2} (Technical deep dive)
**Part 3:** {topic_3} (Personal story)
**Part 4:** {topic_4} (Advanced application)
**Part 5:** {topic_5} (Synthesis + call to action)

**Why This Series:**
- Builds on trending topics: {topics}
- Aligns with your "Waking Up" theme
- Cross-references previous posts: {links}

**Publishing Cadence:** 1 post per week for 5 weeks

---

### Series 2: "{Series Title}"
{same structure}

---

## 🎨 Format Recommendations

Based on trending formats + your performance:

| Format | Trending? | Your Performance | Recommendation |
|--------|-----------|------------------|----------------|
| Carousel | ✅ High | 📈 Good | Use for: tutorials, comparisons |
| Thread | ✅ Medium | 📈 Excellent | Use for: storytelling, deep dives |
| Reel/Video | ✅ Very High | 📉 Untested | Experiment: behind-the-scenes |
| Long-form | ❌ Low | 📈 Excellent | Keep doing: your strength |

---

## 🔍 Gap Analysis

**What Inspiration Sources Cover:**
- {common_angle_1}
- {common_angle_2}

**What They DON'T Cover (Your Opportunity):**
- {gap_1}: No one combines {X} with {Y}
- {gap_2}: Missing technical depth on {topic}
- {gap_3}: Personal vulnerability + data visualization

**Unique Positioning:**
You're the ONLY creator who:
- Combines agency work + Ironman training + techno culture
- Uses technical frameworks (Git, Agile, TDD) for athletic improvement
- Shares actual data (Strava, heart rate, power metrics)

---

## 📅 Suggested Publishing Calendar

**Week 1:**
- **Monday:** {topic} (capitalize on current trend)
- **Thursday:** {topic} (quick win, low effort)

**Week 2:**
- **Monday:** {topic} (series part 1)
- **Friday:** {topic} (evergreen, builds on Week 1)

**Week 3:**
- **Monday:** {topic} (series part 2)
- **Wednesday:** {topic} (experimental format)

**Week 4:**
- **Monday:** {topic} (synthesis piece)
- **Friday:** {topic} (series part 3)

---

## 🎯 Next Actions

### Immediate (This Week)
- [ ] Draft: {high_priority_topic_1}
- [ ] Quick win: {quick_topic_1}
- [ ] Schedule social posts for published content

### Near-term (Next 2 Weeks)
- [ ] Start series: {series_title}
- [ ] Experiment with: {new_format}
- [ ] Cross-post to: {platforms}

### Strategic (This Month)
- [ ] Complete series: {series_title}
- [ ] Collaborate with: {potential_collaborator}
- [ ] Republish top performer: {post_to_update}

---

## 📊 Data Sources

**Inspiration Analyzed:**
- {count} files from content/inspiration/
- {total_sources} accounts monitored
- {categories} categories

**Analytics Analyzed:**
- {count} files from content/analytics/
- {total_posts} posts reviewed
- {platforms} platforms

**Coverage:**
- ✅ Athletes: {count} sources
- ✅ Techno Culture: {count} sources
- ✅ Dual Life: {count} sources
- ✅ Agency Work: {count} sources

---

**Next Briefing:** {next_date}
**Generated by:** /content-briefing skill
**Feed into:** /ghostwriter for content creation
```

## Usage

```bash
# Generate briefing from last 7 days (default)
/content-briefing

# Analyze last 14 days
/content-briefing --days=14

# Focus on specific category
/content-briefing --category=dual-life

# Quick summary (top 5 ideas only)
/content-briefing --quick
```

## Configuration

No separate config file needed. Reads from:
- `content/inspiration/{YYYY-MM-DD}.md` (outputs from /social-scraper)
- `content/analytics/{YYYY-MM-DD}.md` (outputs from /social-scraper)

## Unique Value Synthesis Logic

The core algorithm that makes this skill valuable:

```typescript
function synthesizeUniqueValue(topic, inspirationAngles, yourExpertise) {
  // What are inspiration sources saying?
  const commonNarrative = summarize(inspirationAngles)

  // What expertise can you add?
  const relevantExpertise = yourExpertise.filter(e =>
    topicRelevance(topic, e) > 0.6
  )

  // Generate unique angle
  const uniqueAngle = {
    commonApproach: commonNarrative,
    yourTwist: combineExpertise(relevantExpertise),
    gap: identifyWhatsMissing(inspirationAngles),
    synthesis: createNovelCombination(topic, relevantExpertise),
    strength: rateUniquenessPotential()
  }

  return uniqueAngle
}

// Example output:
{
  commonApproach: "Most athletes talk about discipline and sacrifice",
  yourTwist: "Apply Agile sprint methodology to training blocks",
  gap: "No one bridges software development frameworks to endurance",
  synthesis: "Use standup meetings for daily training check-ins, sprint retros for recovery analysis, velocity tracking for fitness progression",
  strength: "strong" // High uniqueness, clear differentiation
}
```

## Integration Workflow

```bash
# Daily automation (8 AM)
/social-scraper  # Collect today's data

# Weekly content planning (Monday 9 AM)
/content-briefing  # Analyze past 7 days → generate ranked ideas

# Content creation (throughout week)
/ghostwriter --topic="idea from briefing" --persona=ultra-choko

# Multi-agent review (before publishing)
/review-draft content/posts/en/my-draft.mdx

# Distribution (on publish)
/post-to-social --file=content/posts/en/my-post.mdx
```

## Success Criteria

After 4 weeks of weekly briefings:
- ✅ Generated 40+ ranked content ideas
- ✅ Identified 3+ high-synergy topics (trending + you perform well)
- ✅ Created 2+ series opportunities
- ✅ Found 5+ unique value angles
- ✅ Published 8+ posts based on briefing insights
- ✅ Increased average engagement by 20%+ on briefing-driven content

## Troubleshooting

### "No inspiration files found"
→ Run `/social-scraper` first to generate data
→ Check that content/inspiration/ directory exists

### "Insufficient data for analysis"
→ Need at least 3 days of scraped data for meaningful analysis
→ Continue running /social-scraper daily

### "All content ideas rated low priority"
→ Inspiration sources may not align with blog categories
→ Update social-scraper/inspiration-sources.json with more relevant accounts

## Related Skills

- `/social-scraper` - PREREQUISITE: Generates the data this skill analyzes
- `/ghostwriter` - CONSUMER: Uses briefing ideas to create content
- `/review-draft` - CONSUMER: Reviews content created from briefing
- `/brainstorming` - ALTERNATIVE: More exploratory, less data-driven

## Future Enhancements (Phase 2)

- AI-powered topic clustering (identify meta-patterns)
- Sentiment analysis (which tone resonates most)
- Predictive modeling (forecast viral potential)
- Competitive gap analysis (automated SWOT)
- Auto-draft outline generation (briefing → blog outline)

---

**Philosophy:**

> "Inspiration without synthesis is imitation. Data without context is noise. This skill bridges both: it finds what's working in the world, correlates with what works for YOU, and generates ideas that only YOU can execute."
