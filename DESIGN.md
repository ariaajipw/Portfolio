# DESIGN SYSTEM — Portfolio

> **Status of this document:** v2, rewritten from the actual codebase (repomix snapshot), not from intent.
> Sections marked **As-built** describe what the code renders today. Sections marked **Rule** are constraints for future work.
> Where the two disagree, **As-built wins for "what exists"**, **Rule wins for "what to do next"**. Never "fix" an As-built item unless the task asks for it (see §13).

---

## 1. Design Intent

A personal front-end developer portfolio that feels *made by a person*, not assembled from a SaaS template.

Core qualities:
- expressive, variable-axis typography as the memorable moment (the hero);
- monospace body voice;
- warm two-mode palette (cream ↔ deep navy) with **one** coral accent;
- editorial split layouts, generous whitespace;
- interactive motion that responds to the visitor (pointer, hover, touch), not motion that plays on its own;
- experimental but usable, responsive first.

Craft is communicated through details, not decoration. **Spend the boldness in one place: the hero.** Everything around it stays quiet.

---

## 2. Visual Foundation (As-built)

### 2.1 Palette

The palette is defined in `app/layout.tsx` on `<body>`:

```text
bg-[#EDDBB5] text-[#488067] dark:bg-[#1B3E5C] dark:text-[#F2B138]
```

| Role (vocabulary) | Light | Dark | Where it appears |
|---|---|---|---|
| **canvas** | `#EDDBB5` cream | `#1B3E5C` navy | `<body>` background |
| **ink** (default text) | `#488067` green | `#F2B138` gold | `<body>` text, `TextPressure` defaults, anything without an explicit text color |
| **accent** | `#FA6B48` coral | `#FA6B48` coral | hover/active nav, CTA fill, card titles & prices, icons, indicators, scrollbar thumb, blog-card hover |
| **hard ink** | `#000000` | `#FFFFFF` | `about`, `contact`, `blog` pages force `text-black dark:text-white` on `<main>` |
| **chrome** (header / footer) | `white` | `zinc-950` (`#09090B`) header, `#0A0A0A` footer | Header, Footer, mobile menu |
| **inverted surface** | `bg-black text-white` | `bg-white text-gray-950` | Contact cards, WorkCards, Services pricing cards; accent is used for titles/prices on top of it |
| **pixel** | `#D2D2D4` | same | `PixelTransition` overlay; its idle face is `#09090B` |

**Important characteristics of the current system**
1. There are **three surface systems** side by side: *canvas* (cream/navy, the page), *chrome* (pure white/near-black, header/footer), and *inverted cards* (black↔white). The chrome and cards do **not** take the canvas colors. Treat this as the current look; do not "harmonize" it unasked.
2. Dark mode is class-based (`.dark` on `<html>`). The `--background/--foreground` variables in `globals.css` (`#fff/#000`) follow `prefers-color-scheme`, **not** the `.dark` class, and are effectively overridden by the body classes above. Do not build new work on those two variables.
3. Near-accent strays exist and are **not** tokens: `#CA6B48` (hero name in `BlurText`), `#EA6B48` (role line wrapper), and an unused `colorCycle` array (`#212121 #C9A227 #217147 #DB7F8E #FA6B48`) on the home page. The canonical accent is `#FA6B48`. Do not copy the strays into new code; unify them only when asked.

### 2.2 Measured contrast (WCAG 2.x, computed from the real values)

| Pair | Ratio | Verdict |
|---|---|---|
| ink on canvas, light (`#488067` / `#EDDBB5`) | **3.38** | fails AA for small text; OK for large/bold only |
| ink on canvas, dark (`#F2B138` / `#1B3E5C`) | 5.88 | AA |
| hard ink on canvas (black / cream) | 15.4 | AAA |
| hard ink on canvas (white / navy) | 11.1 | AAA |
| accent on canvas, light (`#FA6B48` / `#EDDBB5`) | **2.12** | fails, even for large text |
| accent on canvas, dark (`#FA6B48` / `#1B3E5C`) | 3.84 | large text only |
| accent on white (header hover, light) | **2.89** | fails AA |
| black on accent (CTA label) | 7.26 | AAA |
| accent on black / on `#0A0A0A` (card titles, footer) | 7.26 / 6.85 | AAA |
| `#CA6B48` on cream (hero name) | 2.70 | fails; decorative display size only |

