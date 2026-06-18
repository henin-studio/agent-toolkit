---
name: architecture-decision-records
description: Use when making significant architectural choices, selecting technologies, or designing system boundaries that affect future development.
origin: ECC
---

# Architecture Decision Records

> Source: ECC | License: MIT

## When to Activate

- Choosing a technology, framework, or library
- Designing system boundaries or data flow
- Deciding on authentication, caching, or deployment strategies
- Any decision that would be expensive to reverse

## Instructions

### ADR Format

Document each decision in a structured format (Nygard style):

```markdown
# ADR-NNNN: [Title]

## Date
YYYY-MM-DD

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-NNNN

## Deciders
[List of people involved in the decision]

## Context
[What is the issue that we're seeing that is motivating this decision?]

## Decision
[What is the change that we're proposing/making?]

## Alternatives Considered

### [Alternative 1]
- **Pros:** [List]
- **Cons:** [List]
- **Why Not:** [Reason]

### [Alternative 2]
- **Pros:** [List]
- **Cons:** [List]
- **Why Not:** [Reason]

## Consequences

### Positive
- [Benefits of this decision]

### Negative
- [Costs or risks]

### Risks
- [What could go wrong and mitigation strategies]
```

### Workflow

1. **Initialize** (first time): Create `docs/adr/` directory with template and README index
2. **Identify decision**: When a choice affects architecture, technology, or boundaries
3. **Gather context**: What's the problem? What constraints exist?
4. **Document alternatives**: At least 2 alternatives with pros/cons
5. **State consequences**: Positive, negative, and risks
6. **Assign number**: Sequential (ADR-0001, ADR-0002, etc.)
7. **Confirm**: Get user approval before finalizing
8. **Write**: Save to `docs/adr/NNNN-title.md`
9. **Update index**: Add to `docs/adr/README.md`

### Decision Detection Signals

Look for these moments that warrant an ADR:
- "Should we use X or Y?" — technology choice
- "How should we structure the API?" — architecture pattern
- "Where should auth happen?" — security design
- "Let's go with X" — explicit decision being made
- Comparing frameworks, libraries, or patterns

### ADR Lifecycle

- **Proposed**: Written but not yet approved
- **Accepted**: Approved and in effect
- **Deprecated**: No longer applies (link to replacement)
- **Superseded**: Replaced by a newer ADR

### What Makes a Good ADR

- Be specific about the context — what problem are we solving?
- Record why, not just what — future readers need rationale
- Include rejected alternatives — they show what was considered
- State consequences honestly — both positive and negative
- Keep it short — 1-2 pages maximum
- Use present tense — decisions are statements, not narratives

### Directory Structure

```
docs/adr/
  README.md           # Index of all ADRs
  template.md          # Template for new ADRs
  0001-database-choice.md
  0002-auth-strategy.md
  ...
```

## Focus Areas

- Capturing architectural decisions with context and rationale
- Including alternatives considered with pros/cons
- Honest assessment of consequences and risks
- Sequential numbering and lifecycle tracking
- User confirmation before finalizing

## Examples

**ADR-0001: Use PostgreSQL over MongoDB**
- Context: Need relational data with complex queries
- Decision: Use PostgreSQL as primary database
- Alternatives: MongoDB (pros: schema flexibility, cons: no joins, inconsistent data)
- Consequences: Strong data integrity, but rigid schema