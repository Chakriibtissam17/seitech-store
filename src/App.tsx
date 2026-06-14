import { Toaster } from 'react-hot-toast';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import BannerStrip from './components/BannerStrip';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

function AppContent() {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'robotics':
        return <ProductsPage />;
      case 'devboards':
        return <ProductsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'about':
        return (
          <div className="pt-20" style={{ background: '#060e1f' }}>
            <About />
          </div>
        );
      case 'testimonials':
        return (
          <div className="pt-20" style={{ background: '#060e1f' }}>
            <Testimonials />
          </div>
        );
      case 'faq':
        return (
          <div className="pt-20" style={{ background: '#060e1f' }}>
            <FAQ />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-20" style={{ background: '#060e1f' }}>
            <Contact />
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#060e1f', color: '#fff' }}>
      <BannerStrip />
      <div className="h-[28px]" />
      <Navbar />
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'checkout' && <Footer />}
      <CartDrawer />
      <SearchModal />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0d2247',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
