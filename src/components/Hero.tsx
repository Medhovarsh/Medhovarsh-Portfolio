import { useRef, useEffect, memo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, ChevronDown, Laptop, Code2, Cpu, Globe } from 'lucide-react';

/* ── CONFIG ── */

const BotScene = memo(() => {
    return (
        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] preserve-3d">
            {/* 1. Base Platform */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-xl transform rotate-x-[60deg] animate-pulse" />

            {/* 2. Abstract Avatar (Bot) */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 flex flex-col items-center justify-center z-20 preserve-3d will-change-transform"
                style={{ transform: "translateZ(50px)" }}
            >
                {/* Head */}
                <div className="w-20 h-20 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center relative overflow-hidden backdrop-blur-md border border-white/40 bg-gradient-to-tr from-white to-indigo-300">
                    <div className="flex gap-2">
                        <motion.div animate={{ height: [8, 2, 8] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="w-2 h-2 rounded-full bg-indigo-900" />
                        <motion.div animate={{ height: [8, 2, 8] }} transition={{ repeat: Infinity, duration: 3, delay: 1.2 }} className="w-2 h-2 rounded-full bg-indigo-900" />
                    </div>
                </div>
                {/* Body */}
                <div className="w-16 h-12 mt-2 rounded-xl backdrop-blur-sm border relative bg-indigo-500/20 border-white/10"></div>
            </motion.div>

            {/* 3. Floating Laptop */}
            <motion.div
                className="absolute top-[60%] left-1/2 -translate-x-1/2 w-48 h-32 z-30 preserve-3d will-change-transform"
                style={{ transform: "translateZ(80px) rotateX(10deg)" }}
            >
                {/* Screen */}
                <div className="w-full h-full rounded-t-xl border border-b-0 p-3 overflow-hidden backdrop-blur-md bg-black/80 border-white/10">
                    <div className="space-y-1 mt-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: [0, 0.8, 0.8] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="h-1 rounded-full bg-indigo-400/50 origin-left"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: [0, 0.6, 0.6] }}
                            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                            className="h-1 rounded-full bg-purple-400/50 origin-left"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: [0, 0.4, 0.4] }}
                            transition={{ repeat: Infinity, duration: 3, delay: 1.0 }}
                            className="h-1 rounded-full bg-cyan-400/50 origin-left"
                        />
                    </div>
                </div>
                {/* Base */}
                <div className="w-[120%] -ml-[10%] h-3 rounded-b-lg shadow-xl relative top-[-1px] bg-slate-700" />
            </motion.div>

            {/* 4. Orbiting Icons */}
            {[Code2, Laptop, Cpu, Globe].map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm text-indigo-300 will-change-transform"
                    style={{
                        background: 'var(--theme-surface)',
                        border: '1px solid var(--theme-border)',
                    }}
                    animate={{
                        rotate: [0, 360],
                        x: [Math.cos(i * Math.PI / 2) * 120, Math.cos(i * Math.PI / 2 + Math.PI) * 120],
                        y: [Math.sin(i * Math.PI / 2) * 40, Math.sin(i * Math.PI / 2 + Math.PI) * 40],
                        scale: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
                >
                    <Icon size={20} />
                </motion.div>
            ))}
        </div>
    );
});


const Hero = () => {
    const { name } = portfolioData.personalInfo;
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    /* ── CURSOR / PARALLAX ── */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

    const rotateX = useTransform(smoothY, [0, window.innerHeight], [5, -5]);
    const rotateY = useTransform(smoothX, [0, window.innerWidth], [-5, 5]);

    useEffect(() => {
        const handleResize = () => {
            const isMob = window.innerWidth < 1024;
            setViewMode(isMob ? 'mobile' : 'desktop');
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
    }, [viewMode, mouseX, mouseY]);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000 cursor-none"
            style={{ backgroundColor: 'var(--theme-bg)' }}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] opacity-40 mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 items-center">

                {/* 1. DESKTOP VIEW */}
                {viewMode === 'desktop' && (
                    <div ref={containerRef} className="grid grid-cols-2 gap-12 items-center relative min-h-[600px]">
                        {/* BASE LAYER CONTENT */}
                        <motion.div className="flex flex-col justify-center text-left gap-6" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                            <div className="flex flex-col gap-4">
                                <div
                                    className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.3em] font-bold uppercase backdrop-blur-sm"
                                    style={{
                                        color: 'var(--theme-accent-light)',
                                        background: 'var(--theme-accent-surface)',
                                        border: '1px solid var(--theme-accent-border)',
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                    {portfolioData.personalInfo.title}
                                </div>
                                <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-ultra-tight leading-[0.85] text-glow-white">
                                    Medhovarsh <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-400">
                                        Bayyapureddi
                                    </span>
                                </h1>
                            </div>
                            <p className="max-w-md text-xl font-medium leading-relaxed text-balance" style={{ color: 'var(--theme-text-secondary)' }}>
                                Building scalable software applications and integrating machine learning models into production.
                            </p>
                            <div className="flex gap-4 mt-4">
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
                            </div>
                        </motion.div>

                        <motion.div className="relative h-[500px] flex items-center justify-center perspective-1000" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                            <BotScene />
                        </motion.div>
                    </div>
                )}

                {/* 2. MOBILE VIEW */}
                {viewMode === 'mobile' && (
                    <div className="flex flex-col gap-6 relative z-30 py-24 text-center items-center">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.3em] font-bold uppercase backdrop-blur-sm"
                            style={{
                                color: 'var(--theme-accent-light)',
                                background: 'var(--theme-accent-surface)',
                                border: '1px solid var(--theme-accent-border)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            {portfolioData.personalInfo.title}
                        </div>
                        <h1 className="text-4xl font-black leading-[0.9] tracking-ultra-tight text-balance text-glow-white">
                            {name.split(' ')[0]} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-400">
                                {name.split(' ')[1]}
                            </span>
                        </h1>
                        <p className="text-base font-medium max-w-xs leading-relaxed text-balance" style={{ color: 'var(--theme-text-secondary)' }}>
                            Building scalable software applications and integrating machine learning models into production.
                        </p>
                        <div className="my-8">
                            <BotScene />
                        </div>
                        <a
                            href="#projects"
                            className="px-10 py-4 rounded-full font-black text-xs tracking-[0.2em] shadow-xl"
                            style={{ background: 'var(--theme-accent)', color: 'white' }}
                        >
                            Explore Work
                        </a>
                    </div>
                )}
            </div>

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
