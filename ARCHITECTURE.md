# ARCHITECTURE — Portfolio AI Agent Architecture

> v2. Architecture intent is unchanged from v1; this revision corrects the file map, component inventory, styling stack, and dependency list to match the repository as it actually exists, and adds a short "known structural debt" section.

## 1. Architecture Overview

Next.js App Router (Next 15, React 19, TypeScript strict, Tailwind CSS 4).

```text
app/
├── about/
│   ├── page.tsx              # tabbed bio (client)
│   └── team/page.tsx         # empty scaffold, not linked
├── blog/
│   ├── layout.tsx            # ⚠ placeholder "Admin Layout" (see §14)
│   ├── page.tsx              # post list (server)
│   └── [slug]/page.tsx       # post page (server, generateStaticParams)
├── components/
│   ├── BlurText/BlurText.tsx
│   ├── Contact/contact.tsx
│   ├── FallingText/FallingText.tsx
│   ├── Footer/footer.tsx
│   ├── Header/header.tsx
│   ├── Magnet/Magnet.tsx
│   ├── MarkdownContent/MarkdownContent.tsx
│   ├── MorphSlider/MorphSlider.tsx
│   ├── PixelTransition/PixelTransition.tsx
│   ├── TextPressure/TextPressure.tsx
│   └── WorkCard/workcard.tsx
├── contact/page.tsx          # server
├── services/page.tsx         # client, GSAP + ScrollTrigger
├── posts/data.ts             # blog content
├── fonts/                    # Geist woff files (currently unused)
├── globals.css
├── layout.tsx
└── page.tsx                  # home (server component composing client components)

public/assets/img/            # logos, portraits, slider images, toggle icons
.claude/skills/frontend-design/   # project-local skill (pinned in skills-lock.json)
AGENTS.md  DESIGN.md  ARCHITECTURE.md  PRD.md
next.config.mjs  postcss.config.mjs  tailwind.config.js  tsconfig.json  global.d.ts
```

Component-oriented: page-level composition in `app/**/page.tsx`; reusable interactive UI in `app/components/**`. Path alias `@/*` → repo root (`./*`).

### Document hierarchy

| Question | Authority |
|---|---|
| What is in scope / what is a non-goal? | `PRD.md` |
| How is the code structured, what may be added? | `ARCHITECTURE.md` (this file) |
| What should it look like and how should it move? | `DESIGN.md` |
| How does the agent work (skills, cost, QA, reporting)? | `AGENTS.md` |

Conflict order: **explicit user request → DESIGN.md / ARCHITECTURE.md rules → skill defaults**. A skill's default taste never overrides `DESIGN.md`.

## 2. Architectural Layers

### Layer A — App / Routing

Route entry points, page composition, layouts, metadata, navigation.

- `app/page.tsx`, `app/about/page.tsx`, `app/about/team/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/layout.tsx`.

Rule:
> Page files compose features. Avoid putting large reusable interactive systems directly into page files.

(Current exception: `services/page.tsx` holds its data arrays, animation, and layout in one file. Acceptable for a single-use page; do not copy the pattern for reusable pieces.)

### Layer B — UI Components

Live under `app/components/`. Note the **file-name casing is inconsistent** (`header.tsx`, `footer.tsx`, `contact.tsx`, `workcard.tsx` are lowercase; the animation components are PascalCase). Do not rename; imports depend on it.

| Component | Role | Boundary |
|---|---|---|
| `Header` / `Footer` | global chrome, navigation, theme toggle | client |
| `Contact` | 3 contact cards (Maps / WhatsApp / Gmail) | client |
| `WorkCards` | desktop 2-col grid + mobile swipe carousel | client, owns its own breakpoint state |
| `TextPressure` | hero variable-font typography | client, rAF + observers |
| `BlurText` | letter/word entrance | client, React Spring |
| `FallingText` | Matter.js physics text | client |
| `PixelTransition` | pixel-reveal content swap (portrait) | client, GSAP |
| `MorphSlider` | WebGL image slider (`ogl` + GSAP) | client |
| `Magnet` | pointer-attracted wrapper (CTA buttons) | client |
| `MarkdownContent` | `marked` + `DOMPurify` rendering for posts | client |

### Layer C — Styling

- Tailwind CSS **v4** via `@tailwindcss/postcss`; entry is `app/globals.css` (`@import 'tailwindcss'`).
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — driven by the `.dark` class on `<html>`.
- Page canvas colors and the body font are set as classes on `<body>` in `app/layout.tsx` (see `DESIGN.md` §2–3).
- Custom utilities in `globals.css`: `text-balance`, `.scrollbar`, `.scroll-custom` (accent scrollbar).
- Intended breakpoints (in `tailwind.config.js`): `xs 375 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920`.

