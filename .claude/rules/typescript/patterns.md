# TypeScript Patterns

## Immutability

Always create new objects, never mutate existing ones:

```typescript
// WRONG: mutate existing object
function updateUser(user: User, name: string): User {
  user.name = name // mutates the original!
  return user
}

// CORRECT: return new object
function updateUser(user: User, name: string): User {
  return { ...user, name }
}
```

## Error Handling

Use try/catch with async/await and provide user-friendly error messages:

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('Detailed user-friendly message')
}
```

## Input Validation

Use Zod for schema-based validation at system boundaries:

```typescript
import { z } from 'zod'

const AgentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  tools: z.array(z.string()),
  model: z.enum(['sonnet', 'opus', 'haiku']),
  effort: z.enum(['low', 'medium', 'high', 'max']).default('medium'),
})

type Agent = z.infer<typeof AgentSchema>
```

## API Response Format

Use a consistent envelope for all API responses:

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}
```

## Repository Pattern

```typescript
interface Repository<T> {
  findAll(filters?: Filters): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDto): Promise<T>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}
```