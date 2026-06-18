# Web Accessibility (WCAG 2.1)

## Semantic HTML

```typescript
// Use semantic elements
<nav aria-label="Main navigation">
  <ul>
    {links.map(link => <li key={link.href}><a href={link.href}>{link.text}</a></li>)}
  </ul>
</nav>

<main>
  <h1>{pageTitle}</h1>
  {/* Content */}
</main>
```

## Interactive Components

- All interactive elements must be keyboard accessible
- Use `aria-label` for icon buttons and links
- Use `aria-live` regions for dynamic content updates
- Use `role` attributes when semantic HTML is insufficient

## Color and Contrast

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Don't rely on color alone to convey information
- Support `prefers-reduced-motion` media query

## Forms

- Associate labels with inputs using `htmlFor` / `id`
- Provide error messages via `aria-describedby`
- Use `aria-invalid` for validation states
- Group related fields with `<fieldset>` and `<legend>`

## Testing

```typescript
import { axe } from 'jest-axe'

it('should have no accessibility violations', async () => {
  const { container } = render(<AgentCard name="architect" description="Design" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```