> ⚠️ Tailwind v4 only loads `tailwind.config.js` when CSS declares `@config`. `globals.css` does not. The custom `screens` and the `tailwind-scrollbar` plugin may therefore be inactive (defaults would apply: `xl` 1280, `2xl` 1536, no `xs:`). **Verify in the browser before assuming the table above.** Do not change breakpoint definitions as a side effect of another task; if confirmed, fixing it is its own task (v4-native: `@theme { --breakpoint-*: … }`).

### Layer D — Animation

Present:
- **GSAP** — `PixelTransition`, `MorphSlider`, `services/page.tsx` (`gsap.context` + `ScrollTrigger`, with a reduced-motion branch).
- **React Spring** — `BlurText` only.
- **Matter.js** — `FallingText` only.
- **ogl** (WebGL) — `MorphSlider` only.
- Browser APIs — `IntersectionObserver`, `MutationObserver`, `requestAnimationFrame`, pointer/touch events, `matchMedia`.

Animation ownership stays local to the component that owns the interaction. Full behavior inventory (trigger, cleanup, reduced-motion status) is in `DESIGN.md` §6.

### Layer E — Content / Data

- Blog: `app/posts/data.ts` exports `posts` (`id, title, author, date, content` — Markdown string). `[slug]` pages are statically generated from it.
- Other content is **co-located in the component or page that renders it**: work list in `workcard.tsx`, pricing tiers/add-ons/process in `services/page.tsx`, contact details in `contact.tsx`, socials and address in `footer.tsx`. Some values (address) exist in more than one file.
- Do not introduce a CMS, API layer, or content abstraction unless explicitly requested. If a value must change, change it everywhere it appears.

### Layer F — Static Assets

`public/assets/img/`. Preserve paths (they are referenced by string, some without a leading `/`, e.g. `assets/img/ariaaji.jpg`). Do not delete or rename assets without an explicit request — including the apparent junk (`*:Zone.Identifier`, duplicate `.jpeg`/`.webp` pairs); report instead.

## 3. Client vs Server Components

Default: server where no interactivity is required; `"use client"` only for state, effects, browser APIs, gestures, or animation libraries.

Current reality worth knowing:
- **Server:** `app/page.tsx` (composes client components), `contact/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `blog/layout.tsx`.
- **Client:** `about/page.tsx`, `services/page.tsx`, `Header`, `Footer`, `Contact`, and every animation component.

Do not convert client components to server components if they depend on `window`, `document`, `localStorage`, event listeners, animation libraries, or observers. Do not convert server pages to client just to add a small effect — extract a client leaf instead.

## 4. Animation Architecture

### GSAP
Use for coordinated timelines, advanced transitions, scroll-linked sequences, staggered animation, interaction-driven animation.

```tsx
const root = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animation
  }, root);

  return () => ctx.revert();
}, []);
```

`gsap.matchMedia()` when behavior differs by breakpoint. Register plugins (`ScrollTrigger`) once, where used.

### React Spring / Matter.js / ogl
Keep where they already live. Do not migrate React Spring → GSAP for stylistic consistency. Use Matter.js only for physics interactions (`FallingText`). `ogl` exists solely for `MorphSlider`; do not reach for WebGL elsewhere.

### requestAnimationFrame
Only where continuous updates are truly required. Every loop must have cleanup, stop on unmount, avoid needless DOM writes, and avoid running when not visible where practical.

## 5. Animation Performance

Prefer `transform`, `opacity`, CSS variables. Be careful with width/height/top/left animation, filters, large DOM counts, continuous canvas/physics/WebGL loops. For GSAP: revert owned animations on cleanup, use scoped refs over global selectors, never create duplicate timelines per render.

Known hot spots (see `DESIGN.md` §12): home mounts both hero variants (7 `TextPressure` instances); `FallingText`'s manual rAF loop is not cancelled; `Magnet` sets React state on every window `mousemove`.

## 6. Responsive Architecture

Tailwind breakpoints first; no JS breakpoint state when CSS can do it. JS media checks are acceptable when animation logic or interaction model genuinely differs, or a library needs runtime dimensions. Existing JS width checks: `WorkCards` (`innerWidth < 1024`), `TextPressure` (font-size table). For GSAP animation, prefer `gsap.matchMedia()` over manual resize listeners.

## 7. Dark Mode

Mechanism (preserve):
1. Inline `<script>` in `<head>` of `layout.tsx` sets/removes `.dark` on `<html>` **before first paint** from `localStorage.theme` or `prefers-color-scheme`.
2. `Header` re-initializes state, owns the toggle, writes `localStorage.theme`.
3. Tailwind `dark:` variants via the `@custom-variant` above.
4. `TextPressure` observes the `<html>` class with a `MutationObserver` to recolor live.

`Header` also defines a `resetToSystemPreference` helper that is currently unused. `globals.css` has `prefers-color-scheme` variables that are separate from the `.dark` class (see `DESIGN.md` D6). When touching theme behavior: preserve first-paint behavior, system preference, manual preference; test both modes.

## 8. Navigation

`Header` owns route navigation, active-route state, mobile menu state, dark-mode toggle, and hide-on-scroll. Current link sets differ by breakpoint: desktop = About, Contact, Blog; mobile menu = About, **Services**, Contact, Blog; footer = About, Contact, Blog. Do not duplicate these concerns in pages. Do not "align" the link sets without a request.

## 9. Component Boundaries

Create a new component when UI is reused, interaction has meaningful internal state, animation has an independent lifecycle, or page logic becomes hard to read. Not solely to reduce line count. Do not create speculative wrappers, hooks, or utilities.

## 10. Data Boundaries

Static content stays static unless dynamic behavior is required. Do not introduce state-management libraries, API layers, databases, a CMS, or abstraction frameworks without an explicit requirement.

## 11. Dependency Policy

Installed (from `package.json`):

```text
runtime : next ^15.5, react ^19.1, react-dom ^19.1, gsap ^3.12, @react-spring/web ^10,
          matter-js ^0.20, ogl ^1, marked ^15, dompurify ^3, tailwind-scrollbar ^4
