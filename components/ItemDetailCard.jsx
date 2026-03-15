import { useState } from 'react';
import './ItemDetailCard.css';

const COLOURS = [
  { label: 'Natural Black', hex: '#1a0c05' },
  { label: 'Dark Brown',    hex: '#3d1f0a' },
  { label: 'Honey Brown',   hex: '#8B5E3C' },
  { label: 'Champagne Blonde', hex: '#C9A96E' },
];

export default function ItemDetailCard({ isOpen, onClose, product, onConfirm }) {
  const name    = product?.name  || 'Body Wave 24" HD Lace';
  const price   = product?.price || 420;
  const lengths = product?.lengths || ['16"','18"','20"','24"','26"','28"'];
  const caps    = product?.capSizes || ['Small','Medium','Large','XL'];

  const [selLength,  setSelLength]  = useState(product?.defaultLength || '24"');
  const [selColour,  setSelColour]  = useState('Natural Black');
  const [selCap,     setSelCap]     = useState(product?.defaultCap || 'Medium');
  const [qty,        setQty]        = useState(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.({ name, price, length: selLength, colour: selColour, cap: selCap, qty });
    onClose();
  };

  return (
    <div className="item-detail-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="item-detail-card">
        <button className="item-detail-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="item-detail-tag">Product Details</div>
        <div className="item-detail-name" dangerouslySetInnerHTML={{ __html: name.replace('"', '"<br/>').replace(' HD', '<br/>HD') }} />
        <div className="item-detail-price">${price}</div>
        <div className="item-detail-desc">
          Our signature HD Lace wig crafted from 100% raw Vietnamese hair. Pre-plucked hairline with bleached knots for a seamless, undetectable finish. Medium-density pattern that holds style beautifully. Lasts 2–3 years with proper care.
          <br/><br/>
          <strong>HD Lace</strong> · <strong>150% Density</strong> · <strong>Raw Vietnamese Hair</strong> · <strong>Pre-plucked</strong>
        </div>

        {/* Length */}
        <div className="item-detail-section">
          <div className="item-detail-label">Length</div>
          <div className="item-detail-options">
            {lengths.map(l => (
              <button
                key={l}
                className={`id-option ${selLength === l ? 'selected' : ''}`}
                onClick={() => setSelLength(l)}
              >{l}</button>
            ))}
          </div>
        </div>

        {/* Colour */}
        <div className="item-detail-section">
          <div className="item-detail-label">Colour</div>
          <div className="item-detail-options">
            {COLOURS.map(c => (
              <button
                key={c.label}
                className={`id-option ${selColour === c.label ? 'selected' : ''}`}
                onClick={() => setSelColour(c.label)}
                style={{ display:'flex', alignItems:'center', gap:'6px' }}
              >
                <span style={{ width:'12px', height:'12px', borderRadius:'50%', background: c.hex, border:'1px solid rgba(0,0,0,0.15)', flexShrink:0 }} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cap Size */}
        <div className="item-detail-section">
          <div className="item-detail-label">Cap Size</div>
          <div className="item-detail-options">
            {caps.map(c => (
              <button
                key={c}
                className={`id-option ${selCap === c ? 'selected' : ''}`}
                onClick={() => setSelCap(c)}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="item-detail-section">
          <div className="item-detail-label">Quantity</div>
          <div className="item-detail-qty">
            <button className="id-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <div className="id-qty-val">{qty}</div>
            <button className="id-qty-btn" onClick={() => setQty(q => Math.min(5, q + 1))}>+</button>
          </div>
        </div>

        <div className="item-detail-actions">
          <button className="id-btn-confirm" onClick={handleConfirm}>Confirm Selection</button>
          <button className="id-btn-continue" onClick={onClose}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
