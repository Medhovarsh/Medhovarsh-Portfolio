import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Briefcase, GraduationCap, Mail, Copy, Check, ArrowRight, Sun, Moon, Github, Linkedin, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    toggleTechSpecs: () => void;
}

const CommandPalette = ({ isOpen, setIsOpen, toggleTechSpecs }: CommandPaletteProps) => {
    const { theme, toggleTheme } = useTheme();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(0);
    const [copied, setCopied] = useState(false);

    const actions = [
        { id: "home", label: "Home", icon: Home, action: () => window.location.href = "#home" },
        { id: "about", label: "About Me", icon: User, action: () => window.location.href = "#about" },
        { id: "work", label: "Projects", icon: Briefcase, action: () => window.location.href = "#projects" },
        { id: "tech", label: "Toggle Developer HUD", icon: Terminal, action: () => { toggleTechSpecs(); setIsOpen(false); } },
        { id: "edu", label: "Education", icon: GraduationCap, action: () => window.location.href = "#education" },
        { id: "contact", label: "Contact", icon: Mail, action: () => window.location.href = "#contact" },
        {
            id: "github",
            label: "View GitHub Profile",
            icon: Github,
            action: () => window.open(portfolioData.personalInfo.github, "_blank")
        },
        {
            id: "linkedin",
            label: "Connect on LinkedIn",
            icon: Linkedin,
            action: () => window.open(portfolioData.personalInfo.linkedin, "_blank")
        },
        {
            id: "theme",
            label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
            icon: theme === 'dark' ? Sun : Moon,
            action: () => {
                document.documentElement.classList.add('transitioning');
                toggleTheme();
                setTimeout(() => document.documentElement.classList.remove('transitioning'), 500);
            }
        },
        {
            id: "email",
            label: "Copy Email to Clipboard",
            icon: copied ? Check : Copy,
            action: () => {
                navigator.clipboard.writeText(portfolioData.personalInfo.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        },
    ];

    const filteredActions = actions.filter(action =>
        action.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [isOpen, setIsOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected(prev => (prev + 1) % filteredActions.length);
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
            }
            if (e.key === "Enter") {
                e.preventDefault();
                const action = filteredActions[selected];
                if (action) {
                    action.action();
                    if (action.id !== "email" && action.id !== "theme") setIsOpen(false);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, selected, filteredActions]);

    // Reset selection on search change
    useEffect(() => setSelected(0), [search]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col"
                        style={{
                            backgroundColor: 'var(--theme-bg-secondary)',
                            border: '1px solid var(--theme-border)',
                        }}
                    >
                        <div className="flex items-center px-4 py-4" style={{ borderBottom: '1px solid var(--theme-border)' }}>
                            <Search size={20} className="mr-3" style={{ color: 'var(--theme-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-lg font-light"
                                style={{ color: 'var(--theme-text-primary)' }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                autoFocus
                            />
                            <div className="px-2 py-1 rounded text-[10px] font-mono" style={{ background: 'var(--theme-tag-bg)', color: 'var(--theme-text-tertiary)' }}>ESC</div>
                        </div>

                        <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {filteredActions.length === 0 ? (
                                <div className="py-8 text-center text-sm" style={{ color: 'var(--theme-text-muted)' }}>No results found.</div>
                            ) : (
                                filteredActions.map((action, index) => (
                                    <button
                                        key={action.id}
                                        onClick={() => {
                                            action.action();
                                            if (action.id !== "email" && action.id !== "theme") setIsOpen(false);
                                        }}
                                        onMouseEnter={() => setSelected(index)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-sm ${selected === index ? 'bg-theme-accent/20' : ''
                                            }`}
                                        style={{
                                            color: selected === index ? 'var(--theme-text-primary)' : 'var(--theme-text-tertiary)',
                                        }}
                                    >
                                        <action.icon size={18} style={{ color: selected === index ? 'var(--theme-accent-light)' : 'var(--theme-text-muted)' }} />
                                        <span className="flex-1">{action.label}</span>
                                        {selected === index && <ArrowRight size={14} className="opacity-50" />}
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="px-4 py-2 flex items-center justify-between text-[10px] font-mono" style={{ borderTop: '1px solid var(--theme-border)', background: 'var(--theme-surface)', color: 'var(--theme-text-muted)' }}>
                            <span>Navigation</span>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: 'var(--theme-tag-bg)' }}>↑</kbd><kbd className="px-1 rounded" style={{ background: 'var(--theme-tag-bg)' }}>↓</kbd> to navigate</span>
                                <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: 'var(--theme-tag-bg)' }}>↵</kbd> to select</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
