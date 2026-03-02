import { motion } from 'framer-motion';
import MagneticHover from './MagneticHover';

const Logo = () => {
    return (
        <MagneticHover strength={0.2} className="fixed top-10 left-10 z-50">
            <motion.a
                href="#home"
                id="logo"
                className="flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full backdrop-blur-2xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
                style={{
                    background: 'var(--theme-glass-bg)',
                    border: '1px solid var(--theme-glass-border)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                aria-label="Home"
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'var(--theme-text-primary)' }}
                    className="transition-colors group-hover:opacity-70"
                >
                    {/* Letter M */}
                    <motion.path
                        d="M 15 80 V 25 L 35 55 L 55 25 V 80"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    />
                    {/* Letter B */}
                    <motion.path
                        d="M 55 25 H 75 C 88 25 88 52.5 75 52.5 C 90 52.5 90 80 75 80 H 55"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                    />
                    {/* Unique Accent Dot */}
                    <motion.circle
                        cx="88"
                        cy="80"
                        r="6"
                        fill="var(--theme-accent)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "backOut", delay: 1.2 }}
                    />
                </svg>
            </motion.a>
        </MagneticHover>
    );
};

export default Logo;
