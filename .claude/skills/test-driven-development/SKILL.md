---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code. Enforces RED-GREEN-REFACTOR cycle.
origin: superpowers
---

# Test-Driven Development (TDD)

> Source: superpowers | License: MIT

## When to Activate

- Before implementing any new feature
- Before fixing any bug
- Before refactoring code
- Before changing behavior

Exceptions (ask first): throwaway prototypes, generated code, config files.

## Instructions

Write the test first. Watch it fail. Write minimal code to pass. Refactor.

### The Iron Law

**No production code without a failing test first.**

If you write code before the test, delete it and start over. No exceptions.

### RED — Write Failing Test

Write one minimal test showing what should happen.

**Good test:**
```typescript
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };
  const result = await retryOperation(operation);
  expect(result).toBe('success');
  expect(attempts).toBe(3);
});
```

Requirements: one behavior, clear name, real code (no mocks unless unavoidable).

### Verify RED — Watch It Fail

**Mandatory. Never skip.**

```bash
npm test path/to/test.test.ts
```

Confirm: test fails (not errors), failure message is expected, fails because feature is missing.

### GREEN — Minimal Code

Write simplest code to pass the test. Don't add features, refactor other code, or "improve" beyond the test.

### Verify GREEN — Watch It Pass

**Mandatory.** Run tests. Confirm: test passes, other tests still pass, output is clean.

### REFACTOR — Clean Up

After green only: remove duplication, improve names, extract helpers. Keep tests green. Don't add behavior.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Tests after achieve same goals" | Tests-after = "what does this do?" Tests-first = "what should this do?" |
| "Already manually tested" | Ad-hoc is not systematic. No record, can't re-run. |
| "TDD will slow me down" | TDD is faster than debugging in production. |

## Red Flags — Stop and Start Over

- Code before test
- Test passes immediately (you're testing existing behavior)
- Can't explain why test failed
- "Just this once" rationalization
- "Keep as reference" after writing code first

## Verification Checklist

Before marking work complete:
- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] Edge cases and errors covered

## Focus Areas

- Strict RED-GREEN-REFACTOR cycle
- Watching tests fail before implementing
- Minimal implementation (YAGNI)
- Bug fixes start with a failing test that reproduces the bug

## Examples

**Bug fix: empty email accepted**
1. RED: `test('rejects empty email', ...)`
2. Verify RED: test fails with expected message
3. GREEN: Add validation check for empty email
4. Verify GREEN: test passes
5. REFACTOR: Extract validation if needed