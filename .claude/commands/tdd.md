---
description: Start a TDD workflow (RED-GREEN-REFACTOR)
argument-hint: "[feature-description]"
---

# TDD Workflow

Follow Test-Driven Development: RED → GREEN → REFACTOR.

## Steps

1. **RED**: Write a failing test for the feature
2. **Run test**: Confirm it fails with a clear error message
3. **GREEN**: Write the minimal code to make the test pass
4. **Run test**: Confirm it passes
5. **REFACTOR**: Improve the code while keeping tests green
6. **Run all tests**: Confirm nothing is broken
7. **Repeat**: Move to the next test case

## Rules

- No production code without a failing test
- Write the simplest code that makes the test pass
- Refactor only when tests are green
- Target 80%+ coverage