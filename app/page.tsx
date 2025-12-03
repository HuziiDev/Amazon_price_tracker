
import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import { getAllProduct } from '@/lib/actions'
import Image from 'next/image'
import {motion} from 'framer-motion'
import React from 'react'

const Home = async() => {
   const allProducts = await getAllProduct()
  return (
    <>
    <section className='px-6 md:px-20 py-44 '>

    
        {/* <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 50, 50, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 80%, rgba(255, 50, 50, 0.3) 0%, transparent 50%)`
          }}
        />
      </div> */}

             <div className='flex max-xl:flex-col gap-16 '>
                 <div className='flex flex-col justify-center '>
                      <p className='text-sm flex gap-3'>Smart shopping starts here
                        <Image src="/arrow.png" alt='image' width={16} height={16}/>
                      </p>
                      
                      <h1 className='text-7xl font-bold mt-4'>Unleash the power of <br />
                      <span className='text-red-600'>PriceWise</span> 
                      </h1>
                      <p className='mt-6'>
                        Find the best deals, compare prices, and save money with ease using PriceWise - your ultimate shopping companion.
                      </p>
                      <SearchBar/>
                   </div>
              {/* <HeroCarousel/> */}
             </div>
    </section>

    <section className='trending-section px-6 md:px-20 py-6'>
      <h2 className='text-3xl font-semibold '>Trending section</h2>
      <div className='flex flex-wrap gap-x-8 gap-y-16v mt-8'>
        {allProducts.map((product) => (
         <ProductCard key={product._id} product={product}/>
        ))}
      </div>
     
    </section>
    </>
  )
}

export default Home