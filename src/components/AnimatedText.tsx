import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
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
    const y = useParallax(scrollYProgress, 150, window.innerHeight * -0.66)
    const scale = useTransform(scrollYProgress, [0.25, 1], ['36px', '72px'])

    return <motion.h1 className='absolute top-5 text-center' style={{ y, fontSize: scale, lineHeight: scale, zIndex: 100 }}>
        Moritz Roessler
    </motion.h1>
}

export const AppearingText = ({ texts, slices }: { texts: string[], slices?: number[] }) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 150, -296)
    const t2 = useTransform(scrollYProgress, [0, 1], [1, texts.length + 1])
    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])

    const [text, setText] = useState('');
    const [, setR] = useState(0);
    const [_start, setStart] = useState(0);
    useMotionValueEvent(y, 'change', () => {
        // const l = Math.round(it.length * scrollYProgress.gette());
        // setText(it.slice(it.length - l, l));
        const p = t2.get();
        const curText = Math.min(texts.length - 1, Math.floor(p - 1));
        const pCur = p % 1
        const it = texts[curText]
        const start = Math.max(
            Math.floor(pCur * (it.length - 1)),
            (slices || [])[curText] || 0
        );

        const rand = it.split('').slice(
            start
        )

        rand.sort((a, b) => {
            return ((Math.random() - 0.5) * (1 - pCur)) * 2 + ((pCur) * (it.indexOf(a) - it.indexOf(b)))
        }).join('');

        const part1 = it.split('').slice((slices || [])[curText] || 0);
        const part = part1.map((_, i) => (Math.floor((pCur * 2) * (it.length - 1)) > i ? part1[i] : rand[i - start])).join('');
        const txt = it.slice(0, (slices || [])[curText] || 0) + part;
        setText(txt)
        setStart(start);
        if (pCur >= 0.5) {
            setR(1);
        } else if (pCur < 0.5) {
            setR(0)
        }
    })
    return <motion.h1 className={clsx('absolute top-5 text-center', { 'break-all': (t2.get() % 1) < 0.5 })} style={{ y, zIndex: 100, textShadow: boxShadow }}>
        {text}
    </motion.h1 >
}

export type BulletsProps = {
    data: { text: string, logo: any, href?: string }[]
}
export const Bullets = ({ data }: BulletsProps) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });

    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])


    const scale = useTransform(scrollYProgress, [0.7, 0.8], ["0%", "100%"])
    // const opacity = useTransform(scrollYProgress, [0.85, 0.9], ["0%", "100%"])
    const scale1 = useTransform(scrollYProgress, [0.85, 0.95], ["0%", "100%"])
    const bg = useTransform(scrollYProgress, [0.75, 0.9], ["#00000000", "#00000099"])
    return <div className='flex flex-col absolute gap-2 text-white'>
        {data.map((e, i) => {
            return <motion.div style={{ scale: [scale, scale1][i], boxShadow, padding: 8, backgroundColor: bg }} className='flex gap-1'>
                <e.logo width="36px" height="36px" />
                <h2><a href={e.href || '#'}>{e.text}</a></h2>
            </motion.div>
        })}
    </div >
}