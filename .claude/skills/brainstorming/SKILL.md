---
name: brainstorming
description: Use before any creative work — creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements, and design before implementation.
origin: superpowers
---

# Brainstorming Ideas Into Designs

> Source: superpowers | License: MIT

## When to Activate

- Starting a new feature, component, or project
- Before writing any code for a creative or design task
- When a request involves UI/UX decisions, architecture choices, or multiple approaches
- When you catch yourself about to implement without understanding requirements

## Instructions

Turn ideas into fully formed designs through collaborative dialogue. Start by understanding the current project context, then ask questions one at a time. Present the design and get approval before any implementation.

### Process

1. **Explore project context** — Check files, docs, recent commits. Understand what already exists.
2. **Ask clarifying questions** — One at a time. Prefer multiple choice when possible. Understand purpose, constraints, and success criteria.
3. **Assess scope** — If the request describes multiple independent subsystems, flag this immediately. Help decompose into sub-projects before diving into details.
4. **Propose 2-3 approaches** — With trade-offs and your recommendation. Lead with your recommended option.
5. **Present design in sections** — Scale each section to its complexity. Ask after each section whether it looks right.
6. **Write design doc** — Save to `docs/specs/YYYY-MM-DD-<topic>-design.md` (or project-configured location). Commit it.
7. **Self-review the spec** — Check for placeholders, contradictions, ambiguity, and scope creep. Fix issues inline.
8. **User reviews written spec** — Ask user to review before proceeding.
9. **Transition to implementation** — Use the writing-plans skill to create an implementation plan.

### Design for Isolation and Clarity

- Break the system into units with one clear purpose each
- Each unit: what does it do, how do you use it, what does it depend on?
- Prefer smaller, focused files over large ones that do too much
- Files that change together should live together

### Working in Existing Codebases

- Explore current structure before proposing changes
- Follow existing patterns
- Include targeted improvements for problems that affect the current work
- Don't propose unrelated refactoring

## Focus Areas

- Requirement elicitation and clarification
- Scope assessment and decomposition
- Architecture and component design
- Data flow and error handling
- Incremental validation (approve each section)

## Examples

**Starting a new feature:**
> "I want to add user authentication to the app."
> → Ask: What auth providers? Session or JWT? What pages need protection?

**Modifying behavior:**
> "The search should be faster."
> → Ask: What's slow currently? How many records? What's the expected response time?

**Designing a component:**
> "I need a dashboard with charts."
> → Ask: What data sources? Real-time or snapshot? Who are the users? What decisions do they make from the dashboard?

## Anti-Pattern

"This is too simple to need a design" — Every project goes through this process. A todo list, a single-function utility, a config change — all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short (a few sentences), but you must present it and get approval.