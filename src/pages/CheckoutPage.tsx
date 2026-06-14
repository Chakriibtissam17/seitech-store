import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, Truck, CheckCircle, ArrowLeft, Shield, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import toast from 'react-hot-toast';

const steps = ['Cart Review', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, setCurrentPage } = useStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', wilaya: '', postalCode: '',
    paymentMethod: 'cod',
  });

  const handleNext = async () => {
    if (step === 2) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully! 🎉', {
        style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
      });
      return;
    }
    setStep(s => s + 1);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: '#060e1f' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>Order Confirmed! 🎉</h1>
          <p className="text-slate-400 mb-2">Your order has been placed successfully.</p>
          <p className="text-slate-400 mb-8">You'll receive a confirmation SMS/email shortly with tracking details.</p>
          <div className="p-5 rounded-2xl mb-8"
            style={{ background: 'rgba(13,34,71,0.6)', border: '1px solid rgba(0,212,255,0.15)' }}
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Order Number</span>
              <span className="text-white font-bold">#SEIT-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Estimated Delivery</span>
              <span className="text-cyan-400 font-semibold">2–5 Business Days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Payment Method</span>
              <span className="text-white font-medium">Cash on Delivery</span>
            </div>
          </div>
          <button
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: '#060e1f' }}>
        <div className="text-center">
          <ShoppingBag size={64} className="text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
          <p className="text-slate-400 mb-6">Add some products before checking out</p>
          <button
            onClick={() => { setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#060e1f' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => step === 0 ? setCurrentPage('products') : setStep(s => s - 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {step === 0 ? 'Continue Shopping' : 'Back'}
          </button>
          <div className="flex-1 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i < step ? 'bg-green-500 text-white' : i === step ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? 'text-white font-semibold' : 'text-slate-500'}`}>{s}</span>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-slate-800 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.7) 0%, rgba(6,14,31,0.9) 100%)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              {step === 0 && (
                <div>
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk' }}>
                    <ShoppingBag size={20} className="text-cyan-400" />
                    Review Your Order
                  </h2>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(6,14,31,0.6)', border: '1px solid rgba(0,212,255,0.08)' }}
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-cyan-400">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk' }}>
                    <Truck size={20} className="text-cyan-400" />
                    Shipping Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: 'firstName', label: 'First Name', type: 'text', placeholder: 'Mohamed' },
                      { key: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Benali' },
                      { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
                      { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+213 5X XX XX XX' },
                      { key: 'address', label: 'Address', type: 'text', placeholder: 'Street address', col: 2 },
                      { key: 'wilaya', label: 'Wilaya', type: 'text', placeholder: 'e.g. Algiers' },
                      { key: 'city', label: 'City', type: 'text', placeholder: 'e.g. Bab Ezzouar' },
                      { key: 'postalCode', label: 'Postal Code', type: 'text', placeholder: '16000' },
                    ].map(field => (
                      <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={(form as any)[field.key]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-slate-600 outline-none"
                          style={{
                            background: 'rgba(6,14,31,0.8)',
                            border: '1px solid rgba(0,212,255,0.15)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk' }}>
                    <CreditCard size={20} className="text-cyan-400" />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '💵' },
                      { value: 'ccp', label: 'CCP (Postal Check)', desc: 'Algeria Post payment', icon: '📬' },
                      { value: 'baridimob', label: 'Baridimob', desc: 'Mobile payment via Algérie Poste', icon: '📱' },
                      { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard (CIB)', icon: '💳' },
                    ].map(method => (
                      <button
                        key={method.value}
                        onClick={() => setForm(f => ({ ...f, paymentMethod: method.value }))}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                          form.paymentMethod === method.value
                            ? 'border border-cyan-500/50 bg-cyan-500/10'
                            : 'border border-slate-700 hover:border-slate-600 bg-transparent'
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{method.label}</div>
                          <div className="text-xs text-slate-400">{method.desc}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          form.paymentMethod === method.value ? 'border-cyan-400' : 'border-slate-600'
                        }`}>
                          {form.paymentMethod === method.value && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-5 text-xs text-slate-500">
                    <Shield size={12} className="text-green-400" />
                    <span>Your payment information is secure and encrypted</span>
                    <Lock size={12} className="text-green-400 ml-auto" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 p-5 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(13,34,71,0.7) 0%, rgba(6,14,31,0.9) 100%)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-400 line-clamp-1 flex-1">{item.name} ×{item.quantity}</span>
                    <span className="text-white font-medium ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-slate-800 mb-4" />
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-green-400">Calculated at delivery</span>
                </div>
              </div>
              <div className="h-px bg-slate-800 mb-4" />
              <div className="flex justify-between mb-6">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-black text-cyan-400">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleNext}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-[1.01] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : step === 2 ? 'Place Order' : 'Continue'}
              </button>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Shield size={12} className="text-slate-600" />
                <span className="text-xs text-slate-600">SSL Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
