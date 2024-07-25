import { motion, useScroll, useTransform } from 'framer-motion'
import { useParallax } from '../lib/hooks';
import { useContext } from 'react';
import { sectionCtx } from './AnimatedSection';
export type BackgroundImageProps = {
    src?: string;
    invert?: boolean
    desat?: boolean;
    alt: string;
}
export const BackgroundImage = ({ src, invert, desat, alt }: BackgroundImageProps) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 50, 0)



    const imgFilter = useTransform(scrollYProgress, invert ? [1, 0.75] : [0, 0.25], ["saturate(30%) blur(12px)", "saturate(100%) blur(0px)"]);

    return <motion.div
        style={{
            position: 'absolute',
            height: '120lvh',
            boxShadow: '-3px 0px 30px 3px black',
            y,
        }}
    >
        <motion.img src={src} alt={alt} style={{
            height: '120lvh',
            aspectRatio: 'initial',
            objectFit: 'cover',
            minWidth: '100vw',
            filter: desat ? imgFilter : undefined,
        }}></motion.img>
        <div className='w-[300px] h-[300px] backdrop-blur-3xl bg-white z-50' />
    </motion.div>
}