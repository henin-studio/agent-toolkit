---
name: frontend-design-direction
description: Use when starting a new UI project, page, or component that needs visual direction before implementation. Establishes design purpose, audience, tone, and constraints.
origin: ECC
---

# Frontend Design Direction

> Source: ECC | License: MIT

## When to Activate

- Starting a new UI project or page
- Before implementing visual components
- When a design feels inconsistent or directionless
- Before choosing a color palette, typography, or spacing system

## Instructions

### Establish Design Direction

Before writing any UI code, answer these five questions:

1. **Purpose**: What should this UI accomplish? What action should the user take?
2. **Audience**: Who is using this? Technical? General? Mobile? Desktop?
3. **Tone**: What feeling should the UI convey? Authoritative? Friendly? Minimal? Dense?
4. **Memorable Detail**: What one thing should stick in the user's mind?
5. **Constraints**: What are the hard limits? Browser support? Brand colors? Performance budget?

### Match Direction to Domain

| Domain | Tone | Typical Direction |
|--------|------|-------------------|
| SaaS tool | Dense, quiet, scannable | Information-dense, subtle interactions, whitespace for grouping |
| Portfolio/launch | Expressive, bold | Large typography, generous whitespace, distinctive visuals |
| Documentation | Clean, navigable | Sidebar navigation, readable typography, search-first |
| Dashboard | Scannable, efficient | Cards, status indicators, consistent spacing |
| E-commerce | Trustworthy, clear | Clear CTAs, product imagery, review signals |

### Implementation Guidance

**Build usable first, then polish:**
- Start with functional, accessible HTML
- Add visual refinements incrementally
- Every visual element should serve the purpose

**Use existing project tokens:**
- If the project has design tokens (CSS variables, theme), use them
- Don't introduce new colors, spacing, or typography outside the system

**Use real visual assets:**
- Real images over placeholders
- Actual copy over lorem ipsum
- Real data over fake data
- This reveals spacing, typography, and layout issues early

**Typography choices:**
- Prefer contextual typography (sizes relative to body)
- Use a limited scale (3-5 sizes maximum)
- Ensure readable line lengths (45-75 characters)

**Color choices:**
- Start with a limited palette (2-3 colors + neutrals)
- Use CSS variables for all colors
- Ensure WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)
- Test in both light and dark mode

**Responsive constraints:**
- Design mobile-first, then scale up
- Test at 320px, 768px, 1024px, 1440px minimum
- Use CSS Grid for layouts, Flexbox for components

**Motion:**
- Use sparingly and deliberately
- Prefer functional motion (reveals, transitions) over decorative
- Respect prefers-reduced-motion
- Keep animations under 300ms

### Anti-Patterns

- Purple gradients without purpose
- Decorative blobs that add no information
- Oversized cards with minimal content
- Vague hero copy ("We deliver solutions")
- Cards inside cards inside cards
- Single visual style applied to every section
- Hiding primary workflow behind marketing sections
- Adding dependencies just for visual flourishes
- Describing UI features inside the UI itself (meta-labels like "Hero Section")

### Review Checklist

Before finalizing design direction:
- [ ] Purpose is clear (what action should the user take?)
- [ ] Audience is identified and reflected in design choices
- [ ] Tone is consistent throughout
- [ ] Memorable detail is defined and implemented
- [ ] Constraints are respected (brand, browser, performance)
- [ ] Real content is used, not placeholders
- [ ] Accessibility is built in, not bolted on
- [ ] Responsive behavior is defined at all breakpoints

## Focus Areas

- Purpose-first design direction
- Matching tone to domain
- Using real content and assets
- Limited color palette and typography scale
- Mobile-first responsive design
- Motion as function, not decoration

## Examples

**SaaS dashboard:**
- Purpose: Help users make decisions quickly
- Audience: Technical professionals, desktop-first
- Tone: Dense, quiet, scannable
- Memorable detail: Real-time status indicators
- Constraints: Must work in Chrome, Firefox, Safari; 3s initial load budget

**Marketing landing page:**
- Purpose: Convert visitors to sign up
- Audience: General public, mobile-first
- Tone: Expressive, bold, confident
- Memorable detail: Animated product demo
- Constraints: Brand colors (blue + white); 2s LCP budget