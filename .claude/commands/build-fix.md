---
description: Diagnose and fix build/type errors
argument-hint: "[error-message-or-file]"
---

# Build Fix

Diagnose and fix build errors quickly with minimal changes.

## Steps

1. **Run build**: Capture the full error output
2. **Classify errors**: TypeScript type errors, import errors, config errors, dependency errors
3. **Fix root causes first**: Start with type errors that cascade into other errors
4. **Minimal changes**: Fix only what's broken — don't refactor
5. **Verify**: Run build again to confirm all errors are resolved
6. **Run tests**: Make sure fixes don't break anything

## Principles

- Fix type errors by adding proper types, not by casting to `any`
- Fix import errors by checking module resolution and paths
- Fix config errors by reading the relevant config documentation
- Never suppress errors with `@ts-ignore` or `eslint-disable` unless absolutely necessary