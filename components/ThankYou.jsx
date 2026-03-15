import { useEffect, useRef } from 'react';
import './ThankYou.css';

function spawnConfetti(container) {
  container.innerHTML = '';
  const count = 24;
  const colors = ['#C9A96E', '#F0D898', '#B8974A', '#E8C97A', '#fff'];
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.style.left = `${Math.random() * 100}%`;
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.width = `${2 + Math.random() * 4}px`;
    s.style.height = `${6 + Math.random() * 8}px`;
    s.style.animationDelay = `${Math.random() * 0.6}s`;
    s.style.animationDuration = `${0.9 + Math.random() * 0.6}s`;
    container.appendChild(s);
  }
}

export default function ThankYou({ isOpen, onClose, orderProduct, orderPrice }) {
  const confettiRef = useRef(null);

  useEffect(() => {
    if (isOpen && confettiRef.current) {
      spawnConfetti(confettiRef.current);
    }
  }, [isOpen]);

  const productName = orderProduct || 'Body Wave 24" HD Lace';
  const productPrice = orderPrice ? `$${orderPrice}.00` : '$420.00';

  return (
    <div className={`thankyou-overlay ${isOpen ? 'open' : ''}`}>
      <div className="ty-confetti" ref={confettiRef} />
      <button className="thankyou-close" onClick={onClose}>×</button>
      <div className="thankyou-badge">✦</div>
      <div className="thankyou-eyebrow">Order Confirmed</div>
      <h1 className="thankyou-title">Thank You,<br /><em>Beautiful.</em></h1>
      <p className="thankyou-desc">
        Your Veloura wig is being lovingly prepared. A confirmation email is on its way.
      </p>
      <div className="thankyou-order-box">
        <div className="thankyou-order-label">Order Summary</div>
        <div className="thankyou-order-row main">
          <span>{productName}</span>
          <span>{productPrice}</span>
        </div>
        <div className="thankyou-order-row">
          <span>Shipping</span><span>Free Express</span>
        </div>
        <div className="thankyou-order-row">
          <span>Free Gift</span><span>Wig Care Kit</span>
        </div>
        <div className="thankyou-order-row">
          <span>Est. Delivery</span><span>3–5 Business Days</span>
        </div>
      </div>
      <div className="thankyou-steps">
        <div className="thankyou-step">
          <div className="thankyou-step-icon">📦</div>
          <div className="thankyou-step-label">Preparing</div>
        </div>
        <div className="thankyou-step">
          <div className="thankyou-step-icon">🚚</div>
          <div className="thankyou-step-label">Shipped</div>
        </div>
        <div className="thankyou-step">
          <div className="thankyou-step-icon">✦</div>
          <div className="thankyou-step-label">Delivered</div>
        </div>
      </div>
      <div className="thankyou-cta-row">
        <button className="btn-primary" onClick={onClose}><span>Continue Shopping</span></button>
        <a href="#" className="btn-outline">Track Order</a>
      </div>
      <div className="thankyou-share-prompt">
        <div className="thankyou-share-label">Share Your Veloura Moment</div>
        <div className="thankyou-share-btns">
          <button className="thankyou-share-btn">📸 Instagram</button>
          <button className="thankyou-share-btn">🎵 TikTok</button>
          <button className="thankyou-share-btn">✦ Tag @QueenVeloura</button>
        </div>
      </div>
    </div>
  );
}
