# Component Guidelines

Rules for deciding where a component belongs and how to keep the component
tree free of duplication.

## Step 0 — Before creating anything

Before writing a new component, inspect the existing project:

1. Does an equivalent component already exist in `src/shared/components/`
   or `src/components/landing/`?
2. Can an existing component be reused via **props, variants,
   configuration, children, or composition** instead of copy-pasting a
   near-identical version?

Only create a new file once you've confirmed nothing reusable exists.

## Landing-page-specific components

If a component is used only on the CLP landing page, it belongs under:

```
src/components/landing/
├── hero/         → Hero-related components
├── sections/     → Landing page sections (Features, Testimonials, FAQ, ...)
└── templates/    → Landing-specific component variants/templates
```

Do not move a landing-only component into `src/shared/` just because it
*might* be reused later. Promote it only when a second, real use case
appears.

## Shared components

If a component is (or clearly will be) reused across multiple pages,
sections, or features, it belongs under:

```
src/shared/components/
├── ui/       → Primitive, presentational UI: Button, Card, Badge, Input, Modal
├── common/   → Reusable app-level components (not pure UI primitives)
└── layout/   → Header, Footer, Navigation, page shell/layout components
```

Examples: `Button`, `Container`, `SectionHeading`, `Card`, `Modal`, `Badge`,
`Input`, `Header`, `Footer`, `Navigation`, a common CTA component.

## Reusability workflow for new sections

Whenever a new landing page section is requested:

1. Inspect existing components in `src/shared/components/` and
   `src/components/landing/`.
2. Identify what can be reused as-is or via props/variants.
3. Reuse it. Only build new UI for what's genuinely new.
4. If the new UI pattern is generically reusable, add it to
   `src/shared/components/ui|common|layout/` (whichever fits).
5. If it's specific to the landing page, keep it inside
   `src/components/landing/`.
6. Do not duplicate JSX or Tailwind class strings that already exist as a
   component — reuse the component instead.

## Composition over duplication

- Do not create a near-duplicate component just because the styling differs
  slightly — add a `variant`/`size`/prop instead.
- Page files (`src/pages/*.tsx`) compose section components; they must not
  contain section implementation directly. Home.tsx should stay a thin
  composition of imported sections.

## Types

- Component-specific types/interfaces may stay in the component's own file
  when they are not reused elsewhere.
- Types reused across multiple components belong in `src/types/`.
- Never redefine the same interface in more than one file.

## Exports

- Components use a **default export**, one component per file.
- Hooks, utilities, constants and types use **named exports**.
- `icons.tsx` is the one exception: it holds several tiny named icon
  components.

## What already exists — check here first

Reuse these before writing anything new:

| Component | Location | Notes |
|------------|-----------|-------|
| `Button` | `shared/components/ui/Button.tsx` | `primary` / `secondary` / `ghost`, sizes `sm`/`md`/`lg`. Renders an `<a>` when given `href`. Add a variant here rather than styling a new button. |
| `Container` | `shared/components/ui/Container.tsx` | Page width + gutters. |
| `SectionHeading` | `shared/components/ui/SectionHeading.tsx` | Eyebrow + heading + description. `size="hero"` or `"section"`, `align`, `as`. Every section heading should use this. |
| `icons` | `shared/components/ui/icons.tsx` | `ArrowRightIcon`, `ChevronDownIcon`. |
| `Logo` | `shared/components/common/Logo.tsx` | Mark + wordmark; `showWordmark={false}` for the mark alone. |
| `Header` | `shared/components/layout/Header.tsx` | Fixed site header, glass-on-scroll. |
| `useScrollProgress` | `shared/hooks/useScrollProgress.ts` | 0→1 progress of a tall element through the viewport, rAF-throttled. |
| `useScrolled` | `shared/hooks/useScrolled.ts` | Boolean past a scroll threshold. |
| `cn` | `shared/utils/cn.ts` | Conditional class joining. |
| `clamp`, `mapRange` | `shared/utils/math.ts` | Numeric helpers for animation math. |

No shared `Card` exists yet — the hero's dashboard preview uses a local
panel because its styling is specific to that mock. Create
`shared/components/ui/Card.tsx` when a second, genuinely shared card
appears.
