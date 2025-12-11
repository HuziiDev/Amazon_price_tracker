'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users, Globe, Target, Sparkles, DollarSign, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';

// Animated Background Component with Dots Shader
export const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black" />
      
      {/* Animated dots grid */}
      {isMounted && (
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 50, 50, 0.2) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      )}
      
      {/* Flowing gradient orbs */}
      {isMounted && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
      
      {/* Scanline effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
        }}
      />
    </div>
  );
};

// Advanced Bento Grid Component
export const BentoGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bentoItems = [
    {
      title: "Smart Price Alerts",
      description: "Get notified instantly when prices drop below your target. Never miss a deal again.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-red-600 via-red-700 to-red-900",
      size: "col-span-2 row-span-2",
      stats: "10M+ alerts sent"
    },
    {
      title: "Global Coverage",
      description: "Track prices across 50+ countries and 1000+ stores worldwide.",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-red-500 via-red-600 to-red-800",
      size: "col-span-1 row-span-1",
      stats: "50+ countries"
    },
    {
      title: "Price History",
      description: "Visualize pricing trends with interactive charts and analytics.",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-red-700 via-red-800 to-red-950",
      size: "col-span-1 row-span-1",
      stats: "2B+ data points"
    },
    {
      title: "Community Driven",
      description: "Join millions of smart shoppers saving money every day.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-red-600 via-red-700 to-red-900",
      size: "col-span-1 row-span-2",
      stats: "5M+ users"
    },
    {
      title: "Best Price Guarantee",
      description: "Our AI ensures you always get the lowest price available online.",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-red-500 via-red-600 to-red-800",
      size: "col-span-2 row-span-1",
      stats: "99.9% accuracy"
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          className="inline-block mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-12 h-12 text-red-500 mx-auto" />
        </motion.div>
        <h2 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent">
            Why Choose PriceSync?
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          The most advanced price tracking platform trusted by millions worldwide
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`${item.size} relative group cursor-pointer`}
          >
            <div className="h-full p-6 md:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-red-900/30 hover:border-red-600/50 transition-all duration-500 overflow-hidden flex flex-col">
              {/* Animated gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                animate={hoveredIndex === index ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0">
                <div className="flex-shrink-0">
                  <motion.div
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-red-900/20 flex-shrink-0">
                  <span className="text-red-500 font-semibold text-xs md:text-sm">{item.stats}</span>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-red-500" />
                  </motion.div>
                </div>
              </div>

              {/* Floating particles */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </div>

            {/* Glow effect */}
            <motion.div
              className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl -z-10 transition-opacity duration-500`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Stats Counter Section
export const StatsSection = () => {
  const stats = [
    { value: "5M+", label: "Active Users", icon: <Users className="w-8 h-8" />, suffix: "" },
    { value: "2B+", label: "Prices Tracked", icon: <TrendingUp className="w-8 h-8" />, suffix: "" },
    { value: "$500M", label: "Money Saved", icon: <DollarSign className="w-8 h-8" />, suffix: "+" },
    { value: "1000+", label: "Stores Covered", icon: <ShoppingCart className="w-8 h-8" />, suffix: "" },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="relative group"
          >
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-5xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Floating Cards Showcase
export const FloatingCardsShowcase = () => {
  const cards = [
    { title: "Amazon", savings: "$245", color: "from-orange-500 to-orange-700" },
    { title: "eBay", savings: "$189", color: "from-blue-500 to-blue-700" },
    { title: "Walmart", savings: "$312", color: "from-yellow-500 to-yellow-700" },
    { title: "Best Buy", savings: "$156", color: "from-blue-600 to-blue-900" },
    { title: "Target", savings: "$203", color: "from-red-500 to-red-700" },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent">
            Track Any Store
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Connect with your favorite retailers and start saving instantly
        </p>
      </motion.div>

      <div className="relative h-96 flex items-center justify-center">
        {cards.map((card, index) => {
          const angle = (index * 360) / cards.length;
          const radius = 180;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              whileInView={{ 
                x: x, 
                y: y, 
                opacity: 1, 
                scale: 1 
              }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                    rotate: { duration: 4, repeat: Infinity, delay: index * 0.5 },
                y: { duration: 3, repeat: Infinity, delay: index * 0.3 }
              }}
              whileHover={{ 
                scale: 1.2, 
                z: 50,
                transition: { duration: 0.2 }
              }}
              animate={{
                rotate: [0, 5, -5, 0],
                y: [y, y - 10, y]
              }}
              
            >
              <div className={`w-40 h-40 bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-2xl border border-white/20 flex flex-col items-center justify-center text-center cursor-pointer`}>
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <div className="text-sm text-white/80 mb-1">Avg. Savings</div>
                <div className="text-3xl font-bold">{card.savings}</div>
              </div>
            </motion.div>
          );
        })}

        {/* Center circle */}
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <TrendingUp className="w-16 h-16" />
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Marquee
export const TestimonialsMarquee = () => {
  const testimonials = [
    { name: "Sarah M.", text: "Saved $500 on my new laptop!", rating: 5 },
    { name: "John D.", text: "Best price tracker I've ever used.", rating: 5 },
    { name: "Emily R.", text: "The alerts are instant and accurate!", rating: 5 },
    { name: "Michael B.", text: "Never shopping without this again.", rating: 5 },
    { name: "Lisa K.", text: "Helped me save on Christmas gifts!", rating: 5 },
    { name: "David W.", text: "Simple, fast, and effective.", rating: 5 },
  ];

  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent">
            Loved by Millions
          </span>
        </h2>
      </motion.div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -1800]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-red-900/30"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <p className="text-red-500 font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section with Particles
export const CTASection = () => {
  const [particles, setParticles] = useState<Array<{left: string, top: string}>>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-16 bg-gradient-to-br from-red-900/50 via-red-800/30 to-red-950/50 backdrop-blur-2xl rounded-[3rem] border border-red-600/30 text-center overflow-hidden"
      >
        {/* Animated particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 50, 50, 0.3) 0%, transparent 70%)'
          }}
        />

        <div className="relative z-10">
          <h2 className="text-6xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of smart shoppers and never overpay again
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl text-xl font-bold shadow-2xl shadow-red-500/50 inline-flex items-center gap-3"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>

        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-800 rounded-[3rem] opacity-0 blur-3xl -z-10"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

// ============================================
// DEMO: How to use all components together
// ============================================

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background with animated dots and gradients */}
      <AnimatedBackground />
      
      {/* Your existing navbar would go here */}
      
      {/* Your existing hero section would go here */}
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Bento Grid Section */}
      <BentoGrid />
      
      {/* Floating Cards Showcase */}
      <FloatingCardsShowcase />
      
      {/* Testimonials Marquee */}
      <TestimonialsMarquee />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Your existing footer would go here */}
    </div>
  );
};

export default DemoPage;