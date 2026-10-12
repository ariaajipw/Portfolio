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
   * Tag HTML untuk pembungkus teks.
   * Default div agar tidak menambah heading H1 baru.
   */
  as?: React.ElementType;

  /**
   * CSS font-family.
   * Default menggunakan variabel font dari next/font.
   */
  fontFamily?: string;

  /**
   * Opsional: URL stylesheet font eksternal.
   * Sebaiknya gunakan next/font jika memungkinkan.
   */
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
const MIN_CONTAINER_WIDTH = 1;

/**
 * useLayoutEffect di browser agar pengukuran dilakukan sebelum paint.
 * useEffect di server agar tidak memunculkan warning SSR.
 */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ---------- Font loader ---------- */

const fontCssCache = new Map<string, Promise<void>>();

const loadFontCss = (url: string): Promise<void> => {
  if (typeof document === "undefined" || !url) {
    return Promise.resolve();
  }

  const cached = fontCssCache.get(url);

  if (cached) {
    return cached;
  }

  const promise = new Promise<void>((resolve) => {
    const existing = Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel="stylesheet"]'
      )
    ).find((link) => link.href === new URL(url, document.baseURI).href);

    if (existing) {
      if (existing.sheet) {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), {
        once: true,
      });

      existing.addEventListener("error", () => resolve(), {
        once: true,
      });

      return;
    }

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

/**
 * Tunggu font selesai dimuat, tetapi jangan menahan teks terlalu lama
 * jika font eksternal gagal atau koneksi lambat.
 */
const waitForFont = async (
  title: HTMLElement | null,
  url: string,
  text: string
): Promise<void> => {
  if (typeof document === "undefined") {
    return;
  }

  const task = (async () => {
    if (url) {
      await loadFontCss(url);
    }

    if (title && document.fonts?.load) {
      const family = getComputedStyle(title).fontFamily;

      await document.fonts.load(`200 1em ${family}`, text);
    }
  })();

  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, FONT_TIMEOUT_MS);
  });

  try {
    await Promise.race([task, timeout]);
  } catch {
    // Tetap tampilkan teks jika pemuatan font gagal.
  }
};

/* ---------- Responsive font sizing ---------- */

const getResponsiveMinFontSize = (): number => {
  const width = window.innerWidth;

  if (width >= 1536) return 64;
  if (width >= 1280) return 56;
  if (width >= 1024) return 48;
  if (width >= 768) return 40;
  if (width >= 640) return 36;

  return 32;
};

