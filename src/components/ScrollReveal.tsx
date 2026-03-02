import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, type Variants } from 'framer-motion';

/* ── Scroll-Linked Parallax Wrapper ── */
interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    /** How much to shift vertically on scroll (px). Default: 30 */
    yOffset?: number;
    /** Opacity: start faded? Default: true */
    fadeIn?: boolean;
    /** Stagger delay in seconds */
    delay?: number;
}

export const ScrollReveal = ({
    children,
    className = '',
    yOffset = 30,
    fadeIn = true,
    delay = 0,
}: ScrollRevealProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: fadeIn ? 0 : 1, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

/* ── Parallax Layer that moves at a different rate than scroll ── */
interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number; // multiplier, 0.5 = half scroll speed
    scrollYProgress: MotionValue<number>;
}

export const ParallaxLayer = ({ children, className = '', speed = 0.3, scrollYProgress }: ParallaxProps) => {
    const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 30}%`]);
    const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

    return (
        <motion.div className={className} style={{ y: smoothY }}>
            {children}
        </motion.div>
    );
};

/* ── Section Header with Scroll-Linked Scale ── */
interface SectionHeaderProps {
    eyebrow: string;
    title: ReactNode;
    centered?: boolean;
    className?: string;
}

export const SectionHeader = ({ eyebrow, title, centered = true, className = '' }: SectionHeaderProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.95, 1, 1.02]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className={`${centered ? 'flex flex-col items-center text-center' : ''} mb-20 ${className}`}
        >
            <div className={`inline-flex items-center gap-3 mb-6 ${centered ? 'justify-center' : ''}`}>
                <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
                <span className="text-[10px] font-mono tracking-[0.4em] font-black" style={{ color: 'var(--theme-accent-light)' }}>
                    {eyebrow}
                </span>
                <span className="w-8 h-[1px]" style={{ background: 'var(--theme-accent-border)' }} />
            </div>
            <div className="text-4xl md:text-6xl font-black tracking-ultra-tight leading-[0.9]">
                {title}
            </div>
        </motion.div>
    );
};

/* ── Stagger Container for child animations ── */
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export const staggerVariants = (staggerDelay = 0.07): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
        },
    },
});

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
};

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.07 }: StaggerContainerProps) => (
    <motion.div
        className={className}
        variants={staggerVariants(staggerDelay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <motion.div className={className} variants={itemVariants}>
        {children}
    </motion.div>
);
