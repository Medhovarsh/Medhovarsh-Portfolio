import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.a
            href="#home"
            id="logo"
            className="fixed top-8 left-8 z-50 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]"
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-label="Home"
        >
            <span className="font-extrabold text-lg tracking-tighter" style={{ color: 'var(--theme-text-primary)' }}>
                MB
            </span>
        </motion.a>
    );
};

export default Logo;
