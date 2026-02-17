import { memo } from 'react';
import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const accentGradients = [
    'from-indigo-500 to-blue-600',
    'from-blue-500 to-cyan-500',
    'from-indigo-600 to-violet-500',
    'from-blue-600 to-indigo-500',
];

const Projects = memo(() => {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }}></span>
                        <span className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>Selected Work</span>
                        <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }}></span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-ultra-tight leading-[0.9]">Featured Projects</h2>
                </motion.div>

                {/* Project Cards — Stacked Full-Width Layout */}
                <div className="space-y-8">
                    {portfolioData.projects.map((project, index) => {
                        const isLink = !!project.link;
                        const CardTag = (isLink ? motion.a : motion.div) as ElementType;
                        const cardProps = isLink
                            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                            : {};

                        return (
                            <CardTag
                                key={index}
                                {...cardProps}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card group block relative overflow-hidden project-card cursor-none"
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
                                                <span className="text-[40px] font-black leading-none" style={{ color: 'var(--theme-accent)', opacity: 0.4 }}>
                                                    0{index + 1}
                                                </span>
                                                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--theme-accent-light)' }}>
                                                    {project.duration}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight group-hover:text-indigo-400 transition-colors">
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed font-normal" style={{ color: 'var(--theme-text-secondary)' }}>
                                                {project.description}
                                            </p>

                                            {/* Link indicator */}
                                            {isLink && (
                                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors mt-1" style={{ color: 'var(--theme-text-muted)' }}>
                                                    <ExternalLink size={12} />
                                                    View on GitHub
                                                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Tech Stack — prominent placement */}
                                        <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 text-[11px] font-bold rounded-lg tracking-wide transition-colors"
                                                    style={{
                                                        color: 'var(--theme-text-secondary)',
                                                        background: 'var(--theme-accent-surface)',
                                                        border: '1px solid var(--theme-accent-border)',
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right — Bullets / Details Section */}
                                    <div className="p-6 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l" style={{ borderColor: 'var(--theme-border)' }}>
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-accent)' }} />
                                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]" style={{ color: 'var(--theme-text-muted)' }}>
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
                                                    <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: 'var(--theme-accent-light)' }} />
                                                    <span className="flex-1">{bullet}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardTag>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

export default Projects;
