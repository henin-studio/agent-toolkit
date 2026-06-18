---
name: frontend-patterns
description: Use when building React/Next.js components, managing state, handling forms, or optimizing frontend performance.
origin: ECC
---

# Frontend Patterns

> Source: ECC | License: MIT

## When to Activate

- Building React or Next.js components
- Managing application state
- Handling forms with validation
- Optimizing rendering performance
- Implementing error handling patterns

## Instructions

### Component Patterns

**Composition over Inheritance:**
```tsx
// Good: Composition
function Card({ children, variant }: CardProps) {
  return <div className={variants[variant]}>{children}</div>;
}

// Bad: Inheritance
class Button extends BaseComponent { ... }
```

**Compound Components:**
```tsx
function Tabs({ children, defaultIndex }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex ?? 0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}
Tabs.List = TabList;
Tabs.Panel = TabPanel;
```

### Custom Hooks

**useToggle:**
```tsx
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

**useDebounce:**
```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

### State Management

**Context + Reducer Pattern:**
```tsx
const [state, dispatch] = useReducer(reducer, initialState);
// Wrap in context for deep tree access
// Keep context small — split by concern, not by feature
```

### Performance

**Memoization — only when needed:**
- `useMemo`: expensive computations that re-run on every render
- `useCallback`: passing callbacks to memoized child components
- `React.memo`: components that re-render often with same props

**Code splitting:**
```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

**Virtualization for large lists (>50 items):**
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
```

### Form Handling

```tsx
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return { values, errors, handleChange, setErrors };
}
```

### Error Boundary

```tsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Focus Areas

- Composition patterns over inheritance
- Custom hooks for reusable logic
- Context + Reducer for shared state
- Performance: memoization, code splitting, virtualization
- Form handling with validation
- Error boundaries for resilience

## Examples

**Building a data table:**
- Use compound component pattern (Table, Table.Header, Table.Body, Table.Row)
- Virtualize rows if > 50 items
- Debounce search input
- Memoize row rendering
- Add error boundary around table