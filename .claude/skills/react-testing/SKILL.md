---
name: react-testing
description: Testing patterns for React components and Next.js applications
origin: ECC
---

# React Testing

> Source: ECC (curated) | License: MIT

## When to Activate

Use this skill when:
- Writing tests for React components
- Setting up testing infrastructure for a Next.js project
- Debugging failing React tests
- Reviewing test coverage for React code

## Testing Stack

- **Vitest** — Unit and integration tests
- **React Testing Library** — Component tests
- **Playwright** — E2E tests
- **jest-axe** — Accessibility testing

## Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AgentCard } from './AgentCard'

describe('AgentCard', () => {
  const mockAgent = {
    name: 'architect',
    description: 'System design specialist',
    tools: ['Read', 'Grep', 'Glob'],
    model: 'opus' as const,
    effort: 'high' as const,
  }

  it('renders agent name and description', () => {
    render(<AgentCard {...mockAgent} />)
    expect(screen.getByText('Architect')).toBeInTheDocument()
    expect(screen.getByText('System design specialist')).toBeInTheDocument()
  })

  it('renders all tools as badges', () => {
    render(<AgentCard {...mockAgent} />)
    expect(screen.getByText('Read')).toBeInTheDocument()
    expect(screen.getByText('Grep')).toBeInTheDocument()
    expect(screen.getByText('Glob')).toBeInTheDocument()
  })
})
```

## Server Component Testing

```typescript
// For async Server Components, test the data fetching separately
import { getAgents } from '@/lib/catalog'

describe('getAgents', () => {
  it('returns agents from catalog', async () => {
    const agents = await getAgents()
    expect(agents).toBeInstanceOf(Array)
    expect(agents.length).toBeGreaterThan(0)
  })
})
```

## Custom Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react'
import { useFilter } from './useFilter'

describe('useFilter', () => {
  it('filters items by category', () => {
    const { result } = renderHook(() => useFilter(mockAgents))
    act(() => { result.current.setCategory('review') })
    expect(result.current.filtered.every(a => a.category === 'review')).toBe(true)
  })
})
```

## E2E Testing (Playwright)

```typescript
import { test, expect } from '@playwright/test'

test('agents page shows agent catalog', async ({ page }) => {
  await page.goto('/agents')
  await expect(page.getByRole('heading', { name: /agents/i })).toBeVisible()
  await expect(page.getByTestId('agent-card').first()).toBeVisible()
})
```

## Rules

- Test behavior, not implementation
- Use `getByRole` and `getByLabelText` over `getByTestId`
- Mock external APIs, not internal modules
- Target 80%+ coverage