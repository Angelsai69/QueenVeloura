import { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/veloura-logo.png';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Shop',        action: 'shop' },
  { label: 'Collections', action: 'collections' },
  { label: 'Our Story',   action: 'about' },
  { label: 'Journal',     action: 'journal' },
  { label: 'Contact',     action: 'contact' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const HIDE_DELAY = 5000; // hide after 5s of no interaction

export default function Navbar({ onCartOpen, onAuthOpen, onSearchOpen, onOpenCard, cartCount }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const hideTimer = useRef(null);

  // Start hide timer on mount
  const resetHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHidden(false);
    hideTimer.current = setTimeout(() => setHidden(true), HIDE_DELAY);
  };

  useEffect(() => {
    // Start initial hide timer
    resetHideTimer();

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      resetHideTimer(); // any scroll resets timer and shows navbar
    };

    const onMouseMove = (e) => {
      // Show navbar when mouse moves near top of screen
      if (e.clientY < 80) resetHideTimer();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      clearTimeout(hideTimer.current);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleNav = (e, action) => {
    e.preventDefault();
    setMobileOpen(false);
    resetHideTimer();
    switch (action) {
      case 'shop':        scrollTo('shop'); break;
      case 'collections': scrollTo('collections-section'); break;
      case 'about':       onOpenCard?.('about'); break;
      case 'journal':     scrollTo('journalSection'); break;
      case 'contact':     onOpenCard?.('contact'); break;
      default: break;
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}
      onMouseEnter={resetHideTimer}
    >
      <a
        href="/"
        className="nav-logo"
        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); resetHideTimer(); }}
      >
        <img src={logoImg} alt="Queen Veloura" className="nav-logo-img" />
        <span className="nav-logo-text">Queen <em>Veloura</em></span>
      </a>

      <ul className="nav-links">
        {NAV_ITEMS.map(item => (
          <li key={item.label}>
            <a href="#" onClick={e => handleNav(e, item.action)}>{item.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button onClick={() => { onSearchOpen?.(); resetHideTimer(); }} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button onClick={() => { onAuthOpen?.(); resetHideTimer(); }} aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button onClick={() => { onCartOpen?.(); resetHideTimer(); }} className="cart-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="nav-menu-btn" onClick={() => { setMobileOpen(!mobileOpen); resetHideTimer(); }} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href="#" onClick={e => handleNav(e, item.action)}>{item.label}</a>
          ))}
          <div className="mobile-menu-divider" />
          <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); onOpenCard?.('faq'); }}>FAQ</a>
          <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); onOpenCard?.('shipping'); }}>Shipping</a>
          <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); onOpenCard?.('returns'); }}>Returns</a>
          <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); onOpenCard?.('hairCare'); }}>Wig Care</a>
        </div>
      )}
    </nav>
  );
}
