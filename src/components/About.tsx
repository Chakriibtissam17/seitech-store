import { motion } from 'framer-motion';
import { Target, Eye, Cpu, Award } from 'lucide-react';

const values = [
  { icon: Target, title: 'Our Mission', description: 'Democratize access to embedded systems and IoT technology for every student, engineer, and innovator in Algeria and the MENA region.' },
  { icon: Eye, title: 'Our Vision', description: 'To become the leading specialized marketplace for embedded systems and intelligent technologies, empowering the next generation of tech innovators.' },
  { icon: Award, title: 'Our Commitment', description: 'We are committed to quality, authenticity, and technical excellence. Every component we sell meets rigorous standards of performance and reliability.' },
];

const milestones = [
  { year: '2022', event: 'SEITech Store founded in Algiers', icon: '🚀' },
  { year: '2023', event: 'Reached 500+ satisfied customers', icon: '🎯' },
  { year: '2023', event: 'Expanded catalog to 2000+ products', icon: '📦' },
  { year: '2024', event: 'Launched student discount program', icon: '🎓' },
  { year: '2024', event: 'Partnered with 10+ universities', icon: '🏛️' },
  { year: '2025', event: '2000+ customers served nationwide', icon: '🌟' },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 to-[#060e1f]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <div className="text-[200px]">⚡</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">About SEITech Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Building the Future of{' '}
            <span className="gradient-text">Embedded Technology</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            SEITech Store (<span className="text-cyan-400 font-semibold">Systèmes Embarqués Intelligents et Télécommunications</span>) is Algeria's premier specialized marketplace dedicated to embedded systems, telecommunications, robotics and intelligent technologies. Our mission is to provide students, engineers and innovators with high-quality electronic components and development tools at accessible prices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/34007252/pexels-photo-34007252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="SEITech Store engineers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 rounded-3xl border border-cyan-500/20" />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-5 -right-4 sm:-right-8 grid grid-cols-2 gap-3">
              {[
                { value: '5K+', label: 'Products' },
                { value: '2K+', label: 'Customers' },
                { value: '10+', label: 'Brands' },
                { value: '48H', label: 'Max Delivery' },
              ].map(stat => (
                <div key={stat.label} className="px-4 py-3 rounded-xl glassmorphism text-center">
                  <div className="text-xl font-black text-cyan-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-6"
          >
            <div className="space-y-5 mb-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl group hover:border-cyan-500/20 transition-all"
                  style={{
                    background: 'rgba(13,34,71,0.4)',
                    border: '1px solid rgba(0,212,255,0.08)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <v.icon size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{v.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SEIT meaning */}
            <div className="p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(0,212,255,0.05) 100%)',
                border: '1px solid rgba(0,212,255,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={16} className="text-cyan-400" />
                <span className="text-sm font-bold text-cyan-400">What does SEIT mean?</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { letter: 'S', word: 'Systèmes', color: 'text-cyan-400' },
                  { letter: 'E', word: 'Embarqués', color: 'text-blue-400' },
                  { letter: 'I', word: 'Intelligents', color: 'text-purple-400' },
                  { letter: 'T', word: 'Télécommunications', color: 'text-cyan-300' },
                ].map(item => (
                  <div key={item.letter} className="flex items-center gap-2">
                    <span className={`text-2xl font-black ${item.color}`} style={{ fontFamily: 'Space Grotesk' }}>{item.letter}</span>
                    <span className="text-slate-300 text-xs">{item.word}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-black text-center text-white mb-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Our Journey
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden md:block" />
            <div className="space-y-4 md:space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`md:flex md:items-center md:gap-8 mb-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 p-4 rounded-xl md:text-${i % 2 === 0 ? 'right' : 'left'} mb-3 md:mb-0`}
                    style={{
                      background: 'rgba(13,34,71,0.4)',
                      border: '1px solid rgba(0,212,255,0.1)',
                    }}
                  >
                    <div className="text-xs text-cyan-400 font-bold mb-1">{m.year}</div>
                    <div className="text-sm text-slate-300 font-medium">{m.event}</div>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 items-center justify-center text-lg flex-shrink-0 z-10 shadow-lg shadow-cyan-500/20">
                    {m.icon}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
