# ARCHITECTURE — Portfolio AI Agent Architecture

> v3. Architecture intent is unchanged from v1/v2; this revision updates the file map, component inventory, styling stack, dependency list, deployment target and known debt to match the repository as it exists now (repomix snapshot, Oct 2026). Notable changes since v2: Cloudflare Workers deployment (OpenNext), CSS-token colour system, `@theme` breakpoints, `site-container`, new `TextLoop` and `LazyMorphSlider`, `sitemap.ts` / `robots.ts`, site-wide SEO metadata + JSON-LD, rebuilt `WorkCards`/`About`/`Contact`/`Header`/`Footer`.

## 1. Architecture Overview

Next.js App Router (Next 15.5, React 19, TypeScript strict, Tailwind CSS 4), deployed to **Cloudflare Workers** through `@opennextjs/cloudflare`.

```text
app/
├── about/
│   ├── page.tsx              # portrait + ARIA tabs, inline <style> (client)
│   └── team/page.tsx         # empty scaffold, not linked, not in sitemap
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
│   ├── MorphSlider/LazyMorphSlider.tsx   # next/dynamic + IntersectionObserver wrapper
│   ├── PixelTransition/PixelTransition.tsx
│   ├── TextLoop/TextLoop.tsx             # SVG textPath ribbon (GSAP)
│   ├── TextPressure/TextPressure.tsx
│   └── WorkCard/workcard.tsx
├── contact/page.tsx          # server
├── services/page.tsx         # client, GSAP + ScrollTrigger
├── posts/data.ts             # blog content (4 posts)
├── fonts/                    # Geist woff files (unused)
├── favicon.ico
├── globals.css               # tokens, @theme breakpoints, @plugin, site-container
├── layout.tsx                # shell, metadata, JSON-LD, first-paint theme script
├── page.tsx                  # home (server component composing client components)
├── robots.ts                 # MetadataRoute.Robots
└── sitemap.ts                # MetadataRoute.Sitemap

public/assets/img/            # logos, portraits, slider images, project thumbnails, toggle icons
.claude/skills/frontend-design/   # project-local skill (pinned in skills-lock.json)
AGENTS.md  DESIGN.md  ARCHITECTURE.md  PRD.md  task.md
next.config.mjs  postcss.config.mjs  tailwind.config.js (dead, see §2C)  tsconfig.json  global.d.ts
open-next.config.ts  wrangler.jsonc  skills-lock.json
```

Generated, not source: `.next/`, `.open-next/` (gitignored), `.wrangler/` (**not** gitignored, see §14).

Component-oriented: page-level composition in `app/**/page.tsx`; reusable interactive UI in `app/components/**`. Path alias `@/*` → repo root (`./*`).

### Document hierarchy

| Question | Authority |
|---|---|
| What is in scope / what is a non-goal? | `PRD.md` |
| How is the code structured, what may be added? | `ARCHITECTURE.md` (this file) |
| What should it look like and how should it move? | `DESIGN.md` |
| How does the agent work (skills, cost, QA, reporting)? | `AGENTS.md` |
| What is currently being worked on / checked off? | `task.md` |

Conflict order: **explicit user request → DESIGN.md / ARCHITECTURE.md rules → skill defaults**. A skill's default taste never overrides `DESIGN.md`.

## 2. Architectural Layers

### Layer A — App / Routing

Route entry points, page composition, layouts, metadata, navigation, SEO files.

- `app/page.tsx`, `app/about/page.tsx`, `app/about/team/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`.

Shell (`layout.tsx`): `<html lang="en" suppressHydrationWarning>` with the first-paint theme script in `<head>`; `<body class="font-mono … flex min-h-dvh flex-col">` containing JSON-LD, `<Header/>`, **`<main class="w-full min-w-0 flex-1 overflow-x-clip">{children}</main>`**, `<Footer/>`. Because the layout already provides `<main>`, pages should not add another one (currently About, Contact, Blog and `blog/layout.tsx` do, see §14).

Rule:
> Page files compose features. Avoid putting large reusable interactive systems directly into page files.

(Current exceptions: `services/page.tsx` holds its data, animation and layout in one file; `about/page.tsx` holds its content, tab logic and a CSS string in one file. Acceptable for single-use pages; do not copy the pattern for reusable pieces.)

### Layer B — UI Components

Live under `app/components/`. Note the **file-name casing is inconsistent** (`header.tsx`, `footer.tsx`, `contact.tsx`, `workcard.tsx` are lowercase; the animation components are PascalCase). Do not rename; imports depend on it.

