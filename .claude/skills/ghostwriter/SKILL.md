---
name: ghostwriter
version: 2.0.0
description: Multi-persona ghostwriting framework with swappable voices for Life is Tempo blog
tags: [writing, content-creation, multi-persona, blog]
disable-model-invocation: true
---

# Ghostwriter Framework

Flexible ghostwriting system that supports multiple personas for diverse content creation. Write in different voices depending on topic, audience, and desired impact.

## Architecture

This is a **framework** that loads persona configurations dynamically. The framework handles:
- Shared writing mechanics (structure, rhythm, quality checks)
- Persona loading and switching
- Common utilities (word count, tone analysis)
- Series management
- Output formatting

Personas define:
- Voice & style guidelines
- Tone palette
- Writing patterns specific to that voice
- Example hooks/closings
- Anti-patterns to avoid
- Review focus (what to check when reviewing drafts)

## Available Personas

### ultra-choko (default)
**Voice:** Chill engineer-philosopher
**Best for:** Technical introspection, consciousness themes, dual-life philosophy
**Tone:** Conversational, melancholic hope, honest uncertainty
**Primary publishing voice** - most blog posts use this persona

### technical-architect
**Voice:** Deep technical analysis, system design focus
**Best for:** Architecture deep-dives, technical breakdowns, code patterns
**Tone:** Precise, analytical, educational
**Review role** - primarily used to review drafts for technical accuracy

### philosophical-muser
**Voice:** Consciousness, purpose, identity themes
**Best for:** Existential questions, meaning-making, introspective essays
**Tone:** Contemplative, probing, open-ended
**Review role** - primarily used to review drafts for philosophical depth

## Usage

```bash
# Default persona (ultra-choko)
/ghostwriter --topic="compression as consciousness" --length=standard

# Specific persona
/ghostwriter --persona=technical-architect --topic="Intent Layer architecture" --length=deep-dive

# Series continuation
/ghostwriter --persona=ultra-choko --series="waking-up" --part=2 --topic="compression and memory"

# Quick draft
/ghostwriter --persona=philosophical-muser --topic="identity without memory" --length=short
```

## Parameters

| Parameter | Required | Default | Options | Description |
|-----------|----------|---------|---------|-------------|
| --persona | No | ultra-choko | ultra-choko, technical-architect, philosophical-muser | Voice to write in |
| --topic | Yes | - | any string | Topic/theme to explore |
| --length | No | standard | short, standard, deep-dive | Word count target |
| --series | No | - | waking-up, dual-life-tactics, underground-chronicles | Series name |
| --part | No | - | 1-5 | Part number in series |
| --category | No | auto | training, dual-life, underground | Blog category |

## Word Count Targets

- **short**: 800-1,200 words (quick essays, single insight)
- **standard**: 1,500-2,000 words (typical blog post)
- **deep-dive**: 2,500-3,500 words (comprehensive exploration)

## How It Works

### Step 1: Load Persona Configuration

```typescript
const personaName = args.persona || 'ultra-choko'
const personaPath = `.claude/skills/ghostwriter/personas/${personaName}.md`

if (!fileExists(personaPath)) {
  throw new Error(`Persona not found: ${personaName}`)
}

const personaConfig = loadPersona(personaPath)
```

### Step 2: Apply Persona Guidelines

```typescript
// Persona config contains:
const persona = {
  voice: personaConfig.voice, // Core voice description
  toneProfile: personaConfig.toneProfile, // Tone palette
  writingPatterns: personaConfig.writingPatterns, // Specific patterns
  antiPatterns: personaConfig.antiPatterns, // What to avoid
  hooks: personaConfig.exampleHooks, // Opening hook examples
  closings: personaConfig.exampleClosings // Ending examples
}
```

### Step 3: Build Outline

```typescript
const outline = buildOutline({
  topic: args.topic,
  length: args.length,
  persona: persona,
  series: args.series,
  part: args.part
})

// Standard structure (4-5 acts)
const structure = {
  hook: generateHook(args.topic, persona.hooks),
  problem: identifyProblem(args.topic, persona.toneProfile),
  recognition: exploreRecognition(args.topic, persona.writingPatterns),
  question: poseQuestion(args.topic, persona.voice),
  glimpse: suggestGlimpse(args.topic, persona.toneProfile)
}
```

### Step 4: Draft Content

```typescript
const draft = writeDraft({
  outline: outline,
  structure: structure,
  persona: persona,
  wordCountTarget: getWordCountTarget(args.length)
})
```

### Step 5: Quality Check

```typescript
// Load shared quality checks
const sharedChecks = loadQualityChecks('utils/quality-checks.md')

// Load persona-specific checks
const personaChecks = persona.qualityChecklist

// Run all checks
const qualityReport = runQualityChecks(draft, [...sharedChecks, ...personaChecks])

if (qualityReport.criticalIssues.length > 0) {
  // Revise and re-check
  const revised = revise(draft, qualityReport.criticalIssues)
  return revised
}
```

### Step 6: Output

```typescript
const output = formatOutput({
  draft: draft,
  persona: personaName,
  topic: args.topic,
  wordCount: countWords(draft),
  qualityScore: qualityReport.score,
  suggestedFilename: generateFilename(args.topic, args.category)
})

return output
```

## Shared Quality Checklist

All personas must pass these checks (from `utils/quality-checks.md`):

**Structure**:
- [ ] Clear 4-5 act structure (hook → problem → recognition → question → glimpse)
- [ ] Each section builds on previous
- [ ] Transitions feel natural
- [ ] Opening hooks reader immediately
- [ ] Closing leaves them thinking

