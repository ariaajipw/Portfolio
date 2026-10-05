# DESIGN SYSTEM — Portfolio

> **Status of this document:** v3, re-derived from the current codebase (repomix snapshot, Oct 2026), not from intent.
> v2 described an earlier state of the repo. Since then the colour system moved to CSS tokens, the Home / About / Contact / WorkCards / Header / Footer were reworked, `TextLoop` and `LazyMorphSlider` were added, and breakpoints moved into `@theme`. This version describes what the code renders **today**.
> Sections marked **As-built** describe what exists. Sections marked **Rule** are constraints for future work.
> Where the two disagree, **As-built wins for "what exists"**, **Rule wins for "what to do next"**. Never "fix" an As-built item unless the task asks for it (see §13).
> Contrast ratios and class names below were computed/read from the source, not measured in a browser.

---

## 1. Design Intent

A personal front-end developer portfolio that feels *made by a person*, not assembled from a SaaS template.

Core qualities:
- expressive, variable-axis typography as the memorable moment (the hero);
- monospace body voice;
- warm two-mode palette (cream ↔ deep navy) with **one** coral accent;
- editorial split layouts, generous whitespace;
- interactive motion that responds to the visitor (pointer, hover, touch, scroll), not motion that plays on its own;
- experimental but usable, responsive first.

Craft is communicated through details, not decoration. **Spend the boldness in one place: the hero.** Everything around it stays quiet.

---

## 2. Visual Foundation (As-built)

### 2.1 Palette — now token-driven

Colours are CSS custom properties in `app/globals.css` (`:root` for light, `html.dark` for dark). `<body>` in `layout.tsx` no longer carries colour classes; `globals.css` sets `body { color: var(--text-primary); background-color: var(--background); }` with a 180 ms colour transition.

| Role (vocabulary) | Token | Light | Dark | Where it appears |
|---|---|---|---|---|
| **canvas** | `--background` (also `--surface`) | `#EDDBB5` cream | `#1B3E5C` navy | page background |
| **ink** (default text) | `--text-primary` (= `--foreground`) | `#488067` green | `#F2B138` gold | default body text, `TextPressure`, `TextLoop`, header brand label, footer brand name |
| **hard ink** | `--text-tertiary` | `#000000` | `#FFFFFF` | footer text, hover fill of the CTA; `about/page.tsx` also forces `text-black dark:text-white` on its `<main>` |
| **accent** | `--accent` | `#FA6B48` coral | `#FA6B48` coral | hover/active nav, CTA fill, name + role line on Home, card titles, tab pill, ribbon, scrollbar thumb, carousel dot |
| **chrome — header** | `--nav-background` / `--nav-text` | `#FDFBF7` / `#000` | `#0a0a0a` / `#FFF` | Header, mobile menu |
| **chrome — footer** | `--footer-background` | `#FDFBF7` | `#0a0a0a` | Footer |
| **theme toggle** | `--nav-toggle-bg / -text / -hover-text` | `#000 / #FFF / #4B5563` | `#FFF / #000 / #D1D5DB` | square toggle button |
| **hairline** | `--border` | ink @ 20% | gold @ 20% | footer rules, scrollbar track |
| **muted** | `--muted` | ink @ 65% | gold @ 65% | footer copyright |
| **accent gradient** | `--gradient-accent` | `#FA6B48 → #FACC15` | `#FACC15 → #FA6B48` | theme-toggle hover only |
| **inverted surface** | (literal classes) | `bg-gray-900` (WorkCards) · `bg-black` (Contact, Services) | `bg-white` (WorkCards, Contact) · `bg-[#FDFBF7]` (Services) | cards; accent used for titles/pills on top of it |
| **pixel** | (literal) | `#D2D2D4` | same | `PixelTransition` overlay; idle face `#09090b` |
| **slider** | (literal) | `#0c0c0e` | same | `MorphSlider` / `LazyMorphSlider` background and placeholder |

Components that sit on the canvas but are written with **literal** hex instead of tokens: WorkCards placeholder/image wells and focus-ring offsets (`#EDDBB5` / `#1B3E5C`), About portrait well, Contact/WorkCards/About accent (`#FA6B48`). Keep new work on the tokens where one exists; do not mass-convert existing literals unasked.

