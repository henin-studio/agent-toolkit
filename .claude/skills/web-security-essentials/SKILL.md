---
name: web-security-essentials
description: Use when building web applications, setting up authentication, handling user input, configuring headers, or deploying to production. Covers OWASP Top 10 essentials for web developers.
origin: curated
---

# Web Security Essentials

> Source: Curated from OWASP Top 10 | License: MIT

## When to Activate

- Building any web application with user input
- Implementing authentication or authorization
- Configuring HTTP headers or CORS
- Setting up database queries
- Deploying to production
- Adding file upload functionality
- Working with third-party integrations

## Instructions

### 1. Injection Prevention (OWASP A03)

**SQL Injection:**
```typescript
// BAD: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD: Parameterized queries
const query = db.query('SELECT * FROM users WHERE id = $1', [userId]);

// GOOD: ORM methods
const user = await User.findById(userId);
```

**Command Injection:**
```typescript
// BAD: Shell with user input
exec(`convert ${userInput} output.png`);

// GOOD: Validate and sanitize
const allowedExtensions = ['.jpg', '.png', '.gif'];
if (!allowedExtensions.some(ext => userInput.endsWith(ext))) {
  throw new Error('Invalid file type');
}
```

**XSS (Cross-Site Scripting):**
```tsx
// BAD: dangerouslySetInnerHTML with user content
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD: Sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />

// BEST: Don't render HTML from users — use text rendering
<div>{userInput}</div>
```

### 2. Authentication (OWASP A07)

- Use proven auth libraries (NextAuth, Clerk, Auth0, Lucia)
- Never roll your own crypto
- Use bcrypt/argon2 for password hashing (never MD5, SHA1)
- Implement proper session management
- Use `httpOnly`, `Secure`, `SameSite=Lax` cookies
- Implement MFA for sensitive operations
- Rate limit login attempts

### 3. Sensitive Data Exposure (OWASP A02)

- Enforce HTTPS everywhere (redirect HTTP to HTTPS)
- Never log passwords, tokens, or PII
- Mask sensitive data in responses (last 4 of card number)
- Use environment variables for secrets, never commit them
- Encrypt data at rest for sensitive information
- Return generic error messages in production (no stack traces)

### 4. Access Control (OWASP A01)

```typescript
// BAD: Client-side only check
if (user.role === 'admin') {
  // This check can be bypassed
}

// GOOD: Server-side middleware
function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Apply to routes
app.delete('/api/users/:id', requireRole('admin'), deleteUser);
```

- Deny by default (whitelist, not blacklist)
- Check resource ownership (can THIS user access THIS resource?)
- Implement CSRF protection for state-changing requests
- Use SameSite cookies

### 5. Security Headers

```typescript
// Essential security headers
app.use(helmet()); // Sets all of these:

// Or configure manually:
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 6. Input Validation

```typescript
import { z } from 'zod';

// Define schema
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().int().min(0).max(150),
});

// Validate at system boundary
app.post('/api/users', (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    });
  }
  // Use result.data (type-safe)
});
```

- Validate at system boundaries (API routes, form handlers)
- Use schema validation (Zod, Joi, Yup)
- Never trust client-side validation alone
- Sanitize HTML input with DOMPurify
- Validate file uploads: type, size, content

### 7. Dependency Security

```bash
# Regular security audits
npm audit
npm audit fix

# Check for known vulnerabilities
npx better-npm-audit audit

# Keep dependencies updated
npx npm-check-updates -u && npm install

# Use lockfiles
# Never commit node_modules
# Pin versions in production
```

### 8. CORS Configuration

```typescript
// BAD: Allow everything
app.use(cors({ origin: '*' }));

// GOOD: Specific origins
app.use(cors({
  origin: ['https://yourapp.com', 'https://admin.yourapp.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 9. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// General API rate limit
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Strict auth rate limit
app.post('/api/auth/login',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
  loginHandler
);
```

### Pre-Deployment Security Checklist

- [ ] No secrets in source code (search for API keys, passwords, tokens)
- [ ] All user input validated at system boundaries
- [ ] Parameterized queries used for all database access
- [ ] Authentication configured correctly (httpOnly, Secure, SameSite cookies)
- [ ] CSRF protection enabled for state-changing requests
- [ ] Security headers configured (CSP, X-Frame-Options, HSTS)
- [ ] Rate limiting on API endpoints
- [ ] HTTPS enforced
- [ ] Error pages don't leak stack traces
- [ ] Dependencies audited (npm audit)
- [ ] File uploads validated (type, size, content)

## Focus Areas

- OWASP Top 10 coverage for web applications
- Input validation at system boundaries
- Authentication and session management
- Injection prevention (SQL, XSS, command)
- Security headers and CORS
- Dependency security auditing

## Examples

**Pre-deployment security check:**
```bash
# Check for secrets in code
grep -r "sk_live\|password\|secret_key\|api_key" --include="*.ts" --include="*.tsx" src/

# Audit dependencies
npm audit

# Verify environment variables
node -e "require('./src/lib/env')" # Fails if missing required vars

# Check security headers
curl -I https://yourapp.com | grep -i "x-frame\|content-security\|strict-transport"
```