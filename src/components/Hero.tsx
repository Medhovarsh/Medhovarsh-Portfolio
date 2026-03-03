import { useRef, useEffect, memo } from 'react';
import {
    motion,
    useTransform,
    useScroll,
} from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ── ParticleSphere ──
 * Uses ResizeObserver on its own container div so it always reacts to
 * ANY layout change — window resize, CSS breakpoint switch, grid relayout, etc.
 * The sphere radius scales with the smaller of width/height so it always fits.
 */
const ParticleSphere = memo(() => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;

        const particleCount = 200;
        const particles: any[] = [];
        const baseSize = 1.2;
        const maxLineDist = 60;
        const maxLineDistSq = maxLineDist * maxLineDist;

        // Derived from container size — updated on every resize
        let sphereRadius = 140;

        const applySize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = wrap.clientWidth;
            const h = wrap.clientHeight;
            if (w === 0 || h === 0) return;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Scale sphere so it always fits inside the container with padding
            sphereRadius = Math.min(w, h) * 0.38;
            // Re-initialise particle positions relative to new radius
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.baseX = p._nx * sphereRadius;
                p.baseY = p._ny * sphereRadius;
                p.baseZ = p._nz * sphereRadius;
                p.x = p.baseX; p.y = p.baseY; p.z = p.baseZ;
                p.vx = 0; p.vy = 0; p.vz = 0;
            }
        };

        // Build particles with stored unit-sphere normal (_nx, _ny, _nz)
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const nx = Math.sin(phi) * Math.cos(theta);
            const ny = Math.sin(phi) * Math.sin(theta);
            const nz = Math.cos(phi);
            particles.push({
                _nx: nx, _ny: ny, _nz: nz,
                x: nx * sphereRadius, y: ny * sphereRadius, z: nz * sphereRadius,
                baseX: nx * sphereRadius, baseY: ny * sphereRadius, baseZ: nz * sphereRadius,
                vx: 0, vy: 0, vz: 0,
            });
        }

        // Initial size
        applySize();

        // ResizeObserver reacts to any container-size change, not just window
        const ro = new ResizeObserver(() => applySize());
        ro.observe(wrap);

        // Theme awareness
        let isDarkMode = !document.documentElement.classList.contains('light');
        const themeObserver = new MutationObserver(() => {
            isDarkMode = !document.documentElement.classList.contains('light');
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        let angleX = 0;
        let angleY = 0;
        let targetAngleX = 0.0015;
        let targetAngleY = 0.002;

        let mouseX = -9999;
        let mouseY = -9999;
        let isHovering = false;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isHovering = true;
            targetAngleX = 0.0015 + ((mouseY / rect.height) - 0.5) * 0.01;
            targetAngleY = 0.002 + ((mouseX / rect.width) - 0.5) * 0.01;
        };
        const handleMouseLeave = () => {
            mouseX = -9999; mouseY = -9999; isHovering = false;
            targetAngleX = 0.0015; targetAngleY = 0.002;
        };

        canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
        canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

        const spring = 0.03;
        const friction = 0.85;
        const hoverForce = 6;
        const maxHoverDist = 120;

        const draw = () => {
            const cw = canvas.clientWidth;
            const ch = canvas.clientHeight;
            if (cw === 0 || ch === 0) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, cw, ch);
            const centerX = cw / 2;
            const centerY = ch / 2;

            angleX += targetAngleX * 0.1;
            angleY += targetAngleY * 0.1;

            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            const projected = particles.map(p => {
                const ax = (p.baseX - p.x) * spring;
                const ay = (p.baseY - p.y) * spring;
                const az = (p.baseZ - p.z) * spring;
                p.vx += ax; p.vy += ay; p.vz += az;

                const tempX = p.x * cosY - p.z * sinY;
                const tempZ = p.z * cosY + p.x * sinY;
                const tempY = p.y * cosX - tempZ * sinX;
                const finalZ = tempZ * cosX + p.y * sinX;

                const screenX = centerX + tempX;
                const screenY = centerY + tempY;

                if (isHovering) {
                    const dx = screenX - mouseX;
                    const dy = screenY - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxHoverDist * maxHoverDist) {
                        const dist = Math.sqrt(distSq) || 1;
                        const force = (maxHoverDist - dist) / maxHoverDist;
                        p.vx += (dx / dist) * force * hoverForce;
                        p.vy += (dy / dist) * force * hoverForce;
                        p.vz -= force * hoverForce;
                    }
                }

                p.vx *= friction; p.vy *= friction; p.vz *= friction;
                p.x += p.vx; p.y += p.vy; p.z += p.vz;

                return { x: tempX, y: tempY, z: finalZ };
            });

            projected.sort((a, b) => a.z - b.z);
            ctx.lineWidth = 0.5;
            const dotColor = isDarkMode ? '129, 140, 248' : '79, 70, 229';
            const lineColor = '99, 102, 241';

            for (let i = 0; i < projected.length; i++) {
                const p = projected[i];
                const scale = (sphereRadius + p.z) / (sphereRadius * 2);
                if (scale < 0.1) continue;

                const size = baseSize * (0.5 + scale);
                const alpha = Math.max(0.1, scale * 1.2);

                for (let j = i + 1; j < projected.length; j++) {
                    const p2 = projected[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    if (Math.abs(dx) > maxLineDist || Math.abs(dy) > maxLineDist) continue;
                    const dz = p.z - p2.z;
                    const distSq = dx * dx + dy * dy + dz * dz;
                    if (distSq < maxLineDistSq) {
                        const distAlpha = (1 - Math.sqrt(distSq) / maxLineDist) * alpha;
                        ctx.beginPath();
                        ctx.moveTo(centerX + p.x, centerY + p.y);
                        ctx.lineTo(centerX + p2.x, centerY + p2.y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${distAlpha * 0.5})`;
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(centerX + p.x, centerY + p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            ro.disconnect();
            themeObserver.disconnect();
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        // Width: full on mobile, automatically constrained to column on desktop
        // Height: fluid — 55vw on mobile (square-ish), capped at 480px on lg screens
        <div
            ref={wrapRef}
            className="relative w-full h-[50vw] max-h-[300px] md:h-[420px] md:max-h-[420px] lg:h-[520px] lg:max-h-[520px]"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ cursor: 'none' }}
            />
        </div>
    );
});


/* ── Animated Headline ── */
const WordReveal = ({ text, delayOffset = 0 }: { text: string, delayOffset?: number }) => (
    <span className="inline-flex overflow-hidden">
        {text.split('').map((char, ci) => (
            <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                    delay: delayOffset + 0.3 + ci * 0.03,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ))}
    </span>
);


const Hero = () => {
    const { name } = portfolioData.personalInfo;
    const sectionRef = useRef<HTMLElement>(null);

    /* ── Scroll Parallax ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden perspective-1000 cursor-none"
            style={{ backgroundColor: 'var(--theme-bg)' }}
        >
            {/* Scroll-linked parallax */}
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative w-full"
            >
                {/* Ambient Orbs */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ background: 'var(--theme-aurora-1)' }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        style={{ background: 'var(--theme-aurora-2)' }}
                    />
                </div>

                {/* ── Single responsive layout — NO JS-driven split ── */}
                <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12">

                    {/*
                     * Mobile  (<lg): single column, text → sphere → button stacked
                     * Desktop (≥lg): two-column grid, text left / sphere right
                     * The sphere is always rendered; only its container position changes.
                     */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-center w-full pt-24 md:pt-0 pb-24 md:pb-16 min-h-screen md:min-h-[600px]">

                        {/* ── LEFT / TOP — Text content ── */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 lg:gap-6 order-1">

                            {/* Eyebrow badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                                className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 rounded-full font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-2xl"
                                style={{
                                    fontSize: 'clamp(8px, 1.8vw, 11px)',
                                    color: 'var(--theme-text-primary)',
                                    background: 'var(--theme-glass-bg)',
                                    border: '1px solid var(--theme-accent-border)',
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--theme-text-primary)' }} />
                                {portfolioData.personalInfo.title}
                            </motion.div>

                            {/* Animated headline — clamp() for smooth fluid scaling */}
                            <h1
                                className="font-extrabold tracking-tight leading-[1.1] w-full"
                                style={{ fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 5.5rem)' }}
                            >
                                <div className="mb-1 text-theme-accent text-glow drop-shadow-sm">
                                    <WordReveal text={name.split(' ')[0]} />
                                </div>
                                <div className="block leading-normal text-glow-white" style={{ color: 'var(--theme-text-primary)' }}>
                                    <WordReveal text={name.split(' ')[1]} delayOffset={0.3} />
                                </div>
                            </h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                                className="max-w-xl font-normal leading-relaxed text-balance opacity-90"
                                style={{
                                    fontSize: 'clamp(0.8rem, 1.5vw + 0.25rem, 1.125rem)',
                                    color: 'var(--theme-text-secondary)',
                                }}
                            >
                                Architecting scalable full-stack systems and deploying high-performance machine learning models to solve complex engineering challenges.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3, duration: 0.6 }}
                            >
                                <a
                                    href="#projects"
                                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs tracking-[0.2em] hover:scale-105 transition-transform group shadow-xl"
                                    style={{
                                        background: 'var(--theme-accent)',
                                        color: 'white',
                                        boxShadow: '0 8px 30px var(--theme-accent-surface)',
                                    }}
                                >
                                    Explore Work <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>

                        {/* ── RIGHT / BOTTOM — Particle Sphere (always rendered) ── */}
                        <motion.div
                            className="flex items-center justify-center order-2 self-stretch"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ParticleSphere />
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* Scroll chevron */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block"
                style={{ color: 'var(--theme-text-muted)', opacity: 0.3 }}
            >
                <ChevronDown size={24} strokeWidth={1.5} />
            </motion.div>
        </section>
    );
};

export default Hero;
