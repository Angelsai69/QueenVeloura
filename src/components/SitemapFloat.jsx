import './SitemapFloat.css';

const COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Wigs' }, { label: 'Signature Lace' }, { label: 'Glueless Wigs' },
      { label: 'HD Lace Collection', isNew: true }, { label: 'Long Waves' },
      { label: 'Body Wave' }, { label: 'Deep Wave' }, { label: 'Straight Wigs' },
      { label: 'Curly Wigs' }, { label: 'Best Sellers' }, { label: 'New Arrivals' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: '2025 Collection' }, { label: 'Luxury Series' }, { label: 'Everyday Glam' },
      { label: 'Bridal Collection' }, { label: 'Textured Series' },
      { label: 'Limited Edition' }, { label: 'Gift Sets' }, { label: 'Wig Care Kits' },
    ],
  },
  {
    title: 'Experiences',
    links: [
      { label: 'Virtual Try-On', isNew: true }, { label: 'Style Quiz' },
      { label: 'Veloura Circle' }, { label: 'Beauty Circle' },
      { label: 'Book a Stylist' }, { label: 'Custom Orders' }, { label: 'Gift Cards' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Wig Care Guide' }, { label: 'How to Measure' },
      { label: 'Cap Size Guide' }, { label: 'Density Guide' },
      { label: 'Lace Types' }, { label: 'Installation Tips' },
      { label: 'Journal' }, { label: 'Video Tutorials' }, { label: 'FAQ' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story' }, { label: 'Ethical Sourcing' },
      { label: 'Sustainability' }, { label: 'Press & Media' },
      { label: 'Affiliates' }, { label: 'Careers' }, { label: 'Contact Us' },
      { label: 'Shipping Policy' }, { label: 'Returns & Exchanges' },
      { label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Accessibility' },
    ],
  },
];

export default function SitemapFloat({ isOpen, onClose, onOpenCard }) {
  return (
    <div className={`sitemap-float ${isOpen ? 'open' : ''}`} role="dialog" aria-label="Site Map" aria-modal="true">
      <div className="sf-header">
        <div className="sf-title">Queen <span>Veloura</span> — Site Map</div>
        <button className="sf-close" onClick={onClose} aria-label="Close sitemap">×</button>
      </div>
      <div className="sf-body">
        <div className="sf-grid">
          {COLS.map(col => (
            <div key={col.title} className="sf-col">
              <div className="sf-col-title">{col.title}</div>
              <ul className="sf-links">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className={link.isNew ? 'sf-new' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.label === 'Journal') {
                          onClose();
                          document.getElementById('journalSection')?.scrollIntoView({ behavior: 'smooth' });
                        } else if (link.label === 'Our Story') { onClose(); onOpenCard?.('about'); }
                        else if (link.label === 'FAQ') { onClose(); onOpenCard?.('faq'); }
                        else if (link.label === 'Wig Care Guide') { onClose(); onOpenCard?.('hairMaintenance'); }
                        else if (link.label === 'Installation Tips') { onClose(); onOpenCard?.('installGuide'); }
                        else if (link.label === 'Shipping Policy') { onClose(); onOpenCard?.('shipping'); }
                        else if (link.label === 'Returns & Exchanges') { onClose(); onOpenCard?.('returnsFullOverlay'); }
                        else if (link.label === 'Privacy Policy') { onClose(); onOpenCard?.('privacy'); }
                        else if (link.label === 'Terms of Service') { onClose(); onOpenCard?.('terms'); }
                        else if (link.label === 'Beauty Circle') { onClose(); onOpenCard?.('beautyCircle'); }
                        else if (link.label === 'Contact Us') { onClose(); onOpenCard?.('contact'); }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="sf-footer-strip">
        <div className="sf-footer-logo">Queen <span>Veloura</span></div>
        <div className="sf-footer-copy">© 2026 Queen Veloura · All rights reserved</div>
      </div>
    </div>
  );
}
