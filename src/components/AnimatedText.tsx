import { easeInOut, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useParallax } from '@/lib/hooks';
import { useContext, useRef, useState } from 'react';
import { sectionCtx } from '@/components/AnimatedSection';
import clsx from 'clsx';
import { getHeight } from '@/lib/util';
import { Link } from 'react-router-dom';

export const AnimatedText = () => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const y = useParallax(scrollYProgress, 150, screen.height * -0.55, easeInOut)
    const scale = useTransform(scrollYProgress, [0.25, 1], ['36px', '72px'])

    return <motion.h1 className='absolute top-5 text-center' style={{ y, fontSize: scale, lineHeight: scale, zIndex: 100 }}>
        Moritz Roessler
    </motion.h1>
}

export const MyName = () => {
    const { ref } = useContext(sectionCtx);
    const height = getHeight(ref?.current || null);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });

    const hRef = useRef<HTMLDivElement>(null);

    const distance = (height / 1.75) / 4;
    let marginBottom = 16;
    if (hRef.current) {
        marginBottom = +window.getComputedStyle(hRef.current).marginBottom.replace('px', '') / window.devicePixelRatio;
    }

    const offset = marginBottom;
    const y = useParallax(scrollYProgress, distance - offset, distance - offset, easeInOut)
    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.1]);
    const fS = screen.width <= 452 ? 52 : 72;
    const fontSize = useTransform(scrollYProgress, [0.25, 0.9], ['36px', screen.width <= 452 ? '52px' : '72px'])
    const shadow = useTransform(scrollYProgress, [0.25, 1], ['0px 0px 0px #FFFFFF', '0px 0px 8px #000000']);

    const mRef = useRef<HTMLDivElement>(null);
    const oeRef = useRef<HTMLDivElement>(null);
    const [dist, setDist] = useState([4, -4]);


    const [distCenterM, distCenterOe] = dist;
    const mX = useTransform(scrollYProgress, [0.8, 0.9], ['0px', ((distCenterM) + 'px')]);
    const oeX = useTransform(scrollYProgress, [0.8, 0.9], ['0px', ((distCenterOe) + 'px')]);
    const scale = useTransform(scrollYProgress, [0.8, 0.9, 0.95, 1], ["100%", "130%", "70%", "100%"])
    const heightPipe = useTransform(scrollYProgress, [0.98, 1], ["0px", "100px"])
    const widthUS = useTransform(scrollYProgress, [0.98, 1], ["0px", "100px"])
    const yPpipe = useTransform(scrollYProgress, [0.98, 1], [(fS * -0.25) + 'px', "25px"])
    const xUS = useTransform(scrollYProgress, [0.98, 1], ['0px', "-26px"])
    const shadowPipe = useTransform(scrollYProgress, [0.98, 1], ["0px 0px 0px 0px white", "0px 0px 1px 0.5px white"])
    const bb = useTransform(scrollYProgress, [0, 0.98, 1], ["2px solid white", "2px solid white", "0px solid white"])

    useMotionValueEvent(scrollYProgress, 'change', () => {
        if (scrollYProgress.get() <= 1) {

            const mRect = mRef.current?.getBoundingClientRect() || null;
            const oeRect = oeRef.current?.getBoundingClientRect() || null;
            // const hWidth = ((mRect?.width || 0) + (oeRect?.width || 0)) / 2
            const distCenterM = -(mRect?.left || 0) + (window.innerWidth / 2) - (mRect?.width || 0)
            const distCenterOe = (window.innerWidth / 2) - (oeRect?.left || 0);
            setDist([distCenterM, distCenterOe])
        }
    })
    return <motion.h1 id="moe" ref={hRef} className='absolute bottom-0 text-center'
        style={{ y, fontSize, lineHeight: fontSize, zIndex: 100, textShadow: shadow, borderBottom: bb }}>
        <Link to="/about" >
            <span ref={mRef}>
                <motion.span style={{ x: mX, display: 'inline-block', scaleX: scale }}>
                    M
                    <motion.div className='inline-block w-[0px]' style={{ x: -1, fontSize: '32px', y: yPpipe, height: heightPipe, boxShadow: shadowPipe }}></motion.div>
                </motion.span>
            </span>
            <motion.span style={{ opacity }}>oritz R</motion.span>
            <span ref={oeRef}>
                <motion.span style={{ x: oeX, display: 'inline-block', scaleX: scale }}>
                    oe
                    <motion.div className='absolute  h-0' style={{ y: -4, fontSize: '32px', x: xUS, width: widthUS, boxShadow: shadowPipe }}></motion.div>
                </motion.span>
            </span>
            <motion.span style={{ opacity }}>ssler</motion.span>
        </Link>
    </motion.h1 >
}

