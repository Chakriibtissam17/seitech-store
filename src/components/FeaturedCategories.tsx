import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Radio, Bot, Wifi, Layers, Zap } from 'lucide-react';
import { categories } from '../data/products';
import { useStore } from '../context/StoreContext';

const categoryIcons: Record<string, React.ReactNode> = {
  'development-boards': <Cpu size={24} />,
  'sensors': <Radio size={24} />,
  'robotics': <Bot size={24} />,
  'telecom': <Wifi size={24} />,
  'iot': <Layers size={24} />,
  'components': <Zap size={24} />,
};

const categoryColors: Record<string, string> = {
  'development-boards': 'from-blue-600 to-cyan-500',
  'sensors': 'from-cyan-500 to-teal-500',
  'robotics': 'from-purple-600 to-blue-600',
  'telecom': 'from-green-500 to-cyan-500',
  'iot': 'from-orange-500 to-red-500',
  'components': 'from-yellow-500 to-orange-500',
};

const categoryHighlights: Record<string, string[]> = {
  'development-boards': ['Raspberry Pi 5', 'Arduino Uno R4', 'ESP32', 'STM32 Nucleo'],
  'sensors': ['HC-SR04 Ultrasonic', 'DHT22 Temp', 'MPU-6050 IMU', 'RFID RC522'],
  'robotics': ['Smart Car Kit', 'Line Follower', 'Arduino Starter Kit', 'ESP32 IoT Kit'],
  'telecom': ['LoRa SX1278', 'SIM800L GSM', 'HC-05 Bluetooth', 'NRF24L01'],
  'iot': ['MQTT Gateway', 'ESP8266 NodeMCU', 'Wemos D1 Mini', 'ESP-CAM'],
  'components': ['Resistors Pack', 'Capacitor Kit', 'LED Assortment', 'MOSFETs'],
};

export default function FeaturedCategories() {
  const { setCurrentPage, setActiveCategory } = useStore();

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] via-[#0a1628]/50 to-[#060e1f]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Product Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Browse by{' '}
            <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From development boards to robotics kits — explore our complete range of professional embedded systems and IoT components.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => handleCategoryClick(cat.id)}
              className="group text-left rounded-2xl overflow-hidden category-card-hover relative"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.7) 0%, rgba(6,14,31,0.9) 100%)',
                border: '1px solid rgba(0,212,255,0.1)',
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-[#060e1f]/40 to-transparent" />
                
                {/* Icon overlay */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[cat.id]} flex items-center justify-center text-white shadow-lg shadow-black/30`}>
                  {categoryIcons[cat.id]}
                </div>

                {/* Product count badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-white font-semibold">
                  {cat.productCount}+ items
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1.5 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{cat.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {categoryHighlights[cat.id]?.slice(0, 3).map(item => (
                    <span key={item} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400">
                      {item}
                    </span>
                  ))}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-500">
                    +more
                  </span>
                </div>

                {/* View button */}
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Explore Category
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${categoryColors[cat.id]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.button>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => handleCategoryClick('all')}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-cyan-500/30 text-white font-semibold hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            View All Categories
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
