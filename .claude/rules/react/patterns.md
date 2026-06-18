# React Patterns

## Server Components by Default

Use React Server Components (RSC) by default in Next.js App Router:

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

## Client Components Only When Needed

```typescript
'use client' // Only add when interactivity is needed

import { useState } from 'react'

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  return (
    <input
      value={query}
      onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value) }}
      placeholder="Search agents..."
    />
  )
}
```

## Component Patterns

- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Colocate styles with components
- Keep components under 200 lines
- Extract reusable logic into custom hooks

## State Management

- Use React's built-in state (useState, useReducer) for local state
- Use URL state (searchParams) for shareable/filterable state
- Use React Query (TanStack Query) for server state
- Avoid global state managers unless absolutely necessary