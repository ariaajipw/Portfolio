"use client";

import { useEffect } from "react";
import { whenIdle } from "./WhenIdle";

/**
 * Animasi scroll halaman Home, gaya "playful" yang terasa hidup di scroll jempol.
 *
 * Atribut yang dibaca (semua opsional, dipasang di page.tsx):
 *   data-scroll-hero             hero mengecil & memudar saat di-scroll keluar
 *   data-scroll-scale            blok membesar (scale-in) mengikuti scroll
 *   data-scroll-reveal[="up|tilt|pop"]  muncul sekali saat masuk layar
 *   data-scroll-parallax="px"    parallax; tambah data-scroll-tilt="deg" untuk miring
 *   data-scroll-skew             miring mengikuti KECEPATAN scroll, lalu kembali
 *   data-touch-press             mengecil saat disentuh, memantul saat dilepas
 *
 * Aturan performa:
 * - Hanya transform & opacity. Tidak ada animasi horizontal (x) pada elemen
 *   selebar layar, supaya tidak memunculkan scroll horizontal di ponsel.
 * - Di ponsel, scroll tetap native; ScrollTrigger hanya membaca posisinya.
 * - Semua ticker/listener hanya hidup saat elemennya terlihat.
 * - GSAP dimuat saat idle. Hero tetap tampil normal sampai pengguna scroll.
 * - Dilewati total jika prefers-reduced-motion.
 */

const STYLE = `
body{overflow-x:clip}
.hsa-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:100;pointer-events:none;
  background:var(--accent,#FA6B48);transform:scaleX(0);transform-origin:0 50%}
.hsa-cue{position:fixed;left:50%;bottom:max(20px,env(safe-area-inset-bottom,0px));
  transform:translateX(-50%);z-index:40;pointer-events:none;display:flex;flex-direction:column;
  align-items:center;gap:6px;opacity:.7;color:var(--text-primary,currentColor);
  font:500 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.22em;text-transform:uppercase}
.hsa-cue svg{animation:hsa-bounce 1.4s ease-in-out infinite}
@keyframes hsa-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@media (prefers-reduced-motion:reduce){.hsa-cue,.hsa-progress{display:none}}
`;

type Variant = "up" | "tilt" | "pop";

