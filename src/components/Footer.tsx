import { useState } from 'react';
import { Cpu, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import toast from 'react-hot-toast';

const footerLinks = {
  Products: [
    { label: 'Raspberry Pi', page: 'products' },
    { label: 'Arduino Boards', page: 'products' },
    { label: 'ESP32 Modules', page: 'products' },
    { label: 'STM32 Nucleo', page: 'products' },
    { label: 'Sensor Kits', page: 'products' },
    { label: 'Robotics Kits', page: 'robotics' },
  ],
  Categories: [
    { label: 'Development Boards', page: 'categories', cat: 'development-boards' },
    { label: 'Sensors & Modules', page: 'categories', cat: 'sensors' },
    { label: 'Robotics Kits', page: 'categories', cat: 'robotics' },
    { label: 'Telecom Components', page: 'categories', cat: 'telecom' },
    { label: 'IoT Devices', page: 'categories', cat: 'iot' },
    { label: 'Electronic Parts', page: 'categories', cat: 'components' },
  ],
  Support: [
    { label: 'Technical Support', page: 'contact' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Shipping Info', page: 'faq' },
    { label: 'Returns Policy', page: 'faq' },
    { label: 'Student Discount', page: 'contact' },
    { label: 'Track Order', page: 'contact' },
  ],
  Company: [
    { label: 'About Us', page: 'about' },
    { label: 'Testimonials', page: 'testimonials' },
    { label: 'Blog & Tutorials', page: 'home' },
    { label: 'Partnerships', page: 'contact' },
    { label: 'Careers', page: 'contact' },
    { label: 'Contact Us', page: 'contact' },
  ],
};

const socialLinks = [
  { emoji: '📘', href: '#', color: 'hover:text-blue-500', label: 'Facebook' },
  { emoji: '📸', href: '#', color: 'hover:text-pink-500', label: 'Instagram' },
  { emoji: '🐦', href: '#', color: 'hover:text-sky-400', label: 'Twitter' },
  { emoji: '💼', href: '#', color: 'hover:text-blue-400', label: 'LinkedIn' },
  { emoji: '▶️', href: '#', color: 'hover:text-red-500', label: 'YouTube' },
  { emoji: '💻', href: '#', color: 'hover:text-white', label: 'GitHub' },
];

export default function Footer() {
  const { setCurrentPage, setActiveCategory } = useStore();
  const [email, setEmail] = useState('');

  const handleNav = (page: string, cat?: string) => {
    setCurrentPage(page);
    if (cat) setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed! Welcome to SEITech community.', {
        style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
      });
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#040c1a' }}>
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-20" />

      {/* Newsletter banner */}
      <div className="relative border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                📧 Stay Updated with SEITech
              </h3>
              <p className="text-slate-400 text-sm">Get the latest products, tech tutorials, and exclusive deals delivered to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 lg:w-72 px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none"
                style={{
                  background: 'rgba(13,34,71,0.8)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all whitespace-nowrap"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 mb-5 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 rounded-xl border border-cyan-500/40" />
                <Cpu size={20} className="text-cyan-400 relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <span className="text-white">SEI</span>
                  <span className="text-cyan-400">Tech</span>
                  <span className="text-slate-400 text-sm font-semibold ml-1">Store</span>
                </span>
                <span className="text-[9px] text-slate-500 tracking-[0.12em] font-medium uppercase mt-0.5">
                  Systèmes Embarqués Intelligents
                </span>
              </div>
            </button>

            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
              Algeria's premier marketplace for embedded systems, IoT devices, development boards, and professional electronic components.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center text-slate-600 ${s.color} hover:border-slate-700 hover:bg-slate-800/50 transition-all text-sm`}
                >
                  {s.emoji}
                </a>
              ))}
            </div>

            {/* Domain suggestion */}
            <div className="mt-5 p-3 rounded-xl border border-cyan-500/10 bg-cyan-500/5">
              <p className="text-xs text-slate-500 mb-1 font-medium">🌐 Find us online:</p>
              <p className="text-sm font-bold text-cyan-400">seitechstore.com</p>
              <p className="text-xs text-slate-600">Professional tech marketplace</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-1">
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.page, (link as any).cat)}
                      className="text-sm text-slate-500 hover:text-cyan-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs text-center sm:text-left">
              © 2025 SEITech Store. All rights reserved. | Systèmes Embarqués Intelligents et Télécommunications
            </p>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 text-xs">seitechstore.com</span>
              <div className="h-3 w-px bg-slate-700" />
              <span className="text-slate-600 text-xs">Algiers, Algeria</span>
              <div className="h-3 w-px bg-slate-700" />
              <span className="text-slate-600 text-xs">
                Powered by{' '}
                <span className="text-cyan-500/60 font-medium">SEITech Team</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
