import React, { useRef } from 'react'
import Navbar from '../../components/main/Navbar'
import HeroSection from '../../components/homepage/HeroSection'
import About from '../../components/homepage/About'
import Footer from '../../components/main/Footer'
import Statistics from '../../components/homepage/Statistics'
import Testimonials from '../../components/homepage/Testimonials'

const Homepage = () => {
  const aboutSectionRef = useRef();

  const scrollToAbout = () => {
    aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar scrollToAbout={scrollToAbout} />
      <HeroSection />
      <Statistics />
      <About aboutSectionRef={aboutSectionRef} />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Homepage