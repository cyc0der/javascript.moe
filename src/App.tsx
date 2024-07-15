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
  return (
    <>
      <AnimatedSection height='175vh' >
        <BackgroundImage src="/images/wallpaper/1.jpg" />
        <Container>
          <AnimatedImageCircle src="/images/profile.jpg" />
        </Container>
        <AnimatedText />
      </AnimatedSection>
      {/* <AnimatedSection height='200vh' >
        <BackgroundImage src="/images/wallpaper/2.jpg" />

      </AnimatedSection> */}
      <AnimatedSection height='300vh'>
        <BlendedImage a="/images/wallpaper/3.jpg" b="/images/wallpaper/2.jpg" />
        <AppearingText texts={['Software Engineer', 'Fullstack Dev']} />
        <Bullets data={[
          { text: 'TypeScript', logo: TS },
          { text: 'React', logo: ReactLogo }
        ]}></Bullets>
      </AnimatedSection>
      <AnimatedSection height='400vh'>
        <BackgroundImage src="/images/wallpaper/4.jpg" invert />

        <AppearingText texts={['Looking for a senior TypeScript dev?', 'Looking for a lead developer?', 'Contact Me']} slices={[0, 14, 0]} />
        <Bullets data={[
          { text: 'CV', logo: PDF, href: 'https://justmycv.com/en.pdf' },
          { text: 'LinkedIn', logo: LI, href: 'https://www.linkedin.com/in/moritz-roessler-666b18175/' }
        ]}></Bullets>
      </AnimatedSection>
    </>
  )
}

export default App
