---
description: Extract learnings from the current session
argument-hint: ""
---

# Reflect

Analyze the current conversation to extract patterns, corrections, and preferences that should be remembered.

## Steps

1. **Review the session**: Look at what was discussed, what corrections were made, what patterns emerged
2. **Identify corrections**: What did the user explicitly correct?
3. **Identify preferences**: What patterns did the user prefer?
4. **Identify anti-patterns**: What did the user explicitly dislike?
5. **Propose learnings**: For each finding, suggest a permanent addition to the skill or rules
6. **Get approval**: Present proposed changes for user review

## Output Format

```
## Session Learnings

### Corrections
- [What was corrected] → [What should be done instead]

### Preferences
- [What the user preferred] → [Pattern to follow]

### Anti-patterns
- [What the user disliked] → [Pattern to avoid]

### Proposed Updates
- [File to update] → [Change description]
```