| Component | Role | Boundary |
|---|---|---|
| `Header` | fixed nav, route-active state, mobile menu, theme toggle, hide-on-scroll | client |
| `Footer` | brand, address, quick links, socials, year | marked client, but has no state/effects |
| `Contact` | 3 contact link-cards (WhatsApp / Gmail / Maps), staggered entrance | client |
| `WorkCards` | "Projects & Works": CSS scroll-snap carousel, placeholder fallback, CTA row | client, owns carousel state; one `matchMedia` to disable `Magnet` on mobile |
| `TextPressure` | hero variable-font typography | client, rAF gated by visibility |
| `TextLoop` | name ribbon on an SVG `textPath` | client, GSAP tween, paused off-screen/hover |
| `BlurText` | letter/word entrance | client, React Spring |
| `FallingText` | Matter.js physics text | client |
| `PixelTransition` | pixel-reveal content swap (portrait) | client, GSAP |
| `MorphSlider` | WebGL image slider (`ogl` + GSAP) | client, never imported directly by pages |
| `LazyMorphSlider` | defers `MorphSlider` (chunk + viewport) | client; **this is what `app/page.tsx` imports** |
| `Magnet` | pointer-attracted wrapper (CTA buttons) | client, rAF-throttled style writes |
| `MarkdownContent` | `marked` rendering for posts (parsed in an effect) | client |

### Layer C — Styling

- Tailwind CSS **v4** via `@tailwindcss/postcss`; entry is `app/globals.css` (`@import 'tailwindcss'`).
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — driven by the `.dark` class on `<html>`.
- **Breakpoints live in CSS**: `@theme { --breakpoint-xs: 375px; sm 640; md 768; lg 1024; xl 1440; 2xl 1920 }`. This is how v4 reads custom screens, so `xl:` = 1440, `2xl:` = 1920 and `xs:` works.
- **`tailwind.config.js` is not loaded** (no `@config` in the CSS) and is dead: its `screens` duplicate `@theme`, and its `purge` / `variants` are Tailwind v2 keys. The `tailwind-scrollbar` plugin is loaded in CSS with `@plugin 'tailwind-scrollbar'`. **Do not add `@config`** — it would define the same screens twice and load the plugin twice. Removing the dead file is a separate cleanup task.
- **Colour tokens** are CSS custom properties on `:root` and `html.dark` (`--background`, `--text-primary`, `--text-tertiary`, `--accent`, `--nav-*`, `--footer-*`, `--border`, `--muted`, `--gradient-accent`, …). `body` takes its colour and background from them; `layout.tsx` carries no colour classes any more. Full table and the list of unused tokens: `DESIGN.md` §2.
- **`site-container`** (`@utility`): `max-width: 110rem` (1760px, although its comment says 1440px), centred, `padding-inline: clamp(1rem, 4vw, 2rem)`. It is the shared width for Header, Footer, Home sections and the blog post article. Other pages still use their own horizontal padding.
- Base layer: `scrollbar-gutter: stable` on `html`, `overflow-x: clip` on `body`, `text-size-adjust: 100%`, v3-style default `border-color`.
- Custom utilities in `globals.css`: `site-container`, `text-balance`, `.scrollbar`, `.scroll-custom` (accent scrollbar using tokens).
- Not installed: `@tailwindcss/typography`. Classes `prose` / `dark:prose-invert` in the blog therefore do nothing (§14).

### Layer D — Animation

Present:
- **GSAP** — `PixelTransition`, `MorphSlider`, `TextLoop`, `services/page.tsx` (`gsap.context` + `ScrollTrigger`, with a reduced-motion branch).
- **React Spring** — `BlurText` only.
- **Matter.js** — `FallingText` only.
- **ogl** (WebGL) — `MorphSlider` only.
- **CSS** — About page (keyframes/transitions, parallax via CSS variables), Contact card entrance, WorkCards carousel (native scroll-snap), Header transitions.
- Browser APIs — `IntersectionObserver` (visibility gating, lazy load, entrance), `ResizeObserver`, `requestAnimationFrame`, pointer/touch events, `matchMedia`.

Animation ownership stays local to the component that owns the interaction. Full behaviour inventory (trigger, cleanup, reduced-motion status) is in `DESIGN.md` §6.

### Layer E — Content / Data

