#!/usr/bin/env bash
# pre-bash.sh — Block dangerous bash commands
# Reads JSON from stdin (Claude Code hook format)
# Exit 0 = allow, Exit 2 = block with message

set -euo pipefail

# Read JSON input from stdin
input_json=$(cat)

# Extract the command from the JSON input
# Claude Code hooks send: {"tool_name": "Bash", "tool_input": {"command": "..."}}
command=$(echo "$input_json" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    cmd = data.get('tool_input', {}).get('command', '')
    print(cmd)
except (json.JSONDecodeError, KeyError):
    print('')
" 2>/dev/null || echo "$input_json")

# Dangerous command patterns (regex)
dangerous_patterns=(
  'rm\s+-rf\s+/'
  'rm\s+-rf\s+~'
  'rm\s+-rf\s+\$HOME'
  'rm\s+-rf\s+/home'
  'git\s+push\s+.*--force.*origin\s+main'
  'git\s+push\s+.*--force.*origin\s+master'
  'git\s+push\s+-f\s+origin\s+main'
  'git\s+push\s+-f\s+origin\s+master'
  'drop\s+database'
  'DROP\s+DATABASE'
  'curl\s+.*\|\s*bash'
  'wget\s+.*\|\s*bash'
  'chmod\s+-R\s+777\s+/'
  'dd\s+if=.*of=/dev/'
  ':(){ :|:&}\s*;'
  'mkfs\.'
  '>\s*/dev/sd'
)

# Check against each pattern
for pattern in "${dangerous_patterns[@]}"; do
  if echo "$command" | grep -qE "$pattern"; then
    echo "BLOCKED: Command matches dangerous pattern '${pattern}'"
    echo "Reason: This operation is not allowed by project safety hooks."
    echo "If you believe this is a false positive, edit .claude/hooks/pre-bash.sh"
    exit 2
  fi
done

# Allow the command
exit 0
