
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'

import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import AllProducts from '@/components/AllProducts'
import DemoPage from '@/components/DemoPage'

const Home = async () => {

  // const { data: allProducts } = await axios.get('/api/product')
  
  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-red-100 relative overflow-hidden font-sans">
      
      {/* Background "Shader" Effect: Dots and Gradient Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.4]" 
             style={{ 
               backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>
        {/* Red Gradient Wave/Glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-red-200/40 to-red-50/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] rounded-full bg-gradient-to-b from-red-100/40 to-transparent blur-3xl"></div>
      </div>

      {/* Navbar (Included as requested) */}
    

      {/* Hero Section */}
      <section className='relative z-10 px-6 md:px-20 pt-16 pb-32 max-w-7xl mt-16 mx-auto'>
        <div className='flex flex-col items-center text-center gap-10'>
            
            {/* Tagline Badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-100 shadow-sm text-sm font-medium text-red-600 animate-fade-in-up'>
              <span>Smart Shopping Reimagined</span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className='text-6xl md:text-8xl text-slate-200 font-extrabold tracking-tighter leading-[1.1]'>
              Unleash the power of <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400'>
                PriceSync
              </span>
            </h1>

            {/* Subtext */}
            <p className='mt-2 max-w-xl text-lg text-slate-400 leading-relaxed'>
              Find the best deals, compare prices, and save money with ease using PriceWise - your ultimate, futuristic shopping companion.
            </p>

            {/* Search Component */}
            <div className="w-full flex justify-center mt-4">
              <SearchBar  />
            </div>
        </div>
      </section>
     
        <DemoPage/>

      {/* Trending Section */}
      <section className='relative z-10 px-6 md:px-20 py-24 bg-gray-400 backdrop-blur-sm border-t border-red-50'>
        <div className="flex items-center justify-between mb-12">
           <h2 className='text-4xl font-bold tracking-tight text-gray-900'>
             Trending Now
             <span className="block h-1.5 w-20 bg-red-600 mt-2 rounded-full"></span>
           </h2>
        </div>

        <AllProducts/>
      </section>


        

      {/* Footer Section */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4">
             <p className="text-2xl font-bold text-gray-900">
              Price<span className="text-red-600">Wise</span>
            </p>
            <p className="text-gray-500 max-w-sm">
              Track prices, save money, and shop smarter with the world's most advanced price tracking tool.
            </p>
          </div>
          
          <div className="flex gap-16">
             <div className="flex flex-col gap-4">
               <h4 className="font-bold text-gray-900">Resources</h4>
               <span className="text-gray-500 hover:text-red-600 cursor-pointer">About Us</span>
               <span className="text-gray-500 hover:text-red-600 cursor-pointer">Documentation</span>
               <span className="text-gray-500 hover:text-red-600 cursor-pointer">Contact</span>
             </div>
             <div className="flex flex-col gap-4">
               <h4 className="font-bold text-gray-900">Legal</h4>
               <span className="text-gray-500 hover:text-red-600 cursor-pointer">Privacy</span>
               <span className="text-gray-500 hover:text-red-600 cursor-pointer">Terms</span>
             </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PriceWise. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

export default Home