import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContext } from 'react';
import { sectionCtx } from './AnimatedSection';

export type AnimatedImageCircleProps = {
    src: string;
    className?: string
    size?: AnimatedImageCircleSize
}

const heights: Record<AnimatedImageCircleSize, number> = {
    sm: 320,
}

export enum AnimatedImageCircleSize {
    sm = 'sm'
}

export const AnimatedImageCircle = ({ src, className, size = 'sm' }: AnimatedImageCircleProps) => {
    const clsn = clsx("rounded-full overflow-hidden my-auto", className)
    const imgHeight = heights[size];

    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });

    const imgFilter = useTransform(scrollYProgress, [0, 0.25], ["saturate(100%)", "saturate(0%)"])
    const opacity = useTransform(scrollYProgress, [0.25, 0.5], ["100%", "0%"])

    return <motion.div className={clsn} style={{
        borderRadius: '1000px',
        height: imgHeight + 'px',
        width: imgHeight + 'px',
        filter: imgFilter,
        backdropFilter: 'blur(12px)',
        boxShadow: '0px 0px 6px 1px black',
        opacity,
        zIndex: 100,
    }}>
        <div style={{ background: `url(${src}) center / cover`, height: '100%' }} />
    </motion.div>
}