# Folder Structure

This document describes the CLP project's folder architecture and what belongs
where. It is a permanent reference — consult it before creating any new file.

## Overview

```
CLP-Webapp/
├── public/
│   ├── images/
│   │   ├── brand/           # Logo, brand marks, favicons-in-waiting
│   │   ├── landing/         # Images unique to the landing page
│   │   ├── icons/           # Standalone icon assets (svg/png)
│   │   ├── backgrounds/     # Section/page background images
│   │   └── common/          # Images reused across multiple contexts
│   │
│   └── email/
│       └── clp/
│           ├── images/      # Images referenced by email templates
│           ├── icons/       # Icons referenced by email templates
│           └── preview/     # Static preview screenshots of templates
│
├── src/
│   ├── pages/                       # One file per route/page (e.g. Home.tsx)
│   │
│   ├── components/
│   │   └── landing/                 # Components used ONLY by the landing page
│   │       ├── hero/                 # Hero-specific components
│   │       ├── sections/             # Landing page sections (Features, FAQ, ...)
│   │       └── templates/            # Landing-specific component variants
│   │
│   ├── shared/                      # Anything reusable across pages/features
│   │   ├── components/
│   │   │   ├── common/               # Reusable app-level components
│   │   │   ├── layout/               # Header, Footer, Nav, page shells
│   │   │   └── ui/                   # Primitive UI: Button, Card, Badge, Input...
│   │   ├── constants/                # Centralized strings/config/data
│   │   ├── hooks/                    # Custom hooks (useSomething.ts)
│   │   ├── layouts/                  # Reusable layout wrappers
│   │   ├── utils/                    # Reusable helper/formatting functions
│   │   └── contexts/                 # React context providers (only if genuinely needed)
│   │
│   ├── styles/
│   │   ├── global.css                # Tailwind import + reset + global base styles
│   │   └── design-system.css         # Shared design tokens (Tailwind v4 @theme)
│   │
│   ├── types/                       # Shared TypeScript types/interfaces
│   │
│   ├── App.tsx                      # Root composition (providers/layout shell)
│   └── main.tsx                     # Application entry point
│
├── email-templates/                 # Standalone HTML email templates (NN-name.html)
│
├── docs/                            # This documentation set
│   ├── FOLDER_STRUCTURE.md
│   ├── COMPONENT_GUIDELINES.md
│   ├── STYLING_GUIDELINES.md
│   └── DEVELOPMENT_RULES.md
│
├── package.json
├── vite.config.ts
└── other config files (tsconfig*.json, .oxlintrc.json, ...)
```

## Key principles

- **Landing-only vs. shared is the first decision.** Anything that belongs
  exclusively to the CLP landing page lives under `src/components/landing/`.
  Anything reusable across pages/features lives under `src/shared/`.
- **No flat dumping grounds.** Images, components, and utilities are grouped
  by purpose (`brand/`, `ui/`, `hooks/`, etc.), not dropped into one folder.
- **Pages stay thin.** `src/pages/*.tsx` compose section components; they do
  not contain section implementation.
- **Email is fully isolated.** Email HTML and its assets never mix with the
  React app or its images — see `email-templates/` and `public/email/clp/`.
- **Grow the structure only when justified.** Do not add folders (e.g.
  `src/shared/contexts/`) speculatively — only when a real, current need
  exists.

See `COMPONENT_GUIDELINES.md`, `STYLING_GUIDELINES.md`, and
`DEVELOPMENT_RULES.md` for the rules that govern how this structure is used
going forward.