- Blog: `app/posts/data.ts` exports `posts` (`id, title, author, date, content` — Markdown string; 4 posts). `[slug]` pages are statically generated from it, and `sitemap.ts` reads the same array.
- Site-level SEO content lives in `layout.tsx` (`metadata`, Open Graph/Twitter, `robots`, JSON-LD `Person`). The canonical host `https://ariaaji.com` is written in several places: `layout.tsx` (`metadataBase`, `authors`, `openGraph.url`, JSON-LD), `sitemap.ts` and `robots.ts` (`SITE_URL`, overridable by `NEXT_PUBLIC_SITE_URL`). If the host changes, change it everywhere.
- Other content is **co-located in the component or page that renders it**: work list in `workcard.tsx`, pricing tiers/add-ons/process in `services/page.tsx`, bio/career/education in `about/page.tsx`, contact details in `contact.tsx`, socials and address in `footer.tsx`. Some values (address, GitHub URL, phone) exist in more than one file; the LinkedIn URL differs between `footer.tsx` and the JSON-LD.
- Do not introduce a CMS, API layer, or content abstraction unless explicitly requested. If a value must change, change it everywhere it appears.

### Layer F — Static Assets

`public/assets/img/`. Preserve paths (they are referenced by string). Do not delete or rename assets without an explicit request — including the apparent junk (`*:Zone.Identifier`, duplicate `.jpeg`/`.webp` pairs); report instead. Note that `layout.tsx` references `/og-image.png`, which is **not** in the repo (§14).

## 3. Client vs Server Components

Default: server where no interactivity is required; `"use client"` only for state, effects, browser APIs, gestures, or animation libraries.

Current reality worth knowing:
- **Server:** `app/layout.tsx`, `app/page.tsx` (composes client components and instantiates the Roboto Flex font), `contact/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `blog/layout.tsx`, `robots.ts`, `sitemap.ts`.
- **Client:** `about/page.tsx`, `services/page.tsx`, `Header`, `Footer`, `Contact`, `WorkCards`, `LazyMorphSlider`, `MarkdownContent`, and every animation component.

Do not convert client components to server components if they depend on `window`, `document`, `localStorage`, event listeners, animation libraries, or observers. Do not convert server pages to client just to add a small effect — extract a client leaf instead. (`Footer` is the one component that could safely drop `'use client'`; leave it unless you are editing it for another reason.)

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

`gsap.matchMedia()` when behavior differs by breakpoint. Register plugins (`ScrollTrigger`) once, where used. `TextLoop` uses a bare `gsap.to` on a plain object and kills it in cleanup; that is acceptable for a single tween, but prefer `gsap.context` for anything with more than one tween.

### React Spring / Matter.js / ogl
Keep where they already live. Do not migrate React Spring → GSAP for stylistic consistency. Use Matter.js only for physics interactions (`FallingText`). `ogl` exists solely for `MorphSlider`; do not reach for WebGL elsewhere.

### requestAnimationFrame
Only where continuous updates are truly required. Every loop must have cleanup, stop on unmount, avoid needless DOM writes, and stop when not visible. `TextPressure`, `MorphSlider` and `TextLoop` already gate on `IntersectionObserver`; copy that pattern.

## 5. Animation Performance

Prefer `transform`, `opacity`, CSS variables. Be careful with width/height/top/left animation, filters, large DOM counts, continuous canvas/physics/WebGL loops. For GSAP: revert owned animations on cleanup, use scoped refs over global selectors, never create duplicate timelines per render.

Performance-related structure that exists and must not regress:
- `MorphSlider` is code-split and mounted only near the viewport (`LazyMorphSlider`), with a same-colour placeholder; DPR capped at 1.5.
- The hero font is self-hosted by `next/font` (declared in `app/page.tsx`), not fetched from Google at runtime.
- `Magnet` writes styles directly (no React state per `mousemove`).
- `TextPressure` / `TextLoop` / `MorphSlider` stop their loops when off-screen; reduced-motion users get a static state.

Remaining hot spots (see `DESIGN.md` §12): home mounts both hero variants (7 `TextPressure` instances, one set idle); `FallingText` runs a Matter.js simulation; `Montserrat_Alternates` is instantiated in the root layout without being used (extra font work on every route); `MarkdownContent` parses on the client.

## 6. Responsive Architecture

Tailwind breakpoints first (defined in `globals.css` `@theme`); no JS breakpoint state when CSS can do it. JS media checks are acceptable when animation logic or interaction model genuinely differs, or a library needs runtime dimensions. Existing JS width checks: `WorkCards` (`matchMedia("(max-width: 639px)")`, only to disable `Magnet`), `TextPressure` (`innerWidth` font-size fallback table). `WorkCards` reads card width from the DOM so the carousel follows CSS breakpoints. For GSAP animation, prefer `gsap.matchMedia()` over manual resize listeners.

## 7. Dark Mode

Mechanism (preserve):
1. Inline `<script>` in `<head>` of `layout.tsx` sets/removes `.dark` on `<html>` **before first paint** from `localStorage.theme` or `prefers-color-scheme`.
2. `Header` owns the toggle: it flips `.dark` on `<html>` and writes `localStorage.theme`. It keeps **no** theme state; the sun/moon icon is chosen by CSS (`dark:hidden` / `hidden dark:block`).
3. Tailwind `dark:` variants via the `@custom-variant` above, and colour **tokens** redefined under `html.dark` in `globals.css` (so token-based colours switch with no JS).
4. `TextPressure` and `TextLoop` colour themselves through CSS (`var(--text-primary)` / `html.dark …` selectors); there is no MutationObserver any more.

The old `resetToSystemPreference` helper and the `prefers-color-scheme` CSS variables no longer exist. When touching theme behavior: preserve first-paint behavior, system preference, manual preference; test both modes with a hard refresh.

## 8. Navigation

`Header` owns route navigation, active-route state, mobile menu state, dark-mode toggle, and hide-on-scroll. There is one `NAV_LINKS` array — **About, Services, Contact, Blog** — used by both the desktop nav and the mobile menu; the footer lists the same four. Do not duplicate these concerns in pages. Do not add or remove links without a request. `/about/team` is not linked and not in the sitemap.

## 9. Component Boundaries

Create a new component when UI is reused, interaction has meaningful internal state, animation has an independent lifecycle, or page logic becomes hard to read. Not solely to reduce line count. Do not create speculative wrappers, hooks, or utilities. (`LazyMorphSlider` is an example of a justified wrapper: it owns an independent lifecycle — chunk loading plus visibility.)

## 10. Data Boundaries

Static content stays static unless dynamic behavior is required. Do not introduce state-management libraries, API layers, databases, a CMS, or abstraction frameworks without an explicit requirement.

## 11. Dependency Policy

Installed (from `package.json`):

```text
runtime : next ^15.5.24, react ^19.1, react-dom ^19.1, gsap ^3.12, @react-spring/web ^10.1,
          matter-js ^0.20, ogl ^1.0, marked ^15, dompurify ^3 (installed, not imported),
          tailwind-scrollbar ^4, @opennextjs/cloudflare ^1.20
