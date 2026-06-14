import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden card-hover"
      style={{
        background: 'linear-gradient(135deg, rgba(13,34,71,0.8) 0%, rgba(6,14,31,0.9) 100%)',
        border: '1px solid rgba(0,212,255,0.1)',
      }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
        {product.badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/90 text-white">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-600 text-slate-300">
            Out of Stock
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 right-3 z-20 p-2 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 ${
          inWishlist
            ? 'bg-red-500/90 text-white'
            : 'bg-[#060e1f]/80 text-slate-400 hover:text-red-400 backdrop-blur-sm'
        }`}
      >
        <Heart size={15} fill={inWishlist ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="product-img-zoom relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl">🔌</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-transparent to-transparent opacity-60" />
        
        {/* Quick View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[2px]">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
          >
            <Eye size={15} />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium text-cyan-400/80 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full">
            {product.subcategory.replace('-', ' ')}
          </span>
          {product.inStock ? (
            <span className="text-[10px] font-medium text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              In Stock ({product.stockCount})
            </span>
          ) : (
            <span className="text-[10px] font-medium text-red-400">Out of Stock</span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-sm text-white leading-snug mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={11}
                className={star <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-amber-400">{product.rating}</span>
          <span className="text-[11px] text-slate-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
            product.inStock
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={15} />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-2xl" />
      </div>
    </motion.div>
  );
}
