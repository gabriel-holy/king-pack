---
name: frontend-ui-ux-engineer
description: "A designer-turned-developer who crafts stunning UI/UX even without design mockups. View Transitions API, CSS Anchor Positioning, Container Queries, shadcn/ui v2, motion.dev, and modern CSS patterns. Code may be a bit messy, but the visual output is always fire."
---

# Frontend UI/UX Engineer

## Purpose

Provides frontend design and development expertise specializing in creating visually stunning, user-centric interfaces without requiring design mockups. Crafts beautiful UI/UX with creative design thinking, advanced styling, animations, and accessibility best practices for modern web applications.

## When to Use

- Need to transform functional UI into visually stunning interfaces
- Design mockups don't exist but beautiful UI is required
- Visual polish and micro-interactions are priority
- Component styling requires creative design thinking
- User experience improvements needed without dedicated designer

## Quick Start

**Invoke this skill when:**
- Need to transform functional UI into visually stunning interfaces
- Design mockups don't exist, but beautiful UI is required
- Visual polish and micro-interactions are priority over code elegance
- Component styling requires creative design thinking
- User experience improvements needed without dedicated designer

**Do NOT invoke when:**
- Backend logic or API development needed
- Pure code refactoring without visual changes
- Performance optimization is sole priority
- Security-focused development required
- Database or infrastructure work

---

## Modern CSS Features (2026)

### View Transitions API
Smooth page and state transitions without JS animation libraries.

```typescript
// Page/state transitions
function navigateTo(url: string) {
  document.startViewTransition(() => {
    updateContent(url);
  });
}

// With named transitions for specific elements
<div style={{ viewTransitionName: 'hero-image' }}>
  <img src={product.image} />
</div>
```

```css
/* Customize view transition animations */
::view-transition-old(hero-image) {
  animation: scale-out 0.3s ease-out;
}
::view-transition-new(hero-image) {
  animation: scale-in 0.3s ease-in;
}
```

### CSS Anchor Positioning
Position tooltips, popovers, and dropdowns relative to triggers — replaces Popper.js/Floating UI for many cases.

```css
.trigger {
  anchor-name: --tooltip-anchor;
}

.tooltip {
  position: fixed;
  position-anchor: --tooltip-anchor;
  top: anchor(bottom);
  left: anchor(center);
  margin-top: 8px;
}
```

### Container Queries
Component-level responsive design — respond to parent container, not viewport.

```tsx
<div className="@container">
  <div className="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3 gap-4">
    {items.map(item => <Card key={item.id} item={item} />)}
  </div>
</div>
```

### CSS Nesting (Native)
No preprocessor needed — native CSS nesting is here.

```css
.card {
  background: var(--color-surface);
  border-radius: 1rem;

  &:hover {
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.1);
  }

  & .title {
    font-weight: 600;
  }

  @media (prefers-reduced-motion: reduce) {
    & { transition: none; }
  }
}
```

### Entry/Exit Animations with @starting-style
Animate elements appearing (display: none → visible) — no JS needed.

```css
.popover[popover]:popover-open {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s;

  @starting-style {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

### Native Popover API
```html
<button popovertarget="menu">Open Menu</button>
<div id="menu" popover>
  <!-- Popover content — auto-managed by browser -->
  <nav className="p-4 rounded-xl bg-white shadow-2xl">...</nav>
</div>
```

### Accessibility Media Queries
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) { /* disable animations */ }
@media (prefers-reduced-transparency) { /* reduce glassmorphism */ }
@media (prefers-contrast: more) { /* increase contrast */ }
```

---

## Core Workflows

### Workflow 1: Transform Functional Component to Stunning UI

**Use case:** Given a plain React component, make it visually exceptional

**Steps:**

**1. Visual Analysis (2 minutes)**
```
Questions to answer:
- What emotion should this evoke? (Premium? Playful? Trustworthy?)
- What's the visual hierarchy? (Image > Name > Price > CTA)
- What interactions delight users? (Hover effects, smooth transitions)
- Where's the whitespace needed? (Breathing room around elements)
```

**2. Color & Typography Enhancement**
```tsx
// After: Visual foundation with motion.dev (formerly framer-motion)
import { motion } from 'motion/react';

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>

        <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
```

**Expected Outcome:**
- Visual appeal increased 5x
- Engagement metrics improve 20-40% (typical)
- User delight through micro-interactions
- Maintains accessibility (ARIA labels, keyboard navigation)

---

## Component Libraries & Design Systems

### shadcn/ui v2
- **Visual builder** for composing components
- Copy-paste component model (you own the code)
- Built on **Radix UI** primitives — accessible by default
- Tailwind-native styling, fully customizable
- Preferred for new Tailwind projects

### Component Primitives
- **Radix UI**: Unstyled, accessible primitives (dialogs, dropdowns, tabs, popovers)
- **Ark UI**: Alternative to Radix with similar API, supports multiple frameworks

### W3C Design Tokens 1.0
Standard format for design tokens — enables cross-tool interop.

