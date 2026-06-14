import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, Cpu, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'Products', page: 'products' },
  {
    label: 'Categories', page: 'categories',
    dropdown: [
      { label: 'Development Boards', page: 'categories', cat: 'development-boards' },
      { label: 'Sensors & Modules', page: 'categories', cat: 'sensors' },
      { label: 'Robotics Kits', page: 'categories', cat: 'robotics' },
      { label: 'Telecommunications', page: 'categories', cat: 'telecom' },
      { label: 'IoT Devices', page: 'categories', cat: 'iot' },
      { label: 'Components', page: 'categories', cat: 'components' },
    ]
  },
  { label: 'Robotics Kits', page: 'robotics' },
  { label: 'Dev Boards', page: 'devboards' },
  { label: 'About Us', page: 'about' },
  { label: 'Testimonials', page: 'testimonials' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen, currentPage, setCurrentPage, setActiveCategory } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  const handleNav = (page: string, cat?: string) => {
    setCurrentPage(page);
    if (cat) setActiveCategory(cat);
    setMobileOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={{ top: '28px' }} className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#060e1f]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-2xl shadow-black/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 rounded-lg border border-cyan-500/40" />
              <Cpu size={18} className="text-cyan-400 relative z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="text-white">SEI</span>
                <span className="text-cyan-400">Tech</span>
              </span>
              <span className="text-[9px] text-slate-400 tracking-[0.15em] font-medium uppercase">Store</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.label} className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNav(link.page)}
                  className={`nav-link px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    currentPage === link.page
                      ? 'text-cyan-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={12} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </button>
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 rounded-xl glassmorphism border border-cyan-500/20 shadow-2xl shadow-black/50 overflow-hidden"
                      >
                        {link.dropdown.map(item => (
                          <button
                            key={item.label}
                            onClick={() => handleNav(item.page, item.cat)}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-cyan-500/10 transition-all duration-150"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => handleNav('wishlist')}
              className="relative p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => handleNav('checkout')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 hover:scale-105"
            >
              Shop Now
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060e1f]/98 backdrop-blur-xl border-t border-cyan-500/10"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map(link => (
                <div key={link.label}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === link.page
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                  {link.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.dropdown.map(item => (
                        <button
                          key={item.label}
                          onClick={() => handleNav(item.page, item.cat)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-colors"
                        >
                          → {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
