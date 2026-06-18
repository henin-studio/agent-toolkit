# Web Performance

## Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Next.js Optimization

```typescript
// Use Server Components for data fetching (default in App Router)
export default async function AgentsPage() {
  const agents = await getAgents() // Server-side data fetching
  return <AgentGrid agents={agents} />
}

// Use dynamic imports for heavy client components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

## Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/agent-icon.svg"
  alt="Agent icon"
  width={48}
  height={48}
  priority // For above-the-fold images
/>
```

## Bundle Size

- Use `next/dynamic` for code splitting
- Prefer `@/lib/utils` tree-shakeable utilities
- Audit with `next build` and `@next/bundle-analyzer`
- Keep page JS < 100KB initial load

## Caching Strategy

- Static pages: ISR with `revalidate` in page configs
- API routes: Cache headers + stale-while-revalidate
- Assets: Immutable cache with content hash filenames