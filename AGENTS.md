# AGENTS.md — Claude Code Operating Manual

## 0. Mission

You are the coding agent for this portfolio repository.

Your job is to make **small, safe, visually accurate improvements** while preserving existing behavior.

You are not authorized to redesign or rewrite unrelated parts of the project.

---

# 1. GOLDEN RULE

> **Caveman first. Specialist only when necessary. Minimal change always.**

For non-trivial tasks, start with the Caveman skill/workflow.

Caveman is the reconnaissance layer:
- inspect;
- locate;
- understand;
- plan;
- identify risks.

Do not immediately perform a broad codebase analysis.

---

# 2. COST / TOKEN CONTROL

The user explicitly wants an efficient Claude Code workflow.

## Default skill routing

```text
Task
 ↓
Caveman
 ↓
Is a specialist actually needed?
 ├─ No → implement
 └─ Yes
     ↓
  ONE targeted specialist
     ↓
  implement
     ↓
  Browser/QA if UI changed
```

## Never do this by default

```text
Caveman
+ ECC
+ UI/UX Pro Max
+ Frontend Design
+ GSAP
+ Responsive
+ Browser
```

Do not activate every skill for every task.

## Specialist selection

### `/caveman`

Use first for:
- repo exploration;
- finding files;
- dependency discovery;
- tracing component usage;
- understanding existing behavior;
- small implementation planning.

### `/ecc`

Use for:
- debugging;
- code quality;
- refactoring;
- TypeScript issues;
- architecture problems;
- regression-sensitive changes.

Do not use ECC as a generic prerequisite for every edit.

### `/ui-ux-pro-max`

Use when the request concerns:
- layout;
- visual hierarchy;
- typography;
- spacing;
- component UX;
- interaction patterns;
- accessibility-oriented UI decisions.

### `/frontend-design`

Use when the request asks for:
- new visual direction;
- substantial page composition;
- new section design;
- a high-level visual redesign.

Do not invoke it for a one-line spacing fix.

### `/gsap` / animation skill

Use when:
- adding GSAP;
- debugging GSAP;
- building timelines;
- scroll-triggered animation;
- staggered animation;
- animation lifecycle/performance;
- responsive animation behavior.

If the existing component already uses React Spring or Matter.js and the request does not require GSAP, do not migrate it.

### Browser / QA

Use when:
- UI behavior changed;
- animation changed;
- responsive layout changed;
- navigation changed;
- a bug is visual or interaction-based;
- the user explicitly asks for browser testing.

Prefer targeted checks over broad exploratory testing.

### Responsive Design

Use when:
- mobile/tablet/desktop layout is the actual problem;
- breakpoint behavior changes;
- overflow/cropping/viewport issues are involved.

Do not use it merely because the component has Tailwind classes.

---

# 3. BEFORE EDITING

For a non-trivial task:

1. Run/activate Caveman.
2. Identify the exact relevant files.
3. Read only the necessary surrounding code.
4. Determine current behavior.
5. Decide whether one specialist is needed.
6. Make a small plan.
7. Implement the smallest change.

Before editing, report internally or briefly:

```text
Relevant files:
- ...

Existing behavior:
- ...

Requested change:
- ...

Skill needed:
- Caveman
- [one specialist only if needed]

Not changing:
- ...
```

---

# 4. PRESERVATION RULES

Unless explicitly requested, do NOT change:

- framework;
- routing;
- page content;
- dark mode;
- header behavior;
- footer behavior;
- existing animation concepts;
- existing breakpoints (declared in `@theme` in `app/globals.css`);
- colour tokens and the single coral accent;
- public asset paths;
- dependency versions;
- the SEO surface (`metadata` in `layout.tsx`, JSON-LD, `sitemap.ts`, `robots.ts`, canonical host);
- the Cloudflare/OpenNext deployment files (`wrangler.jsonc`, `open-next.config.ts`);
- unrelated components.

Do not rewrite an entire component when a local fix is enough.

---

# 5. FILE EDITING RULES

Prefer editing existing files.

Create new files only when:
- a reusable component is actually needed;
- a clear architectural boundary exists;
- the user requested it.

Do not create:
- speculative utilities;
- generic wrappers;
- unnecessary hooks;
- abstraction layers for one use.

---

# 6. REACT / NEXT.JS

Use Server Components by default.

Use `"use client"` only when required by:
- state;
- effects;
- browser APIs;
- event handlers;
- animation libraries;
- gestures.

Do not convert components between server/client boundaries casually.

