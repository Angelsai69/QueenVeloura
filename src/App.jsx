import { useState, useEffect } from 'react';
import './App.css';

import Cursor from './components/Cursor';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Collections from './components/Collections';
import ProductsSection from './components/ProductsSection';
import CostCalculator from './components/CostCalculator';
import CompareSection from './components/CompareSection';
import WhySection from './components/WhySection';
import VideoSection from './components/VideoSection';
import ReviewsSection from './components/ReviewsSection';
import LoyaltySection from './components/LoyaltySection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import CookieBanner from './components/CookieBanner';
import WigQuiz from './components/WigQuiz';
import BISModal from './components/BISModal';
import AIStylist from './components/AIStylist';
import StickyCTA from './components/StickyCTA';
import ExitPopup from './components/ExitPopup';
import PageLoader from './components/PageLoader';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';
import CheckoutModal from './components/CheckoutModal';
import SearchOverlay from './components/SearchOverlay';
import InfoCards from './components/InfoCards';
import JournalSection from './components/JournalSection';
import ItemDetailCard from './components/ItemDetailCard';
import InstagramGrid from './components/InstagramGrid';
import BackToTop from './components/BackToTop';
import SitemapFloat from './components/SitemapFloat';
import VirtualTryOn from './components/VirtualTryOn';
import { products } from './data/siteData';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [quizOpen, setQuizOpen] = useState(false);
  const [bisOpen, setBisOpen] = useState(false);
  const [bisProduct, setBisProduct] = useState({ name: '', price: '' });
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [thankYouItem, setThankYouItem] = useState(null);
  const [notFoundOpen, setNotFoundOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [itemDetailOpen, setItemDetailOpen] = useState(false);
  const [itemDetailProduct, setItemDetailProduct] = useState(null);
  const [sitemapOpen, setSitemapOpen] = useState(false);

  // Global scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  // Hash-based 404 trigger (navigate to #404 to preview)
  useEffect(() => {
    const check = () => setNotFoundOpen(window.location.hash === '#404');
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        length: product.defaultLength,
        cap: product.defaultCap,
        qty: 1,
      }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  };

  const openAuth = (tab = 'signin') => { setAuthTab(tab); setAuthOpen(true); };
  const openBIS = (name, price) => { setBisProduct({ name, price }); setBisOpen(true); };
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  const openThankYou = (item) => {
    setThankYouItem(item);
    setCartItems([]);
    setCartOpen(false);
    setThankYouOpen(true);
  };

  const handleCheckoutSuccess = (name, price) => {
    setCheckoutOpen(false);
    setThankYouItem({ name, price });
    setCartItems([]);
    setThankYouOpen(true);
  };

  const closeNotFound = () => {
    window.history.pushState('', document.title, window.location.pathname);
    setNotFoundOpen(false);
  };

  return (
    <div className="app">
      <PageLoader />
      <Cursor />
      <AnnouncementBar />
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onAuthOpen={() => openAuth('signin')}
        onSearchOpen={() => setSearchOpen(true)}
        cartCount={cartItems.reduce((s, i) => s + i.qty, 0)}
      />

      <main>
        <Hero onShopClick={scrollToShop} />
        <Collections onQuizOpen={() => setQuizOpen(true)} />
        <Marquee />
        <VirtualTryOn onShopClick={scrollToShop} />
        <ProductsSection onAddToCart={addToCart} onBISOpen={openBIS} />
        <CostCalculator />
        <CompareSection />
        <WhySection />
        <VideoSection />
        <ReviewsSection />
        <LoyaltySection onAuthOpen={openAuth} />
        <JournalSection onOpenCard={setActiveCard} />
        <InstagramGrid />
        <Newsletter />
      </main>

      <Footer onOpenCard={setActiveCard} onOpenSitemap={() => setSitemapOpen(true)} />

      {/* Floating UI */}
      <AIStylist />
      <StickyCTA onAddToCart={() => addToCart(products[0])} />
      <BackToTop />
      <SitemapFloat
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        onOpenCard={setActiveCard}
      />

      {/* Overlays / Modals */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={updateQty}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />
      <WigQuiz
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onAddToCart={addToCart}
      />
      <BISModal
        isOpen={bisOpen}
        onClose={() => setBisOpen(false)}
        productName={bisProduct.name}
        productPrice={bisProduct.price}
      />
      <CookieBanner />
      <ExitPopup />
      <InfoCards activeCard={activeCard} onClose={() => setActiveCard(null)} />
      <ItemDetailCard
        isOpen={itemDetailOpen}
        onClose={() => setItemDetailOpen(false)}
        product={itemDetailProduct}
        onConfirm={(item) => addToCart({ ...item, id: itemDetailProduct?.id || 1, defaultLength: item.length, defaultCap: item.cap })}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onSuccess={handleCheckoutSuccess}
      />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={addToCart}
      />
      <ThankYou
        isOpen={thankYouOpen}
        onClose={() => setThankYouOpen(false)}
        orderProduct={thankYouItem?.name}
        orderPrice={thankYouItem?.price}
      />
      <NotFound
        isVisible={notFoundOpen}
        onClose={closeNotFound}
        onOpenQuiz={() => setQuizOpen(true)}
      />
    </div>
  );
}
