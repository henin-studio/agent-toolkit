---
name: continuous-learning-v2
description: Use when you notice patterns in your work that should be captured as project-level or global instincts. Observes corrections, patterns, and preferences to build a self-improving knowledge base.
origin: ECC
---

# Continuous Learning v2

> Source: ECC | License: MIT

## When to Activate

- When users correct your approach (e.g., "Use X instead of Y")
- When patterns emerge from successful approaches
- When preferences are expressed about code style or workflow
- At session end (if auto-reflection is enabled)

## Instructions

This skill implements a "correct once, never again" learning system. It observes sessions and extracts user corrections, patterns, and preferences as instincts with confidence scoring.

### Instinct Model

Each instinct is an atomic learning with:
- **Trigger**: What situation activates it
- **Action**: What to do differently
- **Confidence**: 0.3 (tentative) → 0.5 (moderate) → 0.7 (strong) → 0.9 (near-certain)
- **Domain tag**: What project/technology it applies to
- **Scope**: Project-local or global

### Confidence Levels

**HIGH (0.7-0.9)** — Explicit corrections:
- "Don't use X, use Y instead"
- "Always check for null before accessing"
- Pattern: User explicitly contradicts your approach

**MEDIUM (0.5)** — Approvals and patterns:
- "Yes, that's exactly right"
- "This approach works well"
- Pattern: User approves a specific approach

**LOW (0.3)** — Observations:
- "Have you considered using Z?"
- "Why not try async/await?"
- Pattern: User suggests alternative without requiring it

### Scope Decision

- **Project-scoped**: Language/framework conventions, project-specific patterns
  - e.g., "Use uv instead of pip in this Python project"
- **Global**: Security practices, general best practices
  - e.g., "Always validate user input at API boundaries"

### Workflow

1. **Signal Detection** — Scan conversation for corrections, approvals, suggestions
2. **Context Analysis** — Extract the 5-message context around each signal
3. **Instinct Creation** — Generate atomic instinct with trigger, action, confidence
4. **User Review** — Present proposed instincts for approval, modification, or skip
5. **Storage** — Save approved instincts with project scope
6. **Application** — Future sessions in the same project automatically apply instincts

### Commands

- `/reflect` — Manually analyze current conversation
- `/reflect-status` — Show learning configuration
- `/instinct-status` — List current instincts
- `/evolve` — Promote high-confidence instincts to skills

### Instinct Promotion

When the same instinct appears in 2+ projects with average confidence >= 0.8:
- It becomes eligible for promotion to global scope
- Review the instinct and approve promotion
- Promoted instincts apply across all projects

### Safety Features

- All instincts require user approval before being saved
- Confidence scoring prevents low-confidence instincts from being applied automatically
- Project-scoped instincts stay within their project unless promoted
- Instincts can be reviewed, modified, or deleted at any time

## Focus Areas

- Capturing explicit corrections as high-confidence instincts
- Distinguishing project-specific vs. global patterns
- Confidence scoring to prevent premature application
- User review before saving any instinct
- Cross-project promotion of validated patterns

## Examples

**Correction captured as instinct:**
> User: "Don't use pip, use uv for Python projects"
> Instinct created: { trigger: "Installing Python packages", action: "Use uv instead of pip", confidence: 0.7, scope: "project" }

**Pattern captured as instinct:**
> User approves the test-first approach multiple times
> Instinct created: { trigger: "Writing new feature", action: "Write tests before implementation", confidence: 0.5, scope: "global" }