"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import type BlurTextComponent from "../BlurText/BlurText";
import type FallingTextComponent from "../FallingText/FallingText";
import type { LogoLoopProps } from "../LogoLoop/LogoLoop";
import MorphSliderBase from "../MorphSlider/LazyMorphSlider";

/*
 * Komponen berat di bawah fold baru diunduh & dijalankan saat dibutuhkan.
 * Sampai itu, yang tampil adalah teks/placeholder statis dengan tinggi yang
 * sama, jadi isi tetap ada di HTML (SEO) dan tidak ada layout shift. Setelah
 * dimuat, perilaku dan animasinya sama persis dengan sebelumnya.
 */
const BlurText = dynamic(() => import("../BlurText/BlurText"));
const FallingText = dynamic(() => import("../FallingText/FallingText"));
const LogoLoop = dynamic(() => import("../LogoLoop/LogoLoop"));

const INPUT_EVENTS = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

type OnViewProps = {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  className?: string;
  /**
   * Selain saat mendekati layar, muat juga begitu pengunjung pertama kali
   * scroll / sentuh / menekan tombol (dijalankan saat browser idle). Dipakai
   * untuk widget berat yang pasti akan dilihat setelah scroll.
   */
  loadOnFirstInput?: boolean;
};

function OnView({
  children,
  fallback,
  rootMargin = "400px 0px",
  className,
  loadOnFirstInput = false,
}: OnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    let done = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin }
    );

    function stop() {
      done = true;
      io.disconnect();
      INPUT_EVENTS.forEach((name) => window.removeEventListener(name, onInput));
    }

    function reveal() {
      if (done) return;
      stop();
      setShow(true);
    }

    function onInput() {
      INPUT_EVENTS.forEach((name) => window.removeEventListener(name, onInput));

      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(reveal, { timeout: 1500 });
      } else {
        window.setTimeout(reveal, 300);
      }
    }

    io.observe(el);

    if (loadOnFirstInput) {
      INPUT_EVENTS.forEach((name) =>
        window.addEventListener(name, onInput, { passive: true })
      );
    }

    return stop;
  }, [rootMargin, loadOnFirstInput]);

  return (
    <div ref={ref} className={className}>
      {show ? children : fallback}
    </div>
  );
}

export function LazyBlurText(props: ComponentProps<typeof BlurTextComponent>) {
  return (
    <OnView fallback={<p className={props.className}>{props.text}</p>}>
      <BlurText {...props} />
    </OnView>
  );
}

export function LazyFallingText(
  props: ComponentProps<typeof FallingTextComponent>
) {
  return (
    <OnView
      fallback={
        <div
          className="w-full pt-8 text-center"
          style={{ fontSize: props.fontSize, lineHeight: 1.4 }}
        >
          {props.text}
        </div>
      }
    >
      <FallingText {...props} />
    </OnView>
  );
}

export function LazyLogoLoop(props: LogoLoopProps) {
  /* tinggi baris logo (+10% atas/bawah kalau scaleOnHover), sama dengan LogoLoop asli */
  const rowHeight = Math.round(
    (props.logoHeight ?? 28) * (props.scaleOnHover ? 1.2 : 1)
  );

  return (
    <OnView
      rootMargin="300px 0px"
      fallback={<div aria-hidden="true" style={{ height: rowHeight }} />}
    >
      <LogoLoop {...props} />
    </OnView>
  );
}

/*
 * MorphSlider (WebGL) berada di bawah hero (min-h-dvh), jadi tidak terlihat
 * saat load. Dimuat saat pengunjung mulai scroll/berinteraksi, atau saat
 * slider masuk layar. Wadahnya di page.tsx sudah punya tinggi tetap, jadi
 * placeholder kosong ini tidak menyebabkan layout shift.
 */
export function DeferredMorphSlider(
  props: ComponentProps<typeof MorphSliderBase>
) {
  return (
    <OnView
      className="h-full w-full"
      rootMargin="0px"
      loadOnFirstInput
      fallback={null}
    >
      <MorphSliderBase {...props} />
    </OnView>
  );
}