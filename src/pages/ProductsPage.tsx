import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export default function ProductsPage() {
  const { activeCategory, setActiveCategory } = useStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    if (inStockOnly) result = result.filter(p => p.inStock);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [activeCategory, search, sort, priceRange, inStockOnly]);

  return (
    <div className="min-h-screen pt-20" style={{ background: '#060e1f' }}>
      {/* Header */}
      <div className="relative overflow-hidden border-b border-cyan-500/10"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #060e1f 100%)' }}
      >
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <span>Home</span>
              <span>/</span>
              <span className="text-cyan-400">Products</span>
              {activeCategory !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-white">{categories.find(c => c.id === activeCategory)?.name}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              {activeCategory === 'all' || !activeCategory
                ? 'All Products'
                : categories.find(c => c.id === activeCategory)?.name}
            </h1>
            <p className="text-slate-400">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              !activeCategory || activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat.name} ({products.filter(p => p.category === cat.id).length})
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm placeholder-slate-600 outline-none"
              style={{
                background: 'rgba(13,34,71,0.6)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl text-white text-sm outline-none cursor-pointer"
              style={{
                background: 'rgba(13,34,71,0.6)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value} className="bg-[#0a1628]">{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              showFilters
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'border border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* View Mode */}
          <div className="flex border border-slate-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-white'}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-5 rounded-2xl flex flex-col sm:flex-row gap-6"
                style={{
                  background: 'rgba(13,34,71,0.5)',
                  border: '1px solid rgba(0,212,255,0.1)',
                }}
              >
                {/* Price Range */}
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                    Price Range: $0 – ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, +e.target.value])}
                    className="w-full accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$200+</span>
                  </div>
                </div>

                {/* In Stock */}
                <div className="flex items-start gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Availability</label>
                    <button
                      onClick={() => setInStockOnly(!inStockOnly)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                        inStockOnly
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'border border-slate-700 text-slate-400 hover:border-green-500/20'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                        inStockOnly ? 'bg-green-500 border-green-500' : 'border-slate-600'
                      }`}>
                        {inStockOnly && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      In Stock Only
                    </button>
                  </div>
                </div>

                {/* Clear */}
                <div className="flex items-end">
                  <button
                    onClick={() => { setPriceRange([0, 200]); setInStockOnly(false); setSearch(''); }}
                    className="px-4 py-2 rounded-xl text-sm text-slate-500 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); setPriceRange([0, 200]); setInStockOnly(false); }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-5 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
            }`}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