export const AppearingText = ({ texts, slices, Component = motion.h1 }: { texts: string[], slices?: number[], Component?: any }) => {
    const { ref } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });
    const dist = 110;
    const off = dist - getHeight(document.body) * 0.25;
    const y = useParallax(scrollYProgress, dist, off, easeInOut);
    const t2 = useTransform(scrollYProgress, [0, 1], [1, texts.length + 1])
    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])

    const [text, setText] = useState(['', '']);
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

        const part1 = it.split('').slice((slices || [])[curText] || 0, ((slices || [])[curText] || 0) + start).join('')
        const part = rand.map((_, i) => (rand[i])).join('');
        const txt = [it.slice(0, (slices || [])[curText] || 0).concat(part1), part];
        setText(txt)

        if (curProgress >= 0.5) {
            setRerender(1);
        } else if (curProgress < 0.5) {
            setRerender(0)
        }
    })
    return <Component className={clsx('absolute text-center', { 'break-all': ((t2.get()) % 1) < (1 / startMultiplier) })} style={{ y, zIndex: 100, textShadow: boxShadow }}>
        <span>{text[0]}</span>
        <span style={{ color: '#FFFFFF33', textShadow: '0px 0px 7px white' }}>{text[1]}</span>
    </Component >
}

export type BulletsProps = {
    data: { text: string, logo: any, href?: string }[],
    className?: string
    offset: number;
    reverse?: boolean;
}
export const Bullets = ({ data, className, offset = 0.5, reverse }: BulletsProps) => {
    const { ref } = useContext(sectionCtx);

    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: ref || undefined,
        offset: ["start start", "end end"]
    });

    const boxShadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px black', '0px 0px 12px black'])


    const scale = useTransform(scrollYProgress, [offset + 0.05 * 0, offset + 0.05 * 1], ["0%", "100%"])
    const gap = useTransform(scrollYProgress, [offset + 0.05 * 3, offset + 0.05 * 4], ["32px", "8px"])
    const textWidth = useTransform(scrollYProgress,
        [offset + 0.05 * 3, offset + 0.05 * 4],
        ["0px", "300px"]);
    const borderRadius = useTransform(scrollYProgress, [offset + 0.05 * 2, offset + 0.05 * 3], ["32px", "0px"])
    const scale1 = useTransform(scrollYProgress, [offset + 0.05 * 1, offset + 0.05 * 2], ["0%", "100%"])
    const scale2 = useTransform(scrollYProgress, [offset + 0.05 * 2, offset + 0.05 * 3], ["0%", "100%"])
    const scale3 = useTransform(scrollYProgress, [offset + 0.05 * 3, offset + 0.05 * 4], ["0%", "100%"])
    const bg = useTransform(scrollYProgress, [0.9, 1], ["#00000000", "#00000099"])
    let scalings = [scale, scale1, scale2, scale3];


    return <motion.div className={clsx(' flex flex-row flex-wrap text-white flex-grow-0 items-center justify-center', className)} style={{ gap }}>
        {
            data.map((e, i) => {
                const ele = reverse ? data.length - 1 - i : i;
                return <motion.a className="bullet" href={e.href || '#'}
                    tabIndex={-1}
                    style={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        scale: scalings[ele % 4],
                        boxShadow,
                        borderRadius,
                        alignItems: 'center',
                        justifyContent: 'center', padding: 8, backgroundColor: bg, y: 8

                    }}
                >
                    <motion.div

                        className='flex flex-grow-0'>
                        <e.logo width="36px" height="36px" />
                        <motion.h2
                            style={{
                                maxWidth: textWidth,
                            }}>
                            <div style={{ marginLeft: '8px' }}>
                                {e.text}
                            </div>
                        </motion.h2>
                    </motion.div>
                </motion.a>

            })
        }
    </motion.div >
}

export type BulletsRowsProps = {
    data: { text: string, logo: any, href?: string }[]
}