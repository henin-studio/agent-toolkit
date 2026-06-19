---
name: ralphex
description: Use when autonomously executing implementation plans with Claude Code or Codex. Handles multi-phase code review, git branching, worktree isolation, and plan tracking. Extended Ralph loop for production-grade autonomous coding.
origin: ralphex
---

# ralphex

> Source: ralphex (v1.5.1) by umputun | License: MIT | 1.3k ⭐

Standalone CLI for autonomous plan execution. Takes a markdown plan, orchestrates Claude Code or Codex through tasks sequentially in fresh sessions, runs multi-phase code reviews, handles git branching and worktree isolation, and tracks progress automatically.

## When to Activate

- Executing a multi-step implementation plan autonomously
- Running code reviews with multiple parallel agents
- Creating structured implementation plans via Q&A
- Converting plans from other formats (OpenSpec, spec-kit, GitHub issues)
- Running CI/CD-like review pipelines on code changes

## Installation

```bash
# Homebrew (macOS)
brew install umputun/apps/ralphex

# Go install (any platform)
go install github.com/umputun/ralphex/cmd/ralphex@latest

# Binary releases
# https://github.com/umputun/ralphex/releases

# Docker
curl -sL https://raw.githubusercontent.com/umputun/ralphex/master/scripts/ralphex-dk.sh -o /usr/local/bin/ralphex
chmod +x /usr/local/bin/ralphex
```

## Quick Start

### Execute a Plan (Full Pipeline)

```bash
# Full pipeline: tasks → review → external review → second review
ralphex docs/plans/my-feature.md

# Tasks only (skip reviews)
ralphex --tasks-only docs/plans/my-feature.md

# Review only (skip tasks)
ralphex --review docs/plans/my-feature.md

# External review only (Codex/custom)
ralphex --codex-only docs/plans/my-feature.md
```

### Create a Plan Interactively

```bash
ralphex --plan "Add user authentication with JWT tokens"
# Claude explores codebase, asks questions, generates plan
# User reviews, revises, or accepts the plan
```

### Convert Existing Plans

```bash
ralphex --adopt spec-kit    # Convert from OpenSpec format
ralphex --adopt github-issue # Convert from GitHub issues
```

### Initialize Project Config

```bash
ralphex --init              # Create .ralphex/config in current project
ralphex --reset             # Reset global config to defaults
ralphex --dump-defaults /tmp/ralphex-defaults  # Extract embedded defaults
```

## Plan Format

Plans are Markdown files in `docs/plans/`:

```markdown
# Plan: Add User Authentication

## Overview
Implement JWT-based authentication with refresh tokens.

## Validation Commands
- `go test ./...`
- `npm run lint`
- `npm run test`

### Task 1: Set up JWT middleware
- [ ] Create auth middleware module
- [ ] Add token generation and validation
- [ ] Write unit tests for middleware

### Task 2: Add login/register endpoints
- [ ] POST /auth/login endpoint
- [ ] POST /auth/register endpoint
- [ ] POST /auth/refresh endpoint
- [ ] Integration tests

### Task 3: Frontend integration
- [ ] Login form component
- [ ] Auth context provider
- [ ] Protected route wrapper
```

**Rules**:
- `### Task N:` and `### Iteration N:` are structural tokens (MUST be English)
- `- [ ]` / `- [x]` checkboxes belong ONLY in Task sections
- Completed plans move to `docs/plans/completed/`

## Execution Modes

| Mode | Flag | What Runs |
|------|------|-----------|
| **Full** (default) | (none) | Tasks → Review → External Review → Second Review |
| **Tasks only** | `--tasks-only` | Tasks only, skip all reviews |
| **Review only** | `--review` | Skip tasks, run full review pipeline |
| **External only** | `--codex-only` / `--external-only` | Skip tasks and first review, run external review loop |
| **Plan creation** | `--plan "desc"` | Interactive Q&A with Claude |

## Multi-Agent Review System

### Phase 2: First Code Review (5 agents in parallel)

| Agent | Focus Area |
|-------|-----------|
| `quality` | Bugs, security issues, race conditions |
| `implementation` | Does code achieve stated goals? |
| `testing` | Test coverage and quality |
| `simplification` | Detect over-engineering |
| `documentation` | Do docs need updates? |

### Phase 2.5: External Review (Codex/custom)

```bash
# Default: Codex reviews Claude's work
ralphex --external-review-tool=codex docs/plans/feature.md

# Custom review script
ralphex --external-review-tool=custom --custom-review-script=/path/to/review.sh docs/plans/feature.md

# Skip external review
ralphex --external-review-tool=none docs/plans/feature.md
```

### Phase 3: Second Code Review (2 agents)

| Agent | Focus Area |
|-------|-----------|
| `quality` | Critical/major issues only |
| `implementation` | Final implementation check |

## Key Configuration

