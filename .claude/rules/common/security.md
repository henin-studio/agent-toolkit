# Common Security Guidelines

## Mandatory Security Checks (Before Every Commit)

- [ ] No hardcoded secrets (API keys, passwords, tokens)
- [ ] All user input validated
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (HTML sanitized)
- [ ] CSRF protection enabled
- [ ] Authentication/Authorization verified
- [ ] Rate limiting on all endpoints
- [ ] Error messages don't leak sensitive data

## Secret Management

- Never hardcode secrets in source code
- Always use environment variables or secret managers
- Validate required secrets exist at startup
- Rotate any secrets that may have been exposed

## Security Response Protocol

If you discover a security issue:
1. STOP immediately
2. Use the security-reviewer agent
3. Fix CRITICAL issues before continuing
4. Rotate any compromised secrets
5. Audit the entire codebase for similar issues