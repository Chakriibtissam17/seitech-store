import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setCurrentPage } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsSearchOpen]);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.includes(query.toLowerCase()))
      ).slice(0, 6)
    : products.slice(0, 5);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 top-20 z-[90] w-full max-w-2xl mx-4"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #060e1f 100%)',
                border: '1px solid rgba(0,212,255,0.2)',
              }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/10">
                <Search size={20} className="text-cyan-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products, categories, or components..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-base"
                />
                <div className="flex items-center gap-2">
                  {query && (
                    <button onClick={() => setQuery('')} className="text-slate-500 hover:text-white transition-colors">
                      <X size={16} />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs bg-slate-800 text-slate-500 border border-slate-700">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length <= 1 && (
                  <div className="px-5 py-3 border-b border-slate-800/50">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Popular Products</p>
                  </div>
                )}
                {query.length > 1 && results.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-slate-400 font-medium">No results for "<span className="text-white">{query}</span>"</p>
                    <p className="text-slate-600 text-sm mt-1">Try different keywords</p>
                  </div>
                )}
                {results.map(product => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setCurrentPage('products');
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-cyan-500/5 transition-all group border-b border-slate-800/30 last:border-0"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{product.shortDescription}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-bold text-cyan-400 text-sm">${product.price.toFixed(2)}</span>
                      <ArrowRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 flex items-center justify-between border-t border-slate-800/50">
                <span className="text-xs text-slate-600">
                  {query.length > 1 ? `${results.length} result${results.length !== 1 ? 's' : ''} found` : 'Top products shown'}
                </span>
                <button
                  onClick={() => { setIsSearchOpen(false); setCurrentPage('products'); }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                >
                  View all products <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
