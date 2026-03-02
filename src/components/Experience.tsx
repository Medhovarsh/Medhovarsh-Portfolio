import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Calendar, MapPin, ArrowUpRight, Briefcase } from 'lucide-react';

import { useRef } from 'react';

const Experience = memo(() => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Scroll-linked accent bar at the top of the section
    const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Scroll-linked progress accent line */}
            <motion.div
                className="absolute top-0 left-0 h-[2px] origin-left bg-gradient-to-r from-theme-accent-light via-theme-accent to-theme-accent"
                style={{ scaleX, width: '100%' }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-8">
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                        <span className="text-xs font-mono tracking-widest font-black uppercase" style={{ color: 'var(--theme-accent-light)' }}>Career Path</span>
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-ultra-tight leading-[0.9]">Experience</h2>
                </motion.div>

                <div className="space-y-10">
                    {portfolioData.experience.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="glass-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-theme-accent/30">
                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-theme-accent via-theme-accent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--theme-accent-surface)' }} />

                                <div className="grid md:grid-cols-[280px_1fr] gap-0">
                                    {/* Left column — Role metadata */}
                                    <div className="p-6 md:p-10 flex flex-col gap-6 relative border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--theme-border)' }}>
                                        {/* Role icon badge */}
                                        <motion.div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: 'var(--theme-accent-surface)',
                                                border: '1px solid var(--theme-accent-border)',
                                                color: 'var(--theme-accent-light)',
                                            }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                            <Briefcase size={20} strokeWidth={1.5} />
                                        </motion.div>

                                        {/* Role & Company */}
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black leading-tight group-hover:text-theme-accent transition-colors">
                                                {role.role}
                                            </h3>
                                            <p className="text-sm font-bold" style={{ color: 'var(--theme-text-primary)', opacity: 0.85 }}>
                                                {role.company}
                                            </p>
                                        </div>

                                        {/* Duration & Location */}
                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--theme-accent-light)' }}>
                                                <Calendar size={12} strokeWidth={2} />
                                                {role.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
                                                <MapPin size={12} strokeWidth={2} />
                                                {role.location}
                                            </div>
                                        </div>

                                        {/* Publication link */}
                                        {role.link && (
                                            <motion.a
                                                href={role.link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:text-white hover:bg-theme-accent transition-all group/link"
                                                style={{
                                                    color: 'var(--theme-accent-light)',
                                                    background: 'var(--theme-accent-surface)',
                                                    border: '1px solid var(--theme-accent-border)',
                                                }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {role.link.text}
                                                <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                            </motion.a>
                                        )}
                                    </div>

                                    {/* Right column — Achievements */}
                                    <div className="p-8 md:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-accent)' }} />
                                            <span className="text-xs font-mono font-black uppercase tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
                                                Key Contributions
                                            </span>
                                        </div>

                                        <ul className="space-y-5">
                                            {role.achievements.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.15 + i * 0.08 }}
                                                    className="flex gap-4 text-sm leading-relaxed"
                                                    style={{ color: 'var(--theme-text-secondary)' }}
                                                >
                                                    <motion.span
                                                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                                                        style={{ background: 'var(--theme-accent-light)' }}
                                                        whileHover={{ scale: 3 }}
                                                    />
                                                    <span className="flex-1">{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Experience;
