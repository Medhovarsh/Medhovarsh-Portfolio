import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useRef } from 'react';

const Contact = memo(() => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    // Background orb that grows as you scroll into this section
    const orbScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.4]);
    const orbOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 0.3]);

    return (
        <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-bg)' }}>
            {/* Scroll-linked background orb */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    scale: orbScale,
                    opacity: orbOpacity,
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                }}
            />

            {/* Background Glow */}
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t pointer-events-none" style={{ background: 'linear-gradient(to top, var(--theme-accent-surface), transparent)' }} />

            {/* Animated floating grid dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-theme-accent/40"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest font-black mb-12 uppercase"
                        style={{
                            border: '1px solid var(--theme-accent-border)',
                            background: 'var(--theme-accent-surface)',
                            color: 'var(--theme-accent-light)',
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse" />
                        Open to Opportunities
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-ultra-tight leading-[0.9]">
                        Let's build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent-light via-theme-accent to-theme-accent">future</span>
                    </h2>

                    <p className="text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-16 px-4" style={{ color: 'var(--theme-text-secondary)' }}>
                        Looking for roles in <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>Software Engineering</span> and <span className="font-bold" style={{ color: 'var(--theme-text-primary)' }}>AI/ML</span>.
                        Have an ambitious project? Let's talk.
                    </p>
                </motion.div>

                {/* Primary Action — Magnetic CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-20"
                >
                    <motion.a
                        href={`mailto:${portfolioData.personalInfo.email}?subject=${encodeURIComponent("Let's Connect — From Your Portfolio")}&body=${encodeURIComponent("Hi Medhovarsh,\n\nI came across your portfolio and would love to connect.\n\n")}`}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs tracking-widest overflow-hidden shadow-xl transition-all uppercase"
                        style={{
                            background: 'var(--theme-accent)',
                            color: 'white',
                            boxShadow: '0 8px 30px var(--theme-accent-surface)',
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            Say Hello <Mail size={16} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent to-theme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                    </motion.a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-12 flex flex-col items-center gap-8"
                    style={{ borderTop: '1px solid var(--theme-border)' }}
                >
                    {/* Contact Details */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-x-8">
                        <motion.a
                            href={`mailto:${portfolioData.personalInfo.email}?subject=${encodeURIComponent("Let's Connect")}`}
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-theme-accent transition-colors"
                            style={{ color: 'var(--theme-text-secondary)' }}
                            whileHover={{ x: 3 }}
                        >
                            <Mail size={14} style={{ color: 'var(--theme-accent-light)' }} />
                            {portfolioData.personalInfo.email}
                        </motion.a>
                        <motion.a
                            href={`tel:${portfolioData.personalInfo.phone.replace(/[^+\d]/g, '')}`}
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-theme-accent transition-colors"
                            style={{ color: 'var(--theme-text-secondary)' }}
                            whileHover={{ x: 3 }}
                        >
                            <Phone size={14} style={{ color: 'var(--theme-accent-light)' }} />
                            {portfolioData.personalInfo.phone}
                        </motion.a>
                        <span
                            className="inline-flex items-center gap-2 text-sm font-medium"
                            style={{ color: 'var(--theme-text-secondary)' }}
                        >
                            <MapPin size={14} style={{ color: 'var(--theme-accent-light)' }} />
                            Champaign, IL
                        </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                        {[
                            { href: portfolioData.personalInfo.github, label: "GitHub" },
                            { href: portfolioData.personalInfo.linkedin, label: "LinkedIn" },
                        ].map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 hover:text-theme-accent transition-all text-xs font-bold tracking-widest uppercase"
                                style={{ color: 'var(--theme-text-muted)' }}
                                whileHover={{ y: -2 }}
                            >
                                {link.label}
                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.a>
                        ))}
                    </div>

                    <p className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--theme-text-muted)', opacity: 0.7 }}>
                        © {new Date().getFullYear()} {portfolioData.personalInfo.name} · Champaign, IL
                    </p>
                </motion.div>

            </div >
        </section >
    );
});

export default Contact;
