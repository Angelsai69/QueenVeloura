import './Footer.css';

const footerLinks = {
  Shop: ['All Wigs', 'Body Wave', 'Deep Wave', 'Water Wave', 'Straight', 'New Arrivals', 'Best Sellers'],
  Collections: ['HD Lace Series', 'Glueless Collection', 'Colour Range', 'The Basics', 'Limited Drops'],
  Support: ['FAQ', 'Shipping & Returns', 'Returns & Refunds', 'Size Guide', 'Care Instructions', 'Buyer Guide', 'Contact Us'],
  Company: ['Our Story', 'Ethical Sourcing', 'Sustainability', 'Beauty Circle', 'Trust Center', 'Terms'],
};

const CARD_MAP = {
  'FAQ':               'faq',
  'Shipping & Returns':'shipping',
  'Returns & Refunds': 'returnsFullOverlay',
  'Care Instructions': 'hairCare',
  'Buyer Guide':       'buyerGuide',
  'Contact Us':        'contact',
  'Our Story':         'about',
  'Beauty Circle':     'beautyCircle',
  'Trust Center':      'dataSafety',
  'Terms':             'terms',
};

const SOCIALS = [
  {
    name: 'Instagram', href: 'https://instagram.com/queenveloura',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    name: 'X / Twitter', href: 'https://x.com/queenveloura',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    name: 'Facebook', href: 'https://facebook.com/queenveloura',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    name: 'TikTok', href: 'https://tiktok.com/@queenveloura',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>,
  },
  {
    name: 'YouTube', href: 'https://youtube.com/@queenveloura',
    icon: <svg width="20" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

export default function Footer({ onOpenCard, onOpenSitemap }) {
  const open = (key, e) => {
    e.preventDefault();
    onOpenCard?.(key);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">Queen <em>Veloura</em></div>
          <p className="footer-tagline">
            Luxury human hair wigs crafted with intention. Ethically sourced, beautifully made.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.href} className="footer-social" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
          <div className="footer-trust-badges">
            <div className="footer-badge" onClick={() => onOpenCard?.('guarantee')} style={{cursor:'none'}}>✦ 2-Year Guarantee</div>
            <div className="footer-badge">✦ 100% Virgin Hair</div>
            <div className="footer-badge">✦ HD Lace</div>
          </div>
        </div>

        <div className="footer-links-grid">
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col} className="footer-col">
              <div className="footer-col-title">{col}</div>
              <ul className="footer-link-list">
                {links.map(link => {
                  const cardKey = CARD_MAP[link];
                  return (
                    <li key={link}>
                      <a href="#" onClick={cardKey ? (e) => open(cardKey, e) : undefined}>{link}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-copy">© 2026 Queen Veloura. All rights reserved.</span>
          <a href="#" onClick={e => open('privacy', e)}>Privacy Policy</a>
          <a href="#" onClick={e => open('terms', e)}>Terms of Service</a>
          <a href="#" onClick={e => open('dataSafety', e)}>Data Safety</a>
          <a href="#" onClick={e => open('checkoutPolicy', e)}>Checkout Policy</a>
          <a href="#" onClick={e => { e.preventDefault(); onOpenSitemap?.(); }}>Site Map</a>
        </div>
        <div className="footer-payment-icons">
          {['VISA', 'MC', 'AMEX', 'PP', 'SHOP'].map(p => (
            <div key={p} className="payment-chip">{p}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}
