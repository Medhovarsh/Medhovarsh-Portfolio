import { motion } from 'framer-motion';
import MagneticHover from './MagneticHover';

const Logo = () => {
    return (
        <MagneticHover strength={0.2} className="fixed top-6 left-6 z-50">
            <motion.a
                href="#home"
                id="logo"
                className="flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl group"
                style={{
                    background: 'var(--theme-accent-surface)',
                    boxShadow: '0 8px 32px 0 var(--theme-shadow)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                aria-label="Home"
            >
                <svg
                    width="34"
                    height="28"
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'var(--theme-text-primary)' }}
                    className="transition-colors group-hover:opacity-70"
                >
                    {/* Letter M */}
                    <motion.path
                        d="M 10 80 V 25 L 35 55 L 60 25 V 80"
                        stroke="var(--theme-text-primary)"
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    />
                    {/* Letter B */}
                    <motion.path
                        d="M 60 25 H 85 C 104 25 104 52.5 85 52.5 C 106 52.5 106 80 85 80 H 60"
                        stroke="var(--theme-text-primary)"
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                    />
                    {/* Unique Accent Dot */}
                    <motion.circle
                        cx="103"
                        cy="80"
                        r="8"
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