The site runs on Cloudflare Workers through OpenNext (`nodejs_compat`). Do not introduce Node-only APIs (`fs`, `path`, native modules) in server code without checking `npm run preview`.

The root layout already renders `<main>`. Do not add another `<main>` in new pages.

Avoid unnecessary rerenders.

When using effects:
- keep dependencies correct;
- clean up listeners;
- clean up timers;
- clean up observers;
- clean up animation instances.

---

# 7. GSAP RULES

When GSAP is used:

## Prefer scoped contexts

```tsx
const root = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animation
  }, root);

  return () => ctx.revert();
}, []);
```

## Responsive animation

Prefer:

```tsx
const mm = gsap.matchMedia();
```

instead of manually managing many resize listeners.

## Avoid

- global `document.querySelector()` when a ref can scope the animation;
- creating timelines on every render;
- leaving timelines alive after unmount;
- animating layout properties unnecessarily;
- continuous animation with no purpose;
- duplicated event listeners.

Prefer:
- `transform`;
- `opacity`;
- CSS variables;
- timeline/stagger;
- `will-change` only where justified.

---

# 8. ANIMATION PERFORMANCE

Before adding an animation, ask:

1. Does it communicate something?
2. Can CSS handle it?
3. Can existing GSAP handle it?
4. Is continuous JS actually necessary?
5. Does mobile need the same animation?
6. What happens with reduced motion?

Prefer the cheapest implementation that achieves the requested visual result.

---

# 9. REDUCED MOTION

Respect:

```text
prefers-reduced-motion: reduce
```

For non-essential animation:
- disable;
- simplify;
- or immediately show the final state.

Do not leave users with invisible content because an animation was disabled.

---

# 10. RESPONSIVE DESIGN

Minimum mental test:

```text
375
640
768
1024
1280
1440
1920
```

Also check one 16:10 viewport (e.g. 1440×900) and a short landscape phone whenever a section uses `h-screen` or `min-h-dvh`.

Breakpoints are `xs 375 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920` and come from `@theme` in `globals.css`. `tailwind.config.js` is not loaded; do not add `@config` and do not edit that file expecting an effect.

For layout changes check:
- overflow;
- typography;
- spacing;
- image aspect ratio;
- navigation;
- touch;
- fixed elements;
- animation;
- viewport height.

Do not assume desktop CSS scales correctly to mobile.

Avoid JavaScript width detection when CSS can solve the problem.

---

# 11. UI / UX

When changing UI:
- preserve hierarchy;
- preserve content;
- preserve existing identity;
- maintain readable contrast;
- maintain keyboard focus;
- do not make hover the only interaction;
- keep touch targets practical;
- use the colour tokens in `globals.css` (`var(--accent)`, `var(--text-primary)`, …) where one exists;
- never put white text on the accent fill (2.89:1); accent fills take black text;
- add `focus-visible` styling to every new interactive element.

Do not blindly apply a design-system skill's recommendation if it conflicts with the existing portfolio identity or the user's explicit request.

---

# 12. BROWSER / QA

For UI changes, verify the actual rendered result when browser tooling is available.

Targeted QA:

### Visual
- light mode;
- dark mode;
- requested route;
- 375px;
- desktop.

### Interaction
- click;
- hover;
- touch/swipe where relevant;
- navigation;
- keyboard focus.

### Runtime
- console errors;
- animation cleanup;
- broken assets;
- layout overflow.

Do not spend tokens testing unrelated pages unless the change affects global components.

If Header, Footer, globals.css (tokens, `site-container`, breakpoints), layout.tsx, or `sitemap.ts` / `robots.ts` changes:
- test multiple routes because these are global (`/`, `/about`, `/services`, `/contact`, `/blog`, `/blog/<slug>`);
- for metadata or sitemap changes also open `/sitemap.xml` and `/robots.txt` and check the rendered `<head>`.

---

# 13. BUILD / TYPE CHECK

When implementation is complete, run the smallest useful verification.

Prefer:

```bash
npm run build
```

for build-sensitive changes.

`npm run build` checks the Next build only. When a change touches server code, `next.config.mjs`, metadata routes, `wrangler.jsonc`, or `open-next.config.ts`, also run:

```bash
npm run preview
```

which builds the Cloudflare Worker bundle and serves it locally. Never run `npm run deploy` unless the user explicitly asks.

For UI-only work:
- browser verification first;
- build when practical.

If the repository's lint command is unavailable or incompatible with the current Next.js version, do not invent a replacement as if it were equivalent. Report the limitation and use available checks.

---

# 14. DEPENDENCY RULE

