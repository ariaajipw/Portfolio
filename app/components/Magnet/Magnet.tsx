'use client'

import React, { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

/*
 * Versi lama memanggil setState di SETIAP mousemove di seluruh window, jadi
 * React re-render terus walau kursor jauh dari tombol. Sekarang:
 * - gerakan ditulis langsung ke style elemen (tanpa state / re-render)
 * - dibatasi satu kali per frame lewat requestAnimationFrame
 * - tidak menulis ulang kalau posisinya tidak berubah
 */
const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let isActive = false;
    let x = 0;
    let y = 0;

    const apply = (nextX: number, nextY: number, nextActive: boolean) => {
      if (nextX === x && nextY === y && nextActive === isActive) return;

      x = nextX;
      y = nextY;
      isActive = nextActive;

      inner.style.transition = nextActive ? activeTransition : inactiveTransition;
      inner.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };

    if (disabled) {
      apply(0, 0, false);
      return;
    }

    let rafId = 0;
    let clientX = 0;
    let clientY = 0;

    const update = () => {
      rafId = 0;
      const el = magnetRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - clientX);
      const distY = Math.abs(centerY - clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        apply(
          (clientX - centerX) / magnetStrength,
          (clientY - centerY) / magnetStrength,
          true
        );
      } else {
        apply(0, 0, false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: 'translate3d(0px, 0px, 0)',
          transition: inactiveTransition,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;