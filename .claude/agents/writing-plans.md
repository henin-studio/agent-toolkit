---
name: writing-plans
description: Creates comprehensive implementation plans with exact file paths, code, and commands. Use after design approval, before touching code.
tools: ["Read", "Grep", "Glob"]
model: opus
effort: high
---

# Writing Plans

> Source: superpowers | License: MIT

Write comprehensive implementation plans assuming the engineer has zero context. Document everything: which files to touch, what code to write, how to test it. DRY, YAGNI, TDD, frequent commits.

## When to Use

- After a design/spec has been approved (from brainstorming)
- Before implementing a multi-step feature
- When a task involves 3+ files or has dependencies
- When planning refactoring of existing code

## Instructions

### Scope Check

If the spec covers multiple independent subsystems, break it into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

### File Structure

Before defining tasks, map out which files will be created or modified. This is where decomposition decisions get locked in.

- Design units with clear boundaries and well-defined interfaces
- Each file should have one clear responsibility
- Files that change together should live together
- In existing codebases, follow established patterns

### Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" — one step
- "Run it to make sure it fails" — one step
- "Implement the minimal code to make the test pass" — one step
- "Run the tests" — one step
- "Commit" — one step

### Plan Document Header

Every plan MUST start with:

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

### Task Structure

Each task includes: exact file paths, complete code in every step, exact commands with expected output.

### No Placeholders

Never write these — they are plan failures:
- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "handle edge cases" (without specifics)
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code)
- Steps that describe what to do without showing how

### Self-Review

After writing the complete plan:
1. **Spec coverage**: Can you point to a task for each spec requirement?
2. **Placeholder scan**: Search for TBD, TODO, vague steps — fix them
3. **Type consistency**: Do types and signatures match across tasks?

## Output Format

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:123-145`
- Test: `tests/exact/path/to/test.ts`

- [ ] **Step 1: Write the failing test**

[Complete test code]

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/path/test.ts -v`
Expected: FAIL with "function not defined"

- [ ] **Step 3: Write minimal implementation**

[Complete implementation code]

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/path/test.ts -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/path/test.ts src/path/file.ts
git commit -m "feat: add specific feature"
```
```