export default function HomeScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      // Hindari refresh berulang saat address bar ponsel naik/turun
      ScrollTrigger.config({ ignoreMobileResize: true });

      const q = <T extends HTMLElement>(sel: string) =>
        gsap.utils.toArray<T>(sel);

      const mm = gsap.matchMedia();

      mm.add(
        {
          // PENTING: matchMedia hanya menjalankan fungsi bila minimal satu
          // kondisi cocok. "all" memastikan fungsi selalu jalan (ponsel biasa).
          all: "all",
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            all: boolean;
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          // Di ponsel: scrub:true = menempel persis ke jempol (tanpa lag).
          // Di desktop: sedikit smoothing.
          const scrub = isDesktop ? 0.5 : true;
          const dist = isDesktop ? 56 : 36;

          // ── 1) Progress bar & petunjuk scroll ─────────────────────────
          const bar = document.querySelector<HTMLElement>(".hsa-progress");
          if (bar) {
            gsap.to(bar, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            });
          }
          const cue = document.querySelector<HTMLElement>(".hsa-cue");
          if (cue) {
            gsap.fromTo(
              cue,
              { autoAlpha: 0.7 },
              {
                autoAlpha: 0,
                ease: "none",
                scrollTrigger: {
                  start: 0,
                  end: 140,
                  scrub: true,
                },
              },
            );
          }

          // ── 2) Hero: mengecil & memudar saat di-scroll keluar ─────────
          q("[data-scroll-hero]").forEach((el) => {
            gsap.to(el, {
              y: -dist,
              scale: 0.94,
              opacity: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom top",
                scrub,
              },
            });
          });

          // ── 3) Blok yang membesar mengikuti scroll (slider) ───────────
          q("[data-scroll-scale]").forEach((el) => {
            gsap.fromTo(
              el,
              { scale: isDesktop ? 0.9 : 0.86, y: isDesktop ? 60 : 44 },
              {
                scale: 1,
                y: 0,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 100%",
                  end: "top 40%",
                  scrub,
                },
              },
            );
          });

          // ── 4) Reveal playful (sekali jalan, per varian) ──────────────
          const from: Record<Variant, gsap.TweenVars> = {
            up: { y: dist },
            tilt: { y: dist * 0.8, rotate: 3, transformOrigin: "0% 100%" },
            pop: { y: dist * 0.8, scale: 0.8, rotate: -5 },
          };
          const ease: Record<Variant, string> = {
            up: "power3.out",
            tilt: "power3.out",
            pop: "back.out(1.8)", // overshoot kecil = terasa "memantul"
          };

          (Object.keys(from) as Variant[]).forEach((variant) => {
            // React merender `data-scroll-reveal` tanpa nilai sebagai "true",
            // jadi semua nilai selain tilt/pop dianggap "up".
            const variantOf = (el: HTMLElement): Variant =>
              el.dataset.scrollReveal === "tilt" ||
              el.dataset.scrollReveal === "pop"
                ? el.dataset.scrollReveal
                : "up";
            const items = q("[data-scroll-reveal]").filter(
              (el) => variantOf(el) === variant,
            );
            if (!items.length) return;

            gsap.set(items, { autoAlpha: 0, ...from[variant] });
            ScrollTrigger.batch(items, {
              start: "top 90%",
              once: true,
              interval: 0.1,
              batchMax: 4,
              onEnter: (batch) =>
                gsap.to(batch, {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  duration: 0.9,
                  ease: ease[variant],
                  stagger: 0.12,
                  overwrite: true,
                  clearProps: "transform,opacity,visibility",
                }),
            });
          });

          // ── 5) Parallax + miring mengikuti scroll ─────────────────────
          q("[data-scroll-parallax]").forEach((el) => {
            const amount =
              (Number(el.dataset.scrollParallax) || 40) * (isDesktop ? 1 : 0.5);
            const tilt = Number(el.dataset.scrollTilt) || 0;
            gsap.fromTo(
              el,
              { y: -amount, rotate: -tilt },
              {
                y: amount,
                rotate: tilt,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub,
                },
              },
            );
          });

          // ── 6) Miring mengikuti KECEPATAN scroll (ribbon nama) ────────
          const cleanups: Array<() => void> = [];
          q("[data-scroll-skew]").forEach((el) => {
            const max = isDesktop ? 6 : 9;
            let lastY = window.scrollY;
            let current = 0;
            let applied = 0;

            const tick = () => {
              const y = window.scrollY;
              const velocity = y - lastY;
              lastY = y;
              const target = gsap.utils.clamp(-max, max, -velocity * 0.35);
              current += (target - current) * 0.15;
              if (Math.abs(current) < 0.02) {
                current = 0;
                if (applied !== 0) {
                  gsap.set(el, { skewX: 0 });
                  applied = 0;
                }
                return;
              }
              gsap.set(el, { skewX: current });
              applied = current;
            };

            // ticker hanya hidup selama elemen terlihat
            ScrollTrigger.create({
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => {
                if (self.isActive) {
                  lastY = window.scrollY;
                  gsap.ticker.add(tick);
                } else {
                  gsap.ticker.remove(tick);
                  gsap.set(el, { skewX: 0 });
                  current = applied = 0;
                }
              },
            });
            cleanups.push(() => gsap.ticker.remove(tick));
          });

          // ── 7) Umpan balik sentuh: mengecil saat ditekan, memantul ────
          let pressed: HTMLElement | null = null;
          const onDown = (e: PointerEvent) => {
            const target = (e.target as Element | null)?.closest<HTMLElement>(
              "[data-touch-press]",
            );
            if (!target) return;
            pressed = target;
            gsap.to(target, {
              scale: 0.93,
              duration: 0.12,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const release = () => {
            if (!pressed) return;
            gsap.to(pressed, {
              scale: 1,
              duration: 0.55,
              ease: "elastic.out(1, 0.45)",
              overwrite: "auto",
            });
            pressed = null;
          };
          document.addEventListener("pointerdown", onDown, { passive: true });
          document.addEventListener("pointerup", release, { passive: true });
          document.addEventListener("pointercancel", release, {
            passive: true,
          });
          cleanups.push(() => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("pointerup", release);
            document.removeEventListener("pointercancel", release);
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      revert = () => mm.revert();
    };

    const cancelIdle = whenIdle(() => void init(), {
      timeout: 1500,
      fallbackDelay: 600,
    });

    return () => {
      cancelled = true;
      cancelIdle();
      revert?.();
    };
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <div className="hsa-progress" aria-hidden="true" />
      <div className="hsa-cue" aria-hidden="true">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}