"use client";

import { useEffect, useRef, useState } from 'react';

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
}

const TextPressure: React.FC<TextPressureProps> = ({
    text = 'Compressa',
    fontFamily = 'Compressa VF',
    fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor = '#000000',
    strokeColor = '#FF0000',
    strokeWidth = 2,
    className = '',
    minFontSize = 300,
    darkMode = false,
    darkTextColor = '#FFFFFF',
    darkStrokeColor = '#00FFFF',
    darkBackground = 'transparent',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);
    const [responsiveMinFontSize, setResponsiveMinFontSize] = useState(minFontSize);

    const chars = text.split('');

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const updateResponsiveMinFontSize = () => {
        const width = window.innerWidth;

        if (width >= 1536) {
            setResponsiveMinFontSize(400);
        } else if (width >= 1280) {
            setResponsiveMinFontSize(350);
        } else if (width >= 1024) {
            setResponsiveMinFontSize(280);
        } else if (width >= 768) {
            setResponsiveMinFontSize(200);
        } else if (width >= 640) {
            setResponsiveMinFontSize(150);
        } else {
            setResponsiveMinFontSize(125);
        }
    };

    useEffect(() => {
        updateResponsiveMinFontSize();
        window.addEventListener('resize', updateResponsiveMinFontSize);
        return () => window.removeEventListener('resize', updateResponsiveMinFontSize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = rect.left + rect.width / 1;
            mouseRef.current.y = rect.top + rect.height / 1;
            cursorRef.current.x = mouseRef.current.x;
            cursorRef.current.y = mouseRef.current.y;
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const setSize = () => {
        if (!containerRef.current || !titleRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let newFontSize = containerRect.width / (chars.length / 1.5);
        newFontSize = Math.max(newFontSize, responsiveMinFontSize);

        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);

        requestAnimationFrame(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0) {
                const yRatio = containerRect.height / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
        });
    };

    useEffect(() => {
        setSize();
        window.addEventListener('resize', setSize);
        return () => window.removeEventListener('resize', setSize);
    }, [scale, text, responsiveMinFontSize]);

    useEffect(() => {
        let rafId: number;
        const animate = () => {
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = titleRect.width / 2;

                spansRef.current.forEach((span) => {
                    if (!span) return;

                    const rect = span.getBoundingClientRect();
                    const charCenter = {
                        x: rect.x + rect.width / 2,
                        y: rect.y + rect.height / 2,
                    };

                    const d = dist(mouseRef.current, charCenter);

                    const getAttr = (distance: number, minVal: number, maxVal: number) => {
                        const val = maxVal - Math.abs((maxVal * distance) / (maxDist * 0.5));
                        return Math.max(minVal, val + minVal / 2);
                    };

                    const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                    const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                    const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : '0';
                    const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : '1';

                    span.style.opacity = alphaVal;
                    span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, [width, weight, italic, alpha, chars.length]);

    // Determine colors based on dark mode
    const currentTextColor = darkMode ? darkTextColor : textColor;
    const currentStrokeColor = darkMode ? darkStrokeColor : strokeColor;
    const currentBackground = darkMode ? darkBackground : 'transparent';

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden"
            style={{ backgroundColor: currentBackground }}
        >
            <style>{`
                @font-face {
                    font-family: '${fontFamily}';
                    src: url('${fontUrl}');
                    font-style: normal;
                }
                .stroke span {
                    position: relative;
                    color: ${currentTextColor};
                    transition: color 0.3s ease;
                }
                .stroke span::after {
                    content: attr(data-char);
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: transparent;
                    z-index: -99;
                    -webkit-text-stroke-width: ${strokeWidth}px;
                    -webkit-text-stroke-color: ${currentStrokeColor};
                    transition: -webkit-text-stroke-color 0.3s ease;
                }
            `}</style>
            <h1
                ref={titleRef}
                className={`text-pressure-title ${className} ${flex ? 'flex justify-between' : ''} ${
                    stroke ? 'stroke' : ''
                } text-center`}
                style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    fontWeight: 100,
                    color: stroke ? undefined : currentTextColor,
                    gap: '5px',
                    transition: 'color 0.3s ease',
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
                        // Cleanup function
                        spansRef.current[i] = null;
                    };
                    }}
                    data-char={char}
                    className="inline-block"
                >
                    {char}
                </span>
                ))}
            </h1>
        </div>
    );
};

export default TextPressure;