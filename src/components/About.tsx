import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

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
                            <span className="w-10 h-[1px]" style={{ background: 'var(--theme-accent-border)' }}></span>
                            <span className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>About Me</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-ultra-tight leading-[0.9] text-balance text-glow-white">
                            Bridging <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-glow">
                                AI Research & Production
                            </span>
                        </h2>

                        <div className="space-y-6 text-base font-normal leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
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
                                    <div className="flex flex-wrap gap-2.5">
                                        {category.items.map((skill, i) => (
                                            <motion.span
                                                key={i}
                                                whileHover={{ y: -2, scale: 1.05 }}
                                                className="px-4 py-2 text-[12px] font-medium rounded-xl transition-all cursor-default shadow-sm"
                                                style={{
                                                    color: 'var(--theme-text-secondary)',
                                                    background: 'var(--theme-accent-surface)',
                                                    border: '1px solid var(--theme-accent-border)',
                                                }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
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
