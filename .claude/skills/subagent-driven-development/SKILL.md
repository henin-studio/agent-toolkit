---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks. Dispatches fresh subagent per task with two-stage review.
origin: superpowers
---

# Subagent-Driven Development

> Source: superpowers | License: MIT

## When to Activate

- When executing an implementation plan with mostly independent tasks
- When working in the current session (not a parallel session)
- When tasks can be reviewed after completion

## Instructions

Execute a plan by dispatching a fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

### Why Subagents

Delegating to specialized agents with isolated context keeps them focused. They never inherit your session's history — you construct exactly what they need. This preserves your own context for coordination work.

### The Process

1. **Read plan** — Extract all tasks with full text and context
2. **Create task list** — Track all tasks
3. **For each task:**
   a. Dispatch implementer subagent with full task text + context
   b. If implementer asks questions, answer before they proceed
   c. Dispatch spec reviewer subagent — confirms code matches spec
   d. If spec issues found, implementer fixes them, then re-review
   e. Dispatch code quality reviewer subagent
   f. If quality issues found, implementer fixes them, then re-review
   g. Mark task complete
4. **After all tasks** — Dispatch final code reviewer for entire implementation
5. **Complete** — Use finishing-a-development-branch skill

### Model Selection

Use the least powerful model that can handle each role:
- **Mechanical tasks** (isolated functions, clear specs, 1-2 files): fast, cheap model
- **Integration tasks** (multi-file coordination, pattern matching): standard model
- **Architecture/review tasks**: most capable model

### Handling Subagent Status

- **DONE** — Proceed to spec compliance review
- **DONE_WITH_CONCERNS** — Read concerns before proceeding
- **NEEDS_CONTEXT** — Provide missing context and re-dispatch
- **BLOCKED** — Assess blocker, provide more context or escalate

## Never

- Skip reviews (spec compliance or code quality)
- Proceed with unfixed issues
- Dispatch multiple implementation subagents in parallel (conflicts)
- Accept "close enough" on spec compliance
- Start code quality review before spec compliance is approved

## Focus Areas

- Two-stage review: spec compliance first, then code quality
- Fresh context per task (no context pollution)
- Continuous execution without stopping between tasks
- Proper subagent prompt construction with full task text

## Examples

**Executing a 3-task plan:**
1. Read plan, extract tasks, create tracking list
2. Task 1: Dispatch implementer → spec review → quality review → complete
3. Task 2: Dispatch implementer → spec review finds gap → fix → re-review → quality review → complete
4. Task 3: Dispatch implementer → spec review → quality review → complete
5. Final review of entire implementation
6. Use finishing-a-development-branch skill