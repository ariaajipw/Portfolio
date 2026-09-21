# PRD — Portfolio AI-Assisted Development

## 1. Project Context

This repository is a personal portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS.

Current repository characteristics:
- Next.js 15 + React 19
- Tailwind CSS 4
- TypeScript
- GSAP
- React Spring
- Matter.js
- Marked + DOMPurify
- Existing pages: Home, About, Team, Services, Contact, Blog
- Existing interactive components include `TextPressure`, `BlurText`, `FallingText`, `PixelTransition`, `WorkCard`, Header, Footer, and Markdown rendering.
- Dark/light mode and responsive behavior are already part of the site.

The repository already contains substantial visual/interaction work. The AI agent must therefore behave primarily as a **preservation-first maintainer and improver**, not as a greenfield designer.

## 2. Product Goal

Maintain and evolve the portfolio into a polished, responsive, animation-rich developer portfolio while preserving existing visual identity, content, routes, interactions, and working behavior unless a change is explicitly requested.

Primary quality areas:
1. UI/UX quality
2. Responsive design
3. GSAP / animation quality
4. Accessibility and reduced-motion behavior
5. Browser compatibility
6. Visual regression prevention
7. Code quality and maintainability

## 3. Core Principle

> **Do not redesign what was not requested.**

Before changing UI:
- inspect the current implementation;
- understand existing behavior;
- identify the smallest change that satisfies the request;
- preserve existing appearance outside the requested scope.

Do not replace existing animation libraries or component architecture merely because another approach is available.

## 4. AI Agent Strategy — Caveman First

The most important operating constraint is **token and API efficiency**.

### Default workflow

Use the Caveman skill/workflow first for:
- repository reconnaissance;
- locating relevant files;
- understanding existing components;
- identifying dependencies;
- planning a small change;
- determining which other skill is actually necessary.

Caveman should act as the **cheap coordinator / scout**.

Do not automatically invoke every available skill.

### Skill escalation

Use other skills only when their specialization is needed:

| Skill | Use when |
|---|---|
| Caveman | Always first for non-trivial code tasks |
| ECC | Code quality, refactoring, debugging, architecture review, safe implementation |
| UI/UX Pro Max | UI system, layout, hierarchy, typography, component UX, design decisions |
| Frontend Design | High-level visual direction or substantial frontend composition |
| Browser / QA | Real browser verification, interaction testing, responsive checks, visual regressions |
| GSAP / Animation | GSAP timelines, scroll animation, micro-interactions, performance |
| Responsive Design | Breakpoint behavior, mobile/tablet/desktop layout problems |

### Cost rule

Prefer:

`Caveman → targeted specialist → implementation → Browser/QA`

Avoid:

`Caveman → every skill → broad analysis → rewrite`

The agent must not call expensive/deep workflows when a simple repository inspection or targeted edit is sufficient.

## 5. Goals

### P0 — Required

- Preserve existing routes and page functionality.
- Preserve dark/light mode behavior.
- Preserve existing header/footer behavior.
- Preserve existing animation intent.
- Avoid horizontal overflow at mobile widths.
- Keep TypeScript/build/lint healthy.
- Ensure animations do not block interaction or cause obvious jank.
- Respect `prefers-reduced-motion`.
- Verify important changes in a real browser when possible.

### P1 — Important

- Improve animation implementation quality where requested.
- Reduce unnecessary client-side work.
- Improve responsive behavior.
- Improve accessibility and keyboard interaction.
- Remove obvious dead/commented code when it is in the touched area.
- Improve component consistency without changing the visual result unnecessarily.

### P2 — Optional

- Broader component refactoring.
- Design-token cleanup.
- Animation abstraction.
- Content/data architecture improvements.
- Performance optimizations outside the requested scope.

## 6. Non-Goals

Do not:
- rewrite the whole project;
- migrate frameworks;
- replace Next.js;
- replace Tailwind;
- replace GSAP with another animation library without explicit approval;
- redesign the visual identity without a design request;
- modify unrelated pages merely for consistency;
- remove existing components because they look unfinished;
- introduce unnecessary dependencies;
- create speculative features.

## 7. Design Requirements

The design system should remain coherent with the existing portfolio:
- strong typography;
- minimal editorial portfolio feel;
- black/white foundation;
- existing accent color usage should be preserved unless a new palette is explicitly requested;
- responsive typography;
- generous spacing;
- purposeful motion;
- interaction should feel intentional rather than decorative.

The existing repository uses responsive Tailwind breakpoints and multiple animated components. Treat these as existing design decisions, not problems to automatically replace.

## 8. Animation Requirements

Animation must have a purpose:
- guide attention;
- communicate state;
- establish hierarchy;
- improve transition continuity;
- provide feedback.

Prefer:
- `transform` and `opacity`;
- GSAP timelines for coordinated motion;
- scoped animation cleanup;
- `gsap.context()` where appropriate;
- `gsap.matchMedia()` for responsive animation rules;
- reduced-motion fallbacks.

Avoid:
- unnecessary layout-triggering animation;
- uncontrolled requestAnimationFrame loops;
- duplicated event listeners;
- animations that continue after unmount;
- heavy effects on mobile without testing.

Existing Matter.js and React Spring animations must be treated as existing dependencies and not casually rewritten.

## 9. Responsive Requirements

Minimum verification targets:
- 375px mobile
- 640px
- 768px tablet
- 1024px desktop transition
- 1280px
- 1440px+
- 1920px where relevant

Check:
- no unintended horizontal scroll;
- readable typography;
- navigation usability;
- touch targets;
- image/media cropping;
- animation behavior;
- section height;
- overflow;
- fixed/sticky elements;
- dark mode;
- reduced motion.

## 10. QA / Definition of Done

A task is complete only when:
- requested behavior works;
- unrelated behavior is preserved;
- TypeScript/build checks pass when applicable;
- browser verification is performed for UI/interaction changes when browser tooling is available;
- mobile behavior is checked for responsive changes;
- no obvious console/runtime errors were introduced;
- animations clean up correctly;
- reduced-motion behavior is respected.

## 11. Change Size

Prefer small, reviewable changes.

For a large task:
1. reconnaissance;
2. plan;
3. implement one logical slice;
4. verify;
5. continue.

Do not mix unrelated refactors with feature work.

## 12. Agent Output

Before implementation:
- summarize what was found;
- state which files will be touched;
- state which skills are actually needed;
- state what will intentionally NOT be changed.

After implementation:
- summarize changes;
- list verification performed;
- mention remaining risks only when real.

