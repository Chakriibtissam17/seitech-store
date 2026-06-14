import { motion } from 'framer-motion';

const items = [
  '🚀 Free Shipping on Orders Above 5000 DZD',
  '🎓 Student Discount: 10-15% Off with Valid ID',
  '⚡ Authentic Components – 100% Guaranteed',
  '📦 2–5 Day Delivery Nationwide Algeria',
  '🛠️ 24/7 Technical Support for Embedded Projects',
  '💡 ESP32 + Arduino + Raspberry Pi In Stock',
];

export default function BannerStrip() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
      style={{
        height: '28px',
        background: 'linear-gradient(90deg, #0066ff, #00d4ff, #0066ff)',
        backgroundSize: '200% 100%',
        animation: 'gradient-shift 4s ease infinite',
      }}
    >
      <div className="flex items-center h-full">
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...items, ...items, ...items].map((item, i) => (
            <span key={i} className="text-white text-xs font-semibold tracking-wide flex-shrink-0">
              {item}
              <span className="mx-6 opacity-50">|</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
