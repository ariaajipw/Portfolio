"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
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

const RESIZE_DEBOUNCE_MS = 120;

const dist = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  return Math.sqrt(dx * dx + dy * dy);
};

const getResponsiveMinFontSize = () => {
  const width = window.innerWidth;

  if (width >= 1536) return 64;
  if (width >= 1280) return 56;
  if (width >= 1024) return 48;
  if (width >= 768) return 40;
  if (width >= 640) return 36;

  return 32;
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  fontFamily = "Roboto Flex",
  fontUrl =
    "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,wdth@8..144,100..1000,25..151&display=swap",

  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,

  textColor = "#000000",
  strokeColor = "#FF0000",
  strokeWidth = 2,

  className = "",
  minFontSize = 48,

  darkMode = false,
  darkTextColor = "#FFFFFF",
  darkStrokeColor = "#00FFFF",
  darkBackground = "transparent",

  colorCycle = [],
  colorCycleDuration = 2000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const scopeClass = `tp-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const [systemDarkMode, setSystemDarkMode] = useState(false);

  const chars = text.split("");

  /*
   * Detect dark mode dari:
   *
   * <html class="dark">
   *
   * MutationObserver digunakan supaya ketika user
   * menekan tombol dark/light mode, TextPressure
   * langsung ikut berubah.
   */
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");

      setSystemDarkMode(isDark);
    };

    // Check saat pertama kali render
    checkDarkMode();

    // Pantau perubahan class pada <html>
    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Jika darkMode={true}, paksa dark mode.
   * Jika darkMode={false}, ikuti class "dark" dari <html>.
   */
  const isDarkMode = darkMode || systemDarkMode;

  /*
   * Mouse / Touch tracking
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];

      if (!t) return;

      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;

      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /*
   * Responsive font size
   *
   * Semakin lebar container,
   * semakin besar font.
   */
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    /*
     * Ukuran font dibuat besar dan responsive
     * berdasarkan lebar container.
     */
    let newFontSize =
      (containerRect.width / chars.length) * 3.8;

    /*
     * Tetap memiliki minimum font size
     * berdasarkan ukuran layar.
     */
    newFontSize = Math.max(
      newFontSize,
      getResponsiveMinFontSize()
    );

    setFontSize(newFontSize);

    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;

      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio =
          containerRect.height / textRect.height;

        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, scale]);

  /*
   * Recalculate font ketika ukuran browser berubah.
   */
  useEffect(() => {
    setSize();

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(
        setSize,
        RESIZE_DEBOUNCE_MS
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [setSize]);

  /*
   * TextPressure mouse animation
   */
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / 15;

      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect =
          titleRef.current.getBoundingClientRect();

        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();

          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(
            mouseRef.current,
            charCenter
          );

          const getAttr = (
            distance: number,
            minVal: number,
            maxVal: number
          ) => {
            const val =
              maxVal -
              Math.abs(
                (maxVal * distance) /
                  (maxDist * 0.5)
              );

            return Math.max(
              minVal,
              val + minVal / 2
            );
          };

          const wdth = width
            ? Math.floor(getAttr(d, 5, 200))
            : 100;

          const wght = weight
            ? Math.floor(getAttr(d, 100, 900))
            : 400;

          const italVal = italic
            ? getAttr(d, 0, 1).toFixed(2)
            : "0";

          const alphaVal = alpha
            ? getAttr(d, 0, 1).toFixed(2)
            : "1";

          const next =
            `'wght' ${wght}, ` +
            `'wdth' ${wdth}, ` +
            `'ital' ${italVal}`;

          if (
            span.style.fontVariationSettings !== next
          ) {
            span.style.fontVariationSettings = next;
          }

          if (
            alpha &&
            span.style.opacity !== alphaVal
          ) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, [
    width,
    weight,
    italic,
    alpha,
    chars.length,
  ]);

  /*
   * Color cycle
   */
  const [
    currentColorIndex,
    setCurrentColorIndex,
  ] = useState(0);

  useEffect(() => {
    if (
      !Array.isArray(colorCycle) ||
      colorCycle.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentColorIndex(
        (prev) =>
          (prev + 1) % colorCycle.length
      );
    }, colorCycleDuration);

    return () => clearInterval(interval);
  }, [
    colorCycle,
    colorCycleDuration,
  ]);

  /*
   * Dark / Light colors
   */
  const currentStrokeColor = isDarkMode
    ? darkStrokeColor
    : strokeColor;

  const currentBackground = isDarkMode
    ? darkBackground
    : "transparent";

  const baseTextColor = isDarkMode
    ? darkTextColor
    : textColor;

  /*
   * Jika colorCycle kosong:
   *
   * Light → #000000
   * Dark  → #FFFFFF
   *
   * Jika colorCycle digunakan:
   * warna mengikuti colorCycle.
   */
  const dynamicTextColor =
    colorCycle.length > 0
      ? colorCycle[currentColorIndex]
      : baseTextColor;

  const transitionDuration =
    (colorCycleDuration / 1000) * 0.1;

  return (
    <div
      ref={containerRef}
      className={`${scopeClass} relative w-full h-full overflow-hidden`}
      style={{
        backgroundColor: currentBackground,
      }}
    >
      <style id={scopeClass}>
        {`
          @import url('${fontUrl}');

          .${scopeClass} .text-pressure-title span {
            transition:
              color ${transitionDuration}s ease-in-out;
          }

          .${scopeClass} .stroke span {
            position: relative;
            color: ${dynamicTextColor};
          }

          .${scopeClass} .stroke span::after {
            content: attr(data-char);
            position: absolute;
            left: 0;
            top: 0;
            color: transparent;
            z-index: -99;

            -webkit-text-stroke-width:
              ${strokeWidth}px;

            -webkit-text-stroke-color:
              ${currentStrokeColor};

            transition:
              -webkit-text-stroke-color
              0.3s ease;
          }
        `}
      </style>

      <h1
        ref={titleRef}
        className={`
          text-pressure-title
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

          fontWeight: 100,

          color: stroke
            ? undefined
            : dynamicTextColor,

          gap: "5px",

          transition:
            "color 0.3s ease",
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
            style={{
              color: dynamicTextColor,

              transition:
                `color ${transitionDuration}s ease-in-out`,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;