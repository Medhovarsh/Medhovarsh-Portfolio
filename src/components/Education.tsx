import { memo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { GraduationCap, Award, ExternalLink, Calendar, ArrowUpRight } from 'lucide-react';

const Education = memo(() => {
    return (
        <section id="education" className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 md:gap-28">

                    {/* Education Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-5 mb-14"
                        >
                            <div
                                className="p-4 rounded-2xl shadow-lg"
                                style={{
                                    background: 'var(--theme-accent-surface)',
                                    color: 'var(--theme-accent-light)',
                                    border: '1px solid var(--theme-accent-border)',
                                    boxShadow: '0 4px 20px var(--theme-accent-surface)',
                                }}
                            >
                                <GraduationCap size={28} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>Academic</p>
                                <h2 className="text-4xl font-black tracking-ultra-tight">Background</h2>
                            </div>
                        </motion.div>

                        <div className="space-y-12">
                            {portfolioData.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-12 group"
                                >
                                    {/* Timeline Line */}
                                    <div
                                        className="absolute left-0 top-2 bottom-0 w-[1px] bg-gradient-to-b from-theme-accent/20 via-theme-accent/10 to-transparent group-hover:from-theme-accent/50 transition-colors duration-500"
                                    />

                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute left-[-4px] top-2.5 w-2 h-2 rounded-full border border-theme-accent/50 bg-[var(--theme-bg)] group-hover:scale-125 group-hover:border-theme-accent transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                                    />

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl md:text-2xl font-black text-[var(--theme-text-primary)] group-hover:text-theme-accent-light transition-colors tracking-tight">
                                                {edu.school}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm font-bold text-theme-accent-light">
                                                    {edu.degree}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-[var(--theme-text-muted)] uppercase">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="opacity-70" />
                                                {edu.duration}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--theme-border)]" />
                                            <span>{edu.location}</span>
                                        </div>

                                        <p className="text-sm leading-relaxed text-[var(--theme-text-secondary)] mt-1 max-w-md">
                                            {// @ts-ignore
                                                edu.description}
                                        </p>

                                        {edu.details && edu.details.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {edu.details.map((detail, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase transition-colors"
                                                        style={{
                                                            background: 'var(--theme-accent-surface)',
                                                            border: '1px solid var(--theme-accent-border)',
                                                            color: 'var(--theme-text-secondary)',
                                                        }}
                                                    >
                                                        {detail}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-5 mb-14"
                        >
                            <div
                                className="p-4 rounded-2xl shadow-lg"
                                style={{
                                    background: 'var(--theme-accent-surface)',
                                    color: 'var(--theme-accent-light)',
                                    border: '1px solid var(--theme-accent-border)',
                                    boxShadow: '0 4px 20px var(--theme-accent-surface)',
                                }}
                            >
                                <Award size={28} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>Recognition</p>
                                <h2 className="text-4xl font-black tracking-ultra-tight">Honors</h2>
                            </div>
                        </motion.div>

                        <div className="grid gap-4">
                            {portfolioData.achievements.map((achievement, index) => (
                                <motion.a
                                    key={index}
                                    href={achievement.link || undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`group relative p-7 rounded-2xl hover:border-theme-accent/30 transition-all flex items-start gap-5 ${!achievement.link ? 'cursor-default' : ''}`}
                                    style={{
                                        background: 'var(--theme-card-bg)',
                                        border: '1px solid var(--theme-border)',
                                    }}
                                >
                                    <div
                                        className="mt-0.5 p-2.5 rounded-xl group-hover:text-theme-accent-light transition-colors shrink-0"
                                        style={{
                                            background: 'var(--theme-accent-surface)',
                                            color: 'var(--theme-text-muted)',
                                            border: '1px solid var(--theme-accent-border)',
                                        }}
                                    >
                                        {achievement.link ? <ExternalLink size={16} /> : <Award size={16} />}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="font-medium text-sm group-hover:text-theme-accent-light transition-colors leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                                            {achievement.text}
                                        </p>
                                        {achievement.year && (
                                            <p className="text-[10px] font-mono flex items-center gap-2 uppercase tracking-widest" style={{ color: 'var(--theme-text-muted)' }}>
                                                {achievement.year}
                                            </p>
                                        )}
                                    </div>
                                    {achievement.link && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-all mt-1">
                                            <ArrowUpRight size={16} style={{ color: 'var(--theme-accent-light)' }} />
                                        </div>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
});

export default Education;