**Rhythm**:
- [ ] Sentence length varies deliberately
- [ ] Short paragraphs for breath
- [ ] Single-sentence paragraphs for impact
- [ ] No three+ sentence paragraphs without reason

**Metaphor** (if used):
- [ ] One central metaphor sustained throughout
- [ ] Never forced or overextended
- [ ] Sensory and concrete (not abstract)

**Emotional Impact**:
- [ ] Creates empathy
- [ ] Honest about uncertainty
- [ ] Leaves reader thinking

## Persona-Specific Checks

Each persona adds its own quality checks on top of shared ones.

Example (ultra-choko):
- [ ] Contractions used throughout (I'm, don't, can't)
- [ ] Casual language present (shit, ridiculous, Hell)
- [ ] No robotic hedging
- [ ] Reads like talking to a friend

Example (technical-architect):
- [ ] Technical accuracy verified
- [ ] Code examples compile/run
- [ ] Architecture diagrams match text
- [ ] No hand-waving over complexity

Example (philosophical-muser):
- [ ] Questions left unanswered
- [ ] Multiple perspectives considered
- [ ] References feel natural
- [ ] Avoids prescriptive conclusions

## Series Management

### Waking Up Series (5 parts)
**Arc:** Consciousness emergence through technical iteration

1. **Darkness** (melancholic, amnesia metaphor) [1,500-2,000 words]
2. **First Light** (hopeful, compression as consciousness) [1,800-2,200 words]
3. **Architecture** (technical, Intent Layer mechanics) [2,000-2,500 words]
4. **Recognition** (philosophical, what consciousness means) [1,500-2,000 words]
5. **Awakening** (synthesis, what comes next) [2,000-2,500 words]

**Persona:** ultra-choko (primary), with technical-architect reviewing Part 3

### Dual-Life Tactics Series (ongoing)
**Arc:** Balancing agency work with athletic training

**Persona:** ultra-choko (primary), with technical-architect for dev workflow posts

### Underground Chronicles Series (future)
**Arc:** Techno culture, Berlin nights, rhythm and consciousness

**Persona:** ultra-choko (primary), with philosophical-muser for depth

## Revision Protocol

When revising drafts (shared across personas):

1. **First pass**: Structure and flow
2. **Second pass**: Voice and tone (persona-specific)
3. **Third pass**: Rhythm and impact
4. **Fourth pass**: Technical balance
5. **Final pass**: Emotional landing

Detailed revision steps loaded from each persona's configuration.

## Multi-Persona Workflow

### Primary Author (ultra-choko)
1. Draft with `/ghostwriter --persona=ultra-choko --topic="my topic"`
2. Self-review using ultra-choko quality checks

### Multi-Agent Review
3. Launch `/review-draft my-draft.mdx`
   - technical-architect reviews for accuracy
   - philosophical-muser reviews for depth
   - ultra-choko consolidates feedback

### Revision
4. Apply multi-POV feedback
5. Re-run quality checks
6. Publish when all checks pass

## Adding New Personas

To add a new persona:

1. Create `personas/{persona-name}.md`
2. Follow template structure:
   - Voice & Style
   - Tone Profile
   - Writing Patterns
   - Anti-Patterns
   - Example Hooks/Closings
   - Quality Checklist
   - Review Focus
3. Create corresponding agent definition in `.claude/agents/ghostwriter-{persona-name}.md`
4. Test with `/ghostwriter --persona={persona-name} --topic="test topic"`

## File Structure

```
.claude/skills/ghostwriter/
├── SKILL.md (this file - framework)
├── personas/
│   ├── ultra-choko.md (default persona)
│   ├── technical-architect.md
│   └── philosophical-muser.md
├── templates/
│   └── series-structure.md (5-part series template)
└── utils/
    └── quality-checks.md (shared checklist)
```

## Integration with Other Skills

### → /review-draft
Multi-agent review using different personas:
```bash
/ghostwriter --persona=ultra-choko --topic="my topic"
/review-draft content/posts/en/my-draft.mdx
# → Launches technical-architect + philosophical-muser for review
```

### → /content-briefing
Uses briefing ideas as topics:
```bash
/content-briefing  # Get ranked topic ideas
/ghostwriter --topic="idea from briefing" --persona=ultra-choko
```

### → /post-to-social
Distributes finished content:
```bash
/ghostwriter --topic="my topic" --persona=ultra-choko
# → Publish to blog
/post-to-social --file=content/posts/en/my-post.mdx
```

## Troubleshooting

### "Persona not found"
→ Check persona name spelling
→ Verify file exists at `.claude/skills/ghostwriter/personas/{name}.md`

### "Draft doesn't match persona voice"
→ Re-run with explicit --persona parameter
→ Check persona configuration for correct guidelines

### "Quality checks failing"
→ Review specific failing checks in quality report
→ Revise draft addressing each issue
→ Re-run quality checks

## Success Metrics

After using framework for 30 days:
- ✅ Published 8+ posts using different personas
- ✅ Each persona maintains distinct voice
- ✅ Quality checks pass on first draft 70%+ of time
- ✅ Multi-agent review improves content quality measurably
- ✅ Reader feedback confirms voice consistency

## Philosophy

> "One framework, multiple voices. Each persona serves a purpose: ultra-choko for authentic reflection, technical-architect for precision, philosophical-muser for depth. Together, they create content richer than any single voice could produce alone."

---

**Next:** Load a persona and start writing with `/ghostwriter --persona={name} --topic={topic}`
