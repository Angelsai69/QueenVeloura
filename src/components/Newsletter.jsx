import { useState } from 'react';
import './Newsletter.css';

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async () => {
    if (!emailRx.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    // ── BACKEND HOOKUP POINT ─────────────────────────────────
    // await fetch('/api/email/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email.trim(), source: 'newsletter' }),
    // });
    //
    // With Klaviyo:
    // await fetch('https://a.klaviyo.com/api/profiles/', {
    //   method: 'POST',
    //   headers: { Authorization: 'Klaviyo-API-Key YOUR_KEY', 'Content-Type': 'application/json',
    //              revision: '2024-02-15' },
    //   body: JSON.stringify({ data: { type: 'profile', attributes: { email: email.trim() } } }),
    // });
    // ─────────────────────────────────────────────────────────

    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow newsletter-eyebrow reveal" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          Email Newsletter
        </div>
        <h2 className="newsletter-title reveal">Stay in<br /><em>the Know</em></h2>
        <p className="newsletter-sub reveal">
          Be first to know about new collections, exclusive offers, and wig styling secrets.
        </p>
        <div className="newsletter-perks reveal">
          <div className="perk">Exclusive Launches</div>
          <div className="perk">Styling Tips</div>
          <div className="perk">VIP Discounts</div>
          <div className="perk">Early Access</div>
        </div>

        {submitted ? (
          <div className="newsletter-success reveal">
            <div className="newsletter-success-icon">✦</div>
            <div className="newsletter-success-title">You're in the Circle</div>
            <p className="newsletter-success-msg">Welcome to the Beauty Circle. Check your inbox for a welcome gift.</p>
          </div>
        ) : (
          <div className="newsletter-form reveal">
            <input
              className={`newsletter-input ${error ? 'invalid' : ''}`}
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete="email"
            />
            <button
              className="newsletter-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? '⟳' : 'Join →'}
            </button>
          </div>
        )}
        {error && <p className="newsletter-error">{error}</p>}
      </div>
    </section>
  );
}
