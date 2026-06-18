---
name: finishing-a-development-branch
description: Use when implementation is complete and all tests pass. Guides merge, PR, or cleanup decisions.
origin: superpowers
---

# Finishing a Development Branch

> Source: superpowers | License: MIT

## When to Activate

- After implementation is complete and all tests pass
- When deciding how to integrate completed work

## Instructions

### Step 1: Verify Tests

Run the project's test suite before offering any options. If tests fail, fix them first.

### Step 2: Detect Environment

Determine if you're in a normal repo, a named-branch worktree, or detached HEAD. This determines available options.

### Step 3: Present Options

**Named branch (4 options):**
1. Merge back to base branch locally
2. Push and create a Pull Request
3. Keep the branch as-is
4. Discard this work

**Detached HEAD (3 options):**
1. Push as new branch and create PR
2. Keep as-is
3. Discard

### Step 4: Execute Choice

**Merge locally:**
```bash
git checkout <base-branch> && git pull && git merge <feature-branch>
# Verify tests on merged result
git branch -d <feature-branch>
```

**Push and create PR:**
```bash
git push -u origin <feature-branch>
gh pr create --title "Title" --body "## Summary
- What changed

## Test Plan
- [ ] Verification steps"
```

**Discard:** Require typed "discard" confirmation before deleting.

### Step 5: Cleanup

Only for merge and discard options: remove worktree, prune, delete branch.

## Focus Areas

- Always verify tests before offering options
- Detect environment before presenting menu
- Get typed confirmation for discard
- Only clean up worktrees you created