types   : @types/dompurify, @types/matter-js, @types/node, @types/react, @types/react-dom
tooling : tailwindcss ^4, @tailwindcss/postcss ^4, postcss, typescript ^5.8
scripts : dev, build, start, lint (next lint), debug
```

Before adding a dependency: (1) can existing tools solve it? (2) can native CSS/DOM? (3) can GSAP / React Spring / Matter.js / ogl already do it? (4) only then add — with a stated concrete benefit.

Tooling caveat: the `lint` script is `next lint`, which is deprecated in Next 15.5 and there is no ESLint config in the repo. Do not present it as a working gate; report the limitation and rely on `npm run build` + browser verification.

## 12. Framework-coupled Surface

For anyone reading or porting this code, these are the places that depend on Next.js. Everything else (components' logic, Tailwind classes, GSAP/Spring/Matter/ogl code, data files) is plain React + CSS.

| Next-specific API | Where |
|---|---|
| `next/link` | Header, Footer, WorkCards, home CTA, about, blog pages |
| `next/image` | Header theme toggle |
| `next/navigation` (`usePathname`, `notFound`) | Header, blog `[slug]` |
| `next/font/google` | `layout.tsx` |
| `Metadata` export, `generateMetadata`, `generateStaticParams` | `layout.tsx`, blog `[slug]` |
| App Router file conventions (`layout.tsx`, `page.tsx`, `[slug]`) | all routes |
| Server components (no directive) | home, contact, blog list/post |

Font and theme first-paint logic (`layout.tsx` inline script) is the other framework-adjacent piece: it must run before hydration in whatever host is used.

This repo itself stays on Next.js (see PRD non-goals); this table is informational.

## 13. AI Agent Architecture

```text
User Request
    ↓
Caveman reconnaissance
    ↓
Identify exact files / risks   (consult DESIGN.md for anything visual)
    ↓
Choose ONE specialist if needed
    ├── UI/UX Pro Max
    ├── Frontend Design      (new sections only; DESIGN.md is its brief)
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

Caveman is the default entry point. Specialist skills are invoked only when their domain is materially involved. Skills discovered project-locally live in `.claude/skills/` (currently `frontend-design`).

## 14. Known Structural Debt (report, don't fix unasked)

| Item | Detail |
|---|---|
| `blog/layout.tsx` placeholder | Named `AdminLayout`, renders a literal "Admin Layout" `<header>` on every blog route. Visible bug. |
| `params` typing in `[slug]` | `generateMetadata`/page use `params: any` and read it synchronously; Next 15 types `params` as a `Promise` and sync access is deprecated. Works today; fix when touching the file. |
| Tailwind config not loaded | See §2 Layer C warning. |
| Dead/leftover code | Unused `Montserrat_Alternates`, duplicate `JetBrains_Mono` instance, unused `app/fonts`, commented-out blocks in `blog/page.tsx`, `contact/page.tsx`, `services/page.tsx`, `about/page.tsx`, `header.tsx`; `console.log` in `Header`. Clean only in files you are already editing. |
| Placeholder content | `WorkCards` thumbnails are `""`; `about/team` is empty; `README.md` is the create-next-app template. |
| Effect hygiene | `FallingText` rAF not cancelled; `Header` scroll effect re-subscribes on every scroll step (depends on `lastScrollY`). |

## 15. Architecture Invariants

Unless explicitly requested, preserve: route structure, page purpose, dark/light mode mechanism, existing navigation, existing animation intent, component responsibilities, responsive breakpoints (as authored), public asset paths, current framework, current package ecosystem.