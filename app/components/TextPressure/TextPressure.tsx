"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

interface TextPressureProps {
  text?: string;
  /**
   * Tag HTML untuk pembungkus huruf. Default "div" supaya komponen ini TIDAK
   * menambah <h1> (satu halaman cukup punya satu <h1>, lihat app/page.tsx).
   */
  as?: React.ElementType;
  /** Nilai CSS font-family. Default memakai variabel dari next/font (lihat app/page.tsx). */
  fontFamily?: string;
  /** Opsional. Kalau diisi, stylesheet font eksternal dimuat manual (tidak disarankan). */
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
  darkMode?: boolean;
  darkTextColor?: string;
  darkStrokeColor?: string;
  darkBackground?: string;
  colorCycle?: string[];
  colorCycleDuration?: number;
}

const SETTLE_EPSILON = 0.05;

/* ---------- Font loader (hanya dipakai kalau fontUrl diisi) ---------- */
const fontCssCache = new Map<string, Promise<void>>();

const loadFontCss = (url: string): Promise<void> => {
  if (typeof document === "undefined" || !url) return Promise.resolve();

  const cached = fontCssCache.get(url);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });

  fontCssCache.set(url, promise);
  return promise;
};

/* Hanya dipakai mode `scale`; di mode biasa ukuran font dihitung CSS (cqw). */
const getResponsiveMinFontSize = () => {
  const w = window.innerWidth;

  if (w >= 1536) return 64;
  if (w >= 1280) return 56;
  if (w >= 1024) return 48;
  if (w >= 768) return 40;
  if (w >= 640) return 36;

  return 32;
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  as: Tag = "div",
  fontFamily = 'var(--font-roboto-flex), "Roboto Flex"',
  fontUrl = "",

  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,

  textColor = "",
  strokeColor = "#FF0000",
  strokeWidth = 6,

  className = "",
  minFontSize = 48,

  darkMode = false,
  darkTextColor = "",
  darkStrokeColor = "#00FFFF",
  darkBackground = "transparent",

  colorCycle = [],
  colorCycleDuration = 2000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const pointerModeRef = useRef<"pointer" | "scroll">("pointer");

  const rafRef = useRef(0);
  const visibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  /* true selama belum ada mouse/touch/scroll: teks diam dalam keadaan tipis (dari CSS) */
  const parkedRef = useRef(true);
  /* faktor penyusutan horizontal (1 = tidak menyusut) supaya teks tidak keluar container */
  const fitRef = useRef(1);

  /* Opsi terbaru disimpan di ref supaya fungsi frame() stabil (tidak dibuat ulang) */
  const optionsRef = useRef({ width, weight, italic, alpha });
  optionsRef.current = { width, weight, italic, alpha };

  const scopeClass = `tp-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [fontSize, setFontSize] = useState<number | null>(null);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  /*
   * Satu frame animasi.
   * 1) BACA semua posisi dulu (satu kali layout)
   * 2) baru TULIS semua style
   * Loop berhenti sendiri kalau posisi sudah diam, dan jalan lagi saat ada
   * mouse/scroll. Loop juga mati kalau elemen tidak terlihat.
   */
  const frame = useCallback(() => {
    rafRef.current = 0;

    const title = titleRef.current;
    if (!title || !visibleRef.current) return;

    const titleRect = title.getBoundingClientRect();
    if (titleRect.width === 0) return; // elemen disembunyikan (display: none)

    /*
     * Ukuran "asli" teks (tanpa penyusutan di bawah). clientWidth tidak
     * terpengaruh transform, jadi rumus jarak tidak ikut bergeser.
     */
    const fit = fitRef.current;
    const baseWidth = title.clientWidth;

    if (pointerModeRef.current === "scroll") {
      const viewportH = window.innerHeight;
      const progress = Math.min(
        Math.max((viewportH - titleRect.top) / (viewportH + titleRect.height), 0),
        1
      );

      cursorRef.current.x = titleRect.left + progress * baseWidth;
      cursorRef.current.y = titleRect.top + titleRect.height / 2;
    }

    mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
    mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

    const maxDist = baseWidth / 2;
    const spans = spansRef.current;
    const { width: useWidth, weight: useWeight, italic: useItalic, alpha: useAlpha } =
      optionsRef.current;

    /* --- BACA --- */
    const contentWidth = title.scrollWidth;
    const centers: ({ x: number; y: number } | null)[] = new Array(spans.length);

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span) {
        centers[i] = null;
        continue;
      }
      const rect = span.getBoundingClientRect();
      /* kembalikan ke koordinat sebelum penyusutan (origin di kiri) */
      centers[i] = {
        x: titleRect.left + (rect.x - titleRect.left) / fit + rect.width / fit / 2,
        y: rect.y + rect.height / 2,
      };
    }

    /* --- TULIS --- */
    const getAttr = (distance: number, minVal: number, maxVal: number) => {
      const val = maxVal - Math.abs((maxVal * distance) / (maxDist * 0.5));
      return Math.max(minVal, val + minVal / 2);
    };

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const c = centers[i];
      if (!span || !c) continue;

      const dx = mouseRef.current.x - c.x;
      const dy = mouseRef.current.y - c.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      const wdth = useWidth ? Math.floor(getAttr(d, 40, 200)) : 100;
      const wght = useWeight ? Math.floor(getAttr(d, 200, 900)) : 400;
      const italVal = useItalic ? getAttr(d, 0, 1).toFixed(2) : "0";
      const alphaVal = useAlpha ? getAttr(d, 0, 1).toFixed(2) : "1";

      const next = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

      if (span.style.fontVariationSettings !== next) {
        span.style.fontVariationSettings = next;
      }

      if (useAlpha && span.style.opacity !== alphaVal) {
        span.style.opacity = alphaVal;
      }
    }

    /*
     * Kalau huruf yang melebar membuat isi teks lebih lebar dari container,
     * susutkan horizontal supaya selalu muat (tidak ada huruf terpotong).
     */
    const nextFit = contentWidth > baseWidth + 1 ? baseWidth / contentWidth : 1;
    const fitChanged = Math.abs(nextFit - fit) > 0.001;

    if (fitChanged) {
      fitRef.current = nextFit;
      title.style.setProperty(
        "scale",
        nextFit === 1 ? "" : `${nextFit.toFixed(4)} 1`
      );
    }

    /* Lanjut hanya kalau masih bergerak atau penyusutan belum stabil */
    const settled =
      Math.abs(cursorRef.current.x - mouseRef.current.x) < SETTLE_EPSILON &&
      Math.abs(cursorRef.current.y - mouseRef.current.y) < SETTLE_EPSILON;

    if (!settled || fitChanged) {
      rafRef.current = requestAnimationFrame(frame);
    }
  }, []);

  /*
   * Jadwalkan satu frame. Selama belum ada interaksi (parked) tidak ada yang
   * perlu dihitung: teks sudah tampil tipis lewat CSS, jadi load awal bebas
   * dari kerja JS animasi.
   */
  const kick = useCallback(() => {
    if (
      rafRef.current ||
      parkedRef.current ||
      !visibleRef.current ||
      reducedMotionRef.current
    ) {
      return;
    }
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  /* ---------- Mouse / Touch / Scroll tracking + visibilitas ---------- */
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Interaksi pertama: mulai dari posisi "parkir" (di luar kiri teks) */
    const unpark = () => {
      if (!parkedRef.current) return;
      parkedRef.current = false;

      const title = titleRef.current;
      if (!title) return;

      const r = title.getBoundingClientRect();
      mouseRef.current.x = r.left - title.clientWidth;
      mouseRef.current.y = r.top + r.height / 2;
    };

    const handleMouseMove = (e: MouseEvent) => {
      unpark();
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      pointerModeRef.current = "pointer";
      kick();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;

      unpark();
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
      pointerModeRef.current = "pointer";
      kick();
    };

    const handleScroll = () => {
      unpark();
      pointerModeRef.current = "scroll";
      kick();
    };

    if (!reducedMotionRef.current) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    /* Matikan loop saat hero keluar layar (atau disembunyikan lewat CSS) */
    let observer: IntersectionObserver | undefined;

    if (containerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        visibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          kick();
        } else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [kick]);

  /*
   * Ukuran font dihitung CSS (cqw) sejak HTML pertama, jadi di mode biasa
   * tidak ada yang perlu diukur lewat JS. Hanya mode `scale` yang memakainya.
   */
  const measure = useCallback(() => {
    if (!scale) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const next = Math.max(
      (containerRect.width / chars.length) * 4.0,
      getResponsiveMinFontSize()
    );

    setFontSize(next);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;

      const textRect = titleRef.current.getBoundingClientRect();

      if (textRect.height > 0) {
        const yRatio = containerRect.height / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, scale]);

  /* Pantau perubahan lebar container (berjalan setelah paint, bukan sebelum) */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    measure();

    let lastWidth = container.getBoundingClientRect().width;

    const ro = new ResizeObserver(() => {
      const w = container.getBoundingClientRect().width;
      if (Math.abs(w - lastWidth) < 0.5) return;

      lastWidth = w;
      measure();
      kick(); // ukuran huruf berubah, sesuaikan ulang variasi font
    });

    ro.observe(container);

    return () => ro.disconnect();
  }, [measure, kick]);

  /* Stylesheet font eksternal (opsional, tidak dipakai di situs ini) */
  useEffect(() => {
    if (fontUrl) void loadFontCss(fontUrl);
  }, [fontUrl]);

  /* ---------- Color cycle (opsional) ---------- */
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(colorCycle) || colorCycle.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorCycle.length);
    }, colorCycleDuration);

    return () => clearInterval(interval);
  }, [colorCycle, colorCycleDuration]);

  const cycleColor =
    colorCycle.length > 0 ? colorCycle[currentColorIndex] : undefined;

  /*
   * WARNA: semuanya lewat CSS, tanpa state JS.
   * - Light : textColor, atau var(--text-primary) kalau kosong
   * - Dark  : html.dark + darkTextColor (kalau diisi), kalau kosong ikut
   *           var(--text-primary) yang sudah berubah otomatis dari globals.css
   *
   * UKURAN & BENTUK AWAL juga dari CSS (bukan JS), supaya teks langsung benar
   * di HTML pertama: font-size lewat cqw, variasi font = keadaan "tipis"
   * (sama persis dengan hasil frame() saat pointer jauh dari huruf).
   */
  const transitionDuration =
    colorCycle.length > 1 ? (colorCycleDuration / 1000) * 0.1 : 0.18;

  const darkSel = darkMode ? `.${scopeClass}` : `html.dark .${scopeClass}`;

  const css = `
    .${scopeClass} {
      background-color: transparent;
    }

    .${scopeClass} .tp-title {
      font-size: ${minFontSize}px;
      font-size: max(calc(100cqw / ${chars.length} * 4), 32px);
    }

    @media (min-width: 640px) {
      .${scopeClass} .tp-title {
        font-size: max(calc(100cqw / ${chars.length} * 4), 36px);
      }
    }

    @media (min-width: 768px) {
      .${scopeClass} .tp-title {
        font-size: max(calc(100cqw / ${chars.length} * 4), 40px);
      }
    }

    @media (min-width: 1024px) {
      .${scopeClass} .tp-title {
        font-size: max(calc(100cqw / ${chars.length} * 4), 48px);
      }
    }

    @media (min-width: 1280px) {
      .${scopeClass} .tp-title {
        font-size: max(calc(100cqw / ${chars.length} * 4), 56px);
      }
    }

    @media (min-width: 1536px) {
      .${scopeClass} .tp-title {
        font-size: max(calc(100cqw / ${chars.length} * 4), 64px);
      }
    }

    .${scopeClass} .tp-title span {
      font-variation-settings: 'wght' ${weight ? 200 : 400}, 'wdth' ${width ? 40 : 100}, 'ital' 0;
    }

    .${scopeClass} .tp-title {
      color: ${textColor || "var(--text-primary)"};
    }

    .${scopeClass} .tp-title,
    .${scopeClass} .tp-title span {
      transition: color ${transitionDuration}s ease-in-out;
    }

    .${scopeClass} .stroke span {
      position: relative;
    }

    .${scopeClass} .stroke span::after {
      content: attr(data-char);
      position: absolute;
      left: 0;
      top: 0;
      color: transparent;
      z-index: -99;
      -webkit-text-stroke-width: ${strokeWidth}px;
      -webkit-text-stroke-color: ${strokeColor};
      transition: -webkit-text-stroke-color 0.18s ease;
    }

    ${darkSel} {
      background-color: ${darkBackground};
    }

    ${
      darkTextColor
        ? `${darkSel} .tp-title { color: ${darkTextColor}; }`
        : ""
    }

    ${darkSel} .stroke span::after {
      -webkit-text-stroke-color: ${darkStrokeColor};
    }
  `;

  return (
    <div
      ref={containerRef}
      className={`${scopeClass} relative w-full h-full overflow-hidden`}
      style={{ containerType: "inline-size" }}
    >
      <style>{css}</style>

      <Tag
        ref={titleRef}
        className={`
          tp-title
          ${className}
          ${flex ? "flex justify-between" : ""}
          ${stroke ? "stroke" : ""}
          text-center
        `}
        style={{
          fontFamily: `${fontFamily}, sans-serif`,
          fontSize: fontSize !== null ? `${fontSize}px` : undefined,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "left top",
          margin: 0,
          fontWeight: 200,
          gap: "5px",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) {
                spansRef.current[i] = el;
              }

              return () => {
                spansRef.current[i] = null;
              };
            }}
            data-char={char}
            className="inline-block"
            style={cycleColor ? { color: cycleColor } : undefined}
          >
            {char}
          </span>
        ))}
      </Tag>
    </div>
  );
};

export default TextPressure;