---
name: backend-patterns
description: Use when building Node.js APIs, managing database queries, implementing caching, or handling errors in backend services.
origin: ECC
---

# Backend Patterns

> Source: ECC | License: MIT

## When to Activate

- Building API routes or endpoints
- Managing database queries and transactions
- Implementing caching layers
- Handling errors in backend services
- Setting up authentication and rate limiting

## Instructions

### API Design

**Repository Pattern:**
```typescript
// Encapsulate data access behind a consistent interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(filters: UserFilters): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
```

**Service Layer:**
```typescript
// Business logic lives here, not in route handlers
class UserService {
  constructor(private userRepo: UserRepository) {}
  async createUser(data: CreateUserDTO): Promise<User> {
    // Validate, check constraints, then delegate to repo
    if (await this.userRepo.findByEmail(data.email)) {
      throw new ConflictError('Email already exists');
    }
    return this.userRepo.create(data);
  }
}
```

### Database Patterns

**Query Optimization:**
```typescript
// BAD: Select all columns
const users = await db.from('users').select('*');

// GOOD: Select only needed columns
const users = await db.from('users').select('id', 'name', 'email');
```

**N+1 Prevention:**
```typescript
// BAD: N+1 queries
const posts = await getPosts();
for (const post of posts) {
  post.author = await getAuthor(post.authorId); // N queries!
}

// GOOD: Batch query
const posts = await getPosts();
const authorIds = posts.map(p => p.authorId);
const authors = await getAuthorsByIds(authorIds); // 1 query
```

### Caching

**Cache-Aside Pattern:**
```typescript
async function getUser(id: string): Promise<User> {
  // 1. Check cache
  const cached = await cache.get(`user:${id}`);
  if (cached) return cached;

  // 2. Cache miss — fetch from DB
  const user = await userRepo.findById(id);
  if (!user) throw new NotFoundError('User not found');

  // 3. Store in cache
  await cache.set(`user:${id}`, user, { ttl: 300 }); // 5 min
  return user;
}
```

### Error Handling

**Centralized Error Handler:**
```typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: Record<string, string[]>
  ) { super(message); }
}

// Middleware
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
```

**Retry with Exponential Backoff:**
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Unreachable');
}
```

### Authentication

**JWT Token Validation:**
```typescript
// Middleware to validate JWT
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new ApiError(401, 'Authentication required');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
}
```

### Rate Limiting

Use a shared store (Redis) for rate limit counters, not per-process in-memory storage.

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const limiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit per window
});
```

## Focus Areas

- Repository pattern for data access
- Service layer for business logic
- N+1 query prevention
- Cache-aside pattern with TTL
- Centralized error handling
- JWT authentication
- Rate limiting with shared store

## Examples

**Building a user API:**
- Define UserRepository interface
- Implement UserService with validation
- Add error handling middleware
- Cache user lookups with Redis
- Rate limit authentication endpoints