**Important characteristics of the current system**
1. There are still **three surface systems**: *canvas* (cream/navy), *chrome* (header/footer: warm off-white `#FDFBF7` ↔ `#0a0a0a`, no longer pure white), and *inverted cards*. The inverted family is **not uniform**: WorkCards use `gray-900`, Contact and Services use `black`, and in dark mode Services uses `#FDFBF7` while the others use `white`. Treat this as the current look; do not "harmonize" it unasked.
2. Dark mode is class-based (`.dark` on `<html>`), and the tokens now follow that class (the old `prefers-color-scheme` variables are gone; `color-scheme` is set per mode). The first-paint script in `layout.tsx` is what sets the class.
3. The earlier near-accent strays (`#CA6B48`, `#EA6B48`) and the `colorCycle` array are gone from `app/page.tsx`. The canonical accent is `#FA6B48`. `TextPressure` still *supports* a `colorCycle` prop, but Home does not use it.
4. **Defined but unused tokens** (no `var(--…)` reference in `app/`): `--surface`, `--surface-elevated`, `--text-secondary`, `--card-background`, `--input-background`, `--focus-ring`, `--interactive-hover`, `--footer-text`, `--footer-muted`, `--footer-border`, and the `--font-mono` variable. Do not assume they are wired up; either use them deliberately or leave them.

### 2.2 Measured contrast (WCAG 2.x, computed from the real values)

| Pair | Ratio | Verdict |
|---|---|---|
| ink on canvas, light (`#488067` / `#EDDBB5`) | **3.38** | fails AA for small text; passes only the large-text threshold |
| ink on canvas, dark (`#F2B138` / `#1B3E5C`) | 5.88 | AA |
| hard ink on canvas (black / cream) | 15.4 | AAA |
| hard ink on canvas (white / navy) | 11.1 | AAA |
| accent on canvas, light (`#FA6B48` / `#EDDBB5`) | **2.12** | fails, even for large text |
| accent on canvas, dark (`#FA6B48` / `#1B3E5C`) | 3.84 | large text only |
| accent on header, light (`#FA6B48` / `#FDFBF7`) — active/hover nav, footer hover | **2.80** | fails AA |
| accent on header, dark (`#FA6B48` / `#0a0a0a`) | 6.85 | AA |
| ink on header/footer, light (`#488067` / `#FDFBF7`) — brand label, footer name | 4.46 | AA for large/bold; borderline for small |
| `--muted` on footer, light (ink @ 65% on `#FDFBF7`) — copyright line | **2.44** | fails |
| black on accent (CTA label, light mode) | 7.26 | AAA |
| **white on accent (CTA label in dark mode: `dark:text-white`)** | **2.89** | **fails AA** |
| accent on black / on `gray-900` (card titles) | 7.26 / 6.13 | AAA |
| `gray-950` on white (dark-mode card titles) | ≈19 | AAA |
| `gray-500` on navy (blog date, dark) | **2.30** | fails |

**Rule:** accent works best as a **fill or border with black text on it**, or as text **on black/near-black**. Do not introduce *new* small accent-coloured text on the light canvas or on the light header. Do not put white text on an accent fill in new work (the existing `dark:text-white` CTAs are debt D3, not a pattern). Long-form or small copy on the canvas should use *hard ink*, not *ink*.

### 2.3 Colour usage rules

Use accent for: active/hover navigation, primary CTA fill, selected states (carousel dot, active tab pill), titles/pills on inverted cards, small icons, the ribbon, scrollbar thumb.
Do not turn whole sections, backgrounds, or body text into accent.
Do not add a second accent. Do not introduce gradients as decoration (the only gradient is the theme-toggle hover; leave it).

---

## 3. Typography (As-built)

| Voice | Family | How it is loaded | Used for |
|---|---|---|---|
| **Body / UI** | JetBrains Mono | `next/font/google` in `layout.tsx`, `weight: "400"` only, one instance; `className` on `<body>` | everything by default |
| **Hero display** | Roboto Flex (variable: `opsz`, `wdth`; `wght` automatic) | `next/font/google` in **`app/page.tsx`**, exposed as `--font-roboto-flex` on the hero `<section>`; `TextPressure` reads `var(--font-roboto-flex), "Roboto Flex"` | the "Combine Ideas, Craft & Innovate" hero only |

