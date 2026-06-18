---
name: executing-plans
description: Use when you have a written implementation plan to execute with review checkpoints.
origin: superpowers
---

# Executing Plans

> Source: superpowers | License: MIT

## When to Activate

- When you have a written implementation plan ready to execute
- After brainstorming and writing-plans phases are complete
- When picking up a plan that was created earlier

## Instructions

Load the plan, review it critically, then execute all tasks with checkpoints.

### Step 1: Load and Review Plan

1. Read the plan file
2. Review critically — identify any questions or concerns
3. If concerns: raise them before starting
4. If no concerns: create a task list and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in progress
2. Follow each step exactly (plans have bite-sized steps)
3. Run verifications as specified
4. Mark as completed

### Step 3: Complete Development

After all tasks are verified:
- Run the full test suite
- Use the finishing-a-development-branch skill to complete the work

## When to Stop and Ask for Help

**STOP immediately when:**
- You hit a blocker (missing dependency, test fails, instruction unclear)
- The plan has critical gaps preventing progress
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## Guidelines

- Review the plan critically before starting
- Follow plan steps exactly — don't improvise
- Don't skip verifications
- Stop when blocked, don't guess
- Never start implementation on main/master without explicit user consent

## Focus Areas

- Strict adherence to plan steps
- Running all verification commands
- Stopping and escalating when blocked
- Tracking progress through the task list

## Examples

**Executing a 5-task plan:**
1. Read plan, create task list
2. Task 1: Write test → verify RED → implement → verify GREEN → commit
3. Task 2: Write test → verify RED → implement → verify GREEN → commit
4. Continue through all tasks
5. Run full test suite
6. Use finishing-a-development-branch skill

**When a plan step is unclear:**
> "Step 3 says 'Add error handling to the API route' but doesn't specify which errors. Should I handle validation errors, auth errors, or both?"