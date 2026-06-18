---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code.
origin: superpowers
---

# Writing Plans

> Source: superpowers | License: MIT

## When to Activate

- After brainstorming/design approval, before implementation
- When converting requirements or specs into actionable tasks
- When a feature needs more than 3-4 steps to implement

## Instructions

Write comprehensive implementation plans that an engineer with zero codebase context can follow. Document everything: which files to touch, what code to write, how to test it. Give them the whole plan as bite-sized tasks.

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md` (or project-configured location)

### Plan Document Header

Every plan must start with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
```

### File Structure

Before defining tasks, map out which files will be created or modified. Each file should have one clear responsibility. Files that change together should live together.

### Bite-Sized Task Granularity

Each step should be one action (2-5 minutes):
- "Write the failing test" — one step
- "Run it to make sure it fails" — one step
- "Implement the minimal code to pass the test" — one step
- "Commit" — one step

### Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts:123-145`
- Test: `tests/exact/path/to/test.ts`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Write minimal implementation**
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit**
```

### No Placeholders

Every step must contain actual content. These are plan failures:
- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code — the engineer may read tasks out of order)

### Self-Review

After writing the complete plan, check:
1. **Spec coverage** — Can you point to a task for each requirement?
2. **Placeholder scan** — Search for TBD, TODO, vague instructions. Fix them.
3. **Type consistency** — Do function names and signatures match across tasks?

### Execution Handoff

After saving the plan, offer execution choice:
1. **Subagent-driven** — Fresh subagent per task, review between tasks
2. **Inline execution** — Execute tasks in this session with checkpoints

## Focus Areas

- Breaking work into smallest possible steps
- Exact file paths and complete code in every step
- TDD workflow (test first, then implement)
- Frequent commits with conventional commit messages
- Self-review for gaps and inconsistencies

## Examples

**Feature plan for a login page:**
- Task 1: Write failing test for email validation
- Task 2: Run test, verify RED
- Task 3: Implement email validation
- Task 4: Run test, verify GREEN
- Task 5: Commit
- Task 6: Write failing test for password validation
- ... (continues with same pattern for each component)