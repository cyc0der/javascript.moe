import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AnimatedSection } from './components/AnimatedSection'
import { AnimatedImageCircle } from './components/AnimatedImageCircle'
import { BackgroundImage } from './components/BackgroundImage'
import { Container } from './components/Container'
import { AnimatedText, AppearingText, Bullets } from './components/AnimatedText'
import { BlendedImage } from './components/BlendedImage'
import TS from './assets/ts.svg?react';
import PDF from './assets/pdf.svg?react';
import ReactLogo from './assets/react.svg?react';
import LI from './assets/li.svg?react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AnimatedSection height='125vh' >
        <BackgroundImage src="/images/wallpaper/1.jpg" />
        <Container>
          <AnimatedImageCircle src="/images/profile.jpg" />
        </Container>
        <AnimatedText />
      </AnimatedSection>
      {/* <AnimatedSection height='200vh' >
        <BackgroundImage src="/images/wallpaper/2.jpg" />

      </AnimatedSection> */}
      <AnimatedSection height='200vh'>
        <BlendedImage />
        <AppearingText texts={['Software Engineer', 'Fullstack Dev']} />
        <Bullets data={[
          { text: 'TypeScript', logo: TS },
          { text: 'React', logo: ReactLogo }
        ]}></Bullets>
      </AnimatedSection>
      <AnimatedSection height='300vh'>
        <BackgroundImage src="/images/wallpaper/4.jpg" invert />

        <AppearingText texts={['Looking for a senior TypeScript dev?', 'Looking for a lead developer?', 'Contact Me']} slices={[0, 14, 0]} />
        <Bullets data={[
          { text: 'CV', logo: PDF, href: 'https://justmycv.com/en.pdf' },
          { text: 'Linked In', logo: LI, href: 'https://www.linkedin.com/in/moritz-roessler-666b18175/' }
        ]}></Bullets>
      </AnimatedSection>
    </>
  )
}

export default App