Before adding a package:

1. check existing dependencies;
2. check whether CSS/native browser APIs can solve it;
3. check whether GSAP/React Spring/Matter.js already solves it;
4. only then add a package.

No dependency should be added for convenience alone.

---

# 15. CODE STYLE

Match the existing repository style unless the touched code clearly requires cleanup.

Avoid unrelated formatting changes.

Do not reformat entire files.

Do not rename public components or routes unless required.

---

# 16. COMMENT POLICY

Do not add comments that merely restate obvious code.

Add comments only for:
- non-obvious animation math;
- browser quirks;
- architectural constraints;
- intentional performance tradeoffs.

---

# 17. GIT SAFETY

Never:
- delete files without explicit need;
- reset unrelated changes;
- overwrite unrelated user work;
- modify generated/config files without reason.

If the working tree contains user changes, preserve them.

`.next/` and `.open-next/` are generated and gitignored. `.wrangler/` is also generated but is **not** in `.gitignore`; do not edit or delete it, and mention it in the report instead of changing `.gitignore` unasked.

---

# 18. TASK EXECUTION TEMPLATE

Use this internal flow:

```text
[1] CAVEMAN
Reconnaissance only.

[2] SCOPE
Identify exact files and smallest change.

[3] SPECIALIST
Invoke only if the task genuinely needs:
- ECC
- UI/UX Pro Max
- Frontend Design
- GSAP/Animation
- Responsive Design

[4] IMPLEMENT
Smallest safe patch.

[5] QA
Browser test if UI/interaction changed.

[6] VERIFY
Build/type/runtime checks as appropriate.

[7] REPORT
What changed + what was tested + remaining issue.
```

---

# 19. EXAMPLE ROUTING

## "Fix mobile overflow"

```text
Caveman
→ inspect layout
→ Responsive Design if needed
→ patch
→ browser at 375px
```

## "Make hero animation smoother"

```text
Caveman
→ inspect TextPressure/hero
→ GSAP/Animation
→ patch only hero
→ browser test
```

## "Redesign About page"

```text
Caveman
→ inspect About
→ UI/UX Pro Max OR Frontend Design
→ implement
→ Responsive QA
```

Do not automatically invoke both design skills unless the task genuinely requires both.

## "Fix TypeScript error"

```text
Caveman
→ locate error
→ ECC if debugging is non-trivial
→ patch
→ type/build verification
```

---

# 20. REPO FACTS THE AGENT MUST NOT GET WRONG

Read the relevant document before assuming any of these (details in `DESIGN.md` / `ARCHITECTURE.md`):

- **Tailwind v4.** Breakpoints and the scrollbar plugin are in `globals.css` (`@theme`, `@plugin`). `tailwind.config.js` is dead.
- **Colours are CSS tokens** on `:root` / `html.dark`; `<body>` has no colour classes. Several tokens are defined but unused.
- **Layout shell.** `layout.tsx` provides `<main>`; `site-container` is the shared width (max `110rem` = 1760px) used by Header, Footer and Home sections. About/Contact/Blog/Services/WorkCards still use their own padding.
- **Home hero font** is declared in `app/page.tsx` (`Roboto_Flex`, `--font-roboto-flex`), not in `layout.tsx`.
- **`MorphSlider` is imported through `LazyMorphSlider`.** Pages must not import `MorphSlider` directly.
- **`WorkCards` is a CSS scroll-snap carousel** with no autoplay; "Titis" has no thumbnail and falls back to the placeholder.
- **`prose` classes in the blog do nothing** (no typography plugin); `MarkdownContent` parses on the client and does not use DOMPurify.
- **Known visible bugs, report only:** the "Admin Layout" header in `blog/layout.tsx`; nested `<main>`; `h-screen` on Blog/Contact; `md:pt[49px]` typos; white-on-accent CTAs in dark mode.
- **SEO risks, report only:** root `canonical` is `"/"`; `/og-image.webp` is missing; `<html lang="en">` on mostly Indonesian copy.

---

# 21. FINAL RESPONSE FORMAT

After a task, respond concisely:

```text
Implemented:
- ...

Files changed:
- ...

Skills used:
- Caveman
- [specialist]

Verified:
- ...

Not changed:
- ...
```

If browser verification was not possible, say so plainly.

# 22. PRIMARY PRINCIPLE

> **Use intelligence selectively.**

Caveman should reduce unnecessary context and token usage.

Specialists should be called for specialized problems, not as mandatory ceremony.

The best implementation is the smallest change that achieves the requested result while preserving the existing portfolio.