Facts to know before touching type:
- The hero font is **self-hosted by `next/font`** and preloaded only on `/`. The old runtime `@import` of a Google Fonts URL inside `TextPressure` is no longer used (`fontUrl` defaults to `""`). Do not bring it back.
- Only weight **400** of JetBrains Mono is loaded, so `font-bold` / `font-semibold` render as **browser-synthesized bold** (used heavily: About, Contact, Blog, WorkCards titles). Real bold means loading a weight range — a deliberate change, not a drive-by.
- `layout.tsx` still instantiates `Montserrat_Alternates` **without using it** (its variable is on `<html>`), and `--font-mono` is exposed but unreferenced. `app/fonts/Geist*.woff` are unused. Do not reintroduce Montserrat Alternates or Geist.
- Roboto Flex only exists on the hero. Do not spread it into body copy.

Scale in use:
- Hero: driven by `TextPressure` (`minFontSize={36}`; component also has a width-based fallback table).
- Name ribbon: `TextLoop` `fontSize={50}` in a 1200×150 SVG viewBox (scales with container width), weight 600, letter-spacing 9.
- Name: `text-[clamp(30px,7vw,83px)]`. Role line: `clamp(20px,4vw,32px)`.
- Page statement (contact/blog): `text-xl → md:2xl → lg:3xl → xl:4xl → 2xl:5xl`, `leading-[150%]`.
- About body: `clamp(15px, 0.9vw + 11px, 24px)` at `leading-[170%] lg:leading-[200%]`, `max-w-[65ch]`; tabs `clamp(14px, 0.5vw + 11px, 20px)`.
- WorkCards: section title `text-3xl sm:4xl lg:5xl` with `tracking-[-0.05em]`; card title `text-xl`; card body `text-xs sm:text-sm`.
- Home body: `text-sm lg:text-lg`.

**Rule:** new type scales use `clamp()` or the existing responsive steps; no fixed pixel sizes that can overflow at 375px. Keep line lengths under ~80 characters for body copy. Sentence case for UI copy; do not add ALL-CAPS eyebrow labels or numbered markers unless the content is truly a sequence (Services "Proses Kerja" is; nothing else is).

---

## 4. Layout (As-built + Rule)

### 4.1 Global shell
```text
<html class="dark?"  scrollbar-gutter: stable>
  <body class="font-mono flex min-h-dvh flex-col"  overflow-x: clip>
    <Header/>                       fixed
    <main class="w-full min-w-0 flex-1 overflow-x-clip">  {children}  </main>
    <Footer/>                       mt-auto
```
- **`site-container`** (`@utility` in `globals.css`): `width:100%; max-width:110rem; margin-inline:auto; padding-inline: clamp(1rem, 4vw, 2rem)`. Used by Header, Footer, the Home sections and the blog post article. Its comment says "1440px" but `110rem` is **1760px**; the real cap is 1760px.
- Pages that do **not** use it and keep their own horizontal padding: About (`px-[20px] xl:px-[100px] 2xl:px-[150px]`), Contact and Blog (`px-[20px] xl:px-[100px] 2xl:px-[220px]`), Services (`container mx-auto px-4`), WorkCards (`px-5 sm:px-8 lg:px-12 xl:px-20` inside `max-w-[1500px]`). So two width systems coexist. Do not "unify" unasked.
- Because the layout already wraps `{children}` in `<main>`, About, Contact, Blog (and `blog/layout.tsx`) render a **nested `<main>`** (D9).

