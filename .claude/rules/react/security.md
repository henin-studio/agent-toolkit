# React Security

## XSS Prevention

- Use `dangerouslySetInnerHTML` only with sanitized content
- Validate and sanitize all user inputs before rendering
- Use `DOMPurify` for HTML sanitization
- Never construct URLs from unsanitized user input

## Authentication

- Store tokens in httpOnly cookies, not localStorage
- Validate tokens server-side on every request
- Implement CSRF protection for state-changing operations
- Use short-lived access tokens + refresh token rotation

## Data Fetching

- Always validate API responses with Zod schemas
- Never expose internal error details to clients
- Use Server Actions for mutations in Next.js App Router
- Rate-limit API endpoints