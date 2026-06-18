---
name: writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment.
origin: superpowers
---

# Writing Skills

> Source: superpowers | License: MIT

## When to Activate

- Creating a new skill
- Editing an existing skill
- Verifying a skill works before deployment

## Instructions

Writing skills IS Test-Driven Development applied to process documentation.

### What is a Skill?

A skill is a reference guide for proven techniques, patterns, or tools. Skills help future instances find and apply effective approaches.

**Skills are:** Reusable techniques, patterns, tools, reference guides
**Skills are NOT:** Narratives about how you solved a problem once

### Directory Structure

```
.claude/skills/
  skill-name/
    SKILL.md              # Main reference (required)
    supporting-file.*     # Only if needed
```

### SKILL.md Structure

```yaml
---
name: skill-name-with-hyphens
description: Use when [specific triggering conditions and symptoms]
origin: superpowers|ECC|reflect|curated
---

# Skill Name

> Source: [repo-name] | License: MIT

## When to Activate

Clear trigger conditions.

## Instructions

Detailed, step-by-step instructions.

## Focus Areas

- Key areas this skill covers

## Examples

Practical examples of using this skill.
```

### Frontmatter Rules

- **name**: Letters, numbers, hyphens only. No parentheses or special chars.
- **description**: Starts with "Use when..." — describes triggering conditions, NOT what the skill does. Keep under 500 characters. Written in third person.
- **origin**: Source repository for attribution.

### Description = When to Use, NOT What the Skill Does

The description should ONLY describe triggering conditions. Do NOT summarize the skill's process or workflow in the description.

```yaml
# BAD: Summarizes workflow
description: Use when executing plans - dispatches subagent per task with code review between tasks

# GOOD: Triggering conditions only
description: Use when executing implementation plans with independent tasks in the current session
```

### When to Create a Skill

**Create when:**
- Technique wasn't intuitively obvious
- You'd reference this again across projects
- Pattern applies broadly (not project-specific)

**Don't create for:**
- One-off solutions
- Standard practices well-documented elsewhere
- Project-specific conventions (put in CLAUDE.md)

### Skill Types

- **Technique**: Concrete method with steps (TDD, debugging)
- **Pattern**: Way of thinking about problems (composition, isolation)
- **Reference**: API docs, syntax guides, tool documentation

### No Placeholders

Every skill must contain actual content:
- No "TBD", "TODO", "fill in later"
- No vague instructions without showing how
- One excellent example beats many mediocre ones

### TDD for Skills

Just like code, skills should be tested:
1. **RED**: Run a pressure scenario WITHOUT the skill — document baseline behavior
2. **GREEN**: Write the skill addressing those specific violations
3. **REFACTOR**: Find new rationalizations, add explicit counters, re-verify

### Token Efficiency

- Frequently-loaded skills: aim for <200 words
- Other skills: aim for <500 words
- Move details to separate files and reference them
- Cross-reference other skills by name, don't repeat their content

## Focus Areas

- Clear triggering conditions in description
- Step-by-step instructions in body
- One excellent example per skill
- No placeholders or vague instructions
- Testing skills before deployment