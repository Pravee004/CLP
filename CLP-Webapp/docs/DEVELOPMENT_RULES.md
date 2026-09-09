# Development Rules

Permanent rules that apply to **every future prompt/task** on this project.
These rules were established during initial project setup and must be
followed for all section-by-section landing page development that follows.

## Golden rule

> Before creating a new component, function, CSS rule, utility, or asset,
> first inspect the existing project and check whether something reusable
> already exists. Do not blindly create duplicate code.

## Process for every future prompt

1. **Inspect** the existing project structure and relevant existing code.
2. **Check for reuse** — components, utilities, constants, hooks, types,
   and styles.
3. **Determine the correct folder** for the new implementation (see
   `FOLDER_STRUCTURE.md`).
4. **Reuse existing components** where possible (see
   `COMPONENT_GUIDELINES.md`).
5. **Create new files only when genuinely necessary.**
6. **Place every new file in the correct architectural location.**
7. **Avoid duplicating**: components, JSX, functions, utilities, type
   definitions, constants, CSS, Tailwind class patterns, assets.
8. **Keep naming conventions consistent** (see below).
9. **Do not restructure unrelated parts of the project.**
10. **After implementing**, verify the new code doesn't unnecessarily
    duplicate existing functionality.

## Landing page sections specifically

When asked for a section (e.g. "Create the Hero section", "Add a Features
section", "Create a Testimonials section"):

- Do **not** put the implementation directly inside `Home.tsx`.
- Determine whether reusable components already exist and reuse them.
- Create the section as its own component in the correct folder under
  `src/components/landing/`.
- Import and compose the section inside `Home.tsx` — the page file stays a
  clean composition, not an implementation.

## Naming conventions

- Components: `PascalCase` (e.g. `HeroSection.tsx`, `FeatureCard.tsx`).
- Hooks: `camelCase`, prefixed `use` (e.g. `useScrollPosition.ts`).
- Utilities/functions: `camelCase` (e.g. `formatCurrency.ts`).
- Constants files: `camelCase` or `SCREAMING_SNAKE_CASE` for the exported
  values themselves (e.g. `export const NAV_LINKS = [...]`).
- Images: `kebab-case` (e.g. `kids-learning-hero.webp`).
- Email templates: `NN-kebab-case-name.html` (e.g. `01-welcome.html`).

## Functions & utilities

- Reusable helpers/formatters/transformations → `src/shared/utils/`.
- Custom hooks → `src/shared/hooks/`, named `useSomething.ts`.
- A function used by only one component may stay local to that component's
  file — don't move everything into `shared/` unnecessarily.
- Never duplicate the same function across multiple files.

## Constants

- Reusable constants (strings, config objects, repeated data) →
  `src/shared/constants/`, with descriptive names.
- Don't repeat the same literal/config across multiple files when it can be
  centralized.

## Types

- Reusable types/interfaces → `src/types/`.
- Component-specific types may stay local to the component.
- Never duplicate the same interface in multiple files.

## Assets

- Landing images live under `public/images/<category>/` (never a flat
  single folder) — see `FOLDER_STRUCTURE.md` for categories.
- Use `kebab-case` filenames.
- Never duplicate the same asset across multiple folders.

## Email templates

- Live in `email-templates/`, named `NN-kebab-case-name.html`.
- Email-specific assets live in `public/email/clp/` — never mixed with
  landing page assets.
- Use email-safe HTML (table-based layouts where needed for client
  compatibility). Do not reuse React components directly in email HTML —
  keep branding/patterns consistent by convention, not by code sharing.

## Documentation

Keep these docs current as the project evolves — they are the permanent
reference for how CLP is built:

- `docs/FOLDER_STRUCTURE.md`
- `docs/COMPONENT_GUIDELINES.md`
- `docs/STYLING_GUIDELINES.md`
- `docs/DEVELOPMENT_RULES.md` (this file)
