---
name: frontend-development
description: "Frontend development expertise: React 19+, Next.js 16, TypeScript, Tailwind CSS v4, React Native, Flutter. React Compiler, Server Components, View Transitions API, CSS Anchor Positioning, Container Queries, component design, rendering strategies, performance, and accessibility. Use when building or reviewing frontend code."
---

# Frontend Development

Expert in building modern, performant web applications.

## Core Stack

React 19+, Next.js 16 (App Router + Server Components + React Compiler built-in), TypeScript, Tailwind CSS v4, React Native (New Architecture), Flutter

## React 19+ Patterns

### React Compiler (automatic optimization)
- Automatic memoization — eliminates need for manual `useMemo`/`useCallback`/`React.memo` in most cases
- Compiler analyzes component purity and applies memoization where beneficial
- If compiler is active: remove manual memoization wrappers (they're redundant noise)
- Check compiler status: look for `reactCompiler` in `next.config.js` or Babel/SWC config

### Server Components & Server Functions
- **Default is server**: Components in App Router are Server Components unless marked `'use client'`
- Server Components can `await` data directly — no useEffect + useState dance
- **Server Functions** (`'use server'`): Mutations from client, form handling, progressive enhancement
- Props crossing server → client boundary must be serializable (no functions, Dates, Maps, Sets)

### Key React 19 APIs
- **`<Activity/>`** (React 19.2): Manages component visibility and state preservation without unmounting — replaces manual show/hide patterns
- **`useEffectEvent`**: Stable event handler references without dependency array concerns — solves the "stale closure" problem in effects
- **`use()`**: Read promises and context inside components — must be inside Suspense boundary, never in try/catch
- **`useOptimistic`**: Optimistic UI updates during async operations
- **`useFormStatus`**: Access form submission status in child components
- **`useActionState`**: Manage state from Server Functions (replaces `useFormState`)
- **`ref` as prop**: Refs are regular props now — no `forwardRef` needed

### Rendering & Data Fetching
- **Streaming SSR**: React Suspense streaming sends HTML chunks as data resolves — reduces TTFB
- **Progressive enhancement**: Forms work without JS via Server Functions
- **Parallel data fetching**: Use `Promise.all` or parallel `await` at layout level, not waterfall in components

## Next.js 16

### Key Features
- **Partial Prerendering (PPR)**: Static shell with dynamic holes — combines SSG speed with SSR freshness
- **Turbopack** (default): Rust-based dev server, significantly faster than Webpack
- **React Compiler built-in**: Zero-config automatic optimization
- **Enhanced caching**: `use cache` directive for granular caching control
- **Static + Dynamic rendering**: Per-component rendering strategy, not per-route

### Routing Patterns
```
app/
  layout.tsx          # Root layout (Server Component)
  page.tsx            # Home page
  loading.tsx         # Streaming fallback (Suspense boundary)
  error.tsx           # Error boundary
  not-found.tsx       # 404 handler
  [slug]/
    page.tsx          # Dynamic route
  @modal/             # Parallel route (named slot)
    (.)photo/[id]/    # Intercepting route
```

### Data Patterns
```typescript
// Server Component — direct data access, no hooks needed
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id); // runs on server
  return <ProductView product={product} />;
}

// Client Component — for interactivity
'use client';
function AddToCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button onClick={() => startTransition(() => addToCart(productId))}>
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

## Modern CSS (2026)

### CSS Anchor Positioning
Position elements relative to other elements without JS — tooltips, popovers, dropdowns.
```css
.trigger { anchor-name: --my-trigger; }
.tooltip {
  position: absolute;
  position-anchor: --my-trigger;
  top: anchor(bottom);
  left: anchor(center);
}
```

### Container Queries
Responsive components based on parent container size, not viewport.
```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 2fr; }
}
```

### View Transitions API
Smooth page/state transitions natively in the browser.
```javascript
document.startViewTransition(() => updateDOM());
```

## Component Library & Animation

### shadcn/ui v2
- Copy-paste components built on Radix UI + Tailwind CSS v4
- Full ownership — components live in your codebase, not node_modules
- Themeable with CSS variables
- Use `npx shadcn@latest add [component]` to add components

### motion.dev (formerly Framer Motion)
- Production animation library for React
- Layout animations, gesture handling, exit animations
- Lighter bundle than CSS-in-JS animation alternatives
```typescript
import { motion } from "motion/react";
<motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
```

## State Management

| Need | Solution |
|------|----------|
| Server state (API data) | React Query (TanStack Query) / SWR |
| Simple client state | `useState` / `useReducer` |
| Shared client state | Zustand (lightweight) / Jotai (atomic) |
| Complex state machines | XState / Zustand with slices |
| Form state | React Hook Form / Conform (server-first) |
| URL state | `nuqs` or `useSearchParams` |

Avoid: Redux for new projects (Zustand/Jotai are simpler), prop drilling through 3+ levels.

## Anti-Patterns to Flag

- Manual `useMemo`/`useCallback`/`React.memo` when React Compiler is active (redundant)
- `useEffect` for derived state (compute inline instead)
- `useEffect` for data fetching in Server Components (use async component instead)
- Client components where Server Components suffice (unnecessary JS shipped)
- `forwardRef` wrapper (refs are regular props in React 19)
- Prop drilling through 3+ levels without composition or context
- Barrel files causing tree-shaking failures
- Inline styles or CSS-in-JS where Tailwind suffices
- Custom animation JS where View Transitions API or motion.dev suffices
- `getServerSideProps` / `getStaticProps` in App Router (use async Server Components)

## Performance Checklist

- [ ] Server Components for non-interactive content (zero client JS)
- [ ] Code splitting with `dynamic()` or `React.lazy()`
- [ ] Image optimization with `next/image` (lazy loading, format selection)
- [ ] Core Web Vitals: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1
- [ ] Speculation Rules API for prefetch/prerender on navigation
- [ ] Bundle analysis with `@next/bundle-analyzer`
- [ ] Font optimization with `next/font`

## Accessibility

- Semantic HTML elements over generic divs
- ARIA attributes only when semantic HTML isn't sufficient
- Keyboard navigation for all interactive elements
- Focus management on route changes
- Color contrast ratios (WCAG 2.1 AA minimum)
- Screen reader testing with VoiceOver / NVDA

---

See also: `tailwind`, `typescript-expert`, `senior-architect`, `performance`

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

---

## Documentação Atualizada (Context7)

Antes de recomendar padrões, APIs ou configurações de qualquer lib/framework mencionada nesta skill:
1. Use `resolve-library-id` do MCP Context7 para resolver o nome da biblioteca
2. Use `query-docs` para consultar a documentação mais recente
3. Se houver divergência entre seu conhecimento e a doc do Context7, a doc do Context7 prevalece

Libs para consultar proativamente:
- `react` — React 19+, Server Components, React Compiler
- `next.js` — Next.js 16, App Router, Server Actions
- `react-native` — React Native, New Architecture
- `flutter` — Flutter SDK
- `tailwindcss` — Tailwind CSS v4
- `motion` — motion.dev (animation)