### CLI Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--max-iterations=N` | Max task iterations | 50 |
| `--max-external-iterations=N` | Max external review rounds | auto |
| `--review-patience=N` | Terminate review after N unchanged rounds | auto |
| `--plan-model=model[:effort]` | Model for plan creation | sonnet |
| `--task-model=model[:effort]` | Model for task execution | sonnet |
| `--review-model=model[:effort]` | Model for review phases | sonnet |
| `--worktree` | Run in isolated git worktree | false |
| `--branch=name` | Override branch name | auto from plan filename |
| `--codex` | Use Codex as executor | false |
| `--serve` | Start web dashboard | false |
| `--port=N` | Dashboard port | 8080 |

### Configuration Hierarchy

CLI flags > local `.ralphex/config` > global `~/.config/ralphex/config` > embedded defaults

### Signal Protocol

ralphex uses special markers in LLM output to detect phase completion:

| Signal | Meaning |
|--------|---------|
| `<<<RALPHEX:COMPLETED>>>` | Task/phase completed successfully |
| `<<<RALPHEX:FAILED>>>` | Task/phase failed |
| `<<<RALPHEX:REVIEW_DONE>>>` | Review completed, no more issues |
| `<<<RALPHEX:ALL_TASKS_DONE>>>` | All tasks in plan completed |
| `<<<RALPHEX:QUESTION>>>` | Agent needs user input |
| `<<<RALPHEX:PLAN_DRAFT>>>` | Plan draft ready for review |
| `<<<RALPHEX:PLAN_READY>>>` | Plan finalized and accepted |

## Git Integration

```bash
# Automatic branch creation from plan filename
ralphex docs/plans/fix-auth-bug.md
# Creates branch: fix-auth-bug

# Worktree isolation for parallel execution
ralphex --worktree docs/plans/feature-a.md
# Creates: .ralphex/worktrees/feature-a/

# Skip finalize step (rebase/squash)
ralphex --skip-finalize docs/plans/feature.md
```

## Manual Break (Ctrl+\)

- **During task phase**: Pauses execution, prompts "press Enter to continue, Ctrl+C to abort". Re-runs same task with fresh session.
- **During external review**: Terminates the loop immediately.
- Not available on Windows.

## Notifications

```ini
# .ralphex/config
[notify]
telegram_token = "123456:ABC-DEF"
telegram_chat = "123456789"
email_to = "dev@example.com"
slack_webhook = "https://hooks.slack.com/..."
```

Supported channels: Telegram, Email, Slack, Webhook, Custom script.

## Provider Wrappers

Alternative providers can replace Claude Code via `--claude-command`:

| Wrapper | Script |
|---------|--------|
| Codex as Claude | `scripts/codex-as-claude/codex-as-claude.sh` |
| Copilot as Claude | `scripts/copilot-as-claude/copilot-as-claude.sh` |
| Gemini as Claude | `scripts/gemini-as-claude/gemini-as-claude.sh` |
| AGY as Claude | `scripts/agy-as-claude/agy-as-claude.sh` |
| OpenCode as Claude | `scripts/opencode/opencode-as-claude.sh` |

## Web Dashboard

```bash
ralphex --serve --port 8080 docs/plans/feature.md
# Opens real-time dashboard at http://localhost:8080
# SSE streaming for live progress updates
```

## Comparison: ralphex vs Basic Ralph Loop

| Feature | Ralph Loop (Python) | ralphex (Go) |
|---------|-------------------|---------------|
| Multi-phase pipeline | ❌ | ✅ 4 phases |
| Multi-agent review | ❌ | ✅ 5 parallel agents |
| External review | ❌ | ✅ Codex/custom |
| Interactive plan creation | ❌ | ✅ Q&A with draft review |
| Worktree isolation | ❌ | ✅ `--worktree` |
| Per-phase model config | ❌ | ✅ `--plan/task/review-model` |
| Multiple executor backends | ❌ | ✅ Claude/Codex/Gemini/Custom |
| Web dashboard | ❌ | ✅ `--serve` |
| Notifications | ❌ | ✅ Telegram/Email/Slack/Webhook |
| Stalemate detection | ❌ | ✅ `--review-patience` |
| Session/idle timeout | ❌ | ✅ `--session-timeout`, `--idle-timeout` |
| Docker support | ❌ | ✅ Full Docker wrapper |
| Finalize step | ❌ | ✅ Rebase/squash |

## Focus Areas

- Autonomous plan execution with fresh session per task (no context degradation)
- Multi-agent code review with quality, implementation, testing, simplification, documentation agents
- Git worktree isolation for parallel plan execution
- Interactive plan creation with Q&A and draft review
- External review with Codex or custom scripts
- Signal-based phase detection for reliable automation

## Related

- Skill: `executing-plans` — Executing existing implementation plans
- Skill: `writing-plans` — Creating implementation plans
- Skill: `code-reviewer` — Code review specialist
- Agent: `core/executor` — Task execution agent
- Repo: `09-AGENT-SKILLS/repos/ralphex/` — Full source code