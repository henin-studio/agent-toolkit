# Development Context

When working on this project, you have access to:

## Architecture

- **Next.js 15+ App Router** with static export (`output: 'export'`)
- **TypeScript strict mode** — no implicit any
- **Tailwind CSS v4** + **shadcn/ui** for components
- **Zod** for input validation at system boundaries
- **Vitest** for unit/integration tests, **Playwright** for E2E

## Key Files

- `CLAUDE.md` — Project instructions (bilingual FR/EN)
- `AGENTS.md` — Open agents.md specification
- `.claude/agents/` — 25 curated agent definitions
- `.claude/skills/` — 29 curated skill definitions
- `.claude/commands/` — 10 slash commands
- `.claude/hooks/` — 4 lifecycle hooks
- `.claude/rules/` — Path-matched contextual rules
- `.claude/contexts/` — Shared context files (this file)
- `src/` — Next.js app source code
- `scripts/converter.py` — Multi-platform converter
- `scripts/build-catalog.ts` — Catalog builder
- `scripts/install.sh` — Idempotent installer

## Source Repositories

Agents and skills are adapted from:
- **superpowers** (obra) — Methodology workflow skills
- **ECC** (affaan-m) — Everything Claude Code (64 agents, 262 skills)
- **arckit** (tractorjuice) — Enterprise architecture toolkit
- **reflect-system** (haddock-development) — Self-learning skill
- **nas-agents** — Domain-specific agent packs

All content is adapted (not copied) for web development context. Each agent/skill includes source attribution.

## Conventions

- Immutable data patterns (no mutation)
- Functional style preferred
- 80% test coverage minimum
- Conventional commits
- No console.log in production code