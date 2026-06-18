---
description: Quick security scan for common vulnerabilities
argument-hint: "[file-or-directory]"
---

# Security Scan

Perform a quick security scan focusing on OWASP Top 10 and common web vulnerabilities.

## Scan Checklist

- [ ] **Injection**: SQL injection, XSS, command injection
- [ ] **Auth**: Broken authentication, session management
- [ ] **Data exposure**: Sensitive data in logs, URLs, or responses
- [ ] **XXE**: XML external entity processing
- [ ] **Access control**: Missing auth checks, IDOR
- [ ] **Config**: Debug mode, default credentials, exposed .env
- [ ] **Crypto**: Weak hashing, hardcoded secrets, expired certs
- [ ] **Deps**: Known vulnerabilities in dependencies
- [ ] **Headers**: Missing security headers (CSP, HSTS, X-Frame)
- [ ] **Input validation**: Unsanitized user input reaching dangerous functions

## Output Format

Rate each finding CRITICAL > HIGH > MEDIUM > LOW > INFO. Include remediation steps.