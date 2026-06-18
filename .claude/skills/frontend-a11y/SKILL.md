---
name: frontend-a11y
description: Use when building interactive UI components, forms, or navigation to ensure keyboard accessibility, screen reader support, and ARIA compliance.
origin: ECC
---

# Frontend Accessibility

> Source: ECC | License: MIT

## When to Activate

- Building forms with validation and error messages
- Creating interactive components (dropdowns, modals, tabs)
- Adding keyboard navigation to custom widgets
- Managing focus in dynamic content (modals, route changes)
- Reviewing accessibility of existing components

## Instructions

### Form Accessibility

**Label connection:**
```tsx
// GOOD: Explicit label connection
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// BAD: No label connection
<input type="email" placeholder="Email" />
```

**Required fields:**
```tsx
<label htmlFor="name">
  Name <span aria-hidden="true">*</span>
</label>
<input id="name" required aria-required="true" />
```

**Error messages:**
```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <p id="email-error" role="alert">{errorMessage}</p>
)}
```

### Semantic HTML

**Use proper elements:**
```tsx
// GOOD: Semantic elements
<button onClick={handleClick}>Click me</button>
<a href="/about">About</a>
<h2>Section Title</h2>

// BAD: Div with behavior
<div onClick={handleClick}>Click me</div>
<div onClick={() => navigate('/about')}>About</div>
<span className="heading">Section Title</span>
```

**Heading hierarchy:**
- Use sequential headings (h1 → h2 → h3)
- Don't skip levels (h1 → h3)
- One h1 per page

### ARIA Attributes

- **`aria-label`**: When no visible label exists (icon buttons)
- **`aria-labelledby`**: When label is another element's text
- **`aria-describedby`**: For additional descriptions or error messages
- **`aria-live="polite"`**: For content that updates (toasts, notifications)
- **`aria-live="assertive"`**: For critical alerts (only when immediate attention needed)
- **`aria-expanded`** + **`aria-controls`**: For expandable sections

### Keyboard Navigation

**Custom dropdown with full keyboard support:**
```tsx
function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        if (activeIndex >= 0) onChange(options[activeIndex]);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div role="combobox" aria-expanded={isOpen} onKeyDown={handleKeyDown}>
      <button onClick={() => setIsOpen(!isOpen)}>{value || 'Select...'}</button>
      {isOpen && (
        <ul role="listbox">
          {options.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={i === activeIndex}
              onClick={() => { onChange(option); setIsOpen(false); }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Focus Management

**Modal focus restoration:**
```tsx
function Modal({ isOpen, onClose, children }) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the modal
      const modal = document.querySelector('[role="dialog"]');
      modal?.focus();
    } else {
      // Restore focus to previous element
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" tabIndex={-1}>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Images and Icons

- **Decorative images**: `alt="" aria-hidden="true"`
- **Meaningful images**: Descriptive alt text
- **Icon buttons**: `aria-label` on button + `aria-hidden="true"` on icon

### Reduced Motion

```tsx
function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
}
```

### Anti-Patterns

- `onClick` on non-interactive elements (use `<button>` instead)
- `aria-label` on `<div>` without `role` attribute
- Using `placeholder` as the only label
- Positive `tabIndex` (only `0` and `-1` are valid)
- `aria-hidden="true"` on focusable elements
- `role="button"` without keyboard event handler

### Accessibility Checklist

Before submitting an interactive component:
- [ ] All form inputs have visible labels (or aria-label)
- [ ] Error messages use aria-describedby and role="alert"
- [ ] Custom widgets support keyboard navigation
- [ ] Focus is managed in modals (trap + restore)
- [ ] Images have appropriate alt text
- [ ] Heading hierarchy is sequential
- [ ] Animations respect prefers-reduced-motion

## Focus Areas

- Semantic HTML elements over div/span
- Proper label-input connections
- Keyboard navigation for custom widgets
- Focus management in dynamic content
- ARIA attributes used correctly
- Reduced motion support