**Rule:** accent works best as a **fill or border with black text on it**, or as text **on black/near-black**. Do not introduce *new* small accent-colored text on the light canvas or on white. Long-form or small copy on the canvas should use *hard ink* (as `about`/`contact`/`blog` already do), not *ink*.

### 2.3 Color usage rules

Use accent for: active/hover navigation, primary CTA fill, selected states (carousel indicator, active tab underline), titles/prices on inverted cards, small icons, scrollbar thumb.
Do not turn whole sections, backgrounds, or body text into accent.
Do not add a second accent. Do not introduce gradients as decoration (the only existing gradient is the theme-toggle hover `#FA6B48 → yellow-400`; leave it).

---

## 3. Typography (As-built)

| Voice | Family | How it is loaded | Used for |
|---|---|---|---|
| **Body / UI** | JetBrains Mono | `next/font/google`, `weight: '400'` only, applied via `className` on `<body>` | everything by default |
| **Hero display** | Roboto Flex (variable: `opsz, wght, wdth`) | runtime `@import` of a Google Fonts URL inside `TextPressure` | the "Combine Ideas, Craft & Innovate" hero only |

Facts to know before touching type:
- Only weight **400** of JetBrains Mono is loaded, so `font-bold`/`font-semibold` render as **browser-synthesized bold**. If real bold is wanted, load a weight range (e.g. `weight: ['400','700']` or the variable font) — but that is a deliberate change, not a drive-by.
- `layout.tsx` instantiates JetBrains Mono twice (one exposes `--font-mono` on `<html>`, one is the body class) and instantiates `Montserrat_Alternates` **without using it**. `app/fonts/Geist*.woff` are also unused (`localFont` is commented out). These are leftovers, not part of the design language. **Do not reintroduce Montserrat Alternates or Geist** unless asked.
- The hero font only exists on the hero. Do not spread Roboto Flex into body copy.

Scale in use:
- Hero: driven by `TextPressure` (`minFontSize={36}` in JS; component also has a width-based fallback table 32→64px).
- Name: `text-[clamp(30px,7vw,83px)]`. Role line: `clamp(20px,4vw,32px)`.
- Page statement (contact/blog): `text-xl → md:2xl → lg:3xl → xl:4xl → 2xl:5xl`, `leading-[150%]`.
- Body: `text-sm lg:text-lg` (home); `md:text-lg lg:text-2xl` at `leading-[170%] lg:leading-[200%]` (about).

**Rule:** new type scales use `clamp()` or the existing responsive steps; no fixed pixel sizes that can overflow at 375px. Keep line lengths under ~80 characters for body copy. Sentence case for UI copy; do not add ALL-CAPS eyebrow labels or numbered markers unless the content is truly a sequence (Services "Proses Kerja" is; nothing else is).

---

## 4. Layout (As-built + Rule)

### 4.1 Shared page pattern — "split editorial"
`about`, `contact`, `blog` use the same shell:

```text
<main grid grid-cols-1 sm:grid-cols-2 items-start
      px-[20px] xl:px-[100px] 2xl:px-[220px] lg:gap-x-[30px]
      text-black dark:text-white>
  left  → statement / portrait
  right → interactive content (tabs, contact cards, post list)
```

Note the split begins at **`sm` (640px)**, earlier than "tablet". Horizontal padding steps 20 → 100 → 220px. Vertical offset for the fixed header is hard-coded per page (`py-[100px]`, `xl:pt-[120px]`, etc.).

### 4.2 Home composition
```text
hero-section   min-h-dvh   TextPressure (5-line stacked on <sm, 2-line on ≥sm)
img-section    h-[550px] md:h-[800px]   MorphSlider (WebGL, "melt", autoplay 6s)
second-section 12-col grid  intro copy + BlurText name + FallingText role + Magnet CTA  |  PixelTransition portrait
third-section  WorkCards ("Projects & Works")
```
The portrait is a **circular** `PixelTransition` (`rounded-[360px]`, 200 → 300 → 400px), peacock mark ↔ photo.

