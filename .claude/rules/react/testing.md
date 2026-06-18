# React Testing

## Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryFilter } from './CategoryFilter'

describe('CategoryFilter', () => {
  const categories = ['methodology', 'review', 'web', 'testing']

  it('renders all category options', () => {
    render(<CategoryFilter categories={categories} selected="" onSelect={vi.fn()} />)
    categories.forEach(cat => {
      expect(screen.getByText(cat)).toBeInTheDocument()
    })
  })

  it('calls onSelect when category is clicked', () => {
    const onSelect = vi.fn()
    render(<CategoryFilter categories={categories} selected="" onSelect={onSelect} />)
    fireEvent.click(screen.getByText('review'))
    expect(onSelect).toHaveBeenCalledWith('review')
  })
})
```

## Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCatalog } from './useCatalog'

describe('useCatalog', () => {
  it('loads catalog data', async () => {
    const { result } = renderHook(() => useCatalog())
    await act(async () => {
      await result.current.load()
    })
    expect(result.current.agents).toHaveLength(25)
    expect(result.current.skills).toHaveLength(29)
  })
})
```

## E2E Testing

- Test critical flows: catalog browsing, filtering, install guide
- Use `data-testid` attributes for stable selectors
- Mock external APIs in E2E tests