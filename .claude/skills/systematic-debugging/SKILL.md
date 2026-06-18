---
name: systematic-debugging
description: Four-phase root cause analysis for complex bugs — trace, isolate, verify, fix
origin: superpowers
---

# Systematic Debugging

> Source: superpowers | License: MIT

## When to Activate

Use this skill when:
- Encountering a bug that isn't immediately obvious
- Multiple potential causes exist
- The bug involves multiple components or systems
- Previous quick-fix attempts have failed

## Four-Phase Process

### Phase 1: Trace (Understand the Problem)

1. **Reproduce** — Confirm the bug can be reliably reproduced
2. **Gather evidence** — Collect error messages, logs, stack traces
3. **Identify scope** — Which components, files, or systems are involved?
4. **Note timing** — When does it happen? First occurrence? After specific actions?
5. **Check recent changes** — `git log --oneline -20` for recent commits

### Phase 2: Isolate (Narrow the Cause)

1. **Binary search** — Comment out half the code, does it still fail?
2. **Simplify** — Create the minimal reproduction case
3. **Swap components** — Replace suspect components with known-working ones
4. **Check assumptions** — Are your inputs what you think they are?
5. **Check boundaries** — Edge cases, empty states, null values, off-by-one

### Phase 3: Verify (Confirm the Root Cause)

1. **Form a hypothesis** — State what you believe is the root cause
2. **Design a test** — Create a test that would prove/disprove the hypothesis
3. **Run the test** — Verify the hypothesis
4. **Check for related issues** — Does the same root cause exist elsewhere?

### Phase 4: Fix (Apply and Validate)

1. **Implement the fix** — Minimal change that addresses the root cause
2. **Write a regression test** — Ensure the bug can't recur
3. **Verify the fix** — Run the full test suite
4. **Document** — Add a comment explaining why the fix works
5. **Check for similar issues** — Search for the same pattern elsewhere

## Anti-Patterns to Avoid

- **Shotgun debugging** — Changing multiple things at once without understanding
- **Blind guesswork** — Trying random fixes without a hypothesis
- **Symptom fixing** — Treating the symptom instead of the root cause
- **Assumption debugging** — Assuming you know the cause without verifying

## Output Format

```
## Debug Report: [bug description]

### Root Cause
[Clear description of the root cause]

### Evidence
- [Evidence item 1]
- [Evidence item 2]

### Fix
[Description of the fix applied]

### Regression Test
[Test that prevents recurrence]

### Similar Issues
[Any related code with the same pattern]
```