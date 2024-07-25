import './App.css'
import { AnimatedSection } from './components/AnimatedSection'
import { AnimatedImageCircle } from './components/AnimatedImageCircle'
import { BackgroundImage } from './components/BackgroundImage'
import { Container } from './components/Container'
import { AppearingText, Bullets, MyName } from './components/AnimatedText'
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
import { Parallax } from './components/anim/Parallax'
import { FlyOut } from './components/anim/FlyOut'

function App() {
  return (
    <>
      <AnimatedSection height='175lvh' >
        <BackgroundImage src="/images/wallpaper/1.webp" desat />
        <Parallax distance={320 * 0.5} offset={320 * 0.5}>
          <FlyOut range={[0.25, 0.5]}>
            <Container>
              <AnimatedImageCircle images={["/images/profile.webp", "/images/profile2.webp"]} />
            </Container>
          </FlyOut>
        </Parallax>
        <MyName />
      </AnimatedSection >
      <AnimatedSection height='300lvh' fullScreen>
        <DualImages images={["/images/wallpaper/3.webp", "/images/wallpaper/2.webp"]} moveX={2} />
        <AppearingText texts={['Software Engineer', 'Fullstack Dev']} />
        <Parallax className='absolute w-full flex flex-col items-center gap-2 mt-[25vh]' distance={32} offset={-32}>
          <Bullets data={[
            { text: 'TypeScript', logo: TS, href: 'https://www.typescriptlang.org/' },
            { text: 'React', logo: ReactLogo, href: 'https://react.dev/' }
          ]}
            offset={0.6}
            n={0}
          />
          <Parallax className='' distance={16} offset={-16} >
            <Bullets data={[
              { text: 'SQL', logo: SQLLogo, href: 'https://www.postgresql.org/' },
              { text: 'AWS', logo: AWSLogo, href: 'https://aws.amazon.com/de/console/' },
              { text: 'Node.js', logo: NodeJSLogo, href: 'https://nodejs.org/en' },
              { text: 'Vue.js', logo: VueJSLogo, href: 'https://vuejs.org/' },
              { text: 'Docker', logo: DockerLogo, href: 'https://www.docker.com/' },
              { text: 'Lambda', logo: LambdaLogo, href: 'https://aws.amazon.com/de/lambda/' },
            ]}
              className="!flex-row"
              offset={0.75}
              n={window.innerWidth >= 768 ? 120 : 105}
            ></Bullets>
          </Parallax>
        </Parallax>
      </AnimatedSection >
      <AnimatedSection height='450lvh'>
        <DualImages images={[
          "/images/wallpaper/4.webp",
          "/images/wallpaper/6.webp",
        ]} invert desat />
        <AppearingText texts={['Looking for a senior TypeScript dev?', 'Looking for a lead developer?', 'Contact me']} slices={[0, 14, 0]} />
        <Parallax className='w-full mt-[25vh] flex justify-center' distance={100} offset={-100}>
          <Bullets data={[
            { text: 'CV', logo: PDF, href: 'https://justmycv.com/en.pdf' },
            { text: 'LinkedIn', logo: LI, href: 'https://www.linkedin.com/in/moritz-roessler-666b18175/' }
          ]}
            n={screen.height * 0}
            offset={0.7}
          ></Bullets>
        </Parallax>
      </AnimatedSection>
    </>
  )
}

export default App
