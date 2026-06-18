---
name: codebase-onboarding
description: Use when starting work on an unfamiliar codebase, joining a new project, or creating onboarding documentation.
origin: ECC
---

# Codebase Onboarding

> Source: ECC | License: MIT

## When to Activate

- Starting work on a new or unfamiliar codebase
- Onboarding to a project
- Creating or updating a project's CLAUDE.md or onboarding docs

## Instructions

### Phase 1: Reconnaissance

Gather essential project information:

**Package manifests:**
```bash
cat package.json | head -50  # Node.js
cat pyproject.toml             # Python
cat go.mod                     # Go
```

**Framework fingerprints:**
- Next.js: `next.config.*`, `pages/` or `app/` directory
- React: `ReactDOM.render` or `createRoot`
- Express: `app.listen`, router files
- FastAPI: `app = FastAPI()`, route decorators

**Entry points:**
```bash
# Find main files
grep -r "if __name__\|app.listen\|createRoot\|module.exports" --include="*.ts" --include="*.py" src/
```

**Directory structure:**
```bash
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" | head -100
```

**Config and tooling:**
- Linting: `.eslintrc`, `pyproject.toml [tool.ruff]`
- Testing: `jest.config.*`, `vitest.config.*`, `pytest.ini`
- CI: `.github/workflows/`, `.gitlab-ci.yml`

### Phase 2: Architecture Mapping

Document the architecture:
- **Tech stack**: Language, framework, database, caching, message queue
- **Architecture pattern**: Monolith, microservices, serverless, modular monolith
- **Key directories**: Where does business logic live? Routes? Models? Tests?
- **Data flow**: How does a request travel through the system?

### Phase 3: Convention Detection

Identify existing conventions:
- **Naming**: camelCase, snake_case, kebab-case for files/directories
- **Code patterns**: Error handling style, async patterns, state management
- **Git conventions**: Commit message format, branch naming, PR template

### Phase 4: Generate Artifacts

Create two deliverables:

**Onboarding Guide** (`docs/onboarding.md`):
```markdown
# Project Onboarding

## Quick Start
[How to install, configure, and run the project]

## Architecture
[Tech stack, patterns, key directories]

## Conventions
[Naming, code patterns, git workflow]

## Common Tasks
[How to add a feature, fix a bug, run tests, deploy]
```

**Starter CLAUDE.md** (keep under 50 lines):
```markdown
# Project Name

## Tech Stack
[Brief list]

## Key Commands
- Dev: `npm run dev`
- Test: `npm test`
- Build: `npm run build`

## Conventions
[Naming, patterns, rules]

## Architecture
[Key directories and data flow]
```

## Best Practices

- Don't read everything — sample key files, not the whole codebase
- Verify, don't guess — run commands to confirm, don't assume
- Respect existing CLAUDE.md — don't overwrite, enhance
- Keep CLAUDE.md under 50 lines — details go in docs/onboarding.md
- Flag unknowns — mark things you couldn't determine

## Anti-Patterns

- CLAUDE.md over 100 lines (too verbose, won't be read)
- Listing every dependency (noise, not signal)
- Describing obvious directories (src/ contains source — everyone knows)
- Skipping the run commands (most important info for onboarding)

## Focus Areas

- Fast reconnaissance of project essentials
- Architecture pattern identification
- Convention detection from actual code
- Concise onboarding documentation
- Keeping CLAUDE.md short and actionable