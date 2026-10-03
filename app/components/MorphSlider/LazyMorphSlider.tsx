"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import type MorphSliderComponent from "./MorphSlider";

type MorphSliderProps = ComponentProps<typeof MorphSliderComponent>;

/*
 * MorphSlider (WebGL + ogl + gsap) berada di bawah hero, jadi:
 * - kodenya dipisah ke chunk sendiri (next/dynamic, tanpa SSR)
 * - baru dimuat ketika mendekati layar (IntersectionObserver)
 * Placeholder punya warna sama dengan slider, jadi tidak ada layout shift.
 */
const MorphSlider = dynamic(() => import("./MorphSlider"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0c0c0e]" />,
});

export default function LazyMorphSlider(props: MorphSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full bg-[#0c0c0e]">
      {show ? <MorphSlider {...props} /> : null}
    </div>
  );
}