---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs. Requires running verification commands before making success claims.
origin: superpowers
---

# Verification Before Completion

> Source: superpowers | License: MIT

## When to Activate

- Before ANY success/completion claim
- Before committing, creating PRs, marking tasks complete
- Before moving to the next task
- Before delegating to agents

## Instructions

**Core principle: Evidence before claims, always.**

If you haven't run the verification command in this message, you cannot claim it passes.

### The Gate Function

```
1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
5. ONLY THEN: Make the claim
```

### Common Verification Requirements

| Claim | Requires | Not Sufficient |
|-------|----------|----------------|
| Tests pass | Test command output: 0 failures | Previous run, "should pass" |
| Linter clean | Linter output: 0 errors | Partial check |
| Build succeeds | Build command: exit 0 | Linter passing |
| Bug fixed | Test reproducing bug passes | "I changed the code" |
| Requirements met | Line-by-line checklist | Tests passing alone |

### Red Flags — Stop

- Using "should", "probably", "seems to"
- Expressing satisfaction before verification
- Trusting agent success reports without checking
- Relying on partial verification
- Thinking "just this once"

### Key Patterns

**Tests:** `[Run test command] [See: 34/34 pass] "All tests pass"` — NOT "Should pass now"

**Build:** `[Run build] [See: exit 0] "Build passes"` — NOT "Linter passed"

**Bug fix:** Write test reproducing bug → verify it fails → fix → verify it passes — NOT "I changed code, probably fixed"

## Focus Areas

- Running verification commands before claiming success
- Reading full output including exit codes
- Evidence-based completion claims
- Never trusting "should work" reasoning