### 4.3 Other routes
- **About** — 4 text tabs (Bio / Career / Academy / Open Source); active tab = bold + underline, inactive = 30% opacity.
- **Contact** — statement + three inverted cards (Address → Google Maps, Phone → WhatsApp, Email → Gmail compose).
- **Blog** — post list as double-bordered cards, accent fill on hover, inside a `scroll-custom` scroll area. Post page: `max-w-4xl` article with `prose`.
- **Services** — the most recent page: pricing cards (inverted), add-ons as divided rows, numbered process, WhatsApp CTA. Indonesian copy. Reachable from the **mobile menu only** (commented out of desktop nav and footer).
- **About/Team** — empty scaffold, not linked.

### 4.4 Rules
- Stacked on small screens, split on larger ones; never force a desktop grid onto 375px.
- Prefer `min-h-dvh` over `h-screen` when the section must fit the visible mobile viewport. Existing `h-screen`/`md:h-screen` usages (contact, team) can clip on short landscape phones — verify if touched.
- Large screens (1440+): use extra width for whitespace and controlled max-widths, not bigger everything.

---

## 5. Responsive Rules

Intended breakpoints (`tailwind.config.js`): `xs 375 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920`.

> ⚠️ **Verify before relying on this.** The project is Tailwind **v4** (`@import 'tailwindcss'` + `@tailwindcss/postcss`). v4 does **not** read `tailwind.config.js` unless the CSS contains `@config`, and `globals.css` has none. If so, the custom `screens` (and the `tailwind-scrollbar` plugin) are inactive and the real breakpoints are Tailwind defaults (`xl` = 1280, `2xl` = 1536, and `xs:` classes such as `xs:text-4xl` in WorkCard do nothing). A one-minute check in the browser (does an `xl:` style switch at 1280 or 1440?) settles it. If confirmed, the fix is a deliberate task (`@theme { --breakpoint-xs: 375px; … }`), not a side effect of another change.

Mobile (375+): readability, touch targets, **no horizontal scroll**, simplified motion, stacked layout, accessible nav.
Tablet (640–1023): the split layouts appear; controlled type growth.
Desktop (1024+): expressive composition, pointer effects (TextPressure, Magnet, FallingText hover, PixelTransition hover).
Large (1440+): whitespace and max-widths.

Prefer CSS/Tailwind for responsiveness. JS width checks currently exist in `WorkCards` (`innerWidth < 1024`) and `TextPressure`; do not add more.

---

## 6. Motion (As-built inventory + Rule)

Motion hierarchy: **1** page/section entrance → **2** hero typography → **3** interactive feedback → **4** navigation transitions → **5** decoration. Decoration never competes with the hero.

| Component | Tech | Trigger | Cleanup | Reduced motion | Notes |
|---|---|---|---|---|---|
| `TextPressure` | rAF loop, mouse/touch/scroll listeners, `MutationObserver` on `<html class>` | pointer proximity | ✅ rAF, listeners, observer, resize debounce | ❌ none | Hero-level. Home mounts **both** the mobile (5 instances) and desktop (2 instances) variants and hides one with CSS. |
| `BlurText` | `@react-spring/web` + `IntersectionObserver` | enters viewport | ✅ observer | ❌ none | Used for the letter-by-letter name. Short text only. |
| `FallingText` | Matter.js engine + own rAF loop | `hover` (one-shot) | ⚠️ engine/render/runner stopped, but the manual `requestAnimationFrame(updateLoop)` is **never cancelled** | ❌ none | Expensive. One instance only. |
| `PixelTransition` | GSAP (`killTweensOf`, delayed call) | hover (pointer) / click (coarse pointer) | ⚠️ tweens killed at the start of each run; unmount cleanup not verified | ❌ none | Touch detection is by `ontouchstart`/`maxTouchPoints`/`pointer: coarse`. |
| `MorphSlider` | `ogl` WebGL shader + GSAP | autoplay 6s (paused on hover), pointer drag, arrows/dots | ✅ engine destroyed, pointer listeners removed | ✅ `prefers-reduced-motion` shortens/limits transitions | Best-behaved animation component. |
| `Magnet` | window `mousemove` → React state | pointer near element | ✅ listener | ❌ none | `setState` on every mouse move, page-wide. |
| `WorkCards` (mobile) | CSS transform + touch handlers + 10s `setInterval` | swipe / arrows / dots / autoplay | ✅ interval | ❌ autoplay ignores it | Loop "jumps" without cloned slides. |
| Services page | GSAP + `ScrollTrigger` in `gsap.context` | scroll | ✅ | ✅ shows final state | **Reference implementation** for scoped context + reduced-motion. |

