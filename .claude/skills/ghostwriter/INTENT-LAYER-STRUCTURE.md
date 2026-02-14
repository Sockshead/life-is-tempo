# Intent Layer Structure for Ghostwriter Personas

## Token Budget Analysis

**Current load** (before Intent Layer):
- ultra-choko.md: 201 lines (~560 tokens)
- technical-architect.md: 286 lines (~800 tokens)
- philosophical-muser.md: 207 lines (~580 tokens)
- **Total first load**: ~1,940 tokens

**Intent Layer optimized**:
- Persona root (summary only): ~30 lines (~100 tokens each)
- **Total first load**: ~300 tokens (6x reduction)
- Detailed sections: loaded progressively when needed

## Progressive Disclosure Pattern

Each persona file follows this structure:

```markdown
# [Persona Name]

[One-line description]

## Quick Reference (Root - Load First)

**Voice**: [one line]
**Use for**: [one line]
**Review focus**: [one line]
**Token budget**: Root ~100 tokens | Full ~500 tokens

**Critical rules**: [3-5 bullet points]

**Downlinks** (load on-demand):
- → Full Voice & Style
- → Writing Patterns
- → Quality Checklist
- → Example Patterns

---

## [Detailed Sections Below]
[Full content here - only loaded when explicitly referenced]
```

## Agent Definition Structure

Agent files should REFERENCE persona files, not duplicate content:

```markdown
# Ghostwriter: [Persona Name]

**Role**: [one line]

## Persona Reference

**Load from**: `.claude/skills/ghostwriter/personas/[name].md`
**Quick summary**: [2-3 lines]
**For full persona**: Read persona file above

## Review Rubric (Specific to this agent's role)

[Only the scoring rubric and review output format]
[~80 lines instead of ~250 lines]
```

## Token Savings

**Before**:
- Agent loads full persona instructions: ~250-300 lines
- Duplicate content across 3 agent files
- Total: ~900 lines of redundant persona content

**After**:
- Agent references persona file: "Load from [path]"
- Unique content only (rubric, role): ~80 lines per agent
- Total: ~240 lines (4x reduction)

## Validation Checklist

For each persona file:
- [ ] Quick Reference section at top (~30 lines)
- [ ] Token budget clearly marked
- [ ] Downlinks to detailed sections
- [ ] Detailed sections below fold (for progressive loading)

For each agent file:
- [ ] References persona file (not duplicates)
- [ ] Only role-specific content (rubric, format)
- [ ] Total < 100 lines

## Implementation Priority

1. ✅ Document Intent Layer structure (this file)
2. ✅ Refactor persona files (add Quick Reference at top)
3. ✅ Refactor agent files (reference instead of duplicate - v2 files created)
4. ✅ Validate token budgets (updated with actual line counts)
5. ⏳ Test progressive disclosure in practice (requires runtime testing)

---

**Note**: Intent Layer structure implemented as of 2026-02-14. Persona files have Quick Reference sections, v2 agent files reference personas instead of duplicating content. Token budgets updated with actual measurements. Progressive disclosure pattern ready for runtime testing.
