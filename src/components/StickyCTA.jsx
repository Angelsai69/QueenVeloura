import { useState, useEffect } from 'react';
import { products } from '../data/siteData';
import './StickyCTA.css';

export default function StickyCTA({ onAddToCart }) {
  const [visible, setVisible] = useState(false);
  const product = products[0]; // Always shows the first product (Bone Straight)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? 'visible' : ''}`}>
      <div className="sticky-product-info">
        <div className="sticky-name">{product.name}</div>
        <div className="sticky-price">
          ${product.price} · {product.inStock ? 'In Stock' : 'Limited'} · Free Shipping
        </div>
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
          onClick={() => onAddToCart(product)}
        >
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
