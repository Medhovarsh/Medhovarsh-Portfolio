import { useRef } from 'react';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface MagneticHoverProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    style?: CSSProperties;
}

/**
 * MagneticHover
 * Wraps any element to create a spring-based magnetic hover pull effect.
 */
const MagneticHover = ({
    children,
    className = '',
    strength = 0.35,
    style,
}: MagneticHoverProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 350, damping: 25, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 350, damping: 25, mass: 0.5 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * SpotlightCard
 * A card wrapper that renders a radial spotlight following the cursor, using useMotionTemplate.
 */
interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** CSS color of the spotlight. Default: indigo */
    color?: string;
}

export const SpotlightCard = ({ children, className = '', style, color = '99,102,241' }: SpotlightCardProps) => {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const ref = useRef<HTMLDivElement>(null);

    const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(${color}, 0.12), transparent 80%)`;

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    function handleMouseLeave() {
        mouseX.set(-1000);
        mouseY.set(-1000);
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden ${className}`}
            style={style}
        >
            {/* Spotlight layer */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: spotlightBg }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default MagneticHover;