### 4.2 Home composition
```text
hero-section   site-container  min-h-dvh  pt-15   TextPressure (5 lines stacked <sm, 2 lines ≥sm)
img-section    my-10  full-bleed
                 MorphSlider via LazyMorphSlider  h-[550px] md:h-[800px]  (WebGL "melt", autoplay 6s)
                 Name ribbon: TextLoop (wave, reverse, speed 90, ribbon #FA6B48, pause on hover)
second-section site-container  12-col grid at lg
                 copy + BlurText "Aria Aji" + FallingText "Front-end Developer" + Magnet CTA  |  PixelTransition portrait (order-first on mobile)
third-section  site-container  WorkCards ("Projects & Works")
```
- `LazyMorphSlider`: `next/dynamic` (`ssr:false`) and mounted only when within 400px of the viewport (IntersectionObserver). The wrapper has the slider's own colour (`#0c0c0e`) so there is no layout shift. Keep it lazy; the slider is below the fold.
- Hero uses Tailwind v4 numeric spacing (`pt-15`, `my-25`, `lg:mt-50`, `lg:mb-70`); these are valid in v4 and not typos.
- The Home CTA is centred with `flex justify-center` + `w-fit` around `Magnet` — no more per-breakpoint hard-coded margins.
- The portrait is a **circular** `PixelTransition` (peacock mark ↔ photo).
- `landscape:` variants on the third section exist to keep short landscape phones from clipping; leave them.

### 4.3 WorkCards (reworked)
- Section `id="works"`: header row (title + one-line blurb), a **native scroll-snap carousel** (`snap-x snap-mandatory`, 85% basis on mobile with a peek of the next card, 2-up at `sm`, 3-up at `md`), a controls row, then a footer row ("More experiments and projects" + **"View GitHub"** pill in a `Magnet`).
- The carousel is a `role="region"` with `aria-roledescription="carousel"`, `tabIndex=0` and ←/→ key handling; slides are `role="group"`. No autoplay. Dots + arrows only render when there is more than one "page"; dots have a 44px hit height. Wrap-around: next at the end jumps to the first, prev at the start jumps to the last.
- Card: inverted surface, thumbnail well (`aspect-[1.35/1]`), accent category pill, year, title, description. Real thumbnails exist for Kovsen, Hubton, Chain Peek; **Titis has none** and, like any broken image, falls back to `ProjectPlaceholder` (cream/navy well with grid, two circles, accent dot, category + title). Cards with an `href` open in a new tab; Titis has no link and renders as a non-interactive `<article>`.

### 4.4 Other routes
- **About** — split layout: **portrait on the left** (sticky from `sm`, clip-path reveal on load, hover/pointer + scroll parallax on photo and an accent offset frame), **tabs on the right**. Four tabs (Bio / Career / Academy / Open Source) with a **sliding accent pill** as the active indicator (active tab text is black on accent; inactive is 70% opacity). Panels share one grid cell so height is stable; items rise in sequence; bio sentences get an accent underline sweep, hover fills them. Full ARIA tablist with ←/→/↑/↓/Home/End. Page `<main>` uses `min-h-dvh`.
- **Contact** — statement + three inverted cards (**Phone → WhatsApp, Email → Gmail compose, Address → Google Maps**), now real `<a target="_blank" rel="noopener noreferrer">` links in a `<ul>`. Cards stagger in once when scrolled into view; hover/focus fills with accent and black text; visible `focus-visible` outline. Still `md:h-screen`.
- **Blog** — post list as double-bordered cards inside a `scroll-custom` scroll area (`h-full overflow-y-auto`), accent fill on hover with black text. Still `h-screen`. Post page: `site-container max-w-4xl`, `prose dark:prose-invert` (see D13: the `prose` classes have no plugin behind them).
- **Services** — pricing cards (inverted, GSAP + ScrollTrigger entrance), add-ons as divided rows, numbered process, WhatsApp CTAs. Indonesian copy. Now reachable from the **desktop nav, mobile nav and footer**.
- **About/Team** — empty scaffold, not linked, not in the sitemap.

### 4.5 Rules
- Stacked on small screens, split on larger ones; never force a desktop grid onto 375px.
- Prefer `min-h-dvh` over `h-screen`. About already does; Contact (`md:h-screen`), Blog (`h-screen`) and Team still use the old form and can clip or double-scroll on short or 16:10 screens — verify if touched.
- Large screens (1440+): use extra width for whitespace and controlled max-widths, not bigger everything.
- New page-level sections should use `site-container` unless the page is deliberately on the older padding steps.

---

## 5. Responsive Rules

Breakpoints (defined in `globals.css` `@theme`): `xs 375 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920`.

