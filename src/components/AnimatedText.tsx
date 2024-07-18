import { easeInOut, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useParallax } from '../lib/hooks';
import { useContext, useState } from 'react';
import { sectionCtx } from './AnimatedSection';
import clsx from 'clsx';

export const AnimatedText = () => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 150, window.innerHeight * -0.55, easeInOut)
    const scale = useTransform(scrollYProgress, [0.25, 1], ['36px', '72px'])

    return <motion.h1 className='absolute top-5 text-center' style={{ y, fontSize: scale, lineHeight: scale, zIndex: 100 }}>
        Moritz Roessler
    </motion.h1>
}

export const Shrinking = () => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 150, window.innerHeight * -0.55, easeInOut)
    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.1])
    const fontSize = useTransform(scrollYProgress, [0.25, 1], ['36px', '72px'])
    const shadow = useTransform(scrollYProgress, [0.25, 1], ['0px 0px 0px #FFFFFF', '0px 0px 8px #000000']);

    const mX = useTransform(scrollYProgress, [0.9, 1], ['0ch', '4ch']);
    const oeX = useTransform(scrollYProgress, [0.9, 1], ['0ch', '-1.2ch']);
    const scale = useTransform(scrollYProgress, [0.9, 0.95, 1], ["100%", "130%", "100%"])

    return <motion.h1 className='absolute top-5 text-center' style={{ y, fontSize, lineHeight: fontSize, zIndex: 100, textShadow: shadow }}>
        <motion.span style={{ x: mX, display: 'inline-block', scaleX: scale }}>M</motion.span>
        <motion.span style={{ opacity }}>oritz R</motion.span>
        <motion.span style={{ x: oeX, display: 'inline-block', scaleX: scale }}>oe</motion.span>
        <motion.span style={{ opacity }}>ssler</motion.span>
        {/* {'Moritz Roessler'.split('').map((c, i) => <motion.span style={{ opacity: ex.includes(i) ? undefined : shrink, display: 'inline-block', overflow: 'hidden' }}>{c}</motion.span>)} */}
    </motion.h1>
}

export const AppearingText = ({ texts, slices }: { texts: string[], slices?: number[] }) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 110, screen.height * -0.44, easeInOut)
    const t2 = useTransform(scrollYProgress, [0, 1], [1, texts.length + 1])
    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])

    const [text, setText] = useState('');
    const [, setRerender] = useState(0);
    const startMultiplier = 2;
    useMotionValueEvent(y, 'change', () => {
        const totalProgress = t2.get();
        const curText = Math.min(texts.length - 1, Math.floor(totalProgress - 1));
        const curProgress = totalProgress % 1
        const it = texts[curText]
        const slice = ((slices || [])[curText] || 0);

        /** We want the end result to be visible for half the time of the animation. */
        const start = Math.floor(
            Math.round((curProgress) * (it.length - slice - 1)) * startMultiplier)

        const rand = it.split('').slice(
            slice + start
        )

        rand.sort((a, b) => {
            return ((Math.random() - 0.5) * (1 - curProgress)) + ((curProgress) * (it.indexOf(a) - it.indexOf(b)))
        }).join('');

        const part1 = it.split('').slice((slices || [])[curText] || 0);
        const part = part1.map((_, i) => (start > i ? part1[i] : rand[i - start])).join('');
        const txt = it.slice(0, (slices || [])[curText] || 0) + part;
        setText(txt)

        if (curProgress >= 0.5) {
            setRerender(1);
        } else if (curProgress < 0.5) {
            setRerender(0)
        }
    })
    return <motion.h1 className={clsx('absolute top-5 text-center', { 'break-all': ((t2.get()) % 1) < (1 / startMultiplier) })} style={{ y, zIndex: 100, textShadow: boxShadow }}>
        {text}
    </motion.h1 >
}

export type BulletsProps = {
    data: { text: string, logo: any, href?: string }[],
    className?: string
    offset: number;
    n: number;
}
export const Bullets = ({ data, className, offset = 0.5, n }: BulletsProps) => {
    const { ref } = useContext(sectionCtx);

    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });

    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])


    const scale = useTransform(scrollYProgress, [offset + 0.05 * 0, offset + 0.05 * 1], ["0%", "100%"])
    // const opacity = useTransform(scrollYProgress, [0.85, 0.9], ["0%", "100%"])
    const scale1 = useTransform(scrollYProgress, [offset + 0.05 * 1, offset + 0.05 * 2], ["0%", "100%"])
    const scale2 = useTransform(scrollYProgress, [offset + 0.05 * 2, offset + 0.05 * 3], ["0%", "100%"])
    const scale3 = useTransform(scrollYProgress, [offset + 0.05 * 3, offset + 0.05 * 4], ["0%", "100%"])
    const bg = useTransform(scrollYProgress, [0.75, 0.9], ["#00000000", "#00000099"])
    return <div className={clsx('flex flex-col flex-wrap absolute gap-2 text-white m-4', className)} style={{ top: 64 * n }}>
        {
            data.map((e, i) => {
                return <motion.div style={{ scale: [scale, scale1, scale2, scale3][i % 4], boxShadow, padding: 8, backgroundColor: bg, y: 8 }} className='flex gap-1'>
                    <e.logo width="36px" height="36px" />
                    <h2><a href={e.href || '#'}>{e.text}</a></h2>
                </motion.div>
            })
        }
    </div >
}

export type BulletsRowsProps = {
    data: { text: string, logo: any, href?: string }[]
}