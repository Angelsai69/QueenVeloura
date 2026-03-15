import './CartSidebar.css';

export default function CartSidebar({ isOpen, onClose, items, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingThreshold = 300;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      <div className={`cart-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">
            Your Bag
            <span className="cart-count-badge">{items.reduce((s, i) => s + i.qty, 0)}</span>
          </div>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 ? (
          <div className="cart-shipping-bar">
            <p className="cart-shipping-msg">
              Add <strong>${remaining.toFixed(0)}</strong> more for free express shipping
            </p>
            <div className="cart-shipping-track">
              <div className="cart-shipping-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="cart-shipping-bar cart-shipping-achieved">
            <p className="cart-shipping-msg">✦ You've unlocked <strong>free express shipping!</strong></p>
          </div>
        )}

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">✦</div>
              <div className="cart-empty-title">Your bag is empty</div>
              <p className="cart-empty-sub">Add a wig to get started</p>
              <button className="btn-primary" onClick={onClose} style={{ marginTop: 24 }}>
                <span>Shop Now</span>
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-visual" style={{ background: 'linear-gradient(160deg, #2A1F1A, #0D0804)' }}>
                  <div className="cart-item-hair-head" />
                  <div className="cart-item-hair-wig" />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">{item.category}</div>
                  <div className="cart-item-meta">Length: {item.length} · Cap: {item.cap}</div>
                  <div className="cart-item-price-row">
                    <div className="cart-item-price">${item.price}</div>
                    <div className="cart-item-qty">
                      <button className="cart-qty-btn" onClick={() => onRemove(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => onRemove(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span className="cart-subtotal-price">${subtotal.toFixed(2)}</span>
            </div>
            <p className="cart-footer-note">Taxes and shipping calculated at checkout</p>
            <button className="cart-checkout-btn" onClick={onCheckout}>
              <span>Proceed to Checkout</span>
            </button>
            <button className="cart-continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