types   : @types/dompurify, @types/matter-js, @types/node ^20, @types/react, @types/react-dom
tooling : tailwindcss ^4, @tailwindcss/postcss ^4, postcss, typescript ^5.8, wrangler ^4
scripts : dev, build, start, lint (next lint), debug,
          preview (opennextjs-cloudflare build && … preview),
          deploy  (opennextjs-cloudflare build && … deploy),
          cf-typegen (wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts)
```

Before adding a dependency: (1) can existing tools solve it? (2) can native CSS/DOM? (3) can GSAP / React Spring / Matter.js / ogl already do it? (4) only then add — with a stated concrete benefit. Adding `@tailwindcss/typography` for the blog `prose` classes would be a legitimate (but separate) request.

Tooling caveats:
- `lint` is `next lint`, deprecated in Next 15.5, and there is no ESLint config in the repo. Do not present it as a working gate; report the limitation.
- `npm run build` verifies the Next build only. Anything that touches runtime APIs, `next.config.mjs`, `wrangler.jsonc`, `open-next.config.ts`, or server-side code should also be checked with `npm run preview` (builds the Worker bundle and runs it locally). `npm run deploy` is **user-initiated only**.

## 12. Framework-coupled Surface

For anyone reading or porting this code, these are the places that depend on Next.js (or on the Cloudflare adapter). Everything else (components' logic, Tailwind classes, GSAP/Spring/Matter/ogl code, data files) is plain React + CSS.

| Next-specific API | Where | Porting note |
|---|---|---|
| `next/link` | Header, Footer, WorkCards, home CTA, about, blog pages | `<a>` / router `Link` |
| `next/image` | Header theme toggle | plain `<img>` (everything else already is) |
| `next/navigation` (`usePathname`, `notFound`) | Header, blog `[slug]` | router `useLocation` / 404 route |
| `next/font/google` | `layout.tsx` (JetBrains Mono, unused Montserrat Alternates), **`app/page.tsx`** (Roboto Flex → `--font-roboto-flex`) | self-host both; `TextPressure` expects the `--font-roboto-flex` variable |
| `next/dynamic` | `LazyMorphSlider` | `React.lazy` + `Suspense`; keep the IntersectionObserver gate |
| `Metadata` export, `generateMetadata`, `generateStaticParams` | `layout.tsx`, blog `[slug]` | `<head>` management / prerender list |
| `MetadataRoute` files | `robots.ts`, `sitemap.ts` | emit static `robots.txt` / `sitemap.xml` |
| App Router file conventions (`layout.tsx`, `page.tsx`, `[slug]`) | all routes | route table |
| Server components (no directive) | home, contact, blog list/post | render as normal components |
| `process.env.NEXT_PUBLIC_SITE_URL` | `robots.ts`, `sitemap.ts` | build-time env |
| `@opennextjs/cloudflare`, `wrangler.jsonc`, `open-next.config.ts` | deployment only | no component depends on it |

Font and theme first-paint logic (`layout.tsx` inline script) is the other framework-adjacent piece: it must run before hydration in whatever host is used. The `html.dark` token overrides and `site-container` live in `globals.css` and port as-is.

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
Final verification   (build; preview when runtime/deploy surface changed)
```

