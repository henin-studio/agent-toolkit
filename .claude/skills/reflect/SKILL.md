---
name: reflect
description: Use when users provide corrections, express preferences, or when patterns emerge from successful approaches. Analyzes conversations to extract learnings and propose skill improvements.
origin: reflect
---

# Reflect — Self-Improving Skills

> Source: claude-reflect-system | License: MIT

## When to Activate

- When users correct your approach ("Use X instead of Y")
- When users express approval of a specific approach
- When patterns emerge from successful implementations
- At session end (if auto-reflection is enabled)
- When you notice a recurring correction across sessions

## Instructions

This skill enables learning from conversations by analyzing corrections, approvals, and patterns, then proposing updates to relevant skills. It implements a "correct once, never again" learning system.

### How It Works

1. **Signal Detection** — Scan conversation for corrections, approvals, and suggestions
2. **Context Analysis** — Extract the 5-message context around each signal
3. **Instinct Creation** — Generate a learning with trigger, action, and confidence score
4. **User Review** — Present proposed changes for approval, modification, or skip
5. **Application** — Save approved learnings as project-scoped instincts

### Confidence Levels

**HIGH — Explicit corrections:**
- "Don't use X, use Y instead"
- "Always check for null before accessing"
- User contradicts your approach with a specific alternative

**MEDIUM — Approvals:**
- "Yes, that's exactly right"
- "This approach works well"
- User validates a specific approach

**LOW — Observations:**
- "Have you considered using Z?"
- "What about async/await here?"
- User suggests without requiring

### Simplified Learning Method (Markdown-Based)

Instead of Python scripts, use markdown-based self-learning:

**Create a learning file** at `.claude/learnings/YYYY-MM-DD-topic.md`:
```markdown
# Learning: Use uv instead of pip

**Date**: 2026-06-18
**Confidence**: HIGH
**Scope**: project
**Trigger**: When installing Python packages
**Action**: Use `uv add` or `uv pip install` instead of `pip install`

**Context**: User corrected: "Don't use pip, use uv for Python projects"

**Replaces**: Defaulting to `pip install`
```

**Review process:**
1. At session end, review any corrections or patterns
2. Write proposed learnings to the learnings directory
3. Ask user to approve or modify
4. If approved, incorporate into relevant skills or project CLAUDE.md

### Cross-Session Pattern Detection

When you notice the same correction in multiple sessions:
1. Note the pattern and how many times it appeared
2. If it appeared 2+ times across sessions, propose promoting it to:
   - Project CLAUDE.md (for project-specific patterns)
   - Global rules (for universal patterns like "always validate input")

### Safety Features

- All learnings require user approval before being saved
- Confidence scoring prevents low-confidence learnings from being applied automatically
- Project-scoped learnings stay within their project unless promoted
- Learnings can be reviewed, modified, or deleted at any time

## Focus Areas

- Capturing explicit corrections as high-confidence learnings
- Distinguishing project-specific vs. global patterns
- Confidence scoring to prevent premature application
- User review before saving any learning
- Cross-session pattern promotion

## Examples

**Correction captured as learning:**
> User: "Don't use pip, use uv for Python projects"
> Learning: { trigger: "Installing Python packages", action: "Use uv instead of pip", confidence: HIGH, scope: project }

**Pattern promoted to global:**
> Session 1: "Always validate user input at API boundaries"
> Session 2: "Always validate user input at API boundaries"
> Promoted to global rule: "Validate all user input at system boundaries"