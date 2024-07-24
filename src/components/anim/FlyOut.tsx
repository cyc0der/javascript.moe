import { motion, useScroll, useTransform } from 'framer-motion';
import { PropsWithChildren, useContext } from 'react';
import { sectionCtx } from '../AnimatedSection';
export type ParallaxProps = PropsWithChildren<{
    range: [number, number];
    className?: string;
}>
export const FlyOut = ({ children, range }: ParallaxProps) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useTransform(scrollYProgress, range, [0, -screen.height]);

    return <motion.div style={{ y }}>
        {children}
    </motion.div>
}