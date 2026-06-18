---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from the current workspace, or before executing implementation plans.
origin: superpowers
---

# Using Git Worktrees

> Source: superpowers | License: MIT

## When to Activate

- Starting feature work that needs isolation
- Before executing implementation plans
- When working on multiple branches simultaneously

## Instructions

### Step 0: Detect Existing Isolation

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

If already in a linked worktree (and not a submodule), skip to project setup.

### Step 1: Create Isolated Workspace

**1a. Native worktree tool (preferred)** — If available, use it.

**1b. Git worktree fallback:**
```bash
# Verify .worktrees/ is gitignored
git check-ignore -q .worktrees 2>/dev/null || (echo ".worktrees/" >> .gitignore && git add .gitignore && git commit -m "chore: add worktrees to gitignore")

git worktree add .worktrees/<branch-name> -b <branch-name>
cd .worktrees/<branch-name>
```

### Step 3: Project Setup

Auto-detect and install dependencies:
```bash
[ -f package.json ] && npm install
[ -f Cargo.toml ] && cargo build
[ -f requirements.txt ] && pip install -r requirements.txt
[ -f go.mod ] && go mod download
```

### Step 4: Verify Clean Baseline

Run tests. If they fail, report and ask whether to proceed.

## Focus Areas

- Detecting existing isolation before creating worktrees
- Preferring platform-native tools
- Verifying .gitignore before creating project-local worktrees
- Running dependency installation and baseline tests