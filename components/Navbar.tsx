'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-2xl border-b border-gray-200' 
        : 'bg-white'
    }`}>
      <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-0 '>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3 group'>
          {/* iamge can be addded inside this div */}
            {/* <div className='relative w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-xl'>
            
            </div> */}
            <span className='text-xl lg:text-2xl font-bold text-black'>
              Price<span className='text-red-600'>Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-1 lg:gap-2'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='px-4 py-2 text-black font-semibold hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 relative'
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section - Search & Actions */}
          <div className='flex items-center gap-2 lg:gap-3'>
            
            {/* Search Bar - Hidden on small screens */}
            <div className='hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 w-56 xl:w-64 focus-within:border-red-600 transition-all'>
              <Image src='/search.png' alt='search' width={18} height={18} className='opacity-60' />
              <input
                type='text'
                placeholder='Search products...'
                className='bg-transparent border-none outline-none ml-2 text-sm w-full text-black placeholder:text-gray-500'
              />
            </div>

         

          

            {/* User Profile */}
            <button className='hidden sm:flex items-center gap-2 px-4 lg:px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300'>
              <Image src='/user.png' alt='user' width={18} height={18} className='brightness-0 invert' />
              <span className='text-sm hidden lg:inline'>Account</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <div className='w-6 h-5 flex flex-col justify-between'>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className='py-4 space-y-2 border-t border-gray-200'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='block px-4 py-3 text-black font-semibold hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors'
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className='px-4 pt-2'>
              <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-red-600 transition-all'>
                <Image src='/search.png' alt='search' width={18} height={18} className='opacity-60' />
                <input
                  type='text'
                  placeholder='Search products...'
                  className='bg-transparent border-none outline-none ml-2 text-sm w-full text-black placeholder:text-gray-500'
                />
              </div>
            </div>

            {/* Mobile Account Button */}
            <div className='px-4 pt-2 sm:hidden'>
              <button className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-all'>
                <Image src='/user.png' alt='user' width={18} height={18} className='brightness-0 invert' />
                <span className='text-sm'>My Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar