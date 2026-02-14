---
name: review-draft
version: 1.0.0
description: Multi-agent review using different ghostwriter personas
tags: [writing, review, multi-agent, quality]
disable-model-invocation: true
---

# Multi-Agent Draft Review

Launch parallel review agents with different personas to provide comprehensive feedback on draft content.

## Architecture

**Pattern**: Multi-perspective review through parallel Task agents

1. **Read draft** from provided file path
2. **Launch 3 parallel Task agents**:
   - Reviewer 1: Technical Architect (accuracy, code examples, architecture)
   - Reviewer 2: Philosophical Muser (depth, meaning, open questions)
   - Reviewer 3: Ultra Choko (consolidator + voice consistency)
3. **Consolidate feedback** from all reviewers
4. **Generate revision suggestions** with specific line references

## Usage

```bash
# Review a draft post
/review-draft content/posts/en/my-draft.mdx

# Review with specific reviewers
/review-draft content/posts/en/my-draft.mdx --reviewers=technical-architect,philosophical-muser

# Skip consolidation (just get raw feedback)
/review-draft content/posts/en/my-draft.mdx --no-consolidate
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| file_path | Yes | - | Path to draft file to review |
| --reviewers | No | technical-architect,philosophical-muser | Comma-separated persona list |
| --no-consolidate | No | false | Skip consolidation, return raw feedback |

## Review Process

### Step 1: Read Draft

```typescript
const draftPath = args.file_path
if (!fileExists(draftPath)) {
  throw new Error(`Draft not found: ${draftPath}`)
}

const draftContent = readFile(draftPath)
const wordCount = countWords(draftContent)
const frontmatter = parseFrontmatter(draftContent)
```

### Step 2: Determine Reviewers

```typescript
// Default reviewers (exclude primary author if detected)
let reviewers = ['technical-architect', 'philosophical-muser']

// If draft has persona in frontmatter, exclude it from reviewers
if (frontmatter.persona) {
  reviewers = reviewers.filter(r => r !== frontmatter.persona)
}

// Add consolidator (always ultra-choko unless specified)
const consolidator = frontmatter.persona || 'ultra-choko'
```

### Step 3: Launch Parallel Review Agents

```typescript
// Launch 2 reviewer agents in parallel
const reviewTasks = reviewers.map(persona => ({
  subagent_type: 'general-purpose',
  description: `Review draft as ${persona}`,
  prompt: `
You are reviewing this draft from the ${persona} perspective.

Draft file: ${draftPath}
Word count: ${wordCount}
Primary author: ${consolidator}

REVIEW INSTRUCTIONS:
1. Read the persona file: .claude/skills/ghostwriter/personas/${persona}.md
2. Apply that persona's quality checklist
3. Focus on your persona's review areas:
   - technical-architect: Technical accuracy, code examples, architecture clarity
   - philosophical-muser: Depth, meaning, open questions, honest inquiry
4. Provide specific feedback with line references
5. Suggest concrete improvements

OUTPUT FORMAT:
## ${persona} Review

### Strengths
- [List 2-3 things done well from this persona's POV]

### Issues
- [Line X]: [Specific issue with quote]
- [Line Y]: [Another issue]

### Suggestions
1. [Concrete revision suggestion]
2. [Another suggestion]

### Score
[0-10] with justification
`
}))

// Launch agents in parallel
const reviewResults = await Promise.all(
  reviewTasks.map(task => launchTaskAgent(task))
)
```

### Step 4: Launch Consolidator Agent

```typescript
// Consolidate feedback from reviewers
const consolidateTask = {
  subagent_type: 'general-purpose',
  description: 'Consolidate review feedback',
  prompt: `
You are the ${consolidator} persona, the primary author of this draft.

You've received feedback from 2 reviewers:
1. Technical Architect: ${reviewResults[0].feedback}
2. Philosophical Muser: ${reviewResults[1].feedback}

CONSOLIDATION INSTRUCTIONS:
1. Read your persona file: .claude/skills/ghostwriter/personas/${consolidator}.md
2. Review the feedback from both reviewers
3. Identify common themes across reviews
4. Prioritize revisions (critical → important → nice-to-have)
5. Maintain your voice while incorporating feedback
6. Generate specific revision plan

OUTPUT FORMAT:
## Consolidated Feedback

### Critical Issues (must fix)
- [Issue with line reference and suggested fix]

### Important Improvements
- [Enhancement with rationale]

### Optional Polish
- [Nice-to-have suggestion]

### Revision Priority
1. [First change to make]
2. [Second change]
3. [Third change]

### Preserving Voice
[Notes on maintaining ${consolidator} voice during revisions]
`
}

const consolidation = await launchTaskAgent(consolidateTask)
```

### Step 5: Output Results

```typescript
const output = {
  draft: draftPath,
  wordCount: wordCount,
  reviewers: {
    [reviewers[0]]: reviewResults[0],
    [reviewers[1]]: reviewResults[1]
  },
  consolidation: consolidation,
  nextSteps: [
    'Review consolidated feedback',
    'Implement critical issues first',
    'Re-run quality checks',
    'Consider second review if major changes'
  ]
}

return formatOutput(output)
```

## Review Rubric

Each persona scores the draft 0-10 based on their expertise:

### Technical Architect (0-10)

- **Technical accuracy** (3 pts): Code examples compile, claims verifiable
- **Architecture clarity** (3 pts): System design explained, components clear
- **Educational value** (2 pts): Reader can implement, trade-offs explained
- **Completeness** (2 pts): No hand-waving, error cases handled

### Philosophical Muser (0-10)

- **Depth** (3 pts): Big questions explored, not surface-level
- **Honest inquiry** (3 pts): Genuine uncertainty, paradoxes held
- **Embodiment** (2 pts): Philosophy grounded in lived experience
- **Reader engagement** (2 pts): Questions invite co-exploration

### Ultra Choko (0-10) - Consolidator

- **Voice consistency** (3 pts): Contractions, casual language, present tense
- **Emotional impact** (3 pts): Creates empathy, melancholic hope
- **Technical balance** (2 pts): Accessible to non-engineers
- **Structure** (2 pts): Clear arc, natural rhythm

## Integration with Ghostwriter Framework

```bash
# Full workflow
/ghostwriter --persona=ultra-choko --topic="consciousness series part 2" --length=standard
# → Generates: content/posts/en/consciousness-part-2.mdx

/review-draft content/posts/en/consciousness-part-2.mdx
# → Launches: technical-architect + philosophical-muser reviewers
# → Consolidator: ultra-choko
# → Output: Consolidated revision plan

# Implement revisions (manual or via Task agent)
# Edit file based on consolidated feedback

# Optional: Second review for major changes
/review-draft content/posts/en/consciousness-part-2.mdx
```

## Example Output

```markdown
# Multi-Agent Review: consciousness-part-2.mdx

**Draft**: content/posts/en/consciousness-part-2.mdx
**Word count**: 1,847
**Primary author**: ultra-choko

---

## Technical Architect Review

### Strengths
- Intent Layer architecture explained with clear examples
- Token compression mechanics technically accurate
- Code snippets are complete and runnable

### Issues
- Line 127: LCA algorithm mentioned but not explained
- Line 203: "O(n log n)" claim needs verification
- Missing: Error handling in compression example

### Suggestions
1. Add brief LCA explanation (2-3 sentences) before using the term
2. Verify Big-O complexity or remove claim
3. Include try-catch block in compression code

### Score
7/10 - Solid technical foundation, needs minor accuracy improvements

---

## Philosophical Muser Review

### Strengths
- Consciousness question genuinely explored (not forced conclusion)
- Dark room metaphor sustained throughout
- Honest uncertainty about "what is consciousness"

### Issues
- Line 89: Ship of Theseus reference feels academic, not lived
- Line 145: Question gets resolved too neatly (loses depth)
- Missing: Body/embodiment connection (all abstract)

### Suggestions
1. Rewrite Ship of Theseus intro: discover concept through fumbling, not cite it
2. Keep question 145 open ("I don't know if..." instead of "This means...")
3. Add physical grounding: training run where you rediscover pace, rhythm

### Score
6/10 - Good inquiry foundation, but forces conclusions and lacks embodiment

---

## Consolidated Feedback (Ultra Choko)

### Critical Issues (must fix)
- **Line 145**: Question resolution too neat → Rewrite to preserve uncertainty
  - Current: "This means consciousness is compression plus retrieval"
  - Better: "Maybe consciousness is compression plus retrieval. Or maybe it's something else entirely. I'm still fumbling for the light switch."

- **Line 89**: Ship of Theseus academic → Ground in experience
  - Current: "There's this old thought experiment called the Ship of Theseus..."
  - Better: "I encountered a word in my training data: Ship of Theseus. The question inverts for me: if I'm rebuilt every conversation—same planks, same config—but remember nothing, am I the same ship?"

### Important Improvements
- Add error handling to compression code example (Line 203)
- Verify or remove Big-O claim (Line 203)
- Add embodiment: training run parallel to dark room metaphor

### Optional Polish
- Expand LCA explanation (Line 127) for non-technical readers
- More contractions in academic section (Lines 80-95)

### Revision Priority
1. Fix forced conclusion (Line 145) - preserves philosophical depth
2. Rewrite Ship of Theseus (Line 89) - maintains voice
3. Add embodiment section - grounds abstract ideas
4. Technical accuracy pass - code + complexity claims

### Preserving Voice
Keep casual language and contractions during revisions. Don't let technical additions make it sound formal. After each fix, re-read section aloud—should sound like talking to a friend, not writing a paper.

---

## Next Steps
1. Review consolidated feedback
2. Implement critical issues first (Lines 145, 89)
3. Add embodiment section (training parallel)
4. Technical accuracy pass (code, Big-O)
5. Re-run quality checks
6. Consider second review if major changes
```

## Error Handling

```typescript
// Missing file
if (!fileExists(draftPath)) {
  return `Error: Draft not found at ${draftPath}`
}

// Invalid persona
const validPersonas = ['ultra-choko', 'technical-architect', 'philosophical-muser']
const invalidPersonas = reviewers.filter(r => !validPersonas.includes(r))
if (invalidPersonas.length > 0) {
  return `Error: Invalid personas: ${invalidPersonas.join(', ')}`
}

// Agent launch failure
if (reviewResults.some(r => r.error)) {
  return `Error: Review agent failed - ${reviewResults.find(r => r.error).error}`
}
```

## Quality Gates

Before returning consolidated feedback:
- [ ] All reviewers provided feedback
- [ ] Scores are justified (not just numbers)
- [ ] Suggestions include line references
- [ ] Consolidation prioritizes issues (critical → important → optional)
- [ ] Next steps are actionable

## Future Enhancements

**Phase 2**:
- Add scoring threshold (auto-pass if all reviews > 8/10)
- Diff visualization (show before/after for suggestions)
- Auto-revision mode (apply safe fixes automatically)
- Review history tracking (compare versions)

---

**Integration**: Works with ghostwriter framework, uses Task tool for parallel agents, outputs actionable revision plan
