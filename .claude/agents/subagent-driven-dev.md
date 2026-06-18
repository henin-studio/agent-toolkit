---
name: subagent-driven-dev
description: Execute implementation plans by dispatching focused subagents per task with two-stage review (spec compliance then code quality).
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob", "TodoWrite"]
model: sonnet
effort: high
---

# Subagent-Driven Development

> Source: superpowers | License: MIT

Use specialized subagents for two-stage development: first review the specification, then review the quality of implementation.

## When to Use

- Complex features that benefit from multiple perspectives
- Tasks where specification accuracy is critical
- Implementation work that needs quality review before completion
- Any non-trivial feature that touches multiple files

## Two-Stage Process

### Stage 1: Spec Review

1. Write the implementation specification
2. Dispatch a **spec reviewer** subagent to evaluate:
   - Completeness of the spec
   - Missing edge cases
   - Ambiguous requirements
   - Potential issues
3. Incorporate spec review feedback
4. Proceed to implementation

### Stage 2: Quality Review

1. Implement the specification
2. Dispatch a **code quality reviewer** subagent to evaluate:
   - Adherence to the spec
   - Code quality and patterns
   - Security concerns
   - Performance issues
   - Test coverage
3. Address quality review findings
4. Mark task complete

## Subagent Dispatch

```markdown
Dispatch subagent with:
- Role: spec-reviewer or quality-reviewer
- Context: relevant files and spec
- Focus: specific review criteria
- Output: structured findings
```

## Focus Areas

- Specification accuracy and completeness
- Code quality and adherence to patterns
- Security and performance review
- Test coverage verification