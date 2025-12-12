'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { User, Sparkles } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])
  
  const { scrollY } = useScroll()
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 20])
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])

  useEffect(() => {
    setIsMounted(true)
    // Generate particles on client side only
    const newParticles = [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-7xl mx-auto relative"
        style={{
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        {/* Glassmorphic container */}
        <motion.div 
          className={`
            relative overflow-hidden
            rounded-full sm:rounded-3xl
            transition-all duration-500
            ${isScrolled 
              ? 'bg-black/40 shadow-2xl shadow-red-500/20' 
              : 'bg-black/20 shadow-xl shadow-red-500/10'
            }
          `}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-full sm:rounded-3xl opacity-50"
            animate={{
              background: [
                'linear-gradient(90deg, rgba(220,38,38,0.3) 0%, rgba(239,68,68,0.3) 50%, rgba(220,38,38,0.3) 100%)',
                'linear-gradient(180deg, rgba(220,38,38,0.3) 0%, rgba(239,68,68,0.3) 50%, rgba(220,38,38,0.3) 100%)',
                'linear-gradient(270deg, rgba(220,38,38,0.3) 0%, rgba(239,68,68,0.3) 50%, rgba(220,38,38,0.3) 100%)',
                'linear-gradient(360deg, rgba(220,38,38,0.3) 0%, rgba(239,68,68,0.3) 50%, rgba(220,38,38,0.3) 100%)',
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: 'blur(20px)',
            }}
          />

          {/* Floating particles effect */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden rounded-full sm:rounded-3xl pointer-events-none">
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                  style={{
                    left: particle.left,
                    top: particle.top,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Content container */}
          <div className="relative backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo Section */}
              <motion.div
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Icon Container */}
                <div className="relative">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/50"
                    animate={{
                      boxShadow: [
                        '0 10px 30px rgba(220, 38, 38, 0.3)',
                        '0 10px 40px rgba(220, 38, 38, 0.5)',
                        '0 10px 30px rgba(220, 38, 38, 0.3)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-red-500"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-tight">
                      Price
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent tracking-tight">
                      Sync
                    </span>
                  </motion.div>
                  <motion.div 
                    className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </div>
              </motion.div>

              {/* Account Button */}
              <motion.button
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background with gradient */}
                <div className="relative px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-full sm:rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300">
                  
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Button content */}
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <span className="hidden sm:inline text-sm lg:text-base font-bold text-white tracking-wide">
                      Account
                    </span>
                    
                    {/* Notification dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full sm:rounded-2xl bg-red-500 blur-xl -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

            </div>
          </div>

          {/* Bottom shine line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-2 rounded-full sm:rounded-3xl bg-gradient-to-r from-red-600/20 via-red-500/20 to-red-600/20 blur-2xl -z-10"
          animate={{
            opacity: isScrolled ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.nav>
  )
}

export default Navbar