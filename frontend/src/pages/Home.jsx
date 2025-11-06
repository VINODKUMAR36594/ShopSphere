import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionsSection from '../components/Products/GenderCollectionsSection'
import NewArrivals from '../components/Products/NewArrivals'
const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionsSection/>
        <NewArrivals/>
      
    </div>
  )
}

export default Home