Caveman is the default entry point. Specialist skills are invoked only when their domain is materially involved. Skills discovered project-locally live in `.claude/skills/` (currently `frontend-design`).

## 14. Known Structural Debt (report, don't fix unasked)

| Item | Detail |
|---|---|
| `blog/layout.tsx` placeholder | Named `AdminLayout`, renders a literal "Admin Layout" `<header>` inside its own `<main>` on every blog route. Visible bug. |
| Nested `<main>` | `layout.tsx` wraps children in `<main>`; About, Contact, Blog and `blog/layout.tsx` each add another. Invalid landmark structure. |
| Canonical URL | Root `metadata.alternates.canonical` is `"/"`. Pages that do not set their own `alternates` inherit it, so every route may declare the home page as canonical. Verify with view-source on `/blog/1`; fixing it (per-page canonical) is its own task and affects search indexing. |
| Missing OG image | `openGraph.images` and `twitter.images` point to `/og-image.png`; no such file exists in the repo, so link previews get a 404. |
| Language / locale | `<html lang="en">` while `openGraph.locale` is `id_ID`, the description is Indonesian, and Services copy is Indonesian. |
| Inconsistent identity data | LinkedIn URL differs between `footer.tsx` and the JSON-LD; Instagram appears only in JSON-LD; the host URL is repeated in several files. |
| Per-post metadata | `generateMetadata` in `[slug]` sets only `title` (no description, OG, or canonical per post). |
| `params` typing in `[slug]` | `generateMetadata`/page use `params: any` and read it synchronously; Next 15 types `params` as a `Promise` and sync access is deprecated. Works today; fix when touching the file. |
| `MarkdownContent` | Parses Markdown in `useEffect`, so the post body is empty in the server-rendered HTML (SEO and no-JS readers see no article text). `DOMPurify` is installed but not used; content is static and trusted today, but sanitize if it ever becomes user-supplied. `prose` classes have no typography plugin behind them. |
| Tailwind config | `tailwind.config.js` is dead (not loaded; v2-era keys). See §2 Layer C. |
| `.gitignore` | `.wrangler/` is not ignored (its `state/…/*.sqlite*` files appear in the repo tree); the last line `.open-next` has no trailing newline. |
| Dead/leftover code | Unused `Montserrat_Alternates` and `--font-mono`, unused `app/fonts`, unused `dompurify` dependency, commented-out blocks in `blog/page.tsx`, `contact/page.tsx`, `Contact/contact.tsx`, `about/page.tsx`, `services/page.tsx`, `workcard.tsx`, unnecessary `'use client'` in `Footer`, `<a href="/">` instead of `Link` in `Footer`. Clean only in files you are already editing. |
| Placeholder content | WorkCard "Titis" has no thumbnail or link; `about/team` is empty; `README.md` is the create-next-app template. |
| Effect hygiene | Resolved since v2: `FallingText` rAF now cancelled; `Header` scroll effect subscribes once; `Magnet` no per-move state. Still open: no reduced-motion handling in `BlurText`, `FallingText`, `PixelTransition`, `Magnet`, Header. |

## 15. Architecture Invariants

Unless explicitly requested, preserve: route structure, page purpose, dark/light mode mechanism, existing navigation, existing animation intent, component responsibilities, responsive breakpoints (as authored in `@theme`), public asset paths, current framework, current package ecosystem, **the SEO surface (metadata, `sitemap.ts`, `robots.ts`, JSON-LD, canonical host) and the Cloudflare/OpenNext deployment configuration**.