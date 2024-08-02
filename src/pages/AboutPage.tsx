import { getVH, scrollToTop } from "@/lib/util"
import { StickySection, sectionCtx } from "@/components/AnimatedSection"
import { BackgroundImage } from "@/components/BackgroundImage"
import { Parallax } from "@/components/anim/Parallax"
import {
    motion,
    useScroll, useTransform
} from 'framer-motion';
import ArrowBack from '@/assets/arrowback.svg?react'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AboutSectionProps } from "@/lib/types";
import { ABOUT_TEXT } from "@/lib/const";

export const AboutPage = () => {
    return <div className="relative">
        <StickySection height='120lvh' >
            <AboutSection text={ABOUT_TEXT} />
        </StickySection >
    </div>
}

export const AboutSection = ({ text }: AboutSectionProps) => {
    const { ref: scrollRef } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        layoutEffect: true,
        target: scrollRef || undefined,
        offset: ["start start", "end end"]
    });

    const dist = getVH(50)
    const offset = -dist;
    const blur = useTransform(scrollYProgress, [0, 1], ['blur(4px)', 'blur(0px)'])
    const rblur = useTransform(scrollYProgress, [0, 1], ['brightness(100%) blur(0px) saturate(100%)', 'brightness(80%) blur(4px) saturate(140%)'])
    const background = useTransform(scrollYProgress, [0, 1], ['#FFFFFF11', '#00000033'])
    const overflowY = useTransform(scrollYProgress, [0, 1], ['hidden', 'auto']);

    return <>
        <BackgroundImage src="/images/wallpaper/5.webp" alt="Seepark in Freiburg" />
        <div className='w-[80ch] max-w-[calc(100vw-32px)] absolute top-0'>
            <Parallax distance={32 * 2} offset={32 * 1} className="flex"  >
                <Link to="/" className="flex">
                    <ArrowBack style={{ fill: 'white' }} />
                    <h2>Back</h2>
                </Link>
            </Parallax>
            <Parallax distance={dist - 32 * 4} offset={offset + 32 * 2}>
                <button
                    onClick={scrollToTop}
                >
                    <motion.div
                        style={{
                            background,
                            backdropFilter: rblur,
                            overflowY
                        }}
                        className="p-4 rounded-md shadow-lg shadow-black max-h-[calc(100svh-120px)]" >
                        <motion.p style={{ filter: blur, textShadow: '0px 0px 1px black' }}>{text}</motion.p>
                    </motion.div>
                </button>
            </Parallax>
            <Parallax
                distance={dist - 32 * 2} offset={offset + 32} className="w-full absolute top-0 ml-4"
            >
                <button
                    className="w-fit"
                    onClick={scrollToTop}
                >
                    <h1 style={{ textShadow: '0px 0px 3px black', display: 'inline', position: 'relative' }}>About Me</h1>
                </button>
            </Parallax>
        </div>
    </>
}