/* ---------- Component ---------- */

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
  /* ---------- DOM refs ---------- */

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLElement>(null);

  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  /* ---------- Pointer refs ---------- */

  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorRef = useRef({
    x: 0,
    y: 0,
  });

  const pointerModeRef = useRef<"pointer" | "scroll">("pointer");

  /* ---------- Animation refs ---------- */

  const rafRef = useRef(0);

  const visibleRef = useRef(true);

  const reducedMotionRef = useRef(false);

  /**
   * Pointer virtual dimulai di luar teks.
   * Berubah menjadi false ketika pengguna berinteraksi.
   */
  const parkedRef = useRef(true);

  /**
   * Faktor penyusutan horizontal.
   * 1 berarti ukuran normal.
   */
  const fitRef = useRef(1);

  /**
   * Menyimpan opsi terbaru tanpa membuat ulang frame()
   * pada setiap perubahan props.
   */
  const optionsRef = useRef({
    width,
    weight,
    italic,
    alpha,
  });

  optionsRef.current = {
    width,
    weight,
    italic,
    alpha,
  };

  const scopeClass = `tp-${useId().replace(
    /[^a-zA-Z0-9_-]/g,
    ""
  )}`;

  /* ---------- React state ---------- */

  const [fontSize, setFontSize] = useState<number | null>(null);

  const [scaleY, setScaleY] = useState(1);

  const [lineHeight, setLineHeight] = useState(1);

  const [ready, setReady] = useState(false);

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const chars = text.split("");

  const charCount = Math.max(chars.length, 1);

  /* ---------- Animation frame ---------- */

  const frame = useCallback(() => {
    rafRef.current = 0;

    const title = titleRef.current;

    if (
      !title ||
      !visibleRef.current ||
      reducedMotionRef.current
    ) {
      return;
    }

    const titleRect = title.getBoundingClientRect();

    if (titleRect.width === 0) {
      return;
    }

    /**
     * clientWidth tidak terpengaruh oleh CSS individual scale.
     * Karena itu, nilai ini dipakai sebagai lebar dasar.
     */
    const baseWidth = title.clientWidth;

    if (baseWidth < MIN_CONTAINER_WIDTH) {
      return;
    }

    const fit = fitRef.current;

    /* ---------- Posisi pointer awal ---------- */

    /**
     * Sebelum interaksi, letakkan pointer virtual di luar teks.
     *
     * Jangan mengembalikan pointer ke posisi ini setelah mouse
     * mulai bergerak.
     */
    if (parkedRef.current) {
      const parkedX = titleRect.left - baseWidth;
      const parkedY = titleRect.top + titleRect.height / 2;

      cursorRef.current.x = parkedX;
      cursorRef.current.y = parkedY;

      mouseRef.current.x = parkedX;
      mouseRef.current.y = parkedY;
    }

    /* ---------- Scroll interaction ---------- */

    if (pointerModeRef.current === "scroll") {
      const viewportHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(
          (viewportHeight - titleRect.top) /
            (viewportHeight + titleRect.height),
          0
        ),
        1
      );

      cursorRef.current.x =
        titleRect.left + progress * baseWidth;

      cursorRef.current.y =
        titleRect.top + titleRect.height / 2;
    }

    /* ---------- Smooth pointer movement ---------- */

    const smoothing = 15;

    mouseRef.current.x +=
      (cursorRef.current.x - mouseRef.current.x) / smoothing;

    mouseRef.current.y +=
      (cursorRef.current.y - mouseRef.current.y) / smoothing;

    /* ---------- Animation configuration ---------- */

    const spans = spansRef.current;

    const {
      width: useWidth,
      weight: useWeight,
      italic: useItalic,
      alpha: useAlpha,
    } = optionsRef.current;

    /**
     * Radius pengaruh pointer.
     * Semakin kecil radius, semakin lokal efek tekanan.
     */
    const influenceRadius = Math.max(baseWidth * 0.25, 1);

    /* ---------- READ PHASE ---------- */

    /**
     * Baca posisi seluruh huruf sebelum mengubah style.
     * Ini membantu menghindari layout thrashing.
     */
    const centers: Array<{
      x: number;
      y: number;
    } | null> = new Array(spans.length);

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (!span) {
        centers[i] = null;
        continue;
      }

      const rect = span.getBoundingClientRect();

      /**
       * Konversi koordinat kembali ke ruang sebelum scale.
       * Transform horizontal menggunakan origin di sebelah kiri.
       */
      centers[i] = {
        x:
          titleRect.left +
          (rect.left - titleRect.left) / fit +
          rect.width / fit / 2,

        y: rect.top + rect.height / 2,
      };
    }

    /* ---------- WRITE PHASE ---------- */

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const center = centers[i];

      if (!span || !center) {
        continue;
      }

      const dx = mouseRef.current.x - center.x;
      const dy = mouseRef.current.y - center.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /**
       * Nilai 0 sampai 1.
       *
       * 1 = pointer tepat di dekat huruf.
       * 0 = pointer di luar radius pengaruh.
       */
      const proximity = Math.max(
        0,
        1 - distance / influenceRadius
      );

      /**
       * Smoothstep untuk transisi tekanan yang lebih halus.
       */
      const pressure =
        proximity * proximity * (3 - 2 * proximity);

      const wdth = useWidth
        ? Math.round(40 + pressure * (200 - 40))
        : 100;

      const wght = useWeight
        ? Math.round(200 + pressure * (900 - 200))
        : 400;

      const italVal = useItalic
        ? pressure.toFixed(2)
        : "0";

      const alphaVal = useAlpha
        ? (0.35 + pressure * 0.65).toFixed(2)
        : "1";

      const nextVariation =
        `'wght' ${wght}, ` +
        `'wdth' ${wdth}, ` +
        `'ital' ${italVal}`;

      if (
        span.style.fontVariationSettings !== nextVariation
      ) {
        span.style.fontVariationSettings = nextVariation;
      }

      if (useAlpha && span.style.opacity !== alphaVal) {
        span.style.opacity = alphaVal;
      } else if (
        !useAlpha &&
        span.style.opacity !== "1"
      ) {
        span.style.opacity = "1";
      }
    }

    /* ---------- Fit text into container ---------- */

    /**
     * Ukur lebar aktual setelah variasi font diperbarui.
     * Pembacaan dilakukan setelah seluruh penulisan style.
     */
    const contentWidth = title.scrollWidth;

    const nextFit =
      contentWidth > baseWidth + 1
        ? baseWidth / contentWidth
        : 1;

    const fitChanged =
      Math.abs(nextFit - fit) > 0.001;

    if (fitChanged) {
      fitRef.current = nextFit;

      title.style.setProperty(
        "scale",
        nextFit === 1
          ? ""
          : `${nextFit.toFixed(4)} 1`
      );
    }

    /* ---------- Continue only while necessary ---------- */

    const settled =
      Math.abs(
        cursorRef.current.x - mouseRef.current.x
      ) < SETTLE_EPSILON &&
      Math.abs(
        cursorRef.current.y - mouseRef.current.y
      ) < SETTLE_EPSILON;

    if (!settled || fitChanged) {
      rafRef.current = requestAnimationFrame(frame);
    }
  }, []);

  /* ---------- Schedule animation ---------- */

  const kick = useCallback(() => {
    if (
      rafRef.current ||
      !visibleRef.current ||
      reducedMotionRef.current
    ) {
      return;
    }

    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  /* ---------- Mouse, touch, scroll and visibility ---------- */

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    reducedMotionRef.current = motionQuery.matches;

    const handleMotionPreferenceChange = (
      event: MediaQueryListEvent
    ) => {
      reducedMotionRef.current = event.matches;

      if (event.matches) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }

        /**
         * Reset to a readable, static appearance.
         */
        fitRef.current = 1;

        titleRef.current?.style.setProperty("scale", "");

        spansRef.current.forEach((span) => {
          if (!span) return;

          span.style.fontVariationSettings = "";
          span.style.opacity = "1";
        });
      } else {
        parkedRef.current = true;
        kick();
      }
    };

    motionQuery.addEventListener(
      "change",
      handleMotionPreferenceChange
    );

    /* ---------- Mouse ---------- */

    const handleMouseMove = (event: MouseEvent) => {
      parkedRef.current = false;

      cursorRef.current.x = event.clientX;
      cursorRef.current.y = event.clientY;

      pointerModeRef.current = "pointer";

      kick();
    };

    /* ---------- Touch ---------- */

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      parkedRef.current = false;

      cursorRef.current.x = touch.clientX;
      cursorRef.current.y = touch.clientY;

      pointerModeRef.current = "pointer";

      kick();
    };

    /* ---------- Scroll ---------- */

    const handleScroll = () => {
      parkedRef.current = false;

      pointerModeRef.current = "scroll";

      kick();
    };

    if (!reducedMotionRef.current) {
      window.addEventListener(
        "mousemove",
        handleMouseMove,
        { passive: true }
      );

      window.addEventListener(
        "touchmove",
        handleTouchMove,
        { passive: true }
      );

      window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
      );
    }

    /* ---------- Initial pointer position ---------- */

    if (containerRef.current) {
      const rect =
        containerRef.current.getBoundingClientRect();

      const initialX = rect.left + rect.width / 2;
      const initialY = rect.top + rect.height / 2;

      mouseRef.current.x = initialX;
      mouseRef.current.y = initialY;

      cursorRef.current.x = initialX;
      cursorRef.current.y = initialY;
    }

    /* ---------- Intersection observer ---------- */

    let observer: IntersectionObserver | undefined;

    if (
      containerRef.current &&
      "IntersectionObserver" in window
    ) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry) {
          return;
        }

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

    /* ---------- Cleanup ---------- */

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      motionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );

      observer?.disconnect();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [kick]);

  /* ---------- Responsive font measurement ---------- */

  const measure = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    if (containerRect.width === 0) {
      return;
    }

    /**
     * Ukuran font mengikuti lebar container dan jumlah karakter.
     */
    const calculatedSize =
      (containerRect.width / charCount) * 4;

    const nextSize = Math.max(
      calculatedSize,
      getResponsiveMinFontSize()
    );

    setFontSize(nextSize);

    setScaleY(1);
    setLineHeight(1);

    if (!scale) {
      return;
    }

    requestAnimationFrame(() => {
      const title = titleRef.current;

      if (!title) {
        return;
      }

      const textRect = title.getBoundingClientRect();

      if (textRect.height <= 0) {
        return;
      }

      const yRatio =
        containerRect.height / textRect.height;

      if (!Number.isFinite(yRatio) || yRatio <= 0) {
        return;
      }

      setScaleY(yRatio);
      setLineHeight(yRatio);
    });
  }, [charCount, scale]);

  /* ---------- Observe container resizing ---------- */

  useIsoLayoutEffect(() => {
    measure();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    let lastWidth =
      container.getBoundingClientRect().width;

    const observer = new ResizeObserver(() => {
      const currentWidth =
        container.getBoundingClientRect().width;

      if (
        Math.abs(currentWidth - lastWidth) < 0.5
      ) {
        return;
      }

      lastWidth = currentWidth;

      measure();

      /**
       * Jika ukuran berubah, hitung ulang tekanan font.
       */
      kick();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [measure, kick]);

  /* ---------- Font readiness ---------- */

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      await waitForFont(
        titleRef.current,
        fontUrl,
        text
      );

      if (cancelled) {
        return;
      }

      measure();

      requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }

        setReady(true);

        /**
         * Jalankan frame awal hanya jika animasi diizinkan.
         * Pointer virtual diparkir di luar teks.
         */
        if (
          !reducedMotionRef.current &&
          visibleRef.current
        ) {
          kick();
        }
      });
    };

    void initialize();

    return () => {
      cancelled = true;
    };
  }, [fontUrl, text, measure, kick]);

  /* ---------- Optional color cycle ---------- */

  useEffect(() => {
    if (
      !Array.isArray(colorCycle) ||
      colorCycle.length <= 1 ||
      colorCycleDuration <= 0
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentColorIndex(
        (previous) =>
          (previous + 1) % colorCycle.length
      );
    }, colorCycleDuration);

    return () => {
      window.clearInterval(interval);
    };
  }, [colorCycle, colorCycleDuration]);

  const cycleColor =
    colorCycle.length > 0
      ? colorCycle[
          currentColorIndex % colorCycle.length
        ]
      : undefined;

  /* ---------- Theme and CSS ---------- */

  const transitionDuration =
    colorCycle.length > 1
      ? (colorCycleDuration / 1000) * 0.1
      : 0.18;

  const darkSelector = darkMode
    ? `.${scopeClass}`
    : `html.dark .${scopeClass}`;

  const css = `
    .${scopeClass} {
      background-color: transparent;
    }

    .${scopeClass} .tp-title {
      font-size: ${minFontSize}px;
      font-size: max(
        calc(100cqw / ${charCount} * 4),
        32px
      );

      color: ${textColor || "var(--text-primary)"};
    }

    @media (min-width: 640px) {
      .${scopeClass} .tp-title {
        font-size: max(
          calc(100cqw / ${charCount} * 4),
          36px
        );
      }
    }

    @media (min-width: 768px) {
      .${scopeClass} .tp-title {
        font-size: max(
          calc(100cqw / ${charCount} * 4),
          40px
        );
      }
    }

    @media (min-width: 1024px) {
      .${scopeClass} .tp-title {
        font-size: max(
          calc(100cqw / ${charCount} * 4),
          48px
        );
      }
    }

    @media (min-width: 1280px) {
      .${scopeClass} .tp-title {
        font-size: max(
          calc(100cqw / ${charCount} * 4),
          56px
        );
      }
    }

    @media (min-width: 1536px) {
      .${scopeClass} .tp-title {
        font-size: max(
          calc(100cqw / ${charCount} * 4),
          64px
        );
      }
    }

    .${scopeClass} .tp-title,
    .${scopeClass} .tp-title span {
      transition:
        color ${transitionDuration}s ease-in-out;
    }

    .${scopeClass} .tp-title span {
      flex-shrink: 0;
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

      z-index: -1;

      -webkit-text-stroke-width: ${strokeWidth}px;
      -webkit-text-stroke-color: ${strokeColor};

      transition:
        -webkit-text-stroke-color 0.18s ease;
    }

    ${darkSelector} {
      background-color: ${darkBackground};
    }

    ${
      darkTextColor
        ? `
          ${darkSelector} .tp-title {
            color: ${darkTextColor};
          }
        `
        : ""
    }

    ${darkSelector} .stroke span::after {
      -webkit-text-stroke-color: ${darkStrokeColor};
    }

    @media (prefers-reduced-motion: reduce) {
      .${scopeClass} .tp-title,
      .${scopeClass} .tp-title span {
        transition: none;
      }
    }
  `;

  /* ---------- Render ---------- */

  return (
    <div
      ref={containerRef}
      className={`${scopeClass} relative w-full h-full overflow-hidden`}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 200ms ease",
        containerType: "inline-size",
      }}
    >
      <style>{css}</style>

      <Tag
        ref={titleRef}
        className={[
          "tp-title",
          className,
          flex ? "flex justify-between" : "",
          stroke ? "stroke" : "",
          "text-center",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          fontFamily: `${fontFamily}, sans-serif`,
          fontSize:
            fontSize !== null
              ? `${fontSize}px`
              : undefined,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "left top",
          margin: 0,
          fontWeight: 200,
          gap: "5px",
        }}
      >
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            ref={(element) => {
              spansRef.current[index] = element;
            }}
            data-char={char}
            className="inline-block"
            style={
              cycleColor
                ? { color: cycleColor }
                : undefined
            }
          >
            {char}
          </span>
        ))}
      </Tag>
    </div>
  );
};

export default TextPressure;