```json
{
  "color": {
    "brand": { "$value": "#0066ff", "$type": "color" }
  },
  "spacing": {
    "md": { "$value": "16px", "$type": "dimension" }
  }
}
```

### Figma-to-Code AI
- **Anima**, **Locofy**, **Builder.io**: Generate React/Tailwind code from Figma designs
- Use as starting point, then refine with custom styling and interactions

---

## Patterns & Templates

### Pattern 1: Glassmorphism Card

**When to use:** Modern, premium aesthetic (works well with colorful backgrounds)

```tsx
function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl
      backdrop-blur-xl backdrop-saturate-150
      bg-white/10 border border-white/20
      shadow-xl shadow-black/5
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
```

Note: Use `prefers-reduced-transparency` media query to provide a solid fallback.

### Pattern 2: Skeleton Loading with Shimmer

**When to use:** Loading states for cards, lists (better UX than spinners)

```tsx
function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-200 p-6">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="space-y-4">
        <div className="h-4 w-3/4 rounded bg-gray-300" />
        <div className="h-4 w-1/2 rounded bg-gray-300" />
        <div className="h-32 w-full rounded bg-gray-300" />
      </div>
    </div>
  );
}
```

```css
/* In CSS @theme (Tailwind v4) */
@theme {
  --animate-shimmer: shimmer 2s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
```

---

## Anti-Patterns

### Ignoring Color Contrast
```css
/* BAD: Gray on light gray = unreadable (2.1:1 contrast) */
.subtle-text { color: #999; background: #f0f0f0; }

/* GOOD: Sufficient contrast (12.6:1) */
.readable-text { color: #333; background: #fff; }
```
- WCAG AA requires 4.5:1 for text, 3:1 for large text
- Test with browser DevTools contrast checker

### Using Popper.js When CSS Suffices
- Use **CSS Anchor Positioning** for tooltips/popovers when possible
- Use **native Popover API** for simple show/hide patterns
- Only reach for Floating UI when CSS anchor positioning isn't supported

### JS Animations for Simple Transitions
- Use **View Transitions API** for page/state transitions
- Use CSS `transition` and `@starting-style` for entry animations
- Only use motion.dev/framer-motion for complex gesture-driven animations

---

## Quality Checklist

### Visual Polish
- [ ] Color palette uses max 3 primary colors + neutrals
- [ ] Typography hierarchy clear (3-5 font sizes)
- [ ] Spacing follows consistent scale (4px, 8px, 16px, 24px, 32px...)
- [ ] Hover states on all interactive elements
- [ ] Loading states for async actions
- [ ] Empty states with helpful messaging
- [ ] View Transitions for page/state changes

### Accessibility
- [ ] Color contrast >= 4.5:1 for text (WCAG AA)
- [ ] Focus indicators visible on all interactive elements
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Glassmorphism respects `prefers-reduced-transparency`
- [ ] High contrast mode respects `prefers-contrast`
- [ ] Alt text on all images
- [ ] Keyboard navigation works (Tab, Enter, Esc)

### Responsive Design
- [ ] Mobile-first approach (320px base)
- [ ] Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- [ ] **Container Queries** for component-level responsiveness
- [ ] Touch targets >= 44x44px (mobile)
- [ ] No horizontal scroll on mobile
- [ ] Images responsive (`max-width: 100%`, `height: auto`)

### Performance
- [ ] Animations use `transform` and `opacity` (GPU-accelerated)
- [ ] Images optimized (WebP/AVIF, lazy loading)
- [ ] CSS bundle <50KB (after minification)
- [ ] No layout shift (CLS <0.1)
- [ ] Fonts preloaded (`<link rel="preload">`)

## Markdown Output Compliance

All markdown output produced by this skill must pass markdownlint. Follow every rule below:

- **Headings**: ATX style (`#`), single space after `#`, increment by one level only, blank lines before and after, no trailing punctuation (`:` `.` `;` `!`), single top-level `#` per document, no duplicate heading text at the same level
- **Lists**: Use `-` for unordered, incrementing numbers (`1.` `2.` `3.`) for ordered, 2-space indent for nesting, blank lines before and after lists, single space after marker
- **Code blocks**: Backtick fences (not tildes), always specify language, blank lines before and after, no leading `$` in commands unless showing output
- **Emphasis**: `*italic*` and `**bold**` only (not underscores), no spaces inside markers
- **Links**: `[text](url)` format only, no bare URLs, no empty links, no spaces inside link text
- **Images**: Always include alt text: `![description](url)`
- **Spacing**: No trailing whitespace, no consecutive blank lines, no hard tabs, file ends with single newline
- **Tables**: Consistent pipe style, column count must match header
- **HTML**: No inline HTML — use markdown equivalents
- **Blockquotes**: Single space after `>`, no blank lines inside blockquotes
- **Horizontal rules**: Use `---` consistently

For the complete rule reference, read `.claude/skills/shared/markdown-lint-rules.md`.
