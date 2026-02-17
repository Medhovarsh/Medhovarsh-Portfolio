import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(to right, #6366f1, #3b82f6, #a855f7)',
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
            }}
        />
    );
};

export default ScrollProgress;