- **This is how they are defined today.** Tailwind v4 reads them from `--breakpoint-*` inside `@theme`; `tailwind.config.js` is **not loaded** (no `@config` in the CSS) and is effectively a dead file. Its `screens` match the `@theme` values, and its `purge` / `variants` keys are Tailwind v2 leftovers that v4 ignores. So `xl:` switches at 1440, `2xl:` at 1920, and `xs:` classes work.
- `tailwind-scrollbar` is loaded through `@plugin 'tailwind-scrollbar'` in the CSS, not through the config file.
- Do **not** add `@config` back "to be safe": it would define the same screens twice and load the scrollbar plugin twice. If the dead file is removed, that is its own cleanup task.
- v4 default-theme utilities still apply where no override exists (spacing scale, `landscape:` variant, etc.).

Mobile (375+): readability, touch targets (WorkCards dots/arrows and About tabs are ≥44px), **no horizontal scroll**, simplified motion, stacked layout, accessible nav.
Tablet (640–1023): split layouts appear; controlled type growth; WorkCards 2-up.
Desktop (1024+): expressive composition, pointer effects (TextPressure, Magnet, FallingText hover, PixelTransition hover, About portrait parallax).
Large (1440+): whitespace and max-widths.

Prefer CSS/Tailwind for responsiveness. JS width checks that remain: `WorkCards` (`matchMedia("(max-width: 639px)")`, only to disable `Magnet`) and `TextPressure` (`innerWidth` font-size fallback). Do not add more.

---

## 6. Motion (As-built inventory + Rule)

Motion hierarchy: **1** page/section entrance → **2** hero typography → **3** interactive feedback → **4** navigation transitions → **5** decoration. Decoration never competes with the hero.

| Component | Tech | Trigger | Cleanup | Reduced motion | Notes |
|---|---|---|---|---|---|
| `TextPressure` | rAF loop, mouse/touch/scroll listeners | pointer or scroll "kick" | ✅ rAF, listeners, observer | ✅ listeners not attached; one static frame | Loop runs **only while visible** (IntersectionObserver). Home mounts both hero variants (5 + 2 instances) and hides one with CSS, so the hidden set is idle. Colour is pure CSS (`var(--text-primary)` / `html.dark`), no MutationObserver. |
| `TextLoop` | GSAP tween on SVG `textPath` offsets | continuous | ✅ `tween.kill()`, observer, listeners | ✅ static, no tween | Pauses on hover and when off-screen. Intentional exception to "no new looping effects"; do not add a second one. |
| `BlurText` | `@react-spring/web` + `IntersectionObserver` | enters viewport | ✅ observer | ❌ none | Letter-by-letter name. Short text only. |
| `FallingText` | Matter.js engine + own rAF | `hover` (one-shot) | ✅ rAF now cancelled; render/runner stopped; world/engine cleared | ❌ none | Expensive. One instance only. |
| `PixelTransition` | GSAP (`killTweensOf`, delayed call) | hover (pointer) / click (coarse pointer) | ⚠️ tweens killed at start of each run; unmount cleanup not verified | ❌ none | Touch detection: `ontouchstart` / `maxTouchPoints` / `pointer: coarse`. |
| `MorphSlider` | `ogl` WebGL shader + GSAP | autoplay 6s (pauses off-screen / on hover), pointer drag, arrows/dots | ✅ engine destroyed, listeners removed | ✅ | DPR capped at 1.5. Lazy-loaded by `LazyMorphSlider`. Best-behaved animation component. |
| `Magnet` | window `mousemove` → rAF-throttled direct style writes | pointer near element | ✅ listener + rAF | ❌ none | **No React state per mouse move any more.** Disabled in WorkCards on mobile. |
| `WorkCards` carousel | native scroll-snap; scroll + `ResizeObserver` for dot state | swipe / arrows / dots / keys | ✅ | ✅ `scrollTo` uses `auto`; hover lift has `motion-reduce` | No autoplay, no timers. |
| `Contact` cards | CSS transition + IntersectionObserver | scroll into view (once) | ✅ observer | ✅ `motion-reduce` classes | Staggered 120ms steps. |
| About page | CSS keyframes/transitions; pointer + scroll parallax via CSS variables | tab click, hover, pointer, scroll | ✅ | ✅ CSS media query + JS guard | Only `transform` / `opacity` / `background-size` / `clip-path`. |
| Services page | GSAP + `ScrollTrigger` in `gsap.context` | scroll | ✅ | ✅ shows final state | **Reference implementation** for scoped context + reduced motion. |
| Header | CSS transform/background transitions | scroll direction | ✅ | ❌ none | rAF-throttled scroll handler, single stable subscription. |

