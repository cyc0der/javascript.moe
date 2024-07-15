import { motion, useScroll, useTransform } from 'framer-motion'
import { useParallax } from '../lib/hooks';
import { useContext } from 'react';
import { sectionCtx } from './AnimatedSection';
export type BackgroundImageProps = {
    src?: string;
    invert?: boolean
}
export const BackgroundImage = ({ src, invert }: BackgroundImageProps) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 50, 0)



    const imgFilter = useTransform(scrollYProgress, invert ? [1, 0.75] : [0, 0.25], ["saturate(0%) blur(12px)", "saturate(100%) blur(0px)"])

    return <motion.div
        style={{
            position: 'absolute',
            height: '120vh',
            boxShadow: '-3px 0px 30px 3px black',
            filter: imgFilter,
            y,
        }}
    >
        <motion.img src={src} style={{
            width: '100vw',
            height: '120vh',
            aspectRatio: 'initial'
        }}></motion.img>
        <div className='w-[300px] h-[300px] backdrop-blur-3xl bg-white z-50' />
    </motion.div>
}