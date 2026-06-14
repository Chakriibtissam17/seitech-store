import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '../data/products';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity!`, {
          style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
          iconTheme: { primary: '#00d4ff', secondary: '#0d2247' },
        });
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${product.name} added to cart!`, {
        style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
        iconTheme: { primary: '#00d4ff', secondary: '#0d2247' },
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.success('Item removed from cart', {
      style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
    });
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: qty } : item)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        toast.success(`Removed ${product.name} from wishlist`, {
          style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
          iconTheme: { primary: '#f43f5e', secondary: '#0d2247' },
        });
        return prev.filter(p => p.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist!`, {
        style: { background: '#0d2247', border: '1px solid rgba(0,212,255,0.3)', color: '#fff' },
        iconTheme: { primary: '#f43f5e', secondary: '#0d2247' },
      });
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      currentPage,
      setCurrentPage,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
