'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, DependencyList, Key, ReactNode, RefObject } from 'react';

export type LogoItem =
  | {
      node: ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export type LogoLoopDirection = 'left' | 'right' | 'up' | 'down';

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: LogoLoopDirection;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : value;

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void,
  elements: Array<RefObject<Element | null>>,
  dependencies: DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (
  seqRef: RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: DependencyList
) => {
  useEffect(() => {
    const images = Array.from(seqRef.current?.querySelectorAll('img') ?? []);

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;
    const handleImageLoad = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad, { once: true });
        img.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    const applyTransform = () => {
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      applyTransform();
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        const next = offsetRef.current + velocityRef.current * deltaTime;
        offsetRef.current = ((next % seqSize) + seqSize) % seqSize;
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor = 'var(--bg-primary, #ffffff)',
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Logo loop',
  className,
  style
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === 'up'
        ? 1
        : -1
      : direction === 'left'
        ? 1
        : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect();
    const sequenceWidth = rect?.width ?? 0;
    const sequenceHeight = rect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const targetHeight = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${targetHeight}px`) {
          containerRef.current.style.height = `${targetHeight}px`;
        }
      }
      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        const viewport = containerRef.current?.clientHeight || parentHeight || sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVariables = useMemo(
    () =>
      ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        '--logoloop-fadeColor': fadeOutColor
      }) as CSSProperties,
    [gap, logoHeight, fadeOutColor]
  );

  const rootClasses = useMemo(
    () =>
      cx(
        'relative group',
        isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
        scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
        className
      ),
    [isVertical, scaleOnHover, className]
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const itemClasses = useMemo(
    () =>
      cx(
        'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
        isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
        scaleOnHover && 'overflow-visible group/item'
      ),
    [isVertical, scaleOnHover]
  );

  const hoverScale =
    'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-[1.2]';

   const renderLogoItem = useCallback(
     (item: LogoItem, key: Key, isCopy = false) => {
      if (renderItem) {
        return (
          <li className={itemClasses} key={key}>
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = 'node' in item;

      const content = isNodeItem ? (
        <span
          className={cx(
            'inline-flex items-center',
            'motion-reduce:transition-none',
            scaleOnHover && hoverScale
          )}
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      ) : (
        <img
          className={cx(
            'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
            '[-webkit-user-drag:none] pointer-events-none',
            '[image-rendering:-webkit-optimize-contrast]',
            'motion-reduce:transition-none',
            scaleOnHover && hoverScale
          )}
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

      const inner = item.href ? (
        <a
          className={cx(
            'inline-flex items-center no-underline rounded',
            'transition-opacity duration-200 ease-linear',
            'hover:opacity-80',
            'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
          )}
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          tabIndex={isCopy ? -1 : undefined}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li className={itemClasses} key={key}>
          {inner}
        </li>
      );
    },
    [itemClasses, scaleOnHover, renderItem]
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className={cx('flex items-center m-0 p-0 list-none', isVertical && 'flex-col')}
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`, copyIndex > 0)
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem, isVertical]
  );

  const containerStyle = useMemo((): CSSProperties => {
    const w = toCssLength(width);
    return {
      width: isVertical ? (w === '100%' ? undefined : w) : (w ?? '100%'),
      ...cssVariables,
      ...style
    };
  }, [width, cssVariables, style, isVertical]);

  const fadeBase = 'pointer-events-none absolute z-10';
  const fadeSize = isVertical ? 'h-[clamp(24px,8%,120px)]' : 'w-[clamp(24px,8%,120px)]';

  return (
    <div ref={containerRef} className={rootClasses} style={containerStyle} role="region" aria-label={ariaLabel}>
      {fadeOut && (
        <>
          <div
            aria-hidden
            className={cx(
              fadeBase,
              fadeSize,
              isVertical ? 'inset-x-0 top-0' : 'inset-y-0 left-0',
              isVertical
                ? 'bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor)_0%,transparent_100%)]'
                : 'bg-[linear-gradient(to_right,var(--logoloop-fadeColor)_0%,transparent_100%)]'
            )}
          />
          <div
            aria-hidden
            className={cx(
              fadeBase,
              fadeSize,
              isVertical ? 'inset-x-0 bottom-0' : 'inset-y-0 right-0',
              isVertical
                ? 'bg-[linear-gradient(to_top,var(--logoloop-fadeColor)_0%,transparent_100%)]'
                : 'bg-[linear-gradient(to_left,var(--logoloop-fadeColor)_0%,transparent_100%)]'
            )}
          />
        </>
      )}

      <div
        className={cx(
          'flex will-change-transform select-none relative z-0',
          'motion-reduce:transform-none',
          isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'
        )}
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;