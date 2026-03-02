import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.a
            href="#home"
            id="logo"
            className="fixed top-8 left-8 z-50 flex items-center gap-2 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-label="Home"
        >
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                MB
            </div>
            <span className="font-bold text-lg hidden md:block" style={{ color: 'var(--theme-text-primary)' }}>
                Medhovarsh
            </span>
        </motion.a>
    );
};

export default Logo;
