import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] to-[#0a1628]/30" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <HelpCircle size={12} className="text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about SEITech Store, products, delivery and support.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.6) 0%, rgba(6,14,31,0.8) 100%)',
                border: openIndex === i ? '1px solid rgba(0,212,255,0.25)' : '1px solid rgba(0,212,255,0.08)',
                transition: 'border-color 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${
                    openIndex === i
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`font-semibold text-sm sm:text-base transition-colors ${
                    openIndex === i ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 transition-colors ${openIndex === i ? 'text-cyan-400' : 'text-slate-500'}`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="ml-11 pl-3 border-l-2 border-cyan-500/20">
                        <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center p-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.1) 0%, rgba(0,212,255,0.05) 100%)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Still have questions?
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            Our technical support team is available 24/7 to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/213000000000"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all font-semibold text-sm"
            >
              💬 WhatsApp Support
            </a>
            <a
              href="mailto:support@seitechstore.com"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all font-semibold text-sm"
            >
              📧 Email Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
