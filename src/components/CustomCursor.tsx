import { useEffect, useRef } from 'react';

/**
 * CustomCursor — High-end Dual Layer Inversion Cursor
 * 
 * Includes:
 * 1. Inner Dot — Rapid follow
 * 2. Outer Ring — Elastic/Smooth follow with lag
 * 3. Magnetic Hover States
 * 4. Contextual Labels
 */

const TEXT_INPUT = 'input, textarea, [contenteditable]';

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: -100, y: -100 });
    const dotPos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });

    const raf = useRef<number>(0);
    const isVisible = useRef(false);
    const state = useRef('default');

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            if (!isVisible.current) {
                isVisible.current = true;
                dot.style.opacity = '1';
                ring.style.opacity = '1';

                // Initialize position instantly to prevent fly-in
                dotPos.current.x = e.clientX;
                dotPos.current.y = e.clientY;
                ringPos.current.x = e.clientX;
                ringPos.current.y = e.clientY;
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Simplified Interactive Check
            // Strict Interactive Check
            const isText = target.matches(TEXT_INPUT) || target.closest(TEXT_INPUT);
            const isLogo = target.closest('#logo');

            // Only consider anchors with href and non-disabled buttons
            const isLink = target.closest('a[href]') || target.closest('button:not([disabled])');
            if (isText) {
                state.current = 'text';
                ring.dataset.state = 'text';
            } else if (isLogo) {
                state.current = 'logo';
                ring.dataset.state = 'logo';
            } else if (isLink) {
                state.current = 'hover';
                ring.dataset.state = 'hover';
            } else {
                state.current = 'default';
                ring.dataset.state = 'default';
            }
        };

        const onMouseDown = () => { ring.dataset.pressed = 'true'; };
        const onMouseUp = () => { ring.dataset.pressed = 'false'; };
        const onMouseLeave = () => {
            isVisible.current = false;
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        };

        const animate = () => {
            // Inner Dot follows fast
            dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.4;
            dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.4;
            dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;

            // Outer Ring follows with smooth lag
            const ringSpeed = state.current === 'hover' ? 0.15 : 0.1;
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringSpeed;
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringSpeed;
            ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

            raf.current = requestAnimationFrame(animate);
        };
        raf.current = requestAnimationFrame(animate);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};

export default CustomCursor;
