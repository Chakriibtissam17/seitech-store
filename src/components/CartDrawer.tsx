import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart, setCurrentPage } = useStore();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0a1628 0%, #060e1f 100%)',
              borderLeft: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <ShoppingCart size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Your Cart</h2>
                  <p className="text-xs text-slate-400">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-slate-300 font-semibold">Your cart is empty</p>
                    <p className="text-slate-500 text-sm mt-1">Add some amazing tech products!</p>
                  </div>
                  <button
                    onClick={() => { setIsCartOpen(false); setCurrentPage('products'); }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 rounded-xl border border-slate-800/50 hover:border-cyan-500/20 transition-all group"
                    style={{ background: 'rgba(13,34,71,0.4)' }}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white leading-snug line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-500/50 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-bold text-white min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-500/50 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                        <span className="ml-auto text-sm font-bold text-cyan-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-1 p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-cyan-500/10 space-y-3">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">Calculated at checkout</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="flex justify-between">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-black text-xl text-cyan-400">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02]"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
