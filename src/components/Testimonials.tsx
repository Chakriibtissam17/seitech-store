import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] via-[#0a1628]/40 to-[#060e1f]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
      <div className="absolute top-1/4 right-0 w-48 h-48 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Trusted by{' '}
            <span className="gradient-text">Engineers Nationwide</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            From university students to professional engineers — here's what our community says about SEITech Store.
          </p>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glassmorphism border-glow">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={20} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="h-5 w-px bg-slate-600" />
            <span className="text-2xl font-black text-white">4.9</span>
            <span className="text-slate-400 text-sm">/ 5.0 average rating</span>
            <div className="h-5 w-px bg-slate-600" />
            <span className="text-slate-400 text-sm">2,847 reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl card-hover"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.7) 0%, rgba(6,14,31,0.9) 100%)',
                border: '1px solid rgba(0,212,255,0.08)',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} className="text-cyan-400" />
              </div>

              {/* Stars */}
              <div className="flex mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                ))}
              </div>

              {/* Review */}
              <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">
                "{t.review}"
              </p>

              {/* Product */}
              <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <span className="text-xs text-cyan-400 font-medium">Purchased:</span>
                <span className="text-xs text-slate-400 truncate">{t.product}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-black">{t.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-white truncate">{t.name}</div>
                  <div className="text-xs text-slate-400 truncate">{t.role}</div>
                  <div className="text-xs text-cyan-400/60 truncate">{t.university || t.company}</div>
                </div>
                <div className="text-xs text-slate-600 flex-shrink-0">{t.date}</div>
              </div>

              {/* Verified badge */}
              <div className="absolute bottom-4 right-4 text-[10px] text-green-400 flex items-center gap-1 opacity-60">
                <span>✓</span>
                <span>Verified Purchase</span>
              </div>

              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
