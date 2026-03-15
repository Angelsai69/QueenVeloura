import { useState, useEffect, useRef } from 'react';
import './CheckoutModal.css';

const CO_KEY = 'veloura_co_v1';
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getDeliveryCountdown() {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(17, 0, 0, 0);
  if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
  while (cutoff.getDay() === 0 || cutoff.getDay() === 6) cutoff.setDate(cutoff.getDate() + 1);
  const diff = cutoff - now;
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '',
  address1: '', address2: '', city: '', state: '', zip: '', country: 'US',
  prefLength: '', prefTexture: '', newsOptIn: true,
};

export default function CheckoutModal({ isOpen, onClose, cartItems = [], onSuccess }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [returning, setReturning] = useState(null);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [countdown, setCountdown] = useState(getDeliveryCountdown());
  const [stripeLoading, setStripeLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const overlayRef = useRef(null);

  // Live countdown
  useEffect(() => {
    const t = setInterval(() => setCountdown(getDeliveryCountdown()), 60000);
    return () => clearInterval(t);
  }, []);

  // Autofill from localStorage on open
  useEffect(() => {
    if (!isOpen) return;
    setStep(1); setConfirmed(false); setBundleAdded(false); setErrors({});
    try {
      const raw = localStorage.getItem(CO_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if ((Date.now() - d.savedAt) > 90 * 864e5) return;
      setFields(f => ({ ...f, ...d }));
      setReturning(d.firstName || null);
    } catch(e) {}
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = (key, val) => setFields(f => ({ ...f, [key]: val }));

  const clearSaved = () => {
    try { localStorage.removeItem(CO_KEY); } catch(e) {}
    setFields(EMPTY); setReturning(null); setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!fields.firstName.trim()) e.firstName = 'Required';
    if (!fields.lastName.trim()) e.lastName = 'Required';
    if (!emailRx.test(fields.email.trim())) e.email = 'Valid email required';
    if (!fields.address1.trim()) e.address1 = 'Required';
    if (!fields.city.trim()) e.city = 'Required';
    if (!fields.state.trim()) e.state = 'Required';
    if (!fields.zip.trim()) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveCustomer = () => {
    try {
      localStorage.setItem(CO_KEY, JSON.stringify({ ...fields, savedAt: Date.now() }));
    } catch(e) {}
  };

  const handlePayment = async (method) => {
    if (!validate()) return;
    saveCustomer(); // localStorage autofill cache
    setStep(2);

    // ── STEP 1: Build full customer + order payload ───────────
    const orderId = 'VL-' + Date.now();
    const customerData = {
      // Contact
      firstName:      fields.firstName,
      lastName:       fields.lastName,
      email:          fields.email,
      phone:          fields.phone,
      // Shipping address
      address: {
        line1:   fields.address1,
        line2:   fields.address2,
        city:    fields.city,
        state:   fields.state,
        zip:     fields.zip,
        country: fields.country,
      },
      // CRM / personalisation data
      preferences: {
        length:  fields.prefLength,
        texture: fields.prefTexture,
      },
      newsletterOptIn: fields.newsOptIn,
      // Order metadata
      orderId,
      orderTotal:    grandTotal,
      bundleAdded,
      items: cartItems,
      paymentMethod: method,
      timestamp:     new Date().toISOString(),
      source:        'checkout_form',
    };

    // ── STEP 2: POST customer data to your backend BEFORE payment ──
    //
    // This stores the lead/customer in your DB even if payment is abandoned.
    // Uncomment when your backend is connected:
    //
    // try {
    //   // Upsert customer record (for CRM, email lists, analytics)
    //   await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/customers`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(customerData),
    //   });
    //
    //   // Create a pending order record
    //   await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ orderId, customer: customerData, items: cartItems, status: 'pending' }),
    //   });
    //
    //   // Add to newsletter if opted in
    //   if (fields.newsOptIn) {
    //     await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/subscribe`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email: fields.email, firstName: fields.firstName, source: 'checkout' }),
    //     });
    //   }
    // } catch (e) {
    //   console.error('Customer data save error:', e);
    //   // Don't block payment even if DB save fails
    // }

    // ── STEP 3: Redirect to Stripe or PayPal ─────────────────
    //
    // STRIPE — replace simulation with:
    // if (method === 'stripe') {
    //   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/checkout/stripe`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       customer: customerData,
    //       items: cartItems,
    //       metadata: { orderId, source: 'queenveloura_web' },
    //     }),
    //   });
    //   const { url } = await res.json();
    //   window.location.href = url; // → Stripe Checkout hosted page
    //   return;
    // }
    //
    // PAYPAL — replace simulation with:
    // if (method === 'paypal') {
    //   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/checkout/paypal`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ customer: customerData, items: cartItems }),
    //   });
    //   const { approvalUrl } = await res.json();
    //   window.location.href = approvalUrl; // → PayPal approval page
    //   return;
    // }
    //
    // ── STEP 4: Post-payment webhook (server-side) ────────────
    // On Stripe webhook stripe.checkout.session.completed:
    //   → POST /api/orders/confirm   { orderId, stripeSessionId }
    //   → POST /api/email/order-confirmation  { customer, orderId, items }
    //   → POST /api/loyalty/credit   { customerId, orderId, points: Math.floor(orderTotal) }
    //   → POST /api/klaviyo/purchase-event    { email, items, total }
    // ─────────────────────────────────────────────────────────

    // ── SIMULATION (remove when backend is connected) ─────────
    if (method === 'stripe') {
      setStripeLoading(true);
      await new Promise(r => setTimeout(r, 2400));
      setStripeLoading(false);
    } else {
      setPaypalLoading(true);
      await new Promise(r => setTimeout(r, 2400));
      setPaypalLoading(false);
    }
    setStep(3);
    finishOrder();
  };

  const finishOrder = () => {
    const num = 'VL-' + Math.floor(10000 + Math.random() * 90000);
    setOrderNum('Order #' + num);
    setConfirmed(true);
    // Notify parent after a beat
    setTimeout(() => {
      onSuccess && onSuccess(cartItems[0]?.name, cartItems[0]?.price);
    }, 500);
  };

  const handleClose = () => {
    if (confirmed) { setConfirmed(false); setStep(1); }
    onClose();
  };

  // Totals
  const wigTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0) || 420;
  const wigLabel = cartItems[0]?.name || 'Body Wave 24" HD Lace';
  const wigMeta = cartItems[0] ? `Length: ${cartItems[0].length} · Cap: ${cartItems[0].cap}` : 'Length: 24" · Cap: Medium';
  const bundlePrice = 34;
  const grandTotal = wigTotal + (bundleAdded ? bundlePrice : 0);

  const Field = ({ id, label, type = 'text', placeholder, autoComplete, required, half }) => (
    <div className="co-field">
      <label className="co-label" htmlFor={id}>{label}{required ? ' *' : ''}</label>
      <input
        className={`co-input ${errors[id] ? 'invalid' : fields[id] ? 'valid' : ''}`}
        id={id} type={type} placeholder={placeholder}
        autoComplete={autoComplete}
        value={fields[id] || ''}
        onChange={e => { set(id, e.target.value); if (errors[id]) setErrors(er => ({ ...er, [id]: '' })); }}
      />
      {errors[id] && <span className="co-error show">{errors[id]}</span>}
    </div>
  );

  return (
    <div
      ref={overlayRef}
      className={`checkout-overlay ${isOpen ? 'open' : ''}`}
      onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className="checkout-modal">

        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-title">Secure Checkout</div>
          <div className="checkout-steps">
            <div className={`checkout-step-dot ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>1</div>
            <div className="checkout-step-line" />
            <div className={`checkout-step-dot ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>2</div>
            <div className="checkout-step-line" />
            <div className={`checkout-step-dot ${step === 3 ? 'active' : ''}`}>✓</div>
          </div>
          <button className="checkout-close" onClick={handleClose}>×</button>
        </div>

        {confirmed ? (
          /* ── Confirmation panel ── */
          <div className="checkout-confirmed">
            <div className="confirmed-icon">✦</div>
            <div className="confirmed-title">Order Received</div>
            <div className="confirmed-order-num">{orderNum}</div>
            <p className="confirmed-msg">
              Thank you for choosing Queen Veloura. A confirmation has been sent to your email.
              Your wig will be carefully prepared and dispatched within 1–2 business days.
            </p>
            <div className="confirmed-share">Share your excitement</div>
            <div className="confirmed-share-btns">
              <button className="confirmed-share-btn" onClick={handleClose}>📸 Instagram</button>
              <button className="confirmed-share-btn" onClick={handleClose}>🎵 TikTok</button>
            </div>
          </div>
        ) : (
          /* ── Main 2-col body ── */
          <div className="checkout-body">

            {/* LEFT — Form + Payment */}
            <div className="checkout-left">

              {/* Returning customer banner */}
              {returning && (
                <div className="co-returning-banner show">
                  <span>✦ Welcome back, <strong>{returning}</strong>. We pre-filled your details.</span>
                  <button className="co-returning-clear" onClick={clearSaved}>Clear</button>
                </div>
              )}

              {/* Trust inject */}
              <div className="checkout-section-label">Contact Information</div>
              <div className="checkout-trust-inject">
                <div className="cti-avatar">A</div>
                <div className="cti-text">
                  <div className="cti-stars">★★★★★</div>
                  <div className="cti-quote">"The hairline is completely undetectable. Worth every penny."</div>
                  <div className="cti-author">Angela M. · Verified Purchase · 2 days ago</div>
                </div>
              </div>

              <div className="co-field-row cols-2">
                <Field id="firstName" label="First Name" placeholder="Aria" autoComplete="given-name" required />
                <Field id="lastName" label="Last Name" placeholder="Williams" autoComplete="family-name" required />
              </div>
              <div className="co-field-row cols-2">
                <Field id="email" label="Email Address" type="email" placeholder="you@example.com" autoComplete="email" required />
                <Field id="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>

              {/* Shipping */}
              <div className="checkout-section-label">Shipping Address</div>
              <div className="co-field-row">
                <Field id="address1" label="Street Address" placeholder="123 Beauty Lane" autoComplete="address-line1" required />
              </div>
              <div className="co-field-row">
                <Field id="address2" label="Apt / Suite / Unit" placeholder="Apt 4B" autoComplete="address-line2" />
              </div>
              <div className="co-field-row cols-2">
                <Field id="city" label="City" placeholder="New York" autoComplete="address-level2" required />
                <Field id="state" label="State / Province" placeholder="NY" autoComplete="address-level1" required />
              </div>
              <div className="co-field-row cols-2">
                <Field id="zip" label="ZIP / Postal Code" placeholder="10001" autoComplete="postal-code" required />
                <div className="co-field">
                  <label className="co-label" htmlFor="country">Country *</label>
                  <div className="co-select-wrap">
                    <select className="co-select co-input" id="country" value={fields.country} onChange={e => set('country', e.target.value)}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="NG">Nigeria</option>
                      <option value="GH">Ghana</option>
                      <option value="ZA">South Africa</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="AE">UAE</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Style preferences */}
              <div className="checkout-section-label">
                Style Preferences
                <span className="co-section-note">optional · helps us personalise your experience</span>
              </div>
              <div className="co-field-row cols-2">
                <div className="co-field">
                  <label className="co-label" htmlFor="prefLength">Preferred Length</label>
                  <div className="co-select-wrap">
                    <select className="co-select co-input" id="prefLength" value={fields.prefLength} onChange={e => set('prefLength', e.target.value)}>
                      <option value="">No preference</option>
                      <option value="short">Short (10–14")</option>
                      <option value="medium">Medium (16–20")</option>
                      <option value="long">Long (22–26")</option>
                      <option value="xlong">Extra Long (28"+)</option>
                    </select>
                  </div>
                </div>
                <div className="co-field">
                  <label className="co-label" htmlFor="prefTexture">Preferred Texture</label>
                  <div className="co-select-wrap">
                    <select className="co-select co-input" id="prefTexture" value={fields.prefTexture} onChange={e => set('prefTexture', e.target.value)}>
                      <option value="">No preference</option>
                      <option value="straight">Silk Straight</option>
                      <option value="body-wave">Body Wave</option>
                      <option value="deep-wave">Deep Wave</option>
                      <option value="curly">Curly / Coily</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Newsletter opt-in */}
              <div className="co-optin-row">
                <input type="checkbox" id="newsOptIn" checked={fields.newsOptIn}
                  onChange={e => set('newsOptIn', e.target.checked)} />
                <label htmlFor="newsOptIn">
                  Keep me updated on new collections, styling tips, and exclusive member offers.
                </label>
              </div>

              {/* Guarantee */}
              <div className="checkout-guarantee-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                30-day love guarantee — not happy? Free return, no questions asked.
              </div>

              {/* Payment */}
              <div className="checkout-divider">Choose Payment</div>

              <button
                className={`btn-stripe ${stripeLoading ? 'loading' : ''}`}
                onClick={() => handlePayment('stripe')}
                disabled={stripeLoading || paypalLoading}
              >
                <span className="stripe-icon"><span className="stripe-s">s</span></span>
                <span>{stripeLoading ? '⟳  Connecting to Stripe…' : 'Pay with Stripe — Secure Checkout'}</span>
              </button>

              <button
                className={`btn-paypal ${paypalLoading ? 'loading' : ''}`}
                onClick={() => handlePayment('paypal')}
                disabled={stripeLoading || paypalLoading}
              >
                <span className="paypal-logo">
                  <span className="pp-blue">Pay</span><span className="pp-sky">Pal</span>
                </span>
                {paypalLoading ? '⟳  Connecting to PayPal…' : 'Checkout'}
              </button>

              <div className="checkout-secure">256-bit SSL · All major cards accepted · PCI-DSS compliant</div>
            </div>

            {/* RIGHT — Order summary */}
            <div className="checkout-right">
              <div className="co-summary-title">Order Summary</div>
              <div className="checkout-community">Joining <strong>12,000+</strong> women who wear Veloura</div>

              <div className="checkout-order-item">
                <div className="checkout-item-img">👑</div>
                <div className="checkout-item-details">
                  <div className="checkout-item-name">{wigLabel}</div>
                  <div className="checkout-item-meta">{wigMeta}<br/>HD Lace · Glueless</div>
                </div>
                <div className="checkout-item-price">${wigTotal}</div>
              </div>

              {/* Bundle upsell */}
              <div className={`bundle-upsell ${bundleAdded ? 'checked' : ''}`} onClick={() => setBundleAdded(b => !b)}>
                <div className="bundle-checkbox">{bundleAdded ? '✓' : '+'}</div>
                <div className="bundle-text">
                  <div className="bundle-title">Add Luxury Wig Care Kit</div>
                  <div className="bundle-desc">Silk shampoo · Detangler · Satin bag · Edge brush</div>
                </div>
                <div className="bundle-savings">{bundleAdded ? `+$${bundlePrice} ✓` : `+$${bundlePrice}`}</div>
              </div>

              {/* Delivery countdown */}
              {countdown && (
                <div className="delivery-countdown">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Order within <span className="countdown-timer">{countdown}</span> for same-day dispatch
                </div>
              )}

              {/* Totals */}
              <div className="checkout-totals">
                <div className="checkout-row"><span>Wig</span><span>${wigTotal}.00</span></div>
                {bundleAdded && (
                  <div className="checkout-row">
                    <span>Care Kit</span>
                    <span style={{ color: 'var(--champagne)' }}>+${bundlePrice}.00</span>
                  </div>
                )}
                <div className="checkout-row"><span>Shipping</span><span style={{ color: 'var(--champagne)' }}>Free</span></div>
                <div className="checkout-row"><span>Tax</span><span>Calculated at next step</span></div>
                <div className="checkout-row total">
                  <span>Total</span><span>${grandTotal}.00</span>
                </div>
              </div>

              {/* Data privacy note */}
              <div className="co-data-note">
                <strong>Your data, your control.</strong> Your contact details are securely stored
                to personalise your Veloura experience. We never sell your data.
              </div>

              {/* Trust links */}
              <div className="co-trust-links">
                <a href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Quality Guarantee
                </a>
                <span className="co-trust-sep">·</span>
                <a href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                  </svg>
                  Returns Policy
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
