---
name: requesting-code-review
description: Use when completing tasks, implementing major features, or before merging, to verify work meets requirements.
origin: superpowers
---

# Requesting Code Review

> Source: superpowers | License: MIT

## When to Activate

- After each task in a multi-task implementation
- After completing a major feature
- Before merging to main
- When stuck (fresh perspective)
- Before refactoring (baseline check)

## Instructions

Dispatch a code reviewer to catch issues before they cascade. The reviewer gets precisely crafted context — never your session's history.

### How to Request

**1. Get git SHAs:**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Provide context to reviewer:**
- **Description**: Brief summary of what was built
- **Requirements**: What it should do (from plan or spec)
- **Diff range**: Base SHA to head SHA
- **Key files**: Files that changed and why

**3. Act on feedback:**
- Fix Critical issues immediately
- Fix Important issues before proceeding
- Note Minor issues for later
- Push back if reviewer is wrong (with reasoning)

### Review Template

```markdown
## Code Review Request

**What was built:** [1-2 sentences]
**Requirements:** [From spec/plan]
**Changes:** [Base SHA]..[Head SHA]

**Key files:**
- `path/to/file.ts` — [what changed and why]

**Testing:**
- [How it was tested]
- [Test commands to run]

**Known concerns:**
- [Any known issues or trade-offs]
```

## Focus Areas

- Providing precise context to reviewers
- Acting on feedback by severity
- Pushing back with technical reasoning when reviewer is wrong

## Examples

**After completing a task:**
> "Let me request code review before proceeding."
> "Added verifyIndex() and repairIndex() with 4 issue types. Task 2 from the implementation plan."
> [Dispatch reviewer with context]