import { useState, useEffect } from 'react';
import { navLinks } from '../data/siteData';
import logoImg from '../assets/veloura-logo.png';
import './Navbar.css';

export default function Navbar({ onCartOpen, onAuthOpen, onSearchOpen, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        <img src={logoImg} alt="Queen Veloura" className="nav-logo-img" />
        <span className="nav-logo-text">Queen <em>Veloura</em></span>
      </a>

      <ul className="nav-links">
        {navLinks.map(link => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
      </ul>

      <div className="nav-actions">
        <button onClick={onSearchOpen} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button onClick={onAuthOpen} aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button onClick={onCartOpen} className="cart-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="nav-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <a key={link} href="#" onClick={() => setMobileOpen(false)}>{link}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
