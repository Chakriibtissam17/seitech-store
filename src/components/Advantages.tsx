import { motion } from 'framer-motion';
import { Shield, DollarSign, Zap, Lock, Headphones, Award, BookOpen, GraduationCap } from 'lucide-react';

const advantages = [
  {
    icon: Shield,
    title: 'Original Components',
    description: 'Every product is sourced directly from authorized distributors. 100% authentic with manufacturer certificates.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(0,212,255,0.2)',
  },
  {
    icon: DollarSign,
    title: 'Competitive Prices',
    description: 'Best prices in the market with frequent promotions, student discounts, and bulk pricing options.',
    color: 'from-green-500 to-teal-500',
    glow: 'rgba(0,200,100,0.2)',
  },
  {
    icon: Zap,
    title: 'Fast Shipping',
    description: 'Nationwide delivery across Algeria with express options. Same-day dispatch for orders before 2 PM.',
    color: 'from-yellow-500 to-orange-500',
    glow: 'rgba(255,200,0,0.2)',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Multiple secure payment methods including COD, CCP, Baridimob, and international cards.',
    color: 'from-purple-500 to-blue-500',
    glow: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Headphones,
    title: '24/7 Technical Support',
    description: 'Our team of embedded systems engineers provides round-the-clock assistance via WhatsApp and email.',
    color: 'from-cyan-500 to-blue-500',
    glow: 'rgba(0,150,255,0.2)',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'All products undergo quality inspection before shipping. 3–6 month warranty on every item.',
    color: 'from-orange-500 to-red-500',
    glow: 'rgba(255,100,0,0.2)',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Free datasheets, wiring guides, MicroPython and Arduino code examples with every product.',
    color: 'from-teal-500 to-green-500',
    glow: 'rgba(0,200,150,0.2)',
  },
  {
    icon: GraduationCap,
    title: 'Student-Friendly',
    description: 'Special student pricing, university lab packages, and educational bundles for academic projects.',
    color: 'from-indigo-500 to-purple-500',
    glow: 'rgba(99,102,241,0.2)',
  },
];

export default function Advantages() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 to-[#060e1f]" />
      <div className="absolute inset-0 hero-grid opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Why Choose SEITech?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            The SEITech{' '}
            <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to build, prototype, and innovate — backed by exceptional service and expert knowledge.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.6) 0%, rgba(6,14,31,0.8) 100%)',
                border: '1px solid rgba(0,212,255,0.08)',
                boxShadow: `0 0 0 transparent`,
              }}
              whileHover={{
                boxShadow: `0 10px 40px ${item.glow}`,
                borderColor: 'rgba(0,212,255,0.2)',
              }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon size={22} className="text-white" />
              </div>

              {/* Check mark */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400 text-xs font-bold">✓</span>
              </div>

              <h3 className="font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>

              {/* Bottom line */}
              <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.2) 0%, rgba(0,212,255,0.1) 50%, rgba(124,58,237,0.2) 100%)',
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 lg:p-10">
            <div>
              <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                🎓 Student Discount Program
              </h3>
              <p className="text-slate-300 max-w-lg">
                Are you a university student or researcher? Get exclusive discounts up to 15% on all products. 
                Join thousands of students building the future with SEITech Store.
              </p>
            </div>
            <button className="flex-shrink-0 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-105 whitespace-nowrap">
              Apply for Discount
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
