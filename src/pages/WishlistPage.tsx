import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, setCurrentPage } = useStore();

  return (
    <div className="min-h-screen pt-20" style={{ background: '#060e1f' }}>
      <div className="relative border-b border-cyan-500/10"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #060e1f 100%)' }}
      >
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'Space Grotesk' }}>
            <Heart size={28} className="text-red-400 fill-red-400" />
            My Wishlist
          </h1>
          <p className="text-slate-400">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-3xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h3>
            <p className="text-slate-400 mb-8">Save your favorite products to find them easily later</p>
            <button
              onClick={() => { setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Browse Products <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlist.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,34,71,0.8) 0%, rgba(6,14,31,0.9) 100%)',
                  border: '1px solid rgba(0,212,255,0.1)',
                }}
              >
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-transparent to-transparent opacity-50" />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-white mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-1">{product.shortDescription}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-black text-white">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => { addToCart(product); toggleWishlist(product); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <ShoppingCart size={14} />
                    Move to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
