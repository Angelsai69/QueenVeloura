import { useState } from 'react';
import './BISModal.css';

const BIS_KEY = 'veloura_bis_v1';

export default function BISModal({ isOpen, onClose, productName, productPrice }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [capSize, setCapSize] = useState('M');
  const [alertType, setAlertType] = useState('email');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = f => e => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = async () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (alertType === 'sms' && !form.phone.trim()) errs.phone = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const payload = {
      productSku:    productName?.replace(/\s+/g, '-').toLowerCase() || 'unknown',
      productName:   productName || 'Queen Veloura Wig',
      productPrice:  productPrice || '',
      firstName:     form.firstName.trim(),
      lastName:      form.lastName.trim(),
      email:         form.email.trim().toLowerCase(),
      phone:         form.phone.trim(),
      capSize,
      alertChannel:  alertType,
      source:        'bis_modal',
      timestamp:     new Date().toISOString(),
    };

    // Save to localStorage to prevent duplicate signups
    try {
      const stored = JSON.parse(localStorage.getItem(BIS_KEY) || '{}');
      stored[payload.productSku] = { email: payload.email, subscribedAt: Date.now() };
      localStorage.setItem(BIS_KEY, JSON.stringify(stored));
    } catch(e) {}

    // ── BACKEND HOOKUP POINT ──────────────────────────────
    // Uncomment and replace with your API endpoint:
    //
    // try {
    //   await fetch('/api/bis/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    // } catch(e) { console.error('BIS subscribe error:', e); }
    //
    // Your backend should:
    //   1. Upsert customer by email in your DB
    //   2. Insert bis_subscribers row (product + customer + prefs)
    //   3. Send confirmation email via Klaviyo / SendGrid
    //   4. When product restocked → POST /api/bis/notify?sku=VH-XX-00
    //      which emails all subscribers with a 24h priority access link
    // ─────────────────────────────────────────────────────

    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setLoading(false);
      setErrors({});
      setForm({ firstName: '', lastName: '', email: '', phone: '' });
    }, 400);
  };

  if (!isOpen) return null;

  const waitlistCount = 47;
  const fillPct = Math.min(94, 60 + Math.random() * 20);

  return (
    <div className="bis-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="bis-modal">
        <button className="bis-close" onClick={handleClose}>×</button>

        <div className="bis-product-pill">
          <span className="bis-pill-dot" />
          <span className="bis-pill-name">{productName || 'Water Wave 22" HD Lace'}</span>
          <span className="bis-pill-price">{productPrice || '$510'}</span>
        </div>

        {submitted ? (
          <div className="bis-success">
            <div className="bis-success-icon">✦</div>
            <div className="bis-success-title">You're #{waitlistCount + 1} on the List</div>
            <p className="bis-success-desc">
              We'll alert you the moment this restocks —{' '}
              <strong>24 hours before</strong> it opens publicly. Check your inbox for confirmation.
            </p>
            <button className="btn-primary" style={{ marginTop: 24, width: '100%' }} onClick={handleClose}>
              <span>Done</span>
            </button>
          </div>
        ) : (
          <>
            <div className="bis-icon">🪷</div>
            <div className="bis-title">Be First<br />When It's Back</div>
            <p className="bis-desc">
              This style sells out within hours. Drop your details and we'll alert you the moment it restocks —{' '}
              <strong>24 hours priority access</strong> before it opens to the public.
            </p>

            <div className="bis-waitlist-bar">
              <div className="bis-waitlist-fill" style={{ width: `${fillPct}%` }} />
            </div>
            <div className="bis-waitlist-label">
              <span>{waitlistCount} people already waiting</span> · spots limited
            </div>

            <div className="bis-form">
              <div className="bis-name-row">
                <input className="bis-input" type="text" placeholder="First name *" value={form.firstName} onChange={update('firstName')} />
                <input className="bis-input" type="text" placeholder="Last name" value={form.lastName} onChange={update('lastName')} />
              </div>
              <input className="bis-input" type="email" placeholder="Email address *" value={form.email} onChange={update('email')} />
              <input className="bis-input" type="tel" placeholder="Phone (optional — for SMS alert)" value={form.phone} onChange={update('phone')} />

              <div className="bis-variant-row">
                <span className="bis-variant-label">Preferred cap size</span>
                <div className="bis-cap-opts">
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button
                      key={s}
                      className={`bis-cap-btn ${capSize === s ? 'selected' : ''}`}
                      onClick={() => setCapSize(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>

              <div className="bis-alert-row">
                <div
                  className={`bis-alert-opt ${alertType === 'email' ? 'selected' : ''}`}
                  onClick={() => setAlertType('email')}
                >
                  <span className="bis-alert-icon">✉</span>
                  <span className="bis-alert-label">Email alert</span>
                  <span className="bis-alert-tag">Free</span>
                </div>
                <div
                  className={`bis-alert-opt ${alertType === 'sms' ? 'selected' : ''}`}
                  onClick={() => setAlertType('sms')}
                >
                  <span className="bis-alert-icon">📱</span>
                  <span className="bis-alert-label">SMS + Email</span>
                  <span className="bis-alert-tag">Fastest</span>
                </div>
              </div>

              <button className="bis-submit" onClick={handleSubmit} disabled={loading}>
                <span>{loading ? '⟳  Saving your spot…' : 'Reserve My Spot →'}</span>
              </button>
              <p className="bis-note">Priority access · No spam · Unsubscribe any time</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
