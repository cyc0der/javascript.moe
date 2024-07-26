import { getHeight } from "../lib/util"
import {
    AnimatedSection,
    sectionCtx
} from "../components/AnimatedSection"
import { BackgroundImage } from "../components/BackgroundImage"
import { Parallax } from "../components/anim/Parallax"
import {
    motion,
    useScroll, useTransform
} from 'framer-motion';
// import ArrowBack from '../assets/arrowback.svg?react'
// import { Link } from "react-router-dom"
import { useContext } from "react";

const text = `
I'm Moe. A guy in his 30ies. I have 11 years of professional experience with JavaScript. 
Over the years I gained expert knowledge in web and fullstack development. 
Most of my time I'm working with TypeScript, React and GraphQL.
As a senior TypeScript developer, I value code quality, static typing and the right 
tooling. If you're looking for a senior frontend developer or a lead developer 
in the greater area of Freiburg im Breisgau (or remote), don't hesitate to contact me. 
I'm well experienced in working with remote teams following Scrum principles.
`

export const AboutPage = () => {

    return <>
        <AnimatedSection height='120lvh' >
            <AboutSection />
        </AnimatedSection >
    </>
}

export const AboutSection = () => {
    const { ref: scrollRef } = useContext(sectionCtx);
    const dist = (getHeight(document.body) * 0.5);
    const offset = -dist;
    const { scrollYProgress } = useScroll({
        layoutEffect: false,
        target: scrollRef || undefined,
        offset: ["start start", "end end"]
    });

    const blur = useTransform(scrollYProgress, [0, 1], ['blur(4px)', 'blur(0px)'])
    const rblur = useTransform(scrollYProgress, [0, 1], ['brightness(100%) blur(0px) saturate(100%)', 'brightness(80%) blur(4px) saturate(140%)'])
    const background = useTransform(scrollYProgress, [0, 1], ['#FFFFFF11', '#00000033'])
    // const overflowY = useTransform(scrollYProgress, [0, 1], ['hidden', 'auto'])
    return <><BackgroundImage src="/images/wallpaper/5.webp" alt="Seepark in Freiburg" />
        <div className='w-[80ch] max-w-[calc(100vw-32px)] h-[100lvh] overflow-hidden'>
            {/* <Parallax distance={32 * 2} offset={32 * 1} className="flex"  >
                <Link to="/" className="flex">
                    <ArrowBack style={{ fill: 'white' }} />
                    <h2>Back</h2>
                </Link>
            </Parallax> */}
            <Parallax distance={dist - 32 * 4} offset={offset + 32 * 2}  >
                <div
                    // role="button"
                    onClick={() => window.scrollTo({ top: window.pageYOffset <= 0 ? window.innerHeight : 0, behavior: 'smooth' })}
                >
                    <motion.div
                        // style={{ background, backdropFilter: rblur, overflowY: 'auto' }}
                        className="p-4 rounded-md shadow-lg shadow-black max-h-[calc(100lvh-120px)] overflow-y-auto" >
                        <motion.p style={{ filter: blur, textShadow: '0px 0px 1px black' }}>{text}</motion.p>
                    </motion.div>
                </div>
            </Parallax>
            {/* <Parallax
                distance={dist - 32 * 2} offset={offset + 32} className="w-full absolute top-0 ml-4">
                <div
                    style={{ width: 'fit-content' }}
                    role="button"
                    onClick={() => window.scrollTo({ top: window.pageYOffset <= 0 ? window.innerHeight : 0, behavior: 'smooth' })}
                >
                    <h1 style={{ textShadow: '0px 0px 3px black' }}>About Me</h1>
                </div>
            </Parallax> */}
        </div>
    </>
}