---
name: tdd-workflow
description: Use when writing new features, fixing bugs, or refactoring in a web project. Enforces TDD with 80%+ coverage and git checkpoints.
origin: ECC
---

# TDD Workflow

> Source: ECC | License: MIT

## When to Activate

- Writing new features or API endpoints
- Fixing bugs
- Refactoring existing code
- Creating React components or API routes
- Adding integration tests

## Instructions

### Core Principles

- Tests BEFORE code — always write the test first
- 80%+ coverage target (unit + integration + E2E)
- Git checkpoints at each stage (RED, GREEN, REFACTOR)

### Workflow Steps

**1. Write User Journeys**
List the user-facing behaviors this feature must support. Each journey becomes a test suite.

**2. Generate Test Cases**
From each journey, generate specific test cases with expected inputs and outputs.

**3. Run Tests — RED Gate**
```bash
npm test  # or vitest, jest
```
All new tests must FAIL. If any pass, you're testing existing behavior — fix the test.

**Git checkpoint:** Commit with message like `test: add failing tests for [feature]`

**4. Implement Code**
Write the minimum code to make tests pass. Don't add features not covered by tests.

**5. Run Tests — GREEN Gate**
All tests must pass. If any fail, fix the implementation, not the tests.

**Git checkpoint:** Commit with message like `feat: implement [feature]`

**6. Refactor**
Clean up while keeping tests green. Extract helpers, improve names, reduce duplication.

**Git checkpoint:** Commit with message like `refactor: clean up [feature]`

**7. Verify Coverage**
```bash
npm test -- --coverage
```
Target: 80%+ for new code.

### Testing Patterns

**Unit tests** (Jest/Vitest): Test individual functions and components in isolation.
**API integration tests** (Supertest): Test endpoints with database setup/teardown.
**E2E tests** (Playwright): Test critical user flows in a real browser.

### Test File Organization

```
src/
  components/
    Button.tsx
    Button.test.tsx    # Colocated
  api/
    users/
      route.ts
      route.test.ts    # Colocated
```

### Mocking External Services

- Mock API calls with MSW (Model Service Worker)
- Mock database with test containers or in-memory SQLite
- Never mock the module under test

## Focus Areas

- Strict RED-GREEN-REFACTOR cycle with git checkpoints
- 80%+ coverage target
- Test colocation pattern
- Mocking external services, not internal modules
- User journey-driven test generation

## Examples

**Adding a login endpoint:**
1. Write user journey: "User can log in with valid credentials"
2. Generate test: POST /auth/login with valid body returns 200 + token
3. Run tests (RED) — they fail
4. Implement login route
5. Run tests (GREEN) — they pass
6. Refactor: extract token generation
7. Verify coverage >= 80%