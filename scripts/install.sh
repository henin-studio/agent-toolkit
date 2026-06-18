#!/usr/bin/env bash
# agent-toolkit install.sh
# Idempotent installer that deploys .claude/ infrastructure into any target project
# Based on pilot-toolkit install.sh pattern
#
# Usage: bash install.sh [target-directory]
#   target-directory defaults to current working directory

set -euo pipefail

# Resolve paths
TOOLKIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="${1:-$(pwd)}"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

# Safety check: refuse to install inside the toolkit itself
if [[ "$TARGET_DIR" == "$TOOLKIT_ROOT" ]]; then
  echo "❌ Cannot install agent-toolkit into itself. Specify a different target directory."
  exit 1
fi

# Detect project name
PROJECT_NAME="$(basename "$TARGET_DIR")"
TODAY="$(date +%F)"

echo "🔧 agent-toolkit installer"
echo "   Source: $TOOLKIT_ROOT"
echo "   Target: $TARGET_DIR"
echo "   Project: $PROJECT_NAME"
echo ""

# ── .claude/ directory ──────────────────────────────────────────────
echo "📁 Deploying .claude/ infrastructure..."

CLAUDE_DIR="$TARGET_DIR/.claude"
mkdir -p "$CLAUDE_DIR"

# Copy agents (all .md files)
mkdir -p "$CLAUDE_DIR/agents"
for f in "$TOOLKIT_ROOT"/.claude/agents/*.md; do
  [ -f "$f" ] && cp "$f" "$CLAUDE_DIR/agents/"
done
echo "   ✅ $(ls "$CLAUDE_DIR/agents"/*.md 2>/dev/null | wc -l) agents deployed"

# Copy skills (directories with SKILL.md)
mkdir -p "$CLAUDE_DIR/skills"
for dir in "$TOOLKIT_ROOT"/.claude/skills/*/; do
  [ -d "$dir" ] || continue
  skill_name="$(basename "$dir")"
  mkdir -p "$CLAUDE_DIR/skills/$skill_name"
  [ -f "$dir/SKILL.md" ] && cp "$dir/SKILL.md" "$CLAUDE_DIR/skills/$skill_name/"
done
echo "   ✅ $(ls -d "$CLAUDE_DIR/skills"/*/ 2>/dev/null | wc -l) skills deployed"

# Copy commands
mkdir -p "$CLAUDE_DIR/commands"
for f in "$TOOLKIT_ROOT"/.claude/commands/*.md; do
  [ -f "$f" ] && cp "$f" "$CLAUDE_DIR/commands/"
done
echo "   ✅ $(ls "$CLAUDE_DIR/commands"/*.md 2>/dev/null | wc -l) commands deployed"

# Copy hooks (always update — these evolve with the toolkit)
mkdir -p "$CLAUDE_DIR/hooks"
for f in "$TOOLKIT_ROOT"/.claude/hooks/*; do
  [ -f "$f" ] && cp "$f" "$CLAUDE_DIR/hooks/"
done
echo "   ✅ hooks deployed"

# Copy rules
mkdir -p "$CLAUDE_DIR/rules"
for dir in "$TOOLKIT_ROOT"/.claude/rules/*/; do
  [ -d "$dir" ] || continue
  rule_cat="$(basename "$dir")"
  mkdir -p "$CLAUDE_DIR/rules/$rule_cat"
  for f in "$dir"/*.md; do
    [ -f "$f" ] && cp "$f" "$CLAUDE_DIR/rules/$rule_cat/"
  done
done
echo "   ✅ rules deployed"

# Copy contexts
mkdir -p "$CLAUDE_DIR/contexts"
for f in "$TOOLKIT_ROOT"/.claude/contexts/*.md; do
  [ -f "$f" ] && cp "$f" "$CLAUDE_DIR/contexts/"
done
echo "   ✅ contexts deployed"

# Copy settings.json (always update)
cp "$TOOLKIT_ROOT/.claude/settings.json" "$CLAUDE_DIR/settings.json"
echo "   ✅ settings.json deployed"

# ── CLAUDE.md ────────────────────────────────────────────────────────
if [ -f "$TARGET_DIR/CLAUDE.md" ]; then
  echo ""
  echo "⚠️  CLAUDE.md already exists at $TARGET_DIR/CLAUDE.md"
  echo "   Not overwriting. You may want to merge the following content:"
  echo "   $TOOLKIT_ROOT/CLAUDE.md"
else
  # Substitute project name
  sed "s/{{PROJECT_NAME}}/$PROJECT_NAME/g; s/{{TODAY}}/$TODAY/g" \
    "$TOOLKIT_ROOT/CLAUDE.md" > "$TARGET_DIR/CLAUDE.md"
  echo "   ✅ CLAUDE.md deployed (project: $PROJECT_NAME, date: $TODAY)"
fi

# ── AGENTS.md ───────────────────────────────────────────────────────
if [ -f "$TARGET_DIR/AGENTS.md" ]; then
  echo "⚠️  AGENTS.md already exists. Not overwriting."
else
  cp "$TOOLKIT_ROOT/AGENTS.md" "$TARGET_DIR/AGENTS.md"
  echo "   ✅ AGENTS.md deployed"
fi

# ── .claude-plugin/ ─────────────────────────────────────────────────
if [ -d "$TOOLKIT_ROOT/.claude-plugin" ]; then
  mkdir -p "$TARGET_DIR/.claude-plugin"
  cp "$TOOLKIT_ROOT/.claude-plugin/plugin.json" "$TARGET_DIR/.claude-plugin/"
  echo "   ✅ .claude-plugin/plugin.json deployed"
fi

# ── Verification ────────────────────────────────────────────────────
echo ""
echo "🔍 Verifying deployment..."

AGENT_COUNT=$(ls "$CLAUDE_DIR/agents"/*.md 2>/dev/null | wc -l)
SKILL_COUNT=$(ls -d "$CLAUDE_DIR/skills"/*/ 2>/dev/null | wc -l)
COMMAND_COUNT=$(ls "$CLAUDE_DIR/commands"/*.md 2>/dev/null | wc -l)

echo "   Agents: $AGENT_COUNT"
echo "   Skills: $SKILL_COUNT"
echo "   Commands: $COMMAND_COUNT"
echo ""

if [ "$AGENT_COUNT" -eq 0 ] && [ "$SKILL_COUNT" -eq 0 ]; then
  echo "❌ Deployment appears empty. Check source directory."
  exit 1
fi

echo "✅ agent-toolkit deployed successfully to $TARGET_DIR"
echo "   Run 'claude' in the target directory to start using the toolkit."