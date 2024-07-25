import { getHeight } from "../lib/util"
import { AnimatedImageCircle } from "../components/AnimatedImageCircle"
import { AnimatedSection } from "../components/AnimatedSection"
import { AppearingText, MyName } from "../components/AnimatedText"
import { BackgroundImage } from "../components/BackgroundImage"
import { Container } from "../components/Container"
import { FlyOut } from "../components/anim/FlyOut"
import { Parallax } from "../components/anim/Parallax"
import { HTMLMotionProps, easeInOut, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import ArrowBack from '../assets/arrowback.svg?react'
import { Link } from "react-router-dom"
const text = `
I'm Moe. A guy in his 30ies. I have 11 years of professional experience with JavaScript. 
Over the years I gained expert knowledge in web and fullstack development. 
Most of my time I'm working with TypeScript, React and GraphQL.
As a senior TypeScript developer, I value code quality, static typing and the right 
tooling. If you're looking for a senior frontend developer or a lead developer 
in the greater area of Freiburg im Breisgau (or remote), don't hesitate to contact me. 
I'm well experienced in working with remote teams in agile environments such as Scrum.
`

export const AboutPage = () => {
    const dist = (getHeight(document.body) * 0.5);
    const offset = -dist;
    const { scrollYProgress } = useScroll();
    const blur = useTransform(scrollYProgress, [0, 1], ['blur(4px)', 'blur(0px)'])
    const rblur = useTransform(scrollYProgress, [0, 1], ['brightness(100%) blur(0px) saturate(100%)', 'brightness(80%) blur(4px) saturate(140%)'])
    const background = useTransform(scrollYProgress, [0, 1], ['#FFFFFF11', '#00000033'])
    const overflow = useTransform(scrollYProgress, [0, 1], ['hidden', 'scroll'])
    return <AnimatedSection height='120lvh' >
        <BackgroundImage src="/images/wallpaper/5.webp" alt="Seepark in Freiburg" />
        <div className='w-[70ch] max-w-[calc(100vw-32px)] absolute top-0'>
            <Parallax distance={32 * 2} offset={32 * 1} className="flex"  >
                <Link to="/" className="flex">
                    <ArrowBack style={{ fill: 'white' }} />
                    <h2>Back</h2>
                </Link>
            </Parallax>
            <Parallax distance={dist - 32 * 4} offset={offset + 32 * 2}  >
                <motion.div
                    style={{ background, backdropFilter: rblur, overflow }}
                    className="p-4 rounded-md shadow-lg shadow-black overflow-scroll max-h-[calc(100vh-120px)]" >
                    <motion.p style={{ filter: blur, textShadow: '0px 0px 1px black' }}>{text}</motion.p>
                </motion.div>
            </Parallax>
            <Parallax
                distance={dist - 32 * 2} offset={offset + 32} className="w-full absolute top-0 ml-4">
                <h1 style={{ textShadow: '0px 0px 3px black' }}>About Me</h1>
            </Parallax>
        </div>
    </AnimatedSection >
}