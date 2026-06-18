---
name: react-performance
description: Use when optimizing React rendering, reducing bundle size, improving data fetching, or diagnosing slow React applications.
origin: ECC
---

# React Performance

> Source: ECC | License: MIT

## When to Activate

- Diagnosing slow React renders or page loads
- Reducing bundle size
- Optimizing data fetching patterns
- Improving Core Web Vitals (LCP, FID, CLS)
- When React DevTools Profiler shows unnecessary re-renders

## Instructions

### Priority Categories (Highest to Lowest Impact)

**1. Waterfalls (CRITICAL)**
The #1 performance problem. Sequential data fetches that block rendering.

```tsx
// BAD: Waterfall
async function Page() {
  const user = await getUser();       // Wait...
  const posts = await getPosts(user.id); // Then wait...
  return <UserPosts user={user} posts={posts} />;
}

// GOOD: Parallel
async function Page() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(userId) // Pass known ID
  ]);
  return <UserPosts user={user} posts={posts} />;
}

// BEST: Server Components with Suspense
async function Page() {
  return (
    <Suspense fallback={<UserSkeleton />}>
      <UserProfile />
    </Suspense>
    <Suspense fallback={<PostsSkeleton />}>
      <UserPosts />
    </Suspense>
  );
}
```

**2. Bundle Size (CRITICAL)**
```tsx
// BAD: Barrel imports
import { Button } from '@ui/components'; // Imports everything

// GOOD: Direct imports
import { Button } from '@ui/components/Button';

// GOOD: Dynamic imports for heavy components
const Chart = lazy(() => import('./Chart'));
```

**3. Server-Side Optimizations (HIGH)**
- Use React.cache() for per-request deduplication
- Use LRU cache for cross-request memoization
- Minimize data sent to client components
- Use `after()` for non-blocking work
- Parallelize nested fetches

**4. Re-render Prevention (MEDIUM)**
```tsx
// Don't subscribe to callback-only state
// BAD: const [count, setCount] = useState(0); // Re-renders on every click
// GOOD: Use functional updates or refs for transient values

// Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Stable callback references
const handleClick = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // Empty deps = stable reference

// React.memo for expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }: Props) {
  return items.map(item => <Item key={item.id} {...item} />);
});
```

**5. Rendering Optimizations (MEDIUM)**
```tsx
// Animate wrapper, not SVG path
<motion.div animate={{ opacity: 1 }}>  {/* GOOD */}
  <svg>...</svg>
</motion.div>

// Hoist static JSX outside components
const STATIC_HEADER = <header>...</header>;
function Page() {
  return <>{STATIC_HEADER}<main>...</main></>;
}

// Use content-visibility: auto for off-screen content
.card { content-visibility: auto; contain-intrinsic-size: 200px; }

// Prefer ternary over && for conditional rendering
// BAD: {items.length && <List items={items} />}  // Renders 0!
// GOOD: {items.length > 0 ? <List items={items} /> : null}
```

**6. JS Performance (LOW-MEDIUM)**
```tsx
// Use Map for lookups instead of Array.find
const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(id); // O(1) vs O(n)

// Combine filter + map
const names = items.flatMap(item => item.active ? [item.name] : []);

// Check array length first
if (items.length > 0 && items.every(isValid)) { ... }

// Cache property access in loops
const { length } = items;
for (let i = 0; i < length; i++) { ... }
```

### Lighthouse / Web Vitals Mapping

| Vital | Primary Cause | Fix |
|-------|--------------|-----|
| LCP | Large resources, render-blocking | Server Components, lazy loading, image optimization |
| FID/INP | Heavy JS on main thread | Code splitting, reduce bundle, defer non-critical |
| CLS | Layout shifts | Image dimensions, font loading, Suspense fallbacks |

## Focus Areas

- Eliminating data fetch waterfalls (highest impact)
- Direct imports and code splitting for bundle size
- React.memo and useMemo only where needed
- Server Components for initial data
- Suspense boundaries close to data needs

## Examples

**Diagnosing a slow page load:**
1. Check for waterfalls in Network tab (sequential fetches)
2. Run `npx bundle-analyze` for bundle size
3. Use React DevTools Profiler for re-render analysis
4. Check Lighthouse for Core Web Vitals scores
5. Fix waterfalls first (biggest impact), then bundle size, then re-renders