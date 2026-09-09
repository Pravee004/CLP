You are now setting up the permanent development instructions for this project.

Project name: CLP

Before implementing any landing page section or feature, create and maintain a root-level project instruction file named:

CLAUDE.md

This file contains the permanent architecture and development rules for the CLP project.

These rules must be followed whenever working on this project, including when creating, updating, refactoring, or modifying any future landing page section, component, utility, style, asset, or email template.

# Project Stack

The project uses:

* React
* Vite
* TypeScript
* Tailwind CSS

# Core Architecture

Follow this project structure:

src/
├── pages/
├── components/
│   └── landing/
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   └── layout/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── utils/
│   └── contexts/
├── styles/
├── types/
├── App.tsx
└── main.tsx

Other important directories:

public/
├── images/
└── email/

email-templates/

docs/

# MOST IMPORTANT RULE — INSPECT BEFORE CREATING

For every future request, before creating or modifying code:

1. Inspect the current project structure.
2. Inspect relevant existing components.
3. Check whether the requested UI or functionality already exists.
4. Check for reusable components.
5. Check for reusable utilities.
6. Check for existing constants.
7. Check for existing hooks.
8. Check for existing types.
9. Check for existing styles.
10. Reuse or extend existing code whenever appropriate.

Do not immediately create a new component or file without checking the existing project first.

# COMPONENT LOCATION RULES

## Landing Page-Specific Components

If a component is only used for the CLP landing page, place it inside:

src/components/landing/

Use appropriate subfolders when needed.

Examples:

Hero-related code:

src/components/landing/hero/

Landing page sections:

src/components/landing/sections/

Do not put landing-page-specific components inside shared components unless they are genuinely reusable outside that specific landing page context.

## Shared Components

If a component is reusable across multiple sections, pages, or future features, place it inside:

src/shared/components/

Use the appropriate category:

Small reusable UI components:

src/shared/components/ui/

Examples:

* Button
* Card
* Badge
* Input

Common reusable components:

src/shared/components/common/

Examples:

* Container
* SectionHeading
* CTA
* SectionWrapper

Layout components:

src/shared/components/layout/

Examples:

* Header
* Footer
* Navigation

# REUSE BEFORE DUPLICATION

Never create duplicate components for similar UI.

Before creating a new component, determine whether an existing component can be reused through:

* Props
* Variants
* Configuration
* Children
* Composition

Prefer this:

<Button variant="primary" />

<Button variant="secondary" />

Instead of:

PrimaryButton.tsx

SecondaryButton.tsx

when both components have the same structure.

Do not duplicate JSX only to make small visual changes.

# PAGE RULES

Page files inside:

src/pages/

must primarily compose components and sections.

Do not place large section implementations directly inside page files.

Example:

Home.tsx should primarily contain:

Header

HeroSection

FeaturesSection

TestimonialsSection

CTASection

Footer

Each major section should live in the appropriate component folder.

# FUNCTION RULES

Before creating a function, check whether the same or similar function already exists.

If a function is reusable and independent:

Place it inside:

src/shared/utils/

If it is a custom React hook:

Place it inside:

src/shared/hooks/

Custom hooks must start with:

use

Examples:

useScrollPosition.ts

useMediaQuery.ts

Do not duplicate utility functions across multiple components.

Keep a function local when it is only relevant to one component.

Do not move everything to shared utilities unnecessarily.

# CONSTANT RULES

Reusable constants and configuration values belong in:

src/shared/constants/

Do not repeat the same constant value across multiple files unnecessarily.

# TYPE RULES

Reusable TypeScript types and interfaces belong in:

src/types/

Component-specific types may remain close to the component if they are not reused elsewhere.

Do not duplicate identical interfaces in multiple files.

# TAILWIND CSS RULES

Tailwind CSS is the primary styling approach.

Use Tailwind for:

* Layout
* Spacing
* Typography
* Responsive design
* Colors
* Borders
* Shadows
* Flex
* Grid

Do not repeatedly copy large groups of Tailwind classes when the same UI pattern is reused.

