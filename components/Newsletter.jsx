import { useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-eyebrow section-eyebrow">Stay in the Loop</div>
        <h2 className="newsletter-title">
          Join the <em>Inner Circle</em>
        </h2>
        <p className="newsletter-desc">
          Be first to know about new drops, exclusive member offers, and hair care tips from our
          in-house stylists. Plus, get <strong>10% off</strong> your first order.
        </p>
        {submitted ? (
          <div className="newsletter-success">
            <span className="newsletter-success-icon">✦</span>
            <div>
              <div className="newsletter-success-title">Welcome to the Circle</div>
              <div className="newsletter-success-sub">Check your inbox for your 10% discount code.</div>
            </div>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              <span>Subscribe</span>
            </button>
          </form>
        )}
        <p className="newsletter-terms">
          No spam, ever. Unsubscribe anytime. By subscribing you agree to our{' '}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <div className="newsletter-decorative">
        <div className="newsletter-circle nc-1" />
        <div className="newsletter-circle nc-2" />
        <div className="newsletter-circle nc-3" />
        <div className="newsletter-symbol">✦</div>
      </div>
    </section>
  );
}
