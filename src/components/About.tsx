import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { StaggerContainer, StaggerItem } from './ScrollReveal';

/* ── Animated Counter ── */
const CountUp = ({ target, suffix = '', duration = 1.5 }: { target: number; suffix?: string; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
    { label: 'GPA', value: 4, suffix: '.0', icon: '🎓' },
    { label: 'Publications', value: 2, suffix: '+', icon: '📄' },
    { label: 'Projects', value: 5, suffix: '+', icon: '💡' },
    { label: 'Students Reached', value: 200, suffix: '+', icon: '🚀' },
];

const About = () => {
    return (
        <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'var(--theme-accent-surface)' }} />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">

                    {/* Text — 7 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-7"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <span className="w-10 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                            <span className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>About Me</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-ultra-tight leading-[0.9] text-balance text-glow-white">
                            Bridging <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-glow">
                                AI Research &amp; Production
                            </span>
                        </h2>

                        <div className="space-y-8 text-lg md:text-xl font-normal leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                            <p className="text-balance">
                                Currently pursuing my <strong className="font-semibold" style={{ color: 'var(--theme-text-primary)' }}>MS in Technology Management at UIUC</strong> (4.0 GPA),
                                I specialize in turning research-grade models into production systems — from
                                <span style={{ color: 'var(--theme-text-primary)' }}> medical imaging pipelines</span> to
                                <span style={{ color: 'var(--theme-text-primary)' }}> real-time computer vision</span>.
                            </p>
                            <p className="text-balance">
                                My work spans deep learning architectures (Vision Transformers, GNNs, DeepLabV3+),
                                full-stack development with the MERN stack, and cloud-native deployment.
                                I've published at <span className="font-semibold" style={{ color: 'var(--theme-accent-light)' }}>Springer</span> and <span className="font-semibold" style={{ color: 'var(--theme-accent-light)' }}>IEEE</span>, and I'm always exploring the edge of what's possible.
                            </p>
                        </div>

                        {/* Animated Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                                    whileHover={{ y: -3, scale: 1.03 }}
                                    className="p-4 rounded-2xl text-center"
                                    style={{
                                        background: 'var(--theme-accent-surface)',
                                        border: '1px solid var(--theme-accent-border)',
                                    }}
                                >
                                    <div className="text-2xl mb-1">{stat.icon}</div>
                                    <div className="text-2xl font-black" style={{ color: 'var(--theme-accent-light)' }}>
                                        <CountUp target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-[10px] font-mono uppercase tracking-widest mt-1" style={{ color: 'var(--theme-text-muted)' }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Snapshot — 5 cols */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-5 space-y-8 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group"
                        style={{
                            background: 'var(--theme-card-bg)',
                            border: '1px solid var(--theme-border)',
                        }}
                    >
                        {/* Decorative glow inside card */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-colors duration-700" style={{ background: 'var(--theme-accent-surface)' }} />

                        <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-accent)' }} />
                            Technical Arsenal
                        </h3>

                        <div className="space-y-10">
                            {portfolioData.skills.map((category, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex items-baseline gap-4 mb-4">
                                        <span className="text-[10px] font-mono" style={{ color: 'var(--theme-accent)', opacity: 0.5 }}>0{idx + 1}</span>
                                        <h4 className="text-xs font-bold uppercase tracking-widest leading-none" style={{ color: 'var(--theme-text-muted)' }}>
                                            {category.category}
                                        </h4>
                                    </div>
                                    {/* Staggered skill tags */}
                                    <StaggerContainer className="flex flex-wrap gap-2.5" staggerDelay={0.04}>
                                        {category.items.map((skill, i) => (
                                            <StaggerItem key={i}>
                                                <motion.span
                                                    whileHover={{ y: -3, scale: 1.08, boxShadow: '0 4px 15px rgba(99,102,241,0.25)' }}
                                                    className="inline-block px-4 py-2 text-[12px] font-medium rounded-xl transition-all cursor-default shadow-sm"
                                                    style={{
                                                        color: 'var(--theme-text-secondary)',
                                                        background: 'var(--theme-accent-surface)',
                                                        border: '1px solid var(--theme-accent-border)',
                                                    }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
