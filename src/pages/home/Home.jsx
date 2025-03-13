import React from 'react'
import HeroSection from '../../components/herosection/herosection'
import About from '../about/About'
import Room from '../room/Room'
import Services from '../../components/Services/Services'
import Contact from '../../components/Contact/Contact'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'


const Home = () => {
  return (
    <div>

    <HeroSection/>
    <About/>
    <Room/>
    <Services/>
    <PhotoGallery/>
    <Contact/>

    </div>
  )
}

export default Home