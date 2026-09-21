# DESIGN SYSTEM — Portfolio

## 1. Design Intent

This portfolio should feel like a personal developer portfolio rather than a generic SaaS template.

Core qualities:
- expressive typography;
- minimal structure;
- strong black/white contrast;
- restrained accent usage;
- editorial composition;
- interactive motion;
- experimental but usable;
- responsive first.

The design should communicate craft through details, not through excessive decoration.

## 2. Existing Visual Foundation

Current visual foundation includes:
- white/light background;
- black/dark background;
- gray text hierarchy;
- orange/coral accent around `#FA6B48`;
- typography driven by large responsive sizes;
- JetBrains Mono currently applied at the root body;
- Montserrat Alternates is available in the root layout;
- peacock logo assets;
- animated typography and transition components.

Treat these as the current design language.

Do not introduce a new visual identity unless explicitly requested.

## 3. Color Rules

Primary foundation:

```text
Light background: #FFFFFF
Light foreground: #000000

Dark background: #000000 / zinc-950 family
Dark foreground: #FFFFFF

Existing accent:
#FA6B48
```

Use the accent intentionally:
- active navigation;
- interaction feedback;
- important highlights;
- selected states;
- visual details.

Avoid turning every component into an accent-colored component.

## 4. Typography

Typography should prioritize:
1. hierarchy;
2. readability;
3. responsive scaling;
4. expressive hero treatment.

Hero typography may be oversized and animated.

Body typography must remain readable on:
- 375px;
- 640px;
- 768px;
- 1024px+.

Avoid arbitrary font sizes that create overflow.

Prefer responsive utilities or `clamp()` for newly introduced type scales where appropriate.

## 5. Layout

Use:
- strong whitespace;
- clear two-column compositions on larger screens;
- stacked compositions on smaller screens;
- consistent horizontal padding;
- viewport-aware hero sections.

Do not force desktop layouts onto mobile.

When a section uses `h-screen`, verify that content does not become inaccessible on short mobile viewports.

Prefer `min-h-dvh` where viewport-height behavior genuinely requires dynamic viewport handling.

## 6. Responsive Rules

### Mobile — 375px+

Priority:
- readability;
- touch usability;
- no horizontal scroll;
- simplified animation;
- stacked layout;
- accessible navigation.

### Tablet — 768px+

Priority:
- transition from stacked to split layouts;
- controlled typography growth;
- preserve spacing.

### Desktop — 1024px+

Priority:
- expressive composition;
- large type;
- richer hover/mouse interactions;
- larger visual rhythm.

### Large Desktop — 1440px+

Do not simply enlarge everything.

Use the additional width for:
- whitespace;
- composition;
- controlled max-widths;
- larger hero typography where intentional.

## 7. Motion Design

Motion should communicate hierarchy.

### Motion hierarchy

1. Page/section entrance
2. Hero typography
3. Interactive feedback
4. Navigation transitions
5. Decorative effects

Do not let decorative animation compete with primary content.

### GSAP rules

Prefer:
- timelines;
- stagger;
- transform;
- opacity;
- scoped selectors;
- lifecycle cleanup.

Use `gsap.matchMedia()` for responsive animation variants.

### Reduced Motion

Every substantial animation system must have a reduced-motion strategy.

At minimum:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove or simplify non-essential motion */
}
```

For JS/GSAP:
- detect reduced motion;
- skip heavy timelines;
- show the final visual state where appropriate.

## 8. Interaction

Interactive elements should have:
- visible hover state on pointer devices;
- usable touch state;
- keyboard focus;
- sufficient target size;
- clear active state.

Do not make critical information available only through hover.

## 9. Cards / Work Showcase

Work cards should prioritize:
- project identity;
- visual preview;
- concise description;
- clear interaction.

Existing WorkCard carousel behavior should be preserved unless the task explicitly changes it.

When modifying the carousel:
- test touch swipe;
- test desktop interaction;
- test infinite-loop behavior;
- test resize behavior;
- verify no layout shift.

## 10. Header

Header is a global interaction.

Preserve:
- fixed positioning;
- hide-on-scroll behavior;
- mobile menu;
- active route indication;
- dark mode.

When changing it, verify every route.

## 11. Animation Component Guidelines

### TextPressure

Treat as a hero-level expressive component.

Avoid putting many additional continuous effects around it.

### BlurText

Good for:
- entrance animation;
- section headings;
- controlled text reveals.

Avoid using it on long paragraphs.

### FallingText

Physics-based and comparatively expensive.

Use selectively.

Never duplicate large Matter.js simulations without a concrete visual reason.

### PixelTransition

Good for:
- image/content transitions;
- hover/click reveal effects.

Verify touch-device behavior before changing its interaction model.

## 12. Visual QA Checklist

For every visual change:

- [ ] Light mode
- [ ] Dark mode
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px
- [ ] Keyboard navigation
- [ ] Hover states
- [ ] Touch behavior
- [ ] Reduced motion
- [ ] No horizontal overflow
- [ ] No obvious layout shift
- [ ] No animation stuck after unmount
- [ ] No console errors

## 13. Design Decision Rule

When two implementations look equivalent:

Choose the one that:
1. uses fewer dependencies;
2. has less runtime work;
3. is easier to maintain;
4. is more accessible;
5. preserves the existing architecture.

Do not optimize for novelty.
