import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Radio, Bot, Wifi, Layers, Zap } from 'lucide-react';
import { categories, products } from '../data/products';
import { useStore } from '../context/StoreContext';

const categoryIcons: Record<string, React.ReactNode> = {
  'development-boards': <Cpu size={28} />,
  'sensors': <Radio size={28} />,
  'robotics': <Bot size={28} />,
  'telecom': <Wifi size={28} />,
  'iot': <Layers size={28} />,
  'components': <Zap size={28} />,
};

const categoryColors: Record<string, string> = {
  'development-boards': 'from-blue-600 to-cyan-500',
  'sensors': 'from-cyan-500 to-teal-500',
  'robotics': 'from-purple-600 to-blue-600',
  'telecom': 'from-green-500 to-cyan-500',
  'iot': 'from-orange-500 to-red-500',
  'components': 'from-yellow-500 to-orange-500',
};

export default function CategoriesPage() {
  const { setCurrentPage, setActiveCategory } = useStore();

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: '#060e1f' }}>
      {/* Header */}
      <div className="relative border-b border-cyan-500/10 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #060e1f 100%)' }}
      >
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">All Categories</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
              Browse by <span className="gradient-text">Technology</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Explore our curated collection of professional embedded systems and electronics by category.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const catProducts = products.filter(p => p.category === cat.id);
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleCategoryClick(cat.id)}
                className="group text-left rounded-3xl overflow-hidden category-card-hover"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,34,71,0.8) 0%, rgba(6,14,31,0.95) 100%)',
                  border: '1px solid rgba(0,212,255,0.1)',
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-[#060e1f]/30 to-transparent" />
                  
                  {/* Category icon */}
                  <div className={`absolute top-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryColors[cat.id]} flex items-center justify-center text-white shadow-xl`}>
                    {categoryIcons[cat.id]}
                  </div>

                  {/* Product count */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-bold text-white border border-white/10">
                    {cat.productCount}+ items
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
                    {cat.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{cat.description}</p>

                  {/* Sample products */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {catProducts.slice(0, 4).map(p => (
                      <span key={p.id} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/40 text-slate-400 truncate max-w-[120px]">
                        {p.name.split(' ').slice(0, 3).join(' ')}
                      </span>
                    ))}
                    {cat.productCount > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/40 text-cyan-400">
                        +{cat.productCount - 4} more
                      </span>
                    )}
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${categoryColors[cat.id]} text-white text-sm font-bold group-hover:shadow-lg transition-all`}>
                    Shop Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColors[cat.id]} opacity-0 group-hover:opacity-60 transition-opacity`} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
