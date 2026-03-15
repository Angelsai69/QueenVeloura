import { useState } from 'react';
import './ProductCard.css';

import bodywaveFront from '../assets/bodywave-front.jpg';
import bodywaveSide from '../assets/bodywave-side.jpg';
import deepwaveFront from '../assets/deepwave-front.jpg';
import deepwaveSide from '../assets/deepwave-side.jpg';
import waterwaveFront from '../assets/waterwave-front.jpg';
import waterwaveSide from '../assets/waterwave-side.jpg';
import straightFront from '../assets/straight-front.jpg';
import straightSide from '../assets/straight-side.jpg';

const imageMap = {
  '/src/assets/bodywave-front.jpg':  bodywaveFront,
  '/src/assets/bodywave-side.jpg':   bodywaveSide,
  '/src/assets/deepwave-front.jpg':  deepwaveFront,
  '/src/assets/deepwave-side.jpg':   deepwaveSide,
  '/src/assets/waterwave-front.jpg': waterwaveFront,
  '/src/assets/waterwave-side.jpg':  waterwaveSide,
  '/src/assets/straight-front.jpg':  straightFront,
  '/src/assets/straight-side.jpg':   straightSide,
};

import './ProductCard.css';

const bgGradients = {
  'prod-bg-1': 'linear-gradient(160deg, #2A1F1A 0%, #0D0804 100%)',
  'prod-bg-2': 'linear-gradient(160deg, #1E1510 0%, #3D2C22 60%, #0D0804 100%)',
  'prod-bg-3': 'linear-gradient(160deg, #3D2C22 0%, #1A1008 100%)',
  'prod-bg-4': 'linear-gradient(160deg, #0D0804 0%, #2A1F1A 100%)',
};

export default function ProductCard({ product, onAddToCart, onBISOpen }) {
  const [flipped, setFlipped] = useState(false);
  const [selectedLength, setSelectedLength] = useState(product.defaultLength);
  const [selectedCap, setSelectedCap] = useState(product.defaultCap);

  const bg = bgGradients[product.bgClass] || bgGradients['prod-bg-1'];
  const resolvedFront = product.imgFront ? (imageMap[product.imgFront] || product.imgFront) : null;
  const resolvedSide  = product.imgSide  ? (imageMap[product.imgSide]  || product.imgSide)  : null;
  const hasImages = !!(resolvedFront && resolvedSide);

  return (
    <div className="product-card reveal">
      {/* Guarantee badge */}
      <div className="guarantee-badge">
        <svg viewBox="0 0 54 54">
          <circle cx="27" cy="27" r="25" fill="none" stroke="rgba(232,201,122,0.8)" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="27" cy="27" r="21" fill="rgba(10,5,2,0.92)" stroke="rgba(232,201,122,0.95)" strokeWidth="1.5" />
        </svg>
        <div className="guarantee-badge-inner">2 YR<br />GUAR.</div>
      </div>

      {/* Flip card image — hover flips, click on hint button also works */}
      <div
        className="product-image"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>

          {/* FRONT */}
          <div className="flip-front">
            {hasImages ? (
              <div className="product-img-real">
                <img src={resolvedFront} alt={product.name} />
              </div>
            ) : (
              <div className="product-img-art">
                <div className="product-img-bg" style={{ background: bg }}>
                  <div className="hair-figure-wrap">
                    <div className="hair-head" />
                    <div className="hair-wig">
                      <div className="hair-flow" style={{ background: 'linear-gradient(180deg,#1A1008,#0D0804)' }} />
                    </div>
                    <div className="hair-glow" />
                  </div>
                </div>
              </div>
            )}
            {product.badge && (
              <div className="product-badge" style={product.badgeStyle}>{product.badge}</div>
            )}
            <button className="flip-hint" onClick={() => setFlipped(true)}>↻ Details</button>
          </div>

          {/* BACK */}
          <div className="flip-back">
            {hasImages ? (
              <div className="product-img-real product-img-real--back">
                <img src={resolvedSide} alt={`${product.name} – side view`} />
                <div className="flip-back-overlay">
                  <div className="flip-back-label">{product.category} · {product.defaultLength}</div>
                </div>
              </div>
            ) : (
              <div className="flip-back-bg" style={{ background: bg }}>
                <div className="flip-back-face">
                  <div className="flip-back-head" />
                  <div className="flip-back-hair" />
                  <div className="flip-back-lace-line" />
                  <div className="hair-glow" />
                </div>
                <div className="flip-back-label">{product.category} · {product.defaultLength}</div>
              </div>
            )}
            <button className="flip-hint flip-hint-back" onClick={() => setFlipped(false)}>↻ Back</button>
          </div>

        </div>
      </div>

      {/* Urgency bar */}
      <div className="urgency-bar">
        {product.inStock ? (
          <>
            <div className="urgency-stock">
              <div className="urgency-dot" />
              {product.viewers > 0 ? `${product.viewers} viewing now` : 'In Stock'}
            </div>
            <div className="urgency-viewers">
              {product.viewers > 0 && `👁 ${product.viewers} viewing now`}
            </div>
          </>
        ) : (
          <>
            <div className="urgency-stock out">
              <div className="urgency-dot out" />
              Last 1 in stock!
            </div>
            <button
              className="urgency-notify-btn"
              onClick={() => onBISOpen(product.name, `$${product.price}`)}
            >
              Notify when restocked
            </button>
          </>
        )}
      </div>

      {/* Delivery countdown */}
      <div className="delivery-countdown">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
        Order in <span className="countdown-timer">{product.countdown}</span> — arrives {product.delivery}
      </div>

      {/* Product info */}
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-specs">{product.specs}</div>

        {/* Variant selectors */}
        <div className="variant-selectors">
          <div className="variant-row">
            <span className="variant-label">Length</span>
            {product.lengths.map(l => (
              <button
                key={l}
                className={`variant-opt ${selectedLength === l ? 'selected' : ''}`}
                onClick={() => setSelectedLength(l)}
              >{l}</button>
            ))}
          </div>
          <div className="variant-row">
            <span className="variant-label">Cap Size</span>
            {product.capSizes.map(s => (
              <button
                key={s}
                className={`variant-opt ${selectedCap === s ? 'selected' : ''}`}
                onClick={() => setSelectedCap(s)}
              >{s}</button>
            ))}
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">${product.price}</div>
          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
          >+</button>
        </div>

        {/* Out of stock waitlist */}
        {!product.inStock && (
          <div
            className="bis-card-trigger"
            onClick={() => onBISOpen(product.name, `$${product.price}`)}
          >
            <span className="bis-card-dot" />
            <span>Join restock waitlist · {product.waitlist} waiting</span>
            <span className="bis-card-arrow">→</span>
          </div>
        )}
      </div>
    </div>
  );
}
