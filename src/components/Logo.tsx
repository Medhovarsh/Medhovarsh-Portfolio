import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.a
            href="#home"
            id="logo"
            className="fixed top-8 left-8 z-50 flex items-center gap-3 group px-4 py-2 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            style={{
                background: 'var(--theme-accent-surface)',
                border: '1px solid var(--theme-accent-border)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-label="Home"
        >
            <div className="flex items-center justify-center font-black text-xl tracking-tighter" style={{ color: 'var(--theme-accent-light)' }}>
                MB
            </div>
            <span className="font-bold text-sm uppercase tracking-widest hidden md:block" style={{ color: 'var(--theme-text-primary)' }}>
                Medhovarsh
            </span>
        </motion.a>
    );
};

export default Logo;
