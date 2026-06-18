---
description: Continuous learning from feedback patterns
argument-hint: ""
---

# Learn

Review recent changes and feedback to identify improvement opportunities.

## Steps

1. **Gather context**: Look at recent file changes, comments, and corrections
2. **Identify patterns**: Are there recurring issues? Similar mistakes?
3. **Categorize**:
   - **HIGH confidence**: Explicit corrections ("No, use X instead of Y")
   - **MEDIUM confidence**: Implicit preferences (user consistently chose X)
   - **LOW confidence**: Observations (user mentioned considering X)
4. **Suggest updates**: Propose changes to skills, rules, or agents
5. **Track**: Log learnings in `.claude/docs/session-log.md`

## Rules

- Never auto-apply changes — always propose and get approval
- Distinguish between project-specific and general learnings
- Store project-specific learnings in `.claude/rules/`
- Store general learnings in the appropriate skill file