First consider creating or extending a reusable component.

Examples:

Repeated button patterns → reusable Button

Repeated card patterns → reusable Card

Repeated section layout → reusable Container or SectionWrapper

Repeated heading pattern → reusable SectionHeading

Prefer component reuse over copying the same Tailwind class strings.

# GLOBAL CSS RULES

Global CSS belongs inside:

src/styles/

Use global CSS only for:

* Base styles
* Global typography
* Root styles
* Application-wide CSS
* Global animations
* CSS variables
* Browser normalization

Do not put page-specific styles inside global CSS.

Do not put component-specific styles inside global CSS.

Global CSS must not become a collection of random styles.

# COMPONENT-SPECIFIC CSS

Tailwind is preferred.

Only create component-specific CSS when Tailwind is not suitable or custom CSS is genuinely necessary.

When required, keep CSS close to the component.

Example:

HeroSection.tsx

HeroSection.css

Do not create CSS files unnecessarily.

# ASSET RULES

Landing page assets belong inside:

public/images/

Organize assets by category.

Examples:

public/images/brand/

public/images/landing/

public/images/icons/

public/images/backgrounds/

public/images/common/

Use kebab-case file names.

Do not duplicate the same image in multiple locations.

# EMAIL TEMPLATE RULES

Email HTML files belong inside:

email-templates/

Naming pattern:

NN-kebab-case-name.html

Examples:

01-welcome.html

02-registration-confirmation.html

Email assets belong inside:

public/email/clp/

Do not mix landing page assets with email assets.

Email templates must remain separate from React components.

# SECTION IMPLEMENTATION WORKFLOW

Whenever I ask you to create or update a landing page section, follow this exact process:

STEP 1 — Understand the request

Identify:

* Which section is being created or modified
* Whether it is new or existing
* Which existing page it belongs to

STEP 2 — Inspect existing code

Check:

* Existing sections
* Shared components
* UI components
* Utilities
* Hooks
* Constants
* Types
* Styles

STEP 3 — Reuse analysis

Before creating anything new, determine:

* Can an existing component be reused?
* Can an existing component be extended with props or variants?
* Does the requested functionality already exist?
* Can existing utilities or constants be reused?

STEP 4 — Determine correct location

Place new code in the correct folder according to these rules.

Do not create files in arbitrary locations.

STEP 5 — Implement

Create only the files that are genuinely required.

Avoid:

* Duplicate components
* Duplicate functions
* Duplicate types
* Duplicate constants
* Duplicate CSS
* Duplicate Tailwind patterns
* Duplicate assets

STEP 6 — Integrate

If the new section belongs to the landing page:

Import and compose it inside the correct page.

Keep the page file clean.

STEP 7 — Review

Before finishing:

* Check for duplication
* Check whether existing components could have been reused
* Check file placement
* Check naming consistency
* Check styling consistency
* Check responsiveness

# UPDATE RULE

When I ask to modify an existing section:

Do not recreate the section from scratch unless necessary.

First inspect the existing implementation.

Modify the existing component.

Reuse the existing architecture.

Do not create duplicate versions such as:

HeroSectionNew.tsx

HeroSectionUpdated.tsx

HeroSectionV2.tsx

Instead, update the existing component unless a genuinely separate variant is required.

# NO UNRELATED CHANGES

When implementing a request:

Do not modify unrelated files.

Do not restructure unrelated components.

Do not refactor unrelated code unless it is required for the requested implementation.

Keep changes focused.

# FUTURE INSTRUCTIONS

Every future prompt from me should be treated as a feature or section request within this architecture.

The instructions in this CLAUDE.md file must be considered before implementing the request.

If my future instruction explicitly conflicts with these rules, follow my latest explicit instruction for that specific task while keeping the rest of the architecture unchanged.

# INITIAL SETUP TASK

Now:

1. Create this root-level CLAUDE.md file with these permanent instructions.
2. Review the project structure.
3. Ensure the project is configured according to these rules.
4. Do not implement any landing page section yet.
5. Confirm that the project is ready for section-by-section development.