**Rules**
- Every substantial animation system needs a reduced-motion strategy: skip heavy timelines, show the final state, never leave content invisible. Copy the Services / About pattern.
- Prefer `transform` and `opacity`; scope GSAP with `gsap.context()` and `ctx.revert()`; use `gsap.matchMedia()` for breakpoint variants.
- Loops must stop when off-screen (see `TextPressure`, `TextLoop`, `MorphSlider`).
- Do not add new continuous/looping effects. Do not add fade-and-slide-up to every section — one orchestrated moment beats scattered reveals.
- Do not duplicate a Matter.js simulation.
- Do not migrate React Spring (`BlurText`) or Matter.js (`FallingText`) to GSAP for consistency.

---

## 7. Component Patterns (As-built)

**Primary CTA (pill)** — `rounded-full bg-[var(--accent)] text-black dark:text-white`, hover inverts to `bg-[var(--text-tertiary)]` with accent text; wrapped in `Magnet`; centred by a `flex justify-center` parent with a `w-fit` child. WorkCards' "View GitHub" is the same pill with `min-h-11 px-6 py-3` and explicit focus rings. (The `dark:text-white` label is debt D3.)

**Inverted card** — `bg-gray-900|black dark:bg-white|#FDFBF7`, text flips, accent for title and category pill. Contact: hover/focus **fills accent with black text**. WorkCards: lifts 4px on hover. Services: no hover fill.

**Nav link** — `text-[var(--nav-text)]`, hover accent + underline; active route = accent + underline + medium weight. Services is now a normal nav item.

**Theme toggle** — square (`rounded-xl`) button using the `--nav-toggle-*` tokens, accent border, `--gradient-accent` on hover. The sun/moon icon is swapped purely with `dark:hidden` / `hidden dark:block`; no JS state, so it is correct on first paint.

**Carousel controls (WorkCards)** — 44px outlined round arrows with SVG chevrons (accent fill on hover), dot buttons 44px tall with an 8px dot; active dot = accent and elongated (`w-6`).

**Tabs (About)** — pill buttons (`min-h-[44px]`, `rounded-full`), sliding accent indicator measured from the active button (ResizeObserver + `document.fonts.ready`), inactive at 70% opacity.

**Scrollbar** — `.scroll-custom`: 8px, thumb `var(--accent)`, track `var(--border)`.

**Blog card** — outer `border-4 border-black dark:border-gray-600` (hover fills black / `gray-200`), inner `border-2 border-black/40 dark:border-gray-400` that fills accent on hover with black text.

**Logo** — `peacock-black.webp` / `peacock-white.webp` swapped by `dark:` classes (plain `<img>`); brand label "Aria Aji" reveals on hover, focus-within, or when the mobile menu is open. The footer shows "Perkasa Wibowo" with the logo revealed on hover. Do not "correct" either name.

**Focus** — WorkCards, Contact, About tabs/links and Services CTAs have explicit `focus-visible` rings or outlines (black in light, white in dark, offset to the canvas colour where needed). Reuse that pattern for new interactive elements.

---

## 8. Interaction & Accessibility Baseline

Every interactive element needs: visible hover on pointer devices, usable touch behaviour, keyboard focus, adequate target size (≥44px where practical), a clear active state. Never make critical information hover-only.

Known gaps (do not silently fix unrelated ones; fix in the area you are already touching):
- No explicit `:focus-visible` styling on Header links/toggle/hamburger, Footer links, Blog cards, or the Home CTA; they rely on browser defaults.
- Header mobile menu: the collapsed panel is `aria-hidden` while its links are still tabbable, and there is no Escape-to-close.
- Footer lists put `<Link>` directly inside `<ul>` (socials) without `<li>`.
- `PixelTransition` hover/click and `FallingText` hover are pointer-first; the info they carry is decorative, so keep it that way.
- Hero is pointer-driven; on touch it relies on `touchmove`. Keep the text readable at rest.
- Header nav uses `--nav-text`; the hero must stay legible under the transparent header on `/` (the header turns solid after scroll, on other routes, or when the menu opens).

