import { useState, useEffect } from 'react';
import './ExitPopup.css';

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const CODE = 'queen_veloura_exit_shown';
    if (sessionStorage.getItem(CODE)) return;
    const onMouseOut = (e) => {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem(CODE, '1');
        document.removeEventListener('mouseout', onMouseOut);
      }
    };
    const timer = setTimeout(() => document.addEventListener('mouseout', onMouseOut), 4000);
    return () => { clearTimeout(timer); document.removeEventListener('mouseout', onMouseOut); };
  }, []);

  const copy = () => {
    navigator.clipboard.writeText('VELOURA15').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = () => {
    if (email.includes('@')) { setSubmitted(true); }
  };

  if (!visible) return null;

  return (
    <div className="exit-overlay" onClick={e => e.target === e.currentTarget && setVisible(false)}>
      <div className="exit-card">
        <button className="exit-close" onClick={() => setVisible(false)}>×</button>
        <div className="exit-eyebrow">Wait — Don't Leave Yet</div>
        <h2 className="exit-title">Get 15% Off<br /><em>Your First Order</em></h2>
        <p className="exit-desc">
          Join thousands of women who trust Veloura for their luxury hair needs.
          Use this exclusive code at checkout:
        </p>
        <div className="exit-code-row">
          <div className="exit-code-box">
            <div className="exit-code-label">Your code</div>
            <div className="exit-code-value">VELOURA15</div>
          </div>
          <button className="exit-copy-btn" onClick={copy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        {submitted ? (
          <div className="exit-success">
            ✦ Code sent to your inbox — happy shopping!
          </div>
        ) : (
          <div className="exit-input-row">
            <input
              className="exit-email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
            />
            <button className="exit-submit-btn" onClick={submit}>Claim</button>
          </div>
        )}
        <button className="exit-dismiss" onClick={() => setVisible(false)}>
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
}
