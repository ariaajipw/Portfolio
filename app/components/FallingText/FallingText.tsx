"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Body } from "matter-js";

type Trigger = "auto" | "scroll" | "click" | "hover";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: Trigger;
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  className?: string;
}

type MatterModule = typeof import("matter-js");

const WALL = 100; // ketebalan dinding fisika (px)

/**
 * Kata-kata dirender normal (flex, rata tengah) sampai trigger aktif.
 * Saat trigger: ukur SEMUA kata dulu, baru ubah jadi absolute. Semua posisi
 * (awal dan tiap frame) memakai satu sistem koordinat: titik tengah body
 * Matter.js, dipasang lewat transform, tanpa left/top dinamis.
 */
const FallingText = ({
  text = "",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  className = "",
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  // Props fisika dibaca saat start, tanpa memicu efek ulang
  const optsRef = useRef({ gravity, mouseConstraintStiffness, wireframes });
  optsRef.current = { gravity, mouseConstraintStiffness, wireframes };

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const host = canvasHostRef.current;
    if (!container || !textEl || !host) return;

    // Hormati preferensi pengurangan gerakan: teks tetap statis
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let started = false;
    let disposed = false;
    let stopPhysics: (() => void) | undefined;
    const teardownTriggers: Array<() => void> = [];

    const start = async () => {
      if (started) return;
      started = true;

      // Matter.js hanya diunduh saat benar-benar dibutuhkan
      const mod = await import("matter-js");
      const M: MatterModule =
        (mod as unknown as { default?: MatterModule }).default ?? mod;

      // Tunggu font final supaya ukuran kata akurat
      if (document.fonts?.ready) await document.fonts.ready;
      if (disposed) return;

      const { gravity, mouseConstraintStiffness, wireframes } = optsRef.current;

      const cRect = container.getBoundingClientRect();
      let width = Math.round(cRect.width);
      let height = Math.round(cRect.height);
      if (!width || !height) {
        started = false; // belum punya ukuran; coba lagi pada trigger berikutnya
        return;
      }

      // 1) UKUR semua kata lebih dulu, sebelum mengubah apa pun
      const wordEls = Array.from(textEl.children) as HTMLElement[];
      const measured = wordEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          w: r.width,
          h: r.height,
          cx: r.left - cRect.left + r.width / 2,
          cy: r.top - cRect.top + r.height / 2,
        };
      });

      // 2) Baru bekukan: absolute, titik asal 0,0, posisi lewat transform
      for (const { el, cx, cy } of measured) {
        el.style.position = "absolute";
        el.style.left = "0";
        el.style.top = "0";
        el.style.margin = "0";
        el.style.whiteSpace = "nowrap";
        el.style.willChange = "transform";
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }

      // 3) Dunia fisika
      const engine = M.Engine.create();
      engine.gravity.y = gravity;

      const makeWalls = (w: number, h: number) => [
        M.Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, {
          isStatic: true,
        }),
        M.Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 4, { isStatic: true }),
        M.Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 4, {
          isStatic: true,
        }),
        M.Bodies.rectangle(w / 2, -WALL / 2, w + WALL * 2, WALL, {
          isStatic: true,
        }),
      ];
      let walls = makeWalls(width, height);
      M.Composite.add(engine.world, walls);

      const items: Array<{ el: HTMLElement; body: Body }> = measured.map(
        ({ el, w, h, cx, cy }) => {
          const body = M.Bodies.rectangle(
            Math.min(Math.max(cx, w / 2), Math.max(width - w / 2, w / 2)),
            Math.min(Math.max(cy, h / 2), Math.max(height - h / 2, h / 2)),
            w,
            h,
            {
              render: { fillStyle: "transparent", lineWidth: 0 },
              restitution: 0.8,
              frictionAir: 0.01,
              friction: 0.2,
            },
          );
          M.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
          M.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
          return { el, body };
        },
      );
      M.Composite.add(
        engine.world,
        items.map((i) => i.body),
      );

      // 4) Canvas: hanya sebagai target mouse (atau wireframe untuk debug)
      let render: import("matter-js").Render | undefined;
      let canvas: HTMLCanvasElement;
      if (wireframes) {
        render = M.Render.create({
          element: host,
          engine,
          options: {
            width,
            height,
            pixelRatio: 1,
            background: "transparent",
            wireframeBackground: "transparent",
            wireframes: true,
          },
        });
        M.Render.run(render);
        canvas = render.canvas;
      } else {
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        host.appendChild(canvas);
      }
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      // Drag dengan mouse hanya di perangkat pointer halus; di ponsel
      // canvas tidak boleh menahan scroll halaman.
      const canDrag = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      if (canDrag) {
        host.style.pointerEvents = "auto";
        const mouse = M.Mouse.create(canvas);
        const m = mouse as unknown as {
          element: HTMLElement;
          mousewheel: EventListener;
        };
        // biarkan roda mouse tetap men-scroll halaman
        m.element.removeEventListener("mousewheel", m.mousewheel);
        m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        const mouseConstraint = M.MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: mouseConstraintStiffness,
            render: { visible: false },
          },
        });
        M.Composite.add(engine.world, mouseConstraint);
        if (render) render.mouse = mouse;
      } else {
        host.style.pointerEvents = "none";
      }

      // 5) Sinkronkan DOM tiap langkah fisika (hanya transform)
      M.Events.on(engine, "afterUpdate", () => {
        for (const { el, body } of items) {
          const { x, y } = body.position;
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
        }
      });

      const runner = M.Runner.create();
      M.Runner.run(runner, engine);

      // Hemat CPU: jeda simulasi saat di luar layar
      const io = new IntersectionObserver(([entry]) => {
        runner.enabled = entry.isIntersecting;
      });
      io.observe(container);

      // Ikuti perubahan ukuran container
      const ro = new ResizeObserver(() => {
        const r = container.getBoundingClientRect();
        const w = Math.round(r.width);
        const h = Math.round(r.height);
        if (!w || !h || (w === width && h === height)) return;
        width = w;
        height = h;
        M.Composite.remove(engine.world, walls);
        walls = makeWalls(w, h);
        M.Composite.add(engine.world, walls);
        canvas.width = w;
        canvas.height = h;
        if (render) {
          render.options.width = w;
          render.options.height = h;
          render.bounds.max.x = w;
          render.bounds.max.y = h;
        }
      });
      ro.observe(container);

      stopPhysics = () => {
        io.disconnect();
        ro.disconnect();
        M.Runner.stop(runner);
        if (render) M.Render.stop(render);
        M.Composite.clear(engine.world, false);
        M.Engine.clear(engine);
        canvas.remove();
      };
      if (disposed) stopPhysics();
    };

    const run = () => void start();

    if (trigger === "auto") {
      run();
    } else if (trigger === "scroll") {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      io.observe(container);
      teardownTriggers.push(() => io.disconnect());
    } else if (trigger === "click") {
      container.addEventListener("click", run, { once: true });
      teardownTriggers.push(() => container.removeEventListener("click", run));
    } else if (trigger === "hover") {
      container.addEventListener("mouseenter", run, { once: true });
      // layar sentuh tidak punya hover: ketuk pertama memicu animasi
      container.addEventListener("touchstart", run, {
        once: true,
        passive: true,
      });
      teardownTriggers.push(() => {
        container.removeEventListener("mouseenter", run);
        container.removeEventListener("touchstart", run);
      });
    }

    return () => {
      disposed = true;
      teardownTriggers.forEach((fn) => fn());
      stopPhysics?.();
    };
  }, [trigger, text]);



  return (
    <div
      ref={containerRef}
      className={`relative h-[96px] w-full min-w-0 overflow-visible sm:h-[104px] ${
        trigger === "click" ? "cursor-pointer" : ""
      } ${className}`}
      style={{ backgroundColor }}
    >  
      <div
        ref={textRef}
        className="relative flex h-full w-full flex-wrap content-center items-center justify-center gap-x-[0.3em]"
        style={{
          fontSize,
          lineHeight: 1.35,
          overflowWrap: "normal",
        }}
      >
        {words.map((word, i) => {
          const isHighlighted = highlightWords.some((h) =>
            word.startsWith(h)
          );

          return (
            <span
              key={`${word}-${i}`}
              className={`inline-block select-none ${
                isHighlighted ? highlightClass : ""
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>

      <div
        ref={canvasHostRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
};

export default FallingText;