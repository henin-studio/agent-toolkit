#!/usr/bin/env bash
# session-start.sh — Agent-toolkit session welcome hook
# Runs on every Claude Code session start

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
AGENTS_DIR="${PROJECT_ROOT}/.claude/agents"
SKILLS_DIR="${PROJECT_ROOT}/.claude/skills"
COMMANDS_DIR="${PROJECT_ROOT}/.claude/commands"

# Count agents (Markdown files)
agent_count=0
if [ -d "$AGENTS_DIR" ]; then
  agent_count=$(find "$AGENTS_DIR" -maxdepth 1 -name '*.md' | wc -l | tr -d ' ')
fi

# Count skills (directories with SKILL.md)
skill_count=0
if [ -d "$SKILLS_DIR" ]; then
  skill_count=$(find "$SKILLS_DIR" -maxdepth 2 -name 'SKILL.md' | wc -l | tr -d ' ')
fi

# Count commands (Markdown files)
command_count=0
if [ -d "$COMMANDS_DIR" ]; then
  command_count=$(find "$COMMANDS_DIR" -maxdepth 1 -name '*.md' | wc -l | tr -d ' ')
fi

echo ""
echo "=== agent-toolkit ==="
echo "Curated agents, skills & hooks for web development"
echo ""

# Check for AGENTS.md
if [ -f "${PROJECT_ROOT}/AGENTS.md" ]; then
  echo "  AGENTS.md found — project instructions loaded"
else
  echo "  WARNING: AGENTS.md not found in project root"
fi

echo "  Agents:  ${agent_count}"
echo "  Skills:  ${skill_count}"
echo "  Commands: ${command_count}"
echo "  Hooks:    4 (session-start, pre-bash, pre-write, session-learn)"
echo ""
echo "  Slash commands: /build-fix, /code-review, /learn, /plan,"
echo "                  /quality-gate, /reflect, /security-scan, /tdd"
echo ""