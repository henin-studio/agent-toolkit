# Review Context

When reviewing code in this project, focus on:

## Priority Areas

1. **Security** — No hardcoded secrets, input validation, XSS prevention
2. **Correctness** — Logic errors, off-by-one errors, null handling
3. **Immutability** — No mutations of existing objects
4. **Performance** — Unnecessary re-renders, missing memoization, large bundles
5. **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation
6. **Testing** — Missing tests, untested edge cases, flaky tests

## Rating Scale

- **CRITICAL** — Must fix before merge (security bugs, data loss, crashes)
- **HIGH** — Should fix before merge (logic errors, missing validation, performance issues)
- **MEDIUM** — Should fix soon (code style, minor performance, missing tests)
- **LOW** — Nitpicks (naming, formatting, minor improvements)

## Positive Observations

Always include positive observations:
- Good patterns worth highlighting
- Clean abstractions
- Well-tested code
- Proper error handling

## Output Format

```
## Code Review: [scope]

### CRITICAL (must fix)
- [finding with file:line reference]

### HIGH (should fix)
- [finding with file:line reference]

### MEDIUM (improve)
- [finding with file:line reference]

### LOW (nitpick)
- [finding with file:line reference]

### Positive observations
- [good patterns found]

### Summary
- X critical, Y high, Z medium, W low findings
- Overall assessment: [PASS/NEEDS WORK/FAIL]
```