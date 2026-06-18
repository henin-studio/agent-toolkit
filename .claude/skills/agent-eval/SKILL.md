---
name: agent-eval
description: Use when comparing AI agents or coding tools against each other, measuring pass rates, cost, and consistency across standardized tasks.
origin: ECC
---

# Agent Evaluation

> Source: ECC | License: MIT

## When to Activate

- Comparing different AI agents or models
- Measuring whether an agent change improved or regressed
- Running standardized benchmarks before deployment
- Evaluating agent capabilities for a specific task type

## Instructions

### Evaluation Philosophy

Evals are the "unit tests of AI development." Define them before implementation, run them continuously, track regressions.

### Eval Types

**Capability Evals** — "Can the agent do X?"
- Test specific capabilities: code generation, debugging, refactoring
- Define success criteria upfront
- Run multiple trials (3-5 minimum for statistical significance)

**Regression Evals** — "Did we break Y?"
- Test previously working functionality
- Run after every change to agent configuration
- Must pass before deployment

### Grader Types

**Code-Based (Deterministic):**
```yaml
task: "Create a function that reverses a string"
grader:
  type: code
  assertions:
    - input: "hello"
      expected: "olleh"
    - input: ""
      expected: ""
    - input: "a"
      expected: "a"
```

**Model-Based (LLM-as-Judge):**
```yaml
task: "Write a React component for a modal dialog"
grader:
  type: model
  rubric:
    - criterion: "Component renders correctly"
      weight: 2
    - criterion: "Accessible with keyboard"
      weight: 3
    - criterion: "Handles close on Escape key"
      weight: 2
    - criterion: "No console errors"
      weight: 1
```

**Human (Manual):**
- For ambiguous outputs where code and model graders can't decide
- Use sparingly, primarily for qualitative assessment

### Metrics

- **pass@k**: Probability of at least one success in k attempts
- **pass^k**: Probability of all k attempts succeeding (consistency)
- **Cost**: Total tokens consumed per task
- **Time**: Wall-clock time per task

### Best Practices

- Use 3-5 tasks per evaluation
- Run 3+ trials per agent per task for statistical significance
- Pin agent versions/commits for reproducibility
- Store eval results in `.claude/evals/`
- Track metrics over time to detect regressions

### Eval Workflow

1. **Define**: Write task description and success criteria
2. **Implement**: Create test harness and grader
3. **Evaluate**: Run agent on task, collect results
4. **Report**: Compare agents, identify strengths/weaknesses

### Anti-Patterns

- Overfitting prompts to pass specific evals
- Measuring only happy paths (always test edge cases)
- Ignoring cost/latency drift
- Allowing flaky graders in release gates

## Focus Areas

- Defining clear success criteria before evaluation
- Using multiple grader types appropriately
- Statistical significance with multiple trials
- Tracking regression over time
- Balancing capability and cost metrics

## Examples

**Comparing two agents on debugging tasks:**
```yaml
name: debug-comparison
tasks:
  - "Fix the off-by-one error in pagination"
  - "Resolve the race condition in async handler"
  - "Fix the null pointer exception in user service"
trials: 3
agents: [agent-a, agent-b]
grader: code-based
metrics: [pass_rate, cost, time]
```