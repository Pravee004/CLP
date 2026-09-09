# Styling Guidelines

CLP uses **Tailwind CSS v4** (CSS-first config via `@theme`, loaded through
the `@tailwindcss/vite` plugin) as the primary styling method.

## Tailwind CSS — primary styling method

Use Tailwind utility classes for:

- Layout, spacing, flex/grid
- Typography
- Colors
- Responsive design (`sm:`, `md:`, `lg:`, ...)
- Borders, shadows, radius
- Most component styling

### Don't blindly duplicate class strings

If the same combination of Tailwind classes is repeated across multiple
places, that's a signal to extract a **reusable component**, not to keep
copy-pasting the class string.

| Instead of...                                   | Do this...                                   |
|--------------------------------------------------|-----------------------------------------------|
| Repeating the same button classes everywhere     | Create a shared `Button` component with variants |
| Repeating the same section container classes      | Create a shared `Container`/`Section` component |
| Repeating the same card markup/classes            | Create a shared `Card` component |

See `COMPONENT_GUIDELINES.md` for where these components belong.

## Global CSS — `src/styles/global.css`

Global CSS is limited to true application-wide concerns:

- Tailwind import (`@import "tailwindcss";`) and the design-system import
- CSS reset / base element styles (`html`, `body`, `img`, `button`, ...)
- Global typography defaults
- Root-level styles
- Shared, global animation keyframes
- Browser normalization

**Never** add page-specific or single-component styling to this file. If
you're tempted to add a rule here for one section or one component, it
belongs elsewhere (see below).

## Design system — `src/styles/design-system.css`

Holds shared, design-system-level tokens defined via Tailwind v4's `@theme`
block (colors, fonts, radius, shadows, layout widths). These tokens surface
automatically as Tailwind utilities, e.g.:

- `--color-brand-primary` → `bg-brand-primary`, `text-brand-primary`
- `--radius-card` → `rounded-card`
- `--shadow-soft` → `shadow-soft`

Use this file only for tokens that can't reasonably be expressed as a
one-off Tailwind utility or a reusable component. Do not add component
styles here — it is a token registry, not a stylesheet for specific UI.

When the CLP brand (colors, type, etc.) is finalized, update the token
values in this file rather than hardcoding raw hex/px values in components.

## Design tokens in use

Defined in `design-system.css`, available as Tailwind utilities:

- **Brand** — `brand-primary` `#2563B8`, `brand-dark` `#163B70`
- **Accents** — `accent-green` `#2F6B57`, `accent-gold` `#F4B942`,
  `accent-coral` `#E9786A`
- **Surfaces** — `page` `#F4F8FC`, `surface` `#FFFFFF`, `surface-muted`
  `#F8FAFC`, `line` `#E2EAF2`
- **Text** — `ink` `#16324F`, `body` `#425466`, `muted` `#718096`
- **Radius** — `rounded-card`, `rounded-window`, `rounded-pill`
- **Shadows** — `shadow-soft`, `shadow-card`, `shadow-cta`, `shadow-window`
- **Fonts** — `font-display` (Plus Jakarta Sans), `font-sans` (Inter)
- **Width** — `max-w-page` (1200px, via `Container`)

Use these names instead of raw hex values. Raw hex is acceptable only
inside illustration SVGs, where fills are artwork rather than UI.

## Component-specific CSS

Tailwind should be preferred for component styling. If a component
genuinely needs custom CSS Tailwind can't reasonably express:

- Place the CSS file **next to** the component.
- Name it after the component: `HeroSection.tsx` → `HeroSection.css`.
- Do not put component-specific CSS into `src/styles/`.

The one file that currently qualifies is
`components/landing/hero/HeroSection.css`: the hero's scroll choreography
is a set of interdependent transforms driven by a single custom property
(`--hero-p`), which Tailwind utilities can't express. All of that hero's
static styling still lives in Tailwind classes in the TSX.

## Scroll-linked animation

When animating on scroll, write the progress value to a CSS custom
property via a ref and let CSS do the work — do not drive per-frame
animation through React state. `useScrollProgress` is built for this.

## Summary of file responsibilities

| File/location                          | Responsibility                              |
|-----------------------------------------|----------------------------------------------|
| Tailwind utility classes (in JSX)       | Default styling approach for all components |
| `src/styles/global.css`                 | App-wide reset/base styles only |
| `src/styles/design-system.css`          | Shared design tokens (Tailwind `@theme`) |
| `ComponentName.css` next to component   | Rare, component-specific CSS Tailwind can't express |