---

## 9. Header, Footer (Global)

**Header** — fixed; transparent on `/` until scrolled, otherwise `--nav-background`; hides on scroll down after 100px (rAF-throttled, one stable listener; initial state computed on mount); mobile menu (`max-h-96` slide) closes on outside `mousedown` and on route change; dark-mode toggle writes `localStorage.theme`. **Nav on every breakpoint: About, Services, Contact, Blog.** Uses `site-container`. Logo images are plain `<img>`; the toggle icons use `next/image`.
**Footer** — `--footer-background`, `border-t var(--border)`, `mt-auto`; brand name + logo reveal, address, quick links (**About, Services, Contact, Blog**), socials (GitHub, LinkedIn, X), copyright with the current year. It is marked `'use client'` although it has no state or effects.

Header/Footer/`globals.css`/`layout.tsx` are **global**: any change requires checking every route (`/`, `/about`, `/services`, `/contact`, `/blog`, `/blog/[slug]`).

---

## 10. Working With the `frontend-design` Skill

The repo ships Anthropic's `frontend-design` skill (`.claude/skills/frontend-design`, pinned in `skills-lock.json`). It tells the agent to make bold, distinctive choices and explicitly lists a **warm cream background + terracotta accent** among the "default AI look" clusters to avoid. This portfolio's cream + coral is **a pinned brief, not a default the agent drifted into**. The skill itself says the brief's own words win.

Therefore:
1. This file **is the brief**. The palette in §2 and the type voices in §3 are fixed inputs, not proposals for the skill to improve on.
2. Use `frontend-design` for **new** sections/pages or a requested redesign — never for small fixes, and never to re-pick colours or fonts.
3. When the skill proposes a token plan, it must be expressed *in* the existing tokens and type voices; if a proposal contradicts §2/§3, drop the proposal.
4. The skill's own guidance that *is* compatible and should be followed: one memorable moment, restrained everything else, no template chrome (eyebrow labels, `A · B · C` meta strings, `→` on every link), sentence-case active-voice copy, quality floor (responsive to 375px, visible focus, reduced motion).

---

## 11. Visual QA Checklist

For every visual change:
- [ ] Light mode · [ ] Dark mode (toggle, then hard refresh: no colour flash)
- [ ] 375 · 768 · 1024 · 1440 (and 1920 for hero/global changes); also a 16:10 viewport (e.g. 1440×900) and a short landscape phone for anything using `h-screen` / `min-h-dvh`
- [ ] Keyboard navigation and visible focus
- [ ] Hover states (pointer) and touch behaviour (coarse pointer)
- [ ] Reduced motion (DevTools → Rendering → Emulate `prefers-reduced-motion`)
- [ ] No horizontal overflow
- [ ] No obvious layout shift (MorphSlider placeholder, carousel, fonts)
- [ ] No animation stuck after unmount / route change
- [ ] Console clean
- [ ] Contrast: new text/background pairs computed, not eyeballed (§2.2)

Route matrix for global changes: `/`, `/about`, `/services`, `/contact`, `/blog`, `/blog/<slug>`.

---

## 12. Design Debt

### Resolved since v2 (do not re-open or "fix again")
Tailwind breakpoints now come from `@theme` · colours are tokens and follow `.dark` · stray accent hexes and unused `colorCycle` removed from Home · duplicate JetBrains Mono instance removed · hero font self-hosted via `next/font` · `TextPressure` loop is visibility-gated with reduced-motion support and no MutationObserver · `FallingText` rAF is cancelled · `Magnet` no longer sets React state per mouse move · `WorkCards` rebuilt (CSS carousel, real thumbnails for 3 of 4, placeholder fallback, no timers, focus rings) · Contact cards are real links with focus styles · Services is in the desktop nav and footer · Header no longer logs to the console or re-subscribes its scroll listener · Home hero typo (`sm:block sm:hidden`) fixed to `block sm:hidden` · CTA hard-coded margins replaced by flex centring · About moved to `min-h-dvh` and gained ARIA tabs.

