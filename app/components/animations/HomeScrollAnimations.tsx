"use client";

import { useEffect } from "react";
import { whenIdle } from "./WhenIdle";

/**
 * Animasi scroll halaman Home. Tidak merender apa pun; hanya mencari
 * elemen dengan atribut data-* lalu menganimasikannya.
 *
 *   data-scroll-reveal    -> fade + naik tipis saat masuk layar (sekali saja)
 *   data-scroll-parallax  -> parallax tipis, hanya desktop (angka = px)
 *
 * Aturan performa:
 * - Hanya transform & opacity (tanpa layout/paint berat).
 * - Hero tidak disentuh, jadi LCP aman.
 * - GSAP dimuat dinamis saat idle, tidak masuk bundle awal.
 * - Elemen baru disembunyikan oleh JS, bukan CSS. Jika JS gagal, konten tetap terlihat.
 * - Dilewati total jika prefers-reduced-motion.
 */
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

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          // 1) Reveal bertahap, satu trigger untuk semua elemen (batch)
          const items = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]");
          gsap.set(items, { autoAlpha: 0, y: isDesktop ? 48 : 24 });

          ScrollTrigger.batch(items, {
            start: "top 88%",
            once: true,
            interval: 0.1,
            batchMax: 4,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.12,
                overwrite: true,
                // lepas layer GPU setelah selesai
                clearProps: "transform,opacity,visibility",
              }),
          });

          // 2) Parallax tipis, hanya desktop
          if (isDesktop) {
            gsap.utils
              .toArray<HTMLElement>("[data-scroll-parallax]")
              .forEach((el) => {
                const amount = Number(el.dataset.scrollParallax) || 40;
                gsap.fromTo(
                  el,
                  { y: -amount },
                  {
                    y: amount,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                    },
                  },
                );
              });
          }
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

  return null;
}