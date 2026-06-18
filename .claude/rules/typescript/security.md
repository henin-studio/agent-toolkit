# TypeScript Security

## Secret Management

```typescript
// NEVER: hardcode secrets
const apiKey = "sk-proj-xxxxx"

// CORRECT: use environment variables
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Input Validation

Validate all inputs at system boundaries using Zod schemas. Never trust external data.

## Content Security

- Sanitize all HTML output to prevent XSS
- Use `helmet` middleware for security headers
- Enable CSRF protection for state-changing requests
- Rate-limit all API endpoints

## Dependencies

- Run `npm audit` before merging
- Keep dependencies updated
- Use `npm audit fix` for known vulnerabilities