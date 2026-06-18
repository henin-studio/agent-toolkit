# AGENTS.md

> This file follows the [agents.md open specification](https://agents.md/).
> It serves as a machine-readable "README for agents" compatible with Claude Code, Codex, Cursor, Gemini, and other AI coding agents.

---

## Project Overview

**agent-toolkit** is a curated collection of agents, skills, and hooks for web development, sourced from AI-HUB repositories (superpowers, ECC, arckit, reflect-system, nas-agents). It provides:

- **29 skills** across 7 categories (frontend, styling, architecture, devops, SEO, testing, workflow)
- **10 agents** for specialized web development tasks
- **4 hooks** for session lifecycle management (start, pre-bash, pre-write, stop)
- A **multi-platform converter** that generates manifests for Codex, Cursor, Gemini, and OpenCode from the `.claude/` source of truth
- A **Next.js catalog app** for browsing, installing, and managing toolkit components

The canonical source is the `.claude/` directory. All other platform manifests are generated from it via `scripts/converter.py`.

---

## Build and Test Commands

```bash
# Development
npm run dev              # Start Next.js dev server (port 3000)

# Build
npm run build            # Production build (Next.js)
npm run catalog          # Generate catalog data from .claude/ sources

# Lint
npm run lint             # ESLint check

# Multi-platform conversion
npm run convert           # Convert to all platforms
npm run convert:codex    # Convert to Codex CLI only
npm run convert:cursor   # Convert to Cursor only
npm run convert:gemini   # Convert to Gemini CLI only
npm run convert:opencode # Convert to OpenCode only

# Testing
npx vitest               # Run unit tests
npx vitest --coverage    # Run with coverage report (target: 80%+)
npx playwright test      # Run E2E tests
```

---

## Code Style Guidelines

### TypeScript
- **Strict mode** enabled (`strict: true` in tsconfig.json)
- No implicit `any` — always provide explicit types
- Use Zod schemas for input validation at system boundaries (API routes, form submissions, config files)
- Functional patterns preferred: `const`, pure functions, no mutation

### Immutability
- Always create new objects — never mutate existing ones
- Use spread operator for updates: `{ ...obj, field: value }`
- Prefer `const` declarations and pure functions

### Error Handling
- Wrap all risky operations in try/catch
- User-facing error messages in UI code
- Detailed context in server-side logs
- Never swallow errors silently

### No console.log in Production
- Use a structured logging library instead
- The pre-write hook warns about `console.log` statements in modified files

### File Organization
- Prefer many small files over few large ones
- High cohesion, low coupling
- 200-400 lines per file, 800 lines maximum
- Organize by feature/domain, not by type

### Component Patterns
- React Server Components by default (Next.js App Router)
- Client components only when interactivity is needed (`"use client"`)
- Colocate styles with components
- Use the repository pattern for data access

---

## Testing Instructions

- **Always run tests before merging** — failing tests block merge
- **Minimum coverage: 80%** (unit + integration combined)
- Unit tests: Vitest for pure functions, utilities, Zod schemas
- Integration tests: Vitest + React Testing Library for components and pages
- E2E tests: Playwright for critical user flows (catalog browsing, skill installation, manifest generation)
- Validate all API inputs/outputs with Zod schemas
- Write tests first (TDD) when implementing new features

---

## PR and Commit Guidelines

### Conventional Commits
```
<type>: <description>

<optional body>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

### Branching
- `main` — production-ready, always green
- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `refactor/<name>` — code restructuring

### Pull Requests
- Include a clear summary of changes
- Reference related issues
- Ensure all CI checks pass (lint, tests, build)
- Squash merge preferred for clean history

---

## Security Considerations

- **No hardcoded secrets** — use environment variables for all API keys, tokens, and passwords
- **Validate all inputs** at system boundaries using Zod schemas
- **No `console.log`** in production code (use structured logging)
- **Protected files** — the pre-write hook blocks writes to `.env`, config secrets, and production configs
- **Dangerous commands** — the pre-bash hook blocks destructive operations (`rm -rf /`, force push to main, database drops)
- **Dependencies** — audit with `npm audit` before merging

---

## Compatibility Note

This `AGENTS.md` file is compatible with:
- **Claude Code** — reads `AGENTS.md` automatically
- **Codex CLI** — reads `AGENTS.md` as project instructions
- **Cursor** — reads `AGENTS.md` for agent context
- **Gemini CLI** — reads `GEMINI.md` (generated from this content)
- **OpenCode** — uses `.opencode/plugins/` for skill registration

The `.claude/` directory is the canonical source. Platform-specific manifests are auto-generated and should not be edited manually.