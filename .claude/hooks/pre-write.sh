#!/usr/bin/env bash
# pre-write.sh — Warn about writing to protected files
# Reads JSON from stdin (Claude Code hook format)
# Exit 0 = allow, Exit 2 = block with message

set -euo pipefail

# Read JSON input from stdin
input_json=$(cat)

# Extract the file path from the JSON input
# Claude Code hooks send: {"tool_name": "Write", "tool_input": {"file_path": "..."}}
file_path=$(echo "$input_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    path = data.get('tool_input', {}).get('file_path', '')
    print(path)
except (json.JSONDecodeError, KeyError):
    print('')
" 2>/dev/null || echo "")

# If no file_path found, try command field (for Edit tool)
if [ -z "$file_path" ]; then
  file_path=$(echo "$input_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    path = data.get('tool_input', {}).get('file_path', '')
    print(path)
except (json.JSONDecodeError, KeyError):
    print('')
" 2>/dev/null || echo "")
fi

# Protected file patterns (basename or path fragment)
protected_patterns=(
  '.env'
  '.env.local'
  '.env.production'
  '.env.production.local'
  'secrets.'
  'credentials'
  'id_rsa'
  'id_ed25519'
  '.ssh/config'
  'production.yml'
  'production.yaml'
  'kustomization/production'
)

# Get basename for matching
basename=$(basename "$file_path" 2>/dev/null || echo "")

# Check against protected patterns
for pattern in "${protected_patterns[@]}"; do
  # Match in basename or full path
  if echo "$basename" | grep -qF "$pattern" || echo "$file_path" | grep -qF "$pattern"; then
    echo "BLOCKED: Writing to protected file '${file_path}'"
    echo "Reason: This file matches protected pattern '${pattern}'."
    echo "Secrets and production configs should not be modified by automated tools."
    echo "If you need to update this file, do so manually with appropriate review."
    exit 2
  fi
done

# Check for console.log in the content being written (warn, don't block)
content=$(echo "$input_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    c = data.get('tool_input', {}).get('content', '') or data.get('tool_input', {}).get('new_text', '')
    print(c)
except (json.JSONDecodeError, KeyError):
    print('')
" 2>/dev/null || echo "")

if echo "$content" | grep -q 'console\.log'; then
  echo "WARNING: console.log detected in file being written to '${file_path}'"
  echo "Consider using a structured logging library instead of console.log in production code."
  echo "This is a warning — the write will proceed."
fi

# Allow the write
exit 0