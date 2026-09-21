# ARCHITECTURE — Portfolio AI Agent Architecture

## 1. Architecture Overview

This repository uses a Next.js App Router structure:

```text
app/
├── about/
├── blog/
├── contact/
├── services/
├── components/
├── posts/
├── fonts/
├── globals.css
├── layout.tsx
└── page.tsx

public/
└── assets/
```

The architecture is component-oriented, with page-level composition in `app/**/page.tsx` and reusable interactive UI in `app/components/**`.

## 2. Architectural Layers

### Layer A — App / Routing

Responsible for:
- route entry points;
- page composition;
- layouts;
- metadata;
- navigation.

Examples:
- `app/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/layout.tsx`

Rule:
> Page files compose features. Avoid putting large reusable interactive systems directly into page files.

### Layer B — UI Components

Reusable visual/interactive components live under:

```text
app/components/
```

Current notable components:
- Header
- Footer
- Contact
- WorkCard
- BlurText
- FallingText
- PixelTransition
- TextPressure
- MarkdownContent

### Layer C — Styling

Primary styling:
- Tailwind CSS
- `app/globals.css`
- responsive utility classes
- dark-mode classes

Existing breakpoints include:
- xs: 375px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1440px
- 2xl: 1920px

Do not change breakpoint definitions globally without a concrete reason.

### Layer D — Animation

Animation technologies currently present:
- GSAP
- React Spring
- Matter.js
- browser APIs such as IntersectionObserver and requestAnimationFrame

Animation ownership should remain local to the component that owns the interaction.

### Layer E — Content / Data

Blog content currently exists in:

```text
app/posts/data.ts
```

Do not introduce a CMS or external API unless explicitly requested.

### Layer F — Static Assets

Static assets live under:

```text
public/assets/
```

Preserve existing asset paths when possible.

## 3. Client vs Server Components

Default:
- keep pages/components server-side where interactivity is not required;
- use `"use client"` only when browser APIs, state, effects, gestures, or interactive animation require it.

Client components should not be converted to server components blindly if they depend on:
- `window`;
- `document`;
- localStorage;
- event listeners;
- animation libraries;
- browser observers.

## 4. Animation Architecture

### GSAP

Use GSAP for:
- coordinated timelines;
- advanced transitions;
- scroll-linked sequences;
- complex staggered animation;
- interaction-driven animation.

Recommended pattern:

```tsx
const root = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animation
  }, root);

  return () => ctx.revert();
}, []);
```

Use `gsap.matchMedia()` when animation behavior differs across breakpoints.

### React Spring

Use React Spring where the existing component already owns spring-based stateful animation.

Do not migrate React Spring → GSAP simply for stylistic consistency.

### Matter.js

Use Matter.js only for physics-driven interactions such as the existing FallingText effect.

Avoid adding physics where CSS/GSAP is sufficient.

### requestAnimationFrame

Use only where continuous frame-by-frame updates are truly required.

Every loop must:
- have a cleanup mechanism;
- stop on unmount;
- avoid unnecessary DOM writes;
- avoid running when the animation is not visible where practical.

## 5. Animation Performance

Prefer:
- transform;
- opacity;
- CSS variables;
- GPU-friendly properties.

Be careful with:
- width/height animation;
- top/left animation;
- filters;
- large DOM node counts;
- continuous canvas/physics loops.

For GSAP:
- kill/revert owned animations on cleanup;
- avoid global selectors where scoped refs are available;
- avoid creating duplicate timelines on every render.

## 6. Responsive Architecture

Responsive behavior should primarily use Tailwind breakpoints.

Do not create JavaScript breakpoint state when CSS can solve the problem.

JavaScript media queries are appropriate when:
- animation logic genuinely differs;
- interaction model changes;
- a library requires runtime dimensions.

For animations, prefer `gsap.matchMedia()` over manually maintaining multiple resize listeners where GSAP is already being used.

## 7. Dark Mode

Dark mode currently relies on:
- `.dark` class;
- localStorage;
- system preference;
- Tailwind dark variants.

Do not replace this mechanism unless explicitly requested.

When touching global theme behavior:
- preserve first-paint behavior;
- preserve system preference;
- preserve manual preference;
- test both modes.

## 8. Navigation

Header owns:
- route navigation;
- active route state;
- mobile menu state;
- dark mode toggle;
- hide-on-scroll behavior.

Do not duplicate these concerns in individual pages.

## 9. Component Boundaries

Create a new component when:
- UI is reused;
- interaction has meaningful internal state;
- animation has independent lifecycle;
- page logic becomes difficult to read.

Do not create components solely to reduce line count.

## 10. Data Boundaries

Static content should remain static unless dynamic behavior is required.

Do not introduce:
- state management libraries;
- API layers;
- databases;
- CMS;
- abstraction frameworks

without an explicit requirement.

## 11. Dependency Policy

Existing major dependencies:

```text
next
react
react-dom
tailwindcss
gsap
@react-spring/web
matter-js
marked
dompurify
tailwind-scrollbar
typescript
```

Before adding a dependency:
1. check whether existing tools already solve the problem;
2. prefer native CSS/DOM when appropriate;
3. prefer existing libraries already used by the project;
4. add a dependency only when the benefit is concrete.

## 12. AI Agent Architecture

The AI workflow itself follows:

```text
User Request
    ↓
Caveman reconnaissance
    ↓
Identify exact files / risks
    ↓
Choose ONE specialist if needed
    ├── UI/UX Pro Max
    ├── Frontend Design
    ├── GSAP / Animation
    ├── Responsive Design
    ├── ECC
    └── Browser / QA
    ↓
Minimal implementation
    ↓
Browser / QA when applicable
    ↓
Final verification
```

Caveman is the default entry point.

Specialist skills are invoked only when their domain is materially involved.

## 13. Architecture Invariants

Unless explicitly requested, preserve:
- route structure;
- page purpose;
- dark/light mode;
- existing navigation;
- existing animation intent;
- component responsibilities;
- responsive breakpoints;
- public asset paths;
- current framework;
- current package ecosystem.