**Rules**
- Every substantial animation system needs a reduced-motion strategy: skip heavy timelines, show the final state, never leave content invisible. Copy the Services pattern (`matchMedia('(prefers-reduced-motion: reduce)')` → `gsap.set(..., {opacity:1, y:0})`).
- Prefer `transform` and `opacity`; scope GSAP with `gsap.context()` and `ctx.revert()`; use `gsap.matchMedia()` for breakpoint variants.
- Do not add new continuous/looping effects. Do not add fade-and-slide-up to every section — one orchestrated moment beats scattered reveals.
- Do not duplicate a Matter.js simulation. Do not put additional continuous effects around `TextPressure`.
- Do not migrate React Spring (`BlurText`) or Matter.js (`FallingText`) to GSAP for consistency.

---

## 7. Component Patterns (As-built)

**Primary CTA (pill)** — `rounded-full p-3 w-[130px] bg-[#FA6B48] text-black`, hover inverts to `bg-black` (dark: `bg-white`) with accent text, wrapped in `Magnet`. Centering is done with per-breakpoint hard-coded horizontal margins — fragile; rework only if the CTA is in scope.

**Inverted card** — `bg-black dark:bg-white text-white dark:text-gray-950`, accent for title/price, small type. Used by Contact, WorkCards, Services. Hover: Contact/WorkCards swap toward gray or the opposite color.

**Nav link** — `text-gray-800 dark:text-white`, hover accent + underline; active route = accent + underline + medium weight.

**Theme toggle** — square inverted button, accent border, sun/moon PNG (`day-and-night.png`, `night-and-day.png`), gradient on hover.

**Carousel controls (WorkCards)** — translucent black round arrows (`<` `>` text), dot indicators; active dot = accent and elongated.

**Scrollbar** — `.scroll-custom`: 8px, accent thumb, gray track.

**Blog card** — outer `border-4 border-gray-600`, inner `border-2 border-gray-400` that fills with accent on hover.

**Logo** — `peacock-black.png` / `peacock-white.png` (mode-swapped); brand name revealed on hover. Name shown in header is "Aria Aji"; the footer shows "Perkasa Wibowo". Do not "correct" either.

---

## 8. Interaction & Accessibility Baseline

Every interactive element needs: visible hover on pointer devices, usable touch behavior, keyboard focus, adequate target size (≥44px where practical), a clear active state. Never make critical information hover-only.

Known gaps (do not silently fix unrelated ones; fix in the area you are already touching):
- No explicit `:focus-visible` styling anywhere; rely on browser default.
- Contact cards are clickable `div`s (no keyboard/`role`); should be links/buttons if touched.
- `WorkCards` thumbnails are all `""` → `<img src="">` with real `alt`; the cards have no visual preview yet.
- Header nav uses `gray-800`/`white` while the canvas uses cream/navy; the hero must stay legible under a transparent header on `/`.
- Hero is pointer-driven; on touch it relies on `touchmove`. Keep the text readable at rest.

---

## 9. Header, Footer (Global)

**Header** — fixed; transparent on `/` until scrolled, otherwise chrome; hides on scroll down after 100px (100ms throttle); mobile menu (`max-h-96` slide) closes on outside click / navigation; dark-mode toggle (localStorage `theme`, falls back to system). Desktop nav: About, Contact, Blog. Mobile nav: About, **Services**, Contact, Blog.
**Footer** — chrome surface; name + logo reveal on hover, address, quick links, socials (GitHub, LinkedIn, X), copyright.

Header/Footer/`globals.css`/`layout.tsx` are **global**: any change requires checking every route (`/`, `/about`, `/services`, `/contact`, `/blog`, `/blog/[slug]`).

---

## 10. Working With the `frontend-design` Skill

