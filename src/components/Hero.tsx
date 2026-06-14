import { motion } from 'framer-motion';
import { ArrowRight, Play, Package, Users, Headphones, Truck, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const stats = [
  { icon: Package, value: '5,000+', label: 'Products Available' },
  { icon: Users, value: '2,000+', label: 'Satisfied Customers' },
  { icon: Headphones, value: '24/7', label: 'Technical Support' },
  { icon: Truck, value: 'Fast', label: 'Delivery Nationwide' },
];

export default function Hero() {
  const { setCurrentPage } = useStore();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-grid">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060e1f] via-[#0a1628] to-[#060e1f]" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0066ff, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      {/* Floating circuit elements */}
      <div className="absolute top-20 right-10 lg:right-20 opacity-20 hidden md:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 rounded-full border border-cyan-500/30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-blue-500/20"
        />
        <div className="absolute inset-[44px] w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow" />
        </div>
      </div>

      <div className="absolute bottom-24 left-10 lg:left-20 opacity-15 hidden md:block">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-xl border border-blue-500/40 bg-blue-500/5 flex items-center justify-center"
        >
          <div className="text-2xl">🔌</div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-1/3 opacity-10 hidden lg:block">
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="text-4xl"
        >
          📡
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-300 font-medium">
              Algeria's Premier Embedded Systems Marketplace
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-white">Powering Innovation</span>
            <br />
            <span className="gradient-text">Through Embedded</span>
            <br />
            <span className="text-white">Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Discover professional electronic components, IoT devices, development boards, sensors, 
            robotics kits and telecommunication solutions for{' '}
            <span className="text-cyan-400 font-medium">students</span>,{' '}
            <span className="text-blue-400 font-medium">engineers</span>,{' '}
            <span className="text-purple-400 font-medium">researchers</span> and{' '}
            <span className="text-cyan-300 font-medium">innovators</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={() => { setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => { setCurrentPage('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-cyan-500/30 text-white font-bold text-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Play size={18} className="text-cyan-400" />
              Explore Categories
            </button>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {['Raspberry Pi', 'Arduino', 'ESP32', 'STM32', 'Sensors', 'LoRa', 'Robotics Kits', 'IoT Modules'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 border border-slate-700/50 bg-slate-800/30 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="relative text-center p-5 rounded-2xl glassmorphism group hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 mb-3 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                <stat.icon size={18} className="text-cyan-400" />
              </div>
              <div className="font-black text-2xl text-white mb-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
