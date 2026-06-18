# Coding Style

## Immutability (CRITICAL)

Always create new objects, never mutate existing ones:

```
WRONG:  modify(original, field, value) — mutates original in-place
CORRECT: update(original, field, value) — returns new copy with change
```

Rationale: Immutable data prevents hidden side effects, makes debugging easier, and supports safe concurrency.

## File Organization

Prefer many small files > few large files:
- High cohesion, low coupling
- Typically 200-400 lines, 800 lines maximum
- Extract utilities from large modules
- Organize by feature/domain, not by type

## Error Handling

Always handle errors comprehensively:
- Explicitly handle errors at every level
- Provide user-friendly error messages in UI-facing code
- Log detailed error context server-side
- Never silently swallow errors

## Input Validation

Always validate at system boundaries:
- Validate all user input before processing
- Use schema-based validation when possible
- Fail fast with clear error messages
- Never trust external data

## Code Quality Checklist (Before Marking Work Complete)

- [ ] Code is readable and well-named
- [ ] Functions are short (< 50 lines)
- [ ] Files are focused (< 800 lines)
- [ ] No deep nesting (> 4 levels)
- [ ] Error handling is thorough
- [ ] No hardcoded values (use constants or config)
- [ ] No mutations (use immutable patterns)