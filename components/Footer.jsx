import './Footer.css';

const footerLinks = {
  Shop: ['All Wigs', 'Body Wave', 'Deep Wave', 'Straight', 'Curly', 'New Arrivals', 'Best Sellers'],
  Collections: ['HD Lace Series', 'Glueless Collection', 'Colour Range', 'The Basics', 'Limited Drops'],
  Support: ['FAQ', 'Shipping & Returns', 'Returns & Refunds', 'Size Guide', 'Care Instructions', 'Buyer Guide', 'Contact Us'],
  Company: ['Our Story', 'Ethical Sourcing', 'Sustainability', 'Press', 'Affiliates', 'Careers', 'Beauty Circle'],
};

const socials = [
  { name: 'Instagram', href: '#', icon: 'IG' },
  { name: 'TikTok',    href: '#', icon: 'TK' },
  { name: 'Pinterest', href: '#', icon: 'PT' },
  { name: 'YouTube',   href: '#', icon: 'YT' },
];

// Every footer link mapped to its InfoCard key
const CARD_MAP = {
  'FAQ':                  'faq',
  'Shipping & Returns':   'shipping',
  'Returns & Refunds':    'returnsFullOverlay',
  'Care Instructions':    'hairCare',
  'Buyer Guide':          'buyerGuide',
  'Contact Us':           'contact',
  'Our Story':            'about',
  'Beauty Circle':        'beautyCircle',
  'Quality Guarantee':    'guarantee',
};

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
            {socials.map(s => (
              <a key={s.name} href={s.href} className="footer-social" aria-label={s.name}>{s.icon}</a>
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
                      <a
                        href="#"
                        onClick={cardKey ? (e) => open(cardKey, e) : undefined}
                      >
                        {link}
                      </a>
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
          <a href="#" onClick={(e) => open('privacy', e)}>Privacy Policy</a>
          <a href="#" onClick={(e) => open('terms', e)}>Terms of Service</a>
          <a href="#" onClick={(e) => open('dataSafety', e)}>Data Safety</a>
          <a href="#" onClick={(e) => open('checkoutPolicy', e)}>Checkout Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenSitemap?.(); }}>Site Map</a>
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
