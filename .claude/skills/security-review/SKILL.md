---
name: security-review
description: Use before deploying web applications, after adding authentication/authorization, when handling user input, or when setting up API endpoints.
origin: ECC
---

# Security Review

> Source: ECC | License: MIT

## When to Activate

- Before deploying to production
- After adding authentication or authorization features
- When handling user input or file uploads
- When setting up API endpoints
- After adding third-party dependencies

## Instructions

### 10-Point Security Checklist

**1. Secrets Management**
- No hardcoded API keys, passwords, or tokens in source code
- Use environment variables or secret managers
- Validate required secrets exist at startup
- Rotate any secrets that may have been exposed
- Never commit `.env` files to version control

**2. Input Validation**
- Validate all user input at system boundaries (API routes, form handlers)
- Use schema validation (Zod, Joi, Yup) for request bodies
- Sanitize HTML to prevent XSS (DOMPurify on client, server-side sanitization)
- Validate file uploads: type, size, content
- Never trust client-side validation alone

**3. SQL Injection Prevention**
- Use parameterized queries or ORM methods (never string concatenation)
- Use migration tools for schema changes
- Validate and sanitize all database inputs

**4. Authentication & Authorization**
- Use proven auth libraries (NextAuth, Clerk, Auth0) — don't roll your own
- Implement proper session management
- Use JWTs correctly (verify signature, check expiration)
- Implement role-based access control (RBAC) where needed
- Protect routes with middleware, not just client-side checks

**5. XSS Prevention**
- Escape all dynamic content in HTML
- Use Content Security Policy (CSP) headers
- Sanitize user-generated HTML with DOMPurify
- Use `httpOnly` cookies for session tokens
- Avoid `dangerouslySetInnerHTML` in React unless sanitized

**6. CSRF Protection**
- Implement CSRF tokens for state-changing requests
- Use SameSite cookie attribute
- Validate Origin and Referer headers
- Use framework-provided CSRF protection

**7. Rate Limiting**
- Implement rate limiting on all API endpoints
- Use shared store (Redis) for rate limit counters, not per-process memory
- Set appropriate limits per endpoint type (auth: strict, search: moderate, static: lenient)
- Return 429 with Retry-After header

**8. Sensitive Data Exposure**
- Never log passwords, tokens, or PII
- Use HTTPS everywhere (redirect HTTP to HTTPS)
- Implement proper error messages (no stack traces in production)
- Mask sensitive data in API responses (last 4 digits of card, etc.)

**9. Dependency Security**
- Run `npm audit` / `yarn audit` regularly
- Keep dependencies updated
- Use `socket.dev` or Snyk for ongoing monitoring
- Pin dependency versions in production

**10. Pre-Deployment Checklist**
- [ ] All secrets in environment variables, not code
- [ ] Input validation on all endpoints
- [ ] Parameterized queries used everywhere
- [ ] Authentication configured correctly
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Error pages don't leak information
- [ ] Dependencies audited
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)

## Focus Areas

- OWASP Top 10 coverage
- Input validation at system boundaries
- Authentication and authorization patterns
- XSS and CSRF prevention
- Secrets management
- Dependency security auditing

## Examples

**Before deploying a Next.js app:**
```bash
# Check for secrets in code
grep -r "sk_live\|password\|secret" --include="*.ts" --include="*.tsx" src/

# Audit dependencies
npm audit

# Verify environment variables
node -e "require('./src/lib/env')"  # Should fail if missing required vars
```