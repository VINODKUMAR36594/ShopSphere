import React from 'react'
import  heroImg from "../../assets/rabbit-hero.webp"
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
      <img src={heroImg} alt="rabbit"  className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
      <div className='absoulte inset-0  bg-black  bg-opacity-5 flex items-center justify-center '>
        <div className='text-center text-white p-6'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>Vactaion
                </h1><br />
                <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vaction-ready outfits with fast worldwide shipping.</p>
                <Link to="#" className='bg-white text-gray-950 h-10 w-10 px-6 py-2 rounded-sm text-lg'>Shop Now</Link>
        </div>
      </div>
      
    </section>
  )
}

export default Hero
