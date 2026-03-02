import { useRef, useEffect, memo, useState } from 'react';
import {
    motion,
    useMotionValue, useSpring, useTransform,
    useScroll, AnimatePresence,
} from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticHover from './MagneticHover';

/* ── CONFIG ── */

const ParticleSphere = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;

        const particleCount = 200;
        const sphereRadius = 140;
        const particles: any[] = [];
        const baseSize = 1.2;
        const maxLineDist = 60;
        const maxLineDistSq = maxLineDist * maxLineDist;

        const updateSize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
                ctx.scale(dpr, dpr);
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            particles.push({
                x: sphereRadius * Math.sin(phi) * Math.cos(theta),
                y: sphereRadius * Math.sin(phi) * Math.sin(theta),
                z: sphereRadius * Math.cos(phi),
                baseX: sphereRadius * Math.sin(phi) * Math.cos(theta),
                baseY: sphereRadius * Math.sin(phi) * Math.sin(theta),
                baseZ: sphereRadius * Math.cos(phi),
                vx: 0, vy: 0, vz: 0
            });
        }

        let isDarkMode = document.documentElement.classList.contains('light') === false;
        const observer = new MutationObserver(() => {
            isDarkMode = document.documentElement.classList.contains('light') === false;
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

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
            const normalizedX = (mouseX / rect.width) - 0.5;
            const normalizedY = (mouseY / rect.height) - 0.5;
            targetAngleX = 0.0015 + (normalizedY * 0.01);
            targetAngleY = 0.002 + (normalizedX * 0.01);
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
            ctx.clearRect(0, 0, cw, ch);
            const centerX = cw / 2;
            const centerY = ch / 2;

            angleX += (targetAngleX - 0) * 0.1;
            angleY += (targetAngleY - 0) * 0.1;

            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            const projected = particles.map(p => {
                const ax = (p.baseX - p.x) * spring;
                const ay = (p.baseY - p.y) * spring;
                const az = (p.baseZ - p.z) * spring;
                p.vx += ax; p.vy += ay; p.vz += az;

                let tempX = p.x * cosY - p.z * sinY;
                let tempZ = p.z * cosY + p.x * sinY;
                let tempY = p.y * cosX - tempZ * sinX;
                let finalZ = tempZ * cosX + p.y * sinX;

                const screenX = centerX + tempX;
                const screenY = centerY + tempY;

                if (isHovering) {
                    const dx = screenX - mouseX;
                    const dy = screenY - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxHoverDist * maxHoverDist) {
                        const dist = Math.sqrt(distSq);
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
            const lineColor = isDarkMode ? '99, 102, 241' : '99, 102, 241';

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
            window.removeEventListener('resize', updateSize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Pulsing ring around sphere */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/20"
                animate={{
                    width: ['220px', '280px', '220px'],
                    height: ['220px', '280px', '220px'],
                    opacity: [0.4, 0.1, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/10"
                animate={{
                    width: ['260px', '320px', '260px'],
                    height: ['260px', '320px', '260px'],
                    opacity: [0.2, 0.05, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-indigo-500/20 rounded-full blur-[80px]" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-none" />
        </div>
    );
});


/* ── Animated Headline ── */
const WordReveal = ({ text }: { text: string }) => (
    <div className="overflow-hidden">
        {text.split(' ').map((word, wi) => (
            <motion.span
                key={wi}
                className="inline-block mr-[0.25em]"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 0.5 + wi * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {word}
            </motion.span>
        ))}
    </div>
);


const Hero = () => {
    const { name } = portfolioData.personalInfo;
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [mounted, setMounted] = useState(false);

    /* ── Scroll Parallax ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    /* ── CURSOR / PARALLAX ── */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

    const rotateX = useTransform(smoothY, [0, 800], [5, -5]);
    const rotateY = useTransform(smoothX, [0, 1400], [-5, 5]);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setViewMode(window.innerWidth < 1024 ? 'mobile' : 'desktop');
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };
        window.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMove);
        };
    }, [mouseX, mouseY]);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000 cursor-none"
            style={{ backgroundColor: 'var(--theme-bg)' }}
        >
            {/* Scroll-linked parallax on entire hero content */}
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative w-full"
            >
                {/* Ambient Orbs */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] opacity-40 mix-blend-screen"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px] opacity-40 mix-blend-screen"
                        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 items-center">

                    {/* 1. DESKTOP VIEW */}
                    <AnimatePresence>
                        {viewMode === 'desktop' && mounted && (
                            <div ref={containerRef} className="grid grid-cols-2 gap-12 items-center relative min-h-[600px]">
                                {/* Left — Text */}
                                <motion.div
                                    className="flex flex-col justify-center text-left gap-6"
                                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                >
                                    <motion.div className="flex flex-col gap-4">
                                        {/* Eyebrow badge */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.3em] font-bold uppercase backdrop-blur-sm"
                                            style={{
                                                color: 'var(--theme-accent-light)',
                                                background: 'var(--theme-accent-surface)',
                                                border: '1px solid var(--theme-accent-border)',
                                            }}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                            {portfolioData.personalInfo.title}
                                        </motion.div>

                                        {/* Animated headline */}
                                        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-ultra-tight leading-[0.85] text-glow-white">
                                            <WordReveal text={name.split(' ')[0]} />
                                            <motion.span
                                                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-400 block"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                {name.split(' ')[1]}
                                            </motion.span>
                                        </h1>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                        className="max-w-md text-xl font-medium leading-relaxed text-balance"
                                        style={{ color: 'var(--theme-text-secondary)' }}
                                    >
                                        Building scalable software applications and integrating machine learning models into production.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3, duration: 0.6 }}
                                        className="flex gap-4 mt-4"
                                    >
                                        <MagneticHover strength={0.4}>
                                            <a
                                                href="#projects"
                                                className="px-10 py-4 rounded-full font-black text-xs tracking-[0.2em] hover:scale-105 transition-transform flex items-center gap-3 group shadow-xl"
                                                style={{
                                                    background: 'var(--theme-accent)',
                                                    color: 'white',
                                                    boxShadow: '0 8px 30px var(--theme-accent-surface)',
                                                }}
                                            >
                                                Explore Work <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </MagneticHover>
                                    </motion.div>
                                </motion.div>

                                {/* Right — Particle Sphere */}
                                <motion.div
                                    className="relative h-[500px] flex items-center justify-center perspective-1000"
                                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <ParticleSphere />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* 2. MOBILE VIEW */}
                    {viewMode === 'mobile' && (
                        <div className="flex flex-col gap-6 relative z-30 py-24 text-center items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.3em] font-bold uppercase backdrop-blur-sm"
                                style={{
                                    color: 'var(--theme-accent-light)',
                                    background: 'var(--theme-accent-surface)',
                                    border: '1px solid var(--theme-accent-border)',
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                {portfolioData.personalInfo.title}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-4xl font-black leading-[0.9] tracking-ultra-tight text-balance text-glow-white"
                            >
                                {name.split(' ')[0]} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-400">
                                    {name.split(' ')[1]}
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-base font-medium max-w-xs leading-relaxed text-balance"
                                style={{ color: 'var(--theme-text-secondary)' }}
                            >
                                Building scalable software applications and integrating machine learning models into production.
                            </motion.p>
                            <div className="my-8">
                                <ParticleSphere />
                            </div>
                            <motion.a
                                href="#projects"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="px-10 py-4 rounded-full font-black text-xs tracking-[0.2em] shadow-xl"
                                style={{ background: 'var(--theme-accent)', color: 'white' }}
                            >
                                Explore Work
                            </motion.a>
                        </div>
                    )}
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
