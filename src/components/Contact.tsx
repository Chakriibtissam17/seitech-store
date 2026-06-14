import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.', {
      style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@seitechstore.com',
      sub: 'support@seitechstore.com',
      color: 'from-cyan-500 to-blue-600',
      href: 'mailto:contact@seitechstore.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+213 (0) 5X XX XX XX',
      sub: 'Mon–Fri: 9AM – 6PM',
      color: 'from-blue-500 to-purple-600',
      href: 'tel:+2130500000000',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+213 (0) 5X XX XX XX',
      sub: 'Available 24/7',
      color: 'from-green-500 to-teal-600',
      href: 'https://wa.me/213000000000',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Algiers, Algeria',
      sub: 'Delivery Nationwide',
      color: 'from-orange-500 to-red-600',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] to-[#0a1628]/30" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Contact{' '}
            <span className="gradient-text">SEITech Store</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question about a product, need technical advice, or want to place a bulk order? We're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,34,71,0.6) 0%, rgba(6,14,31,0.8) 100%)',
                  border: '1px solid rgba(0,212,255,0.08)',
                }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <info.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">{info.label}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{info.value}</div>
                  <div className="text-xs text-slate-500">{info.sub}</div>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/213000000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold hover:bg-green-500/20 transition-all group"
            >
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <div className="font-bold group-hover:text-green-300 transition-colors">Chat on WhatsApp</div>
                <div className="text-xs text-green-600">Instant technical support</div>
              </div>
            </a>

            {/* Hours */}
            <div className="p-4 rounded-2xl"
              style={{
                background: 'rgba(13,34,71,0.3)',
                border: '1px solid rgba(0,212,255,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Business Hours</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sunday – Thursday</span>
                  <span className="text-white font-medium">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Saturday</span>
                  <span className="text-white font-medium">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WhatsApp Support</span>
                  <span className="text-green-400 font-medium">24/7</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-6 lg:p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.7) 0%, rgba(6,14,31,0.9) 100%)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>Send us a Message</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all focus:border-cyan-500/50"
                        style={{
                          background: 'rgba(6,14,31,0.8)',
                          border: '1px solid rgba(0,212,255,0.15)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all"
                        style={{
                          background: 'rgba(6,14,31,0.8)',
                          border: '1px solid rgba(0,212,255,0.15)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(6,14,31,0.8)',
                        border: '1px solid rgba(0,212,255,0.15)',
                      }}
                    >
                      <option value="" className="bg-[#0a1628]">Select a subject</option>
                      <option value="order" className="bg-[#0a1628]">Order Inquiry</option>
                      <option value="technical" className="bg-[#0a1628]">Technical Support</option>
                      <option value="bulk" className="bg-[#0a1628]">Bulk / Wholesale Order</option>
                      <option value="student" className="bg-[#0a1628]">Student Discount</option>
                      <option value="partnership" className="bg-[#0a1628]">Partnership / Collaboration</option>
                      <option value="other" className="bg-[#0a1628]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your question or request in detail..."
                      className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none resize-none transition-all"
                      style={{
                        background: 'rgba(6,14,31,0.8)',
                        border: '1px solid rgba(0,212,255,0.15)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-600">
                    We typically respond within 2–4 hours during business hours.
                  </p>
                </form>
              )}
            </div>

            {/* Google Maps placeholder */}
            <div className="mt-5 rounded-2xl overflow-hidden h-48"
              style={{ border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51574.18285905076!2d3.0197394!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977ea659f%3A0x7f1c52c2d467e0b5!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2s!4v1704000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SEITech Store Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
