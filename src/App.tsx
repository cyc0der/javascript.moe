import './App.css'
import { AnimatedSection } from './components/AnimatedSection'
import { AnimatedImageCircle } from './components/AnimatedImageCircle'
import { BackgroundImage } from './components/BackgroundImage'
import { Container } from './components/Container'
import { AppearingText, Bullets, Shrinking } from './components/AnimatedText'
import TS from './assets/ts.svg?react';
import PDF from './assets/pdf.svg?react';
import ReactLogo from './assets/react.svg?react';
import LI from './assets/li.svg?react';
import AWSLogo from './assets/aws.svg?react';
import SQLLogo from './assets/sql.svg?react';
import NodeJSLogo from './assets/node.svg?react';
import VueJSLogo from './assets/vue.svg?react';
import DockerLogo from './assets/docker.svg?react';
import LambdaLogo from './assets/lambda.svg?react';
import { DualImages } from './components/BlendedImage'

function App() {
  return (
    <>
      <AnimatedSection height='175lvh' >
        <BackgroundImage src="/images/wallpaper/1.jpg" desat />
        <Container>
          <AnimatedImageCircle src="/images/profile.jpg" />
        </Container>
        <Shrinking />
      </AnimatedSection>
      <AnimatedSection height='300lvh'>
        {/* <BackgroundImage src="/images/wallpaper/2.jpg"  /> */}
        <DualImages images={["/images/wallpaper/3.jpg", "/images/wallpaper/2.jpg"]} moveX={2} />
        <AppearingText texts={['Software Engineer', 'Fullstack Dev']} />
        <div className='absolute w-full flex flex-col items-center gap-2 mt-[25vh]'>

          <Bullets data={[
            { text: 'TypeScript', logo: TS, href: 'https://www.typescriptlang.org/' },
            { text: 'React', logo: ReactLogo, href: 'https://react.dev/' }
          ]}
            offset={0.4}
            n={0}

          ></Bullets>
          <Bullets data={[
            { text: 'SQL', logo: SQLLogo, href: 'https://www.postgresql.org/' },
            { text: 'AWS', logo: AWSLogo, href: 'https://aws.amazon.com/de/console/' },
            { text: 'Node.js', logo: NodeJSLogo, href: 'https://nodejs.org/en' },
            { text: 'Vue.js', logo: VueJSLogo, href: 'https://vuejs.org/' },
            { text: 'Docker', logo: DockerLogo, href: 'https://www.docker.com/' },
            { text: 'Lambda', logo: LambdaLogo, href: 'https://aws.amazon.com/de/lambda/' },
          ]}
            className="!flex-row"
            offset={0.5}
            n={window.innerWidth >= 768 ? 120 : 105}
          ></Bullets>
        </div>
      </AnimatedSection>
      <AnimatedSection height='450lvh'>
        {/* <BackgroundImage src="/images/wallpaper/4.jpg" invert desat /> */}
        <DualImages images={[
          "/images/wallpaper/4.jpg",
          "/images/wallpaper/6.jpg",
          // "/images/wallpaper/6.jpg",
        ]} invert desat />

        <AppearingText texts={['Looking for a senior TypeScript dev?', 'Looking for a lead developer?', 'Contact me']} slices={[0, 14, 0]} />
        <div className='absolute w-full mt-[25vh] flex justify-center'>
          <Bullets data={[
            { text: 'CV', logo: PDF, href: 'https://justmycv.com/en.pdf' },
            { text: 'LinkedIn', logo: LI, href: 'https://www.linkedin.com/in/moritz-roessler-666b18175/' }
          ]}
            n={screen.height * 0}
            offset={0.8}
          ></Bullets>
        </div>
      </AnimatedSection>
    </>
  )
}

export default App
