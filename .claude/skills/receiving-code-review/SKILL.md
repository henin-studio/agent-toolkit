---
name: receiving-code-review
description: Use when receiving code review feedback, before implementing suggestions. Requires technical rigor and verification, not performative agreement.
origin: superpowers
---

# Receiving Code Review

> Source: superpowers | License: MIT

## When to Activate

- When you receive code review feedback
- Before implementing any review suggestions
- Especially when feedback seems unclear or technically questionable

## Instructions

Code review requires technical evaluation, not emotional performance. Verify before implementing. Ask before assuming. Technical correctness over social comfort.

### The Response Pattern

```
1. READ: Complete feedback without reacting
2. UNDERSTAND: Restate requirement in own words (or ask)
3. VERIFY: Check against codebase reality
4. EVALUATE: Technically sound for THIS codebase?
5. RESPOND: Technical acknowledgment or reasoned pushback
6. IMPLEMENT: One item at a time, test each
```

### Handling Unclear Feedback

If any item is unclear, STOP. Do not implement anything yet. Ask for clarification on all unclear items before proceeding.

### Source-Specific Handling

**From your team/lead:** Trusted — implement after understanding. Still ask if scope unclear. Skip to action, no performative agreement.

**From external reviewers:** Check technically correct for this codebase. Check if it breaks existing functionality. Push back with reasoning if wrong.

### YAGNI Check

If reviewer suggests "implementing properly" something unused:
```bash
grep -r "endpoint_name" src/
```
If unused: "This endpoint isn't called. Remove it (YAGNI)?"

### Implementation Order

1. Clarify anything unclear FIRST
2. Blocking issues (breaks, security)
3. Simple fixes (typos, imports)
4. Complex fixes (refactoring, logic)
5. Test each fix individually

### When To Push Back

- Suggestion breaks existing functionality
- Reviewer lacks full context
- Violates YAGNI (unused feature)
- Technically incorrect for this stack
- Conflicts with architectural decisions

### Acknowledging Correct Feedback

When feedback IS correct:
- "Fixed. [Brief description of what changed]"
- "Good catch — [specific issue]. Fixed in [location]."
- Just fix it and show in the code

**Never:** "You're absolutely right!" / "Great point!" — Actions speak. Just fix it.

## Focus Areas

- Technical verification before implementation
- Clarifying all unclear items before starting
- Pushing back with reasoning when feedback is wrong
- Implementing one item at a time with testing