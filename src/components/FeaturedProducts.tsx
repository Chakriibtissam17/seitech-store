import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Star, ShoppingCart, Heart, Package } from 'lucide-react';
import { products, Product } from '../data/products';
import ProductCard from './ProductCard';
import { useStore } from '../context/StoreContext';

const filterTabs = [
  { label: 'All Products', value: 'all' },
  { label: 'Dev Boards', value: 'development-boards' },
  { label: 'Sensors', value: 'sensors' },
  { label: 'Robotics', value: 'robotics' },
  { label: 'Telecom', value: 'telecom' },
];

export default function FeaturedProducts() {
  const { setCurrentPage, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = activeFilter === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeFilter).slice(0, 8);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1f] to-[#0a1628]/30" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Featured Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Top Picks for{' '}
            <span className="gradient-text">Engineers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Handpicked professional components trusted by engineers, students, and researchers worldwide.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filterTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === tab.value
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 border border-slate-700/50 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  index={i}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => { setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[70] max-w-3xl mx-auto rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #060e1f 100%)',
                border: '1px solid rgba(0,212,255,0.2)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-full min-h-[250px] bg-slate-800/50 overflow-hidden">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]/50 md:block hidden" />
                </div>

                {/* Info */}
                <div className="p-6 lg:p-8 flex flex-col">
                  {quickViewProduct.badge && (
                    <span className="inline-block mb-3 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-fit">
                      {quickViewProduct.badge}
                    </span>
                  )}
                  <h2 className="text-xl lg:text-2xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{quickViewProduct.fullDescription}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} className={s <= Math.round(quickViewProduct.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
                      ))}
                    </div>
                    <span className="text-sm text-amber-400 font-bold">{quickViewProduct.rating}</span>
                    <span className="text-sm text-slate-500">({quickViewProduct.reviewCount} reviews)</span>
                  </div>

                  {/* Specs */}
                  <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-4 mb-5">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Package size={12} />
                      Specifications
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-slate-500">{key}</span>
                          <span className="text-slate-300 font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl font-black text-white">${quickViewProduct.price.toFixed(2)}</span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-lg text-slate-500 line-through">${quickViewProduct.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(quickViewProduct)}
                      className={`p-3 rounded-xl border transition-all ${
                        isInWishlist(quickViewProduct.id)
                          ? 'border-red-500/50 bg-red-500/10 text-red-400'
                          : 'border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-400'
                      }`}
                    >
                      <Heart size={16} fill={isInWishlist(quickViewProduct.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
