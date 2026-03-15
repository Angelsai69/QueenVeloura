import { useState, useEffect } from 'react';
import './StickyCTA.css';

export default function StickyCTA({ onAddToCart, onCartOpen }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? 'visible' : ''}`}>
      <div className="sticky-product-info">
        <div className="sticky-name">Silk Crown 24" Body Wave</div>
        <div className="sticky-price">$420 · In Stock · Free Shipping</div>
      </div>
      <div className="sticky-actions">
        <button
          className="btn-outline"
          style={{ padding: '11px 24px', fontSize: '10px' }}
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Details
        </button>
        <button
          className="btn-primary"
          style={{ padding: '11px 24px', fontSize: '10px' }}
          onClick={onAddToCart}
        >
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
