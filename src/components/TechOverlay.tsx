import { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';

interface PerformanceMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
}

const TechOverlay = memo(({ isVisible }: { isVisible: boolean }) => {
    // Refs for DOM nodes to avoid React render cycle for high-frequency updates
    const mouseRef = useRef<HTMLSpanElement>(null);
    const fpsRef = useRef<HTMLSpanElement>(null);
    const memRef = useRef<HTMLSpanElement>(null);
    const scrollRef = useRef<HTMLSpanElement>(null);

    // State for low-frequency updates
    const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
    const [networkType, setNetworkType] = useState<string>('Unknown');

    // FPS Calculation Variables
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const fps = useRef(0);

    // Initial Window Size & Network
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight });

            // @ts-ignore - Network Information API
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (conn) {
                setNetworkType(conn.effectiveType || '4g');
            }
        }

        const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // High-frequency updates using Framer Motion's useAnimationFrame
    // This runs callback every frame, synced with React's render cycle efficiently
    useAnimationFrame((time) => {
        if (!isVisible) return;

        // 1. FPS Calculation
        frameCount.current++;
        if (time - lastTime.current >= 1000) {
            fps.current = Math.round((frameCount.current * 1000) / (time - lastTime.current));
            if (fpsRef.current) {
                fpsRef.current.textContent = fps.current.toString();
                // Color code FPS
                fpsRef.current.style.color = fps.current < 30 ? '#ef4444' : fps.current < 55 ? '#eab308' : 'var(--theme-text-secondary)';
            }
            frameCount.current = 0;
            lastTime.current = time;
        }

        // 2. Memory Usage (Chrome specific)
        // @ts-ignore
        if (performance.memory && memRef.current && frameCount.current % 60 === 0) { // Update memory rarely
            // @ts-ignore
            const mem = performance.memory as PerformanceMemory;
            const used = Math.round(mem.usedJSHeapSize / 1024 / 1024);
            memRef.current.textContent = `${used}MB`;
        }

        // 3. Scroll Progress
        if (scrollRef.current) {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            const progress = total > 0 ? Math.round((current / total) * 100) : 0;
            scrollRef.current.textContent = `${progress}%`;
        }
    });

    // Mouse is best handled via native event listener to capture it even if frame drops
    useEffect(() => {
        if (!isVisible) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (mouseRef.current) {
                mouseRef.current.textContent = `X:${e.clientX.toString().padStart(4, '0')} Y:${e.clientY.toString().padStart(4, '0')}`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 pointer-events-none select-none font-mono text-[10px] tracking-wide"
                >
                    {/* Main HUD Bar */}
                    <div
                        className="px-4 py-2 rounded-lg flex items-center gap-4 shadow-2xl backdrop-blur-xl border border-white/10 relative overflow-hidden"
                        style={{
                            background: 'var(--theme-dock-bg)', // Consistent with Dock
                            color: 'var(--theme-text-secondary)',
                        }}
                    >
                        {/* Grid Background Effect */}
                        <div className="absolute inset-0 z-0 opacity-[0.03]"
                            style={{ backgroundImage: 'linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                        />

                        {/* System Status */}
                        <div className="flex items-center gap-2 relative z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="font-bold text-emerald-500">ONLINE</span>
                        </div>

                        <div className="w-[1px] h-3 bg-white/10 relative z-10" />

                        {/* FPS */}
                        <div className="flex items-center gap-1.5 relative z-10">
                            <span className="opacity-50">FPS</span>
                            <span ref={fpsRef}>60</span>
                        </div>

                        <div className="w-[1px] h-3 bg-white/10 relative z-10" />

                        {/* Memory (if available) */}
                        <div className="flex items-center gap-1.5 relative z-10">
                            <span className="opacity-50">MEM</span>
                            <span ref={memRef}>--</span>
                        </div>

                        <div className="w-[1px] h-3 bg-white/10 relative z-10" />

                        {/* Network */}
                        <div className="flex items-center gap-1.5 relative z-10">
                            <span className="opacity-50">NET</span>
                            <span className="uppercase">{networkType}</span>
                        </div>
                    </div>

                    {/* Secondary Info Row (Coordinates & Scroll) */}
                    <div className="flex items-center justify-between gap-2 px-1">
                        <div
                            className="px-3 py-1.5 rounded-md flex items-center gap-2 backdrop-blur-md border border-white/5"
                            style={{ background: 'rgba(0,0,0,0.4)' }}
                        >
                            <span ref={mouseRef} className="opacity-80 tabular-nums">X:0000 Y:0000</span>
                        </div>

                        <div
                            className="px-3 py-1.5 rounded-md flex items-center gap-2 backdrop-blur-md border border-white/5"
                            style={{ background: 'rgba(0,0,0,0.4)' }}
                        >
                            <span className="opacity-50">SCR</span>
                            <span ref={scrollRef} className="tabular-nums">0%</span>
                        </div>

                        <div
                            className="px-3 py-1.5 rounded-md flex items-center gap-2 backdrop-blur-md border border-white/5"
                            style={{ background: 'rgba(0,0,0,0.4)' }}
                        >
                            <span className="opacity-50">VP</span>
                            <span className="tabular-nums">{windowSize.w}x{windowSize.h}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default TechOverlay;
