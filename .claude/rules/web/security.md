# Web Security Essentials

## OWASP Top 10 Checklist

1. **Injection** — Use parameterized queries, sanitize inputs, escape HTML
2. **Broken Auth** — Use httpOnly cookies, short-lived tokens, CSRF protection
3. **Sensitive Data Exposure** — Encrypt at rest and in transit, never log secrets
4. **XXE** — Disable XML external entities, use JSON by default
5. **Broken Access Control** — Verify auth on every request, deny by default
6. **Misconfiguration** — Disable debug mode, remove default creds, set security headers
7. **XSS** — Sanitize all HTML output, use CSP headers, avoid dangerouslySetInnerHTML
8. **Insecure Deserialization** — Validate all serialized data, use JSON over binary
9. **Known Vulnerabilities** — Keep deps updated, run `npm audit`, use Dependabot
10. **Insufficient Logging** — Log auth failures, input validation failures, access denied

## Security Headers

```typescript
// Next.js middleware or next.config.ts headers
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
]
```

## Environment Variables

- Never commit `.env` files
- Use `.env.example` with safe defaults
- Validate required env vars at startup
- Rotate any leaked secrets immediately