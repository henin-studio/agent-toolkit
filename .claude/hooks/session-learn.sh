#!/usr/bin/env bash
# session-learn.sh — Extract learnings at end of session
# Appends a timestamp to .claude/docs/session-log.md

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOG_FILE="${PROJECT_ROOT}/.claude/docs/session-log.md"

# Create the log file if it doesn't exist
if [ ! -f "$LOG_FILE" ]; then
  mkdir -p "$(dirname "$LOG_FILE")"
  cat > "$LOG_FILE" << 'HEADER'
# Session Log

Automated log of agent-toolkit sessions. Each entry marks the end of a Claude Code session.

| Timestamp | Date | Note |
|-----------|------|------|
HEADER
fi

# Append timestamp entry
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
date_str=$(date -u +"%Y-%m-%d %H:%M UTC")

# Append a new row to the markdown table
echo "| ${timestamp} | ${date_str} | Session ended |" >> "$LOG_FILE"

exit 0