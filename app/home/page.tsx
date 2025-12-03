'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Menu, TrendingUp, Zap, Shield, Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const PriceTrackerLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const carouselItems = [
    {
      title: "Real-Time Tracking",
      description: "Monitor prices across 1000+ stores instantly",
      gradient: "from-red-600 to-red-800",
      icon: <Clock className="w-16 h-16" />
    },
    {
      title: "Smart Alerts",
      description: "Get notified when prices drop below your target",
      gradient: "from-red-500 to-red-700",
      icon: <Bell className="w-16 h-16" />
    },
    {
      title: "Price History",
      description: "Analyze trends and make informed decisions",
      gradient: "from-red-700 to-red-900",
      icon: <TrendingUp className="w-16 h-16" />
    }
  ];

  const trendingProducts = [
    { name: "iPhone 15 Pro", price: "$999", discount: "15%", trend: "down" },
    { name: "Sony WH-1000XM5", price: "$349", discount: "22%", trend: "down" },
    { name: "MacBook Air M2", price: "$1,099", discount: "10%", trend: "down" },
    { name: "Samsung Galaxy S24", price: "$799", discount: "18%", trend: "down" },
    { name: "AirPods Pro", price: "$199", discount: "20%", trend: "down" },
    { name: "iPad Pro", price: "$899", discount: "12%", trend: "down" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
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
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
              PriceSync
            </span>
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hover:text-red-500 transition">
              <Bell className="w-6 h-6" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hover:text-red-500 transition">
              <User className="w-6 h-6" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hover:text-red-500 transition">
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text & Search */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Track Prices.
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
                Save Money.
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Monitor prices across thousands of stores in real-time. Get instant alerts when your favorite products drop in price. Never overpay again.
            </motion.p>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative flex items-center gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-red-900/30 shadow-2xl">
                <input
                  type="text"
                  placeholder="Enter product name or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent px-6 py-4 outline-none text-lg placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-red-500/50"
                >
                  <Search className="w-5 h-5" />
                  Track
                </motion.button>
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-20 blur-xl -z-10"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96"
          >
            <div className="relative h-full">
              {carouselItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 ${index === currentSlide ? 'z-20' : 'z-10'}`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    scale: index === currentSlide ? 1 : 0.8,
                    rotateY: index === currentSlide ? 0 : -90
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`h-full bg-gradient-to-br ${item.gradient} rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-red-500/20`}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-3xl font-bold mt-6 mb-4">{item.title}</h3>
                    <p className="text-lg opacity-90">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                />
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-600/50 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-600/50 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Zap />, title: "Lightning Fast", desc: "Real-time updates across all platforms", color: "from-red-600 to-red-800" },
            { icon: <Shield />, title: "Secure & Private", desc: "Your data is encrypted and protected", color: "from-red-500 to-red-700" },
            { icon: <TrendingUp />, title: "Price Analytics", desc: "Advanced charts and insights", color: "from-red-700 to-red-900" },
            { icon: <Bell />, title: "Smart Alerts", desc: "Customizable notifications", color: "from-red-600 to-red-800" },
            { icon: <Clock />, title: "Price History", desc: "Track changes over time", color: "from-red-500 to-red-700" },
            { icon: <Star />, title: "Wishlist Sync", desc: "Save and organize products", color: "from-red-700 to-red-900" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl -z-10 transition-opacity`}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent">
            Trending Price Drops
          </span>
        </motion.h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl" />
                    <div className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-semibold flex items-center gap-1 border border-red-500/30">
                      <TrendingUp className="w-4 h-4" />
                      {product.discount}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-red-500">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-sm font-semibold shadow-lg shadow-red-500/30"
                    >
                      Track
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900/30 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">PriceSync</span>
              </div>
              <p className="text-gray-400">Track prices. Save money. Shop smarter.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">Features</li>
                <li className="hover:text-white transition cursor-pointer">Pricing</li>
                <li className="hover:text-white transition cursor-pointer">API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">About</li>
                <li className="hover:text-white transition cursor-pointer">Blog</li>
                <li className="hover:text-white transition cursor-pointer">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">Help Center</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
                <li className="hover:text-white transition cursor-pointer">Privacy</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-red-900/30 text-center text-gray-400">
            <p>© 2024 PriceSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PriceTrackerLanding;