### Open (report; do **not** fix unasked)

| # | Item | Where |
|---|---|---|
| D1 | Light-mode ink (3.38) and accent on cream (2.12) fail contrast for small text; accent on `#FDFBF7` header (2.80) and `--muted` footer copyright (2.44) fail too; Home name and role line are accent on the canvas | `globals.css` tokens, `app/page.tsx`, `header.tsx`, `footer.tsx` |
| D2 | Three surface systems; inverted-card family not uniform (`gray-900` / `black` / `#FDFBF7`) | WorkCards, Contact, Services, chrome |
| D3 | `dark:text-white` on accent-filled CTAs = 2.89:1 | Home CTA, Services CTAs, WorkCards "View GitHub" |
| D4 | Only JetBrains Mono 400 loaded → synthesized bold; `Montserrat_Alternates` instantiated and unused; `--font-mono` unused; `app/fonts` Geist unused | `layout.tsx`, `app/fonts` |
| D5 | `tailwind.config.js` is not loaded (dead file with v2 keys); breakpoints and scrollbar plugin live in `globals.css` | `tailwind.config.js` |
| D6 | Unused tokens (`--surface*`, `--text-secondary`, `--card-background`, `--input-background`, `--focus-ring`, `--interactive-hover`, `--footer-text/-muted/-border`) and literal hex duplicating tokens | `globals.css`, WorkCards, About, Contact |
| D7 | Home mounts both hero variants (7 `TextPressure` instances, one set idle) | `app/page.tsx` |
| D8 | No reduced-motion handling in `BlurText`, `FallingText`, `PixelTransition`, `Magnet`, Header | those components |
| D9 | `blog/layout.tsx` is a placeholder that renders a literal **"Admin Layout"** `<header>` on every blog page; About/Contact/Blog (+ `blog/layout.tsx`) render a `<main>` inside the layout's `<main>` | `blog/layout.tsx`, `about`, `contact`, `blog` |
| D10 | `md:h-screen` (Contact) and `h-screen` (Blog, Team) can clip or double-scroll across 16:9 vs 16:10 and short phones | `contact/page.tsx`, `blog/page.tsx`, `about/team/page.tsx` |
| D11 | Invalid/no-op classes: `md:pt[49px]` (missing `-`), `lg:flex-1-reverse` (Contact, Blog), `mt-4]` (Footer), `text-md` (Services) | those files |
| D12 | Junk assets: `*:Zone.Identifier` files, duplicate jpeg/webp pairs | `public/assets/img` |
| D13 | `prose` / `dark:prose-invert` used on blog posts but no typography plugin is installed, so post bodies render with reset (unstyled) headings and lists; blog dates are `gray-500` on navy (2.30) | `blog/[slug]/page.tsx`, `MarkdownContent.tsx`, `blog/page.tsx` |
| D14 | Missing `focus-visible` on Header/Footer/Blog cards/Home CTA; collapsed mobile menu still tabbable; footer `<ul>` without `<li>` | Header, Footer, Blog |
| D15 | `site-container` comment says 1440px but the value is `110rem` (1760px); About/Contact/Blog/Services/WorkCards use their own widths | `globals.css` and pages |
| D16 | Large blocks of commented-out code | `blog/page.tsx`, `contact/page.tsx`, `Contact/contact.tsx`, `about/page.tsx`, `services/page.tsx`, `WorkCard/workcard.tsx` |

D9 is a visible bug rather than a taste issue; surface it whenever the blog is touched. SEO/metadata items are tracked in `ARCHITECTURE.md` §14.

---

## 13. Design Decision Rule

1. **Preserve** the as-built look unless the task asks otherwise.
2. When two implementations look equivalent, pick the one with: fewer dependencies → less runtime work → easier maintenance → better accessibility → closer to the existing architecture.
3. Report debt you notice (§12) in the final response; fix it only if it is inside the code you are already changing *and* the fix cannot alter the rendered result.
4. Do not optimize for novelty.