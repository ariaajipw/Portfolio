"use client";

import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";
import { whenIdle } from "./WhenIdle";

/**
 * Smooth scroll untuk seluruh situs.
 *
 * Keputusan performa:
 * - Hanya aktif untuk perangkat dengan pointer halus (mouse/trackpad).
 *   Di ponsel, scroll sentuh native tetap dipakai: lebih responsif,
 *   hemat baterai, dan tidak menambah loop rAF.
 * - Dilewati jika pengguna memilih prefers-reduced-motion.
 * - lenis + gsap dimuat dinamis saat browser idle, jadi tidak masuk
 *   jalur render awal (LCP/TBT).
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const canSmooth =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canSmooth) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const start = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

      // Sinkronisasi resmi Lenis <-> GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    const cancelIdle = whenIdle(() => void start(), {
      timeout: 2000,
      fallbackDelay: 800,
    });

    return () => {
      cancelled = true;
      cancelIdle();
      teardown?.();
    };
  }, []);

  return <>{children}</>;
}