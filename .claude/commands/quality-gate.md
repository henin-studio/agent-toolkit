---
description: Run quality checks before committing
argument-hint: ""
---

# Quality Gate

Run all quality checks before committing. The commit must pass all checks.

## Checklist

1. **Lint**: `npm run lint` — zero errors
2. **Type check**: `npx tsc --noEmit` — zero type errors
3. **Unit tests**: `npx vitest run` — all pass, coverage ≥ 80%
4. **Build**: `npm run build` — successful
5. **Security**: No hardcoded secrets, no `console.log` in production code
6. **Dead code**: No unused imports, variables, or functions

## Rules

- If any check fails, the commit is blocked
- Fix CRITICAL and HIGH issues before proceeding
- MEDIUM issues should be addressed when possible
- LOW/INFO issues are optional