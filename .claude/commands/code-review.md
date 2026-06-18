---
description: Run a comprehensive code review on recent changes
argument-hint: "[file-or-directory]"
---

# Code Review

Run a thorough code review on the specified file or directory.

## Steps

1. **Identify scope**: If no argument, review all uncommitted changes. If a file/directory is specified, review that scope.
2. **Read all changed files**: Use Read tool to examine each file.
3. **Analyze for**:
   - Logic errors and bugs
   - Security vulnerabilities (OWASP Top 10)
   - Performance issues
   - Code style violations
   - Missing error handling
   - Immutability violations (mutations of existing objects)
4. **Rate each finding**: CRITICAL > HIGH > MEDIUM > LOW
5. **Output format**:
   ```
   ## Code Review: [scope]

   ### CRITICAL (must fix)
   - [finding]

   ### HIGH (should fix)
   - [finding]

   ### MEDIUM (improve)
   - [finding]

   ### LOW (nitpick)
   - [finding]

   ### Positive observations
   - [good patterns found]

   ### Summary
   - X critical, Y high, Z medium, W low findings
   - Overall assessment: [PASS/NEEDS WORK/FAIL]
   ```