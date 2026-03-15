import { useEffect, useRef } from 'react';
import { products } from '../data/siteData';
import ProductCard from './ProductCard';
import './ProductsSection.css';

export default function ProductsSection({ onAddToCart, onBISOpen }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="products-section" id="shop" ref={sectionRef}>
      <div className="products-header reveal">
        <div>
          <div className="section-eyebrow">Best Sellers</div>
          <h2 className="section-title">Our Most-Loved<br /><em>Styles</em></h2>
        </div>
        <a href="#" className="btn-outline">View All Wigs</a>
      </div>
      <div className="products-grid">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBISOpen={onBISOpen}
          />
        ))}
      </div>
    </section>
  );
}
