---
name: react-patterns
description: Best practices and patterns for React 19 and Next.js 15+ development
origin: ECC
---

# React Patterns

> Source: ECC (curated) | License: MIT

## When to Activate

Use this skill when:
- Building new React components
- Reviewing React code for best practices
- Deciding between patterns (Server vs Client Components, hooks, etc.)
- Optimizing React performance
- Handling state management decisions

## Server vs Client Components

**Default to Server Components** in Next.js App Router:

```typescript
// app/agents/page.tsx — Server Component (default)
import { getAgents } from '@/lib/catalog'
import { AgentCard } from '@/components/catalog/agent-card'

export default async function AgentsPage() {
  const agents = await getAgents()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map(agent => <AgentCard key={agent.name} {...agent} />)}
    </div>
  )
}
```

**Only add `'use client'`** when:
- Component needs `useState`, `useEffect`, or event handlers
- Component uses browser APIs
- Component uses custom hooks with state

## State Management Hierarchy

1. **URL state** (searchParams) — for shareable, bookmarkable state
2. **React state** (useState/useReducer) — for local UI state
3. **React Query** (TanStack Query) — for server state (data fetching + caching)
4. **Context** — for deeply shared state (theme, auth)
5. **External stores** — only when absolutely necessary

## Key Patterns

### Immutable Updates
```typescript
// Add item
const newItems = [...items, newItem]

// Remove item
const filtered = items.filter(item => item.id !== removeId)

// Update item
const updated = items.map(item =>
  item.id === updateId ? { ...item, ...updates } : item
)
```

### Custom Hooks
```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
```

### Error Boundaries
```typescript
'use client'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
```