import React from 'react'

import About from '../about/About'
import Room from '../room/Room'
import Services from '../../components/Services/Services'
import Contact from '../../components/Contact/Contact'
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery'
import HeroSection from '../../components/Hero/HeroSection'



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