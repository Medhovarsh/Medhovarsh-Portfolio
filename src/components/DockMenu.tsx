import { useRef, useState, useEffect } from 'react';
import type { ElementType } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderGit2, Mail, Search, Github, Linkedin, Monitor, Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';

const DockItem = ({ mouseX, icon: Icon, label, href }: { mouseX: MotionValue, icon: ElementType, label: string, href: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 15 });

    const iconScaleSync = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
    const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 180, damping: 15 });

    return (
        <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="relative group"
        >
            <motion.div
                ref={ref}
                style={{
                    width,
                    height: width,
                    background: 'var(--theme-glass-bg)',
                    border: '1px solid var(--theme-glass-border)',
                }}
                className="rounded-2xl flex items-center justify-center backdrop-blur-md transition-colors duration-300"
            >
                <motion.div style={{ scale: iconScale, color: 'var(--theme-text-tertiary)' }} className="flex items-center justify-center group-hover:text-indigo-500">
                    <Icon size={20} />
                </motion.div>
            </motion.div>

            {/* Tooltip */}
            <motion.span
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 px-3 py-1.5 backdrop-blur-md text-[10px] font-bold rounded-lg opacity-0 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50 tracking-widest uppercase"
                style={{
                    background: 'var(--theme-bg-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border)',
                }}
            >
                {label}
            </motion.span>
        </a>
    );
};

/* ── Mobile Nav Item ── */
const MobileNavItem = ({ icon: Icon, label, href, onClick }: { icon: ElementType, label: string, href: string, onClick: () => void }) => (
    <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className="flex items-center gap-4 px-6 py-3.5 rounded-2xl hover:bg-white/5 transition-colors group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
    >
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:text-indigo-400 transition-colors"
            style={{
                background: 'var(--theme-accent-surface)',
                border: '1px solid var(--theme-accent-border)',
                color: 'var(--theme-text-tertiary)',
            }}
        >
            <Icon size={18} />
        </div>
        <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--theme-text-secondary)' }}>{label}</span>
    </motion.a>
);

const DockMenu = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
    const mouseX = useMotionValue(Infinity);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Close mobile menu when clicking outside or scrolling
    useEffect(() => {
        if (!mobileOpen) return;
        const close = () => setMobileOpen(false);
        window.addEventListener('scroll', close);
        return () => window.removeEventListener('scroll', close);
    }, [mobileOpen]);

    const navItems = [
        { icon: Home, label: "Home", href: "#home" },
        { icon: User, label: "About", href: "#about" },
        { icon: Briefcase, label: "Experience", href: "#experience" },
        { icon: FolderGit2, label: "Projects", href: "#projects" },
        { icon: Monitor, label: "Skills", href: "#education" },
    ];

    const socialItems = [
        { icon: Github, label: "GitHub", href: portfolioData.personalInfo.github },
        { icon: Linkedin, label: "LinkedIn", href: portfolioData.personalInfo.linkedin },
        { icon: Mail, label: "Contact", href: `mailto:${portfolioData.personalInfo.email}?subject=${encodeURIComponent("Let's Connect")}` },
    ];

    /* ── Mobile Bottom Bar ── */
    if (isMobile) {
        return (
            <>
                {/* Mobile FAB */}
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                    <ThemeToggle />
                    <motion.button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl"
                        style={{
                            background: 'var(--theme-accent)',
                            color: 'white',
                            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)',
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ rotate: mobileOpen ? 180 : 0 }}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </motion.button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 z-40"
                                style={{ background: 'rgba(0,0,0,0.5)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                            />
                            <motion.div
                                className="fixed bottom-24 right-6 z-50 w-64 rounded-3xl p-4 backdrop-blur-xl shadow-2xl overflow-hidden"
                                style={{
                                    background: 'var(--theme-dock-bg)',
                                    border: '1px solid var(--theme-glass-border)',
                                }}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <div className="space-y-1">
                                    {navItems.map((item, i) => (
                                        <MobileNavItem key={i} {...item} onClick={() => setMobileOpen(false)} />
                                    ))}
                                </div>
                                <div className="w-full h-px my-3" style={{ background: 'var(--theme-border)' }} />
                                <div className="space-y-1">
                                    {socialItems.map((item, i) => (
                                        <MobileNavItem key={i} {...item} onClick={() => setMobileOpen(false)} />
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </>
        );
    }

    /* ── Desktop Dock ── */
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-4 py-3 rounded-[2rem] backdrop-blur-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                style={{
                    background: 'var(--theme-dock-bg)',
                    border: '1px solid var(--theme-glass-border)',
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5
                }}
            >
                {navItems.map((item, i) => (
                    <DockItem key={i} mouseX={mouseX} icon={item.icon} label={item.label} href={item.href} />
                ))}

                <div className="w-[1px] h-8 mx-1 self-center" style={{ background: 'var(--theme-border)' }} />

                {socialItems.map((item, i) => (
                    <DockItem key={i} mouseX={mouseX} icon={item.icon} label={item.label} href={item.href} />
                ))}

                <div className="w-[1px] h-8 mx-1 self-center" style={{ background: 'var(--theme-border)' }} />

                <ThemeToggle />

                <motion.button
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all cursor-pointer relative group"
                    style={{
                        background: 'var(--theme-accent-surface)',
                        border: '1px solid var(--theme-accent-border)',
                        color: 'var(--theme-accent-light)',
                    }}
                    onClick={onOpenCommand}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Open Command Palette"
                >
                    <Search size={18} />
                    <span
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 backdrop-blur-md text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50 tracking-widest uppercase"
                        style={{
                            background: 'var(--theme-bg-secondary)',
                            color: 'var(--theme-text-primary)',
                            border: '1px solid var(--theme-border)',
                        }}
                    >
                        Cmd+K
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default DockMenu;
