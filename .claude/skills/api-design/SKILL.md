---
name: api-design
description: Use when designing new REST APIs, creating endpoints, or defining response formats and pagination strategies.
origin: ECC
---

# API Design

> Source: ECC | License: MIT

## When to Activate

- Designing new REST API endpoints
- Creating response formats and error structures
- Implementing pagination, filtering, or sorting
- Setting up authentication and rate limiting
- Versioning an API

## Instructions

### URL Structure

- Use nouns, not verbs: `/users` not `/getUsers`
- Use plural: `/users` not `/user`
- Use kebab-case: `/user-profiles` not `/userProfiles`
- Nest for relationships: `/users/:id/posts`
- Keep nesting to 2 levels max; beyond that, use query params

### HTTP Methods & Status Codes

| Method | Purpose | Success | Error |
|--------|---------|---------|-------|
| GET | Read | 200 OK | 404 Not Found |
| POST | Create | 201 Created | 400 Bad Request |
| PUT | Full update | 200 OK | 404 Not Found |
| PATCH | Partial update | 200 OK | 404 Not Found |
| DELETE | Remove | 204 No Content | 404 Not Found |

### Response Format

**Success:**
```json
{
  "data": { "id": "1", "name": "Jane" },
  "meta": {}
}
```

**Collection with pagination:**
```json
{
  "data": [{ "id": "1", "name": "Jane" }],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "hasMore": true
  }
}
```

**Error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {
      "email": ["Must be a valid email address"],
      "name": ["Must be between 2 and 100 characters"]
    }
  }
}
```

### Pagination

**Offset-based** (for small datasets, random access):
```
GET /users?page=2&limit=20
```

**Cursor-based** (for large datasets, real-time data):
```
GET /users?cursor=abc123&limit=20
```

Use cursor-based when: dataset is large, real-time updates matter, consistent pagination needed.

### Filtering, Sorting, Search

```
GET /users?status[eq]=active&role[in]=admin,editor&sort=-created_at&search=jane
```

- Filter: `field[operator]=value` (eq, ne, gt, lt, in, like)
- Sort: `-field` for descending, `field` for ascending
- Search: `search=query` for full-text search

### Authentication

- Use Bearer token in Authorization header
- API keys for service-to-service communication
- Resource-level authorization (can this user access THIS resource?)
- Role-based authorization (admin, editor, viewer)

### Rate Limiting

Return rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1620000000
```

Set appropriate tiers: Anonymous (100/hr), Authenticated (1000/hr), Premium (10000/hr).

### Versioning

URL path versioning is recommended for clarity:
```
/api/v1/users
/api/v2/users
```

### API Design Checklist

- [ ] URLs use nouns, plural, kebab-case
- [ ] Correct HTTP methods and status codes
- [ ] Consistent response envelope
- [ ] Pagination for collection endpoints
- [ ] Filtering and sorting support
- [ ] Authentication and authorization
- [ ] Rate limiting configured
- [ ] API versioning strategy defined
- [ ] Input validation with clear error messages
- [ ] Documentation (OpenAPI/Swagger)

## Focus Areas

- RESTful URL design with nouns and plural
- Consistent response envelopes with error details
- Cursor-based pagination for large datasets
- Field-level validation error messages
- Authentication and authorization patterns

## Examples

**Designing a products API:**
```
GET    /api/v1/products              — List products (paginated, filterable)
GET    /api/v1/products/:id           — Get product
POST   /api/v1/products              — Create product
PATCH  /api/v1/products/:id           — Update product
DELETE /api/v1/products/:id           — Delete product
GET    /api/v1/products/:id/reviews   — List reviews (nested, max 2 levels)
```