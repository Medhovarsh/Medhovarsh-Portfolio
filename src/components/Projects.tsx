import { memo } from 'react';
import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

import { StaggerContainer, StaggerItem } from './ScrollReveal';

const accentGradients = [
    'from-theme-accent to-theme-accent-light',
    'from-theme-accent-light to-theme-accent',
    'from-theme-accent to-theme-accent-surface',
    'from-theme-accent-light to-theme-accent-surface',
];

const Projects = memo(() => {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Section header with scroll-linked effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                        <span className="text-xs font-mono tracking-widest font-black uppercase" style={{ color: 'var(--theme-accent-light)' }}>Selected Work</span>
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.75rem)' }} className="font-black tracking-ultra-tight leading-[0.95]">Featured Projects</h2>
                </motion.div>

                {/* Staggered project cards */}
                <StaggerContainer className="space-y-8" staggerDelay={0.1}>
                    {portfolioData.projects.map((project, index) => {
                        const isLink = !!project.link;
                        const CardTag = (isLink ? motion.a : motion.div) as ElementType;
                        const cardProps = isLink
                            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                            : {};

                        return (
                            <StaggerItem key={index}>
                                <div
                                    className="glass-card group relative overflow-hidden project-card transition-all duration-300 hover:shadow-xl"
                                >
                                    <CardTag
                                        {...cardProps}
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="block"
                                    >
                                        <div className="grid md:grid-cols-[1fr_1.5fr] gap-0">
                                            {/* Left — Header Section */}
                                            <div className="relative p-6 md:p-10 flex flex-col justify-between overflow-hidden">
                                                {/* Accent gradient background */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${accentGradients[index % accentGradients.length]} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700`}
                                                />
                                                {/* Dot pattern */}
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />

                                                <div className="relative z-10 flex flex-col gap-5">
                                                    {/* Project number + duration */}
                                                    <div className="flex items-center justify-between">
                                                        <motion.span
                                                            className="text-[40px] font-black leading-none"
                                                            style={{ color: 'var(--theme-accent)', opacity: 0.4 }}
                                                            whileHover={{ opacity: 0.8, scale: 1.05 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            0{index + 1}
                                                        </motion.span>
                                                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--theme-accent-light)' }}>
                                                            {project.duration}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight group-hover:text-theme-accent transition-colors">
                                                        {project.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-sm leading-relaxed font-normal" style={{ color: 'var(--theme-text-secondary)' }}>
                                                        {project.description}
                                                    </p>

                                                    {/* Link indicator */}
                                                    {isLink && (
                                                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-theme-accent transition-colors mt-1" style={{ color: 'var(--theme-text-muted)' }}>
                                                            <ExternalLink size={14} />
                                                            View on GitHub
                                                            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tech Stack */}
                                                <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                                                    {project.technologies.map((tech, i) => (
                                                        <motion.span
                                                            key={i}
                                                            whileHover={{ y: -2 }}
                                                            className="px-3 py-1.5 text-xs font-bold rounded-lg tracking-wide transition-colors"
                                                            style={{
                                                                color: 'var(--theme-text-secondary)',
                                                                background: 'var(--theme-accent-surface)',
                                                                border: '1px solid var(--theme-accent-border)',
                                                            }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right — Bullets / Details */}
                                            <div className="p-6 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l" style={{ borderColor: 'var(--theme-border)' }}>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-accent)' }} />
                                                    <span className="text-xs font-mono font-black uppercase tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
                                                        Key Highlights
                                                    </span>
                                                </div>

                                                <ul className="space-y-4">
                                                    {project.bullets.map((bullet, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: 10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.1 + i * 0.05 }}
                                                            className="flex gap-4 text-sm leading-relaxed"
                                                            style={{ color: 'var(--theme-text-secondary)' }}
                                                        >
                                                            <motion.span
                                                                className="w-1 h-1 rounded-full mt-2 shrink-0"
                                                                style={{ background: 'var(--theme-accent-light)' }}
                                                                whileHover={{ scale: 3 }}
                                                            />
                                                            <span className="flex-1">{bullet}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardTag>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
});

export default Projects;
