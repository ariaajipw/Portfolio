"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

const FONT_TIMEOUT_MS = 2000;
const SETTLE_EPSILON = 0.05;

/* useLayoutEffect di client (sebelum paint), useEffect di server (tanpa warning) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

/*
 * Tunggu font siap. Family diambil dari computed style elemen judul, jadi cocok
 * dengan nama font hasil next/font (yang di-hash) tanpa perlu hardcode.
 */
const waitForFont = async (
  title: HTMLElement | null,
  url: string,
  text: string
) => {
  if (typeof document === "undefined") return;

  const task = (async () => {
    if (url) await loadFontCss(url);
    if (title && document.fonts?.load) {
      const family = getComputedStyle(title).fontFamily;
      await document.fonts.load(`200 1em ${family}`, text);
    }
  })();

  const timeout = new Promise<void>((resolve) =>
    setTimeout(resolve, FONT_TIMEOUT_MS)
  );

  try {
    await Promise.race([task, timeout]);
  } catch {
    // Tetap tampilkan teks walau font gagal dimuat.
  }
};

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

  /* Opsi terbaru disimpan di ref supaya fungsi frame() stabil (tidak dibuat ulang) */
  const optionsRef = useRef({ width, weight, italic, alpha });
  optionsRef.current = { width, weight, italic, alpha };

  const scopeClass = `tp-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [ready, setReady] = useState(false);

  const chars = text.split("");

  /*
   * Satu frame animasi.
   * 1) BACA semua posisi dulu (satu kali layout)
   * 2) baru TULIS semua style
   * Versi lama membaca lalu menulis bergantian per huruf, sehingga browser
   * dipaksa hitung ulang layout berkali-kali di setiap frame.
   * Loop berhenti sendiri kalau posisi sudah diam, dan jalan lagi saat ada
   * mouse/scroll. Loop juga mati kalau elemen tidak terlihat.
   */
  const frame = useCallback(() => {
    rafRef.current = 0;

    const title = titleRef.current;
    if (!title || !visibleRef.current) return;

    const titleRect = title.getBoundingClientRect();
    if (titleRect.width === 0) return; // elemen disembunyikan (display: none)

    if (pointerModeRef.current === "scroll") {
      const viewportH = window.innerHeight;
      const progress = Math.min(
        Math.max((viewportH - titleRect.top) / (viewportH + titleRect.height), 0),
        1
      );

      cursorRef.current.x = titleRect.left + progress * titleRect.width;
      cursorRef.current.y = titleRect.top + titleRect.height / 2;
    }

    mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
    mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

    const maxDist = titleRect.width / 2;
    const spans = spansRef.current;
    const { width: useWidth, weight: useWeight, italic: useItalic, alpha: useAlpha } =
      optionsRef.current;

    /* --- BACA --- */
    const centers: ({ x: number; y: number } | null)[] = new Array(spans.length);

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span) {
        centers[i] = null;
        continue;
      }
      const rect = span.getBoundingClientRect();
      centers[i] = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
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

    /* Lanjut hanya kalau masih bergerak */
    const settled =
      Math.abs(cursorRef.current.x - mouseRef.current.x) < SETTLE_EPSILON &&
      Math.abs(cursorRef.current.y - mouseRef.current.y) < SETTLE_EPSILON;

    if (!settled) {
      rafRef.current = requestAnimationFrame(frame);
    }
  }, []);

  /* Jadwalkan satu frame (kalau belum dijadwalkan, terlihat, dan gerak diizinkan) */
  const kick = useCallback(() => {
    if (rafRef.current || !visibleRef.current || reducedMotionRef.current) {
      return;
    }
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  /* ---------- Mouse / Touch / Scroll tracking + visibilitas ---------- */
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      pointerModeRef.current = "pointer";
      kick();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;

      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
      pointerModeRef.current = "pointer";
      kick();
    };

    const handleScroll = () => {
      pointerModeRef.current = "scroll";
      kick();
    };

    if (!reducedMotionRef.current) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
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

  /* ---------- Ukuran font (berdasarkan lebar container) ---------- */
  const measure = useCallback(() => {
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

    if (!scale) return;

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

  /* Hitung sebelum paint + pantau perubahan lebar container */
  useIsoLayoutEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

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

  /* Tampilkan setelah font siap + ukuran sudah dihitung */
  useEffect(() => {
    let cancelled = false;

    waitForFont(titleRef.current, fontUrl, text).then(() => {
      if (cancelled) return;

      measure();
      requestAnimationFrame(() => {
        if (cancelled) return;

        setReady(true);

        /* Satu frame awal supaya variasi font langsung terpasang,
           juga untuk pengguna prefers-reduced-motion (tampilan statis). */
        if (!rafRef.current && visibleRef.current) {
          rafRef.current = requestAnimationFrame(frame);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [fontUrl, text, measure, frame]);

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
   * Jadi tidak ada flash warna salah saat render awal / refresh.
   */
  const transitionDuration =
    colorCycle.length > 1 ? (colorCycleDuration / 1000) * 0.1 : 0.18;

  const darkSel = darkMode ? `.${scopeClass}` : `html.dark .${scopeClass}`;

  const css = `
    .${scopeClass} {
      background-color: transparent;
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
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
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
          fontSize: `${fontSize}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
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