The repo ships Anthropic's `frontend-design` skill (`.claude/skills/frontend-design`, pinned in `skills-lock.json`). It tells the agent to make bold, distinctive choices and explicitly lists a **warm cream background + terracotta accent** among the "default AI look" clusters to avoid. This portfolio's cream + coral is **a pinned brief, not a default the agent drifted into**. The skill itself says the brief's own words win.

Therefore:
1. This file **is the brief**. The palette in §2 and the type voices in §3 are fixed inputs, not proposals for the skill to improve on.
2. Use `frontend-design` for **new** sections/pages or a requested redesign — never for small fixes, and never to re-pick colors or fonts.
3. When the skill proposes a token plan, it must be expressed *in* the existing palette and type voices; if a proposal contradicts §2/§3, drop the proposal.
4. The skill's own guidance that *is* compatible and should be followed: one memorable moment, restrained everything else, no template chrome (eyebrow labels, `A · B · C` meta strings, `→` on every link), sentence-case active-voice copy, quality floor (responsive to 375px, visible focus, reduced motion).

---

## 11. Visual QA Checklist

For every visual change:
- [ ] Light mode · [ ] Dark mode
- [ ] 375 · 768 · 1024 · 1440 (and 1920 for hero/global changes)
- [ ] Keyboard navigation and visible focus
- [ ] Hover states (pointer) and touch behavior (coarse pointer)
- [ ] Reduced motion (DevTools → Rendering → Emulate `prefers-reduced-motion`)
- [ ] No horizontal overflow
- [ ] No obvious layout shift
- [ ] No animation stuck after unmount / route change
- [ ] Console clean (note: `Header` currently logs `Current path:` on every render)
- [ ] Contrast: new text/background pairs computed, not eyeballed (§2.2)

Route matrix for global changes: `/`, `/about`, `/services`, `/contact`, `/blog`, `/blog/<slug>`.

---

## 12. Known Design Debt (report; do **not** fix unasked)

| # | Item | Where |
|---|---|---|
| D1 | Light-mode ink (`#488067`) and accent-on-cream fail contrast for small text | `layout.tsx`, home section 2 |
| D2 | Chrome/cards don't use canvas colors (three surface systems) | Header, Footer, cards |
| D3 | Stray accent variants `#CA6B48`, `#EA6B48`; unused `colorCycle` | `app/page.tsx` |
| D4 | Only JetBrains Mono 400 loaded → synthesized bold; duplicate font instances; unused Montserrat/Geist | `layout.tsx`, `app/fonts` |
| D5 | Tailwind v4 ignores `tailwind.config.js` → documented breakpoints/plugin possibly inactive | `globals.css`, `tailwind.config.js` |
| D6 | `globals.css` variables follow system preference, not `.dark` | `globals.css` |
| D7 | Home mounts two hero variants at once (7 `TextPressure` instances) | `app/page.tsx` |
| D8 | `FallingText` rAF never cancelled; no reduced motion on most animation | `FallingText`, `TextPressure`, `Magnet`, `WorkCards`, `BlurText`, `PixelTransition` |
| D9 | `app/blog/layout.tsx` renders a literal **"Admin Layout"** `<header>` on every blog page | `app/blog/layout.tsx` |
| D10 | WorkCard thumbnails empty; Services hidden from desktop nav/footer but in mobile nav | `workcard.tsx`, `header.tsx`, `footer.tsx` |
| D11 | Invalid/no-op classes: `text-md`, `md:pt[49px]`, `lg:flex-1-reverse`, `opacity opacity-50` | `about`, `contact`, `blog` pages |
| D12 | Junk assets: `*:Zone.Identifier` files, duplicate jpeg/webp pairs | `public/assets/img` |
| D13 | Clickable `div` cards, no focus styles, hover-only CTA feedback | Contact, global |

D9 is a visible bug rather than a taste issue; surface it whenever the blog is touched.

---

## 13. Design Decision Rule

1. **Preserve** the as-built look unless the task asks otherwise.
2. When two implementations look equivalent, pick the one with: fewer dependencies → less runtime work → easier maintenance → better accessibility → closer to the existing architecture.
3. Report debt you notice (§12) in the final response; fix it only if it is inside the code you are already changing *and* the fix cannot alter the rendered result.
4. Do not optimize for novelty.