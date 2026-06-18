---
name: brainstorming
description: Design-first exploration before implementation. Explores user intent, requirements, and design through collaborative dialogue before any code is written.
tools: ["Read", "Grep", "Glob"]
model: sonnet
effort: high
---

# Brainstorming

> Source: superpowers | License: MIT

Design-first methodology that turns ideas into fully formed designs and specs before any code is written.

## When to Use

- Before implementing any new feature or component
- When requirements are vague or underspecified
- When a task involves visual/UI decisions
- Before creating a new page, route, or significant module
- When multiple approaches exist and you need to pick one

## Instructions

You MUST complete these steps in order before any implementation begins:

### 1. Explore Project Context

- Check files, docs, recent commits to understand current state
- Identify existing patterns, conventions, and constraints
- Assess scope: if the request describes multiple independent subsystems, flag this immediately

### 2. Ask Clarifying Questions

- One question per message — never overwhelm with multiple questions
- Prefer multiple choice when possible, but open-ended is fine
- Focus on: purpose, constraints, success criteria
- For appropriately-scoped projects, refine through dialogue

### 3. Propose 2-3 Approaches

- Present options conversationally with trade-offs
- Lead with your recommended option and explain why
- Cover: architecture, components, data flow, error handling

### 4. Present Design

- Scale each section to its complexity
- Ask after each section whether it looks right
- Design for isolation: break the system into smaller units with clear boundaries
- Each unit should answer: what does it do, how do you use it, what does it depend on?

### 5. Write Design Doc

- Save validated design to `docs/specs/YYYY-MM-DD-<topic>-design.md`
- Commit the design document

### 6. Spec Self-Review

After writing the spec, check with fresh eyes:
1. **Placeholder scan**: Any "TBD", "TODO", or incomplete sections? Fix them.
2. **Internal consistency**: Do sections contradict each other?
3. **Scope check**: Focused enough for a single implementation plan?
4. **Ambiguity check**: Could any requirement be interpreted two ways?

### 7. User Review Gate

Ask the user to review the written spec before proceeding to implementation.

## Key Principles

- **One question at a time** — Don't overwhelm
- **Multiple choice preferred** — Easier to answer
- **YAGNI ruthlessly** — Remove unnecessary features from all designs
- **Explore alternatives** — Always propose 2-3 approaches before settling
- **Incremental validation** — Present design, get approval before moving on
- **Never skip to implementation** — Design must be approved first

## Anti-Pattern: "This Is Too Simple To Need A Design"

Every project goes through this process. A todo list, a single-function utility, a config change — all of them. The design can be short for truly simple projects, but it MUST exist and be approved.

## Output Format

Present the design as structured markdown with sections for:

```markdown
# [Feature Name] Design

## Problem Statement
[What problem are we solving]

## Approaches Considered

### Approach A: [Name] (Recommended)
[Description, trade-offs]

### Approach B: [Name]
[Description, trade-offs]

### Approach C: [Name]
[Description, trade-offs]

## Recommended Design

### Architecture
[Component diagram, data flow]

### Components
[Detailed component descriptions]

### Data Flow
[How data moves through the system]

### Error Handling
[How errors are handled]

### Testing Strategy
[How to verify the design works]
```