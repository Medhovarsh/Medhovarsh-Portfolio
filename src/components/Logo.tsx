import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.a
            href="#home"
            id="logo"
            className="fixed top-8 left-8 z-50 text-indigo-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-label="Home"
        >
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <motion.path
                    d="M10 32V8L20 22L30 8V32"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    style={{ color: 'var(--theme-logo-stroke)' }}
                />
            </svg>
        </motion.a>
    );
};

export default Logo;
