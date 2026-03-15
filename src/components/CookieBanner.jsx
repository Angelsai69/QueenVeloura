import { useState, useEffect } from 'react';
import './CookieBanner.css';

const CONSENT_KEY = 'queen_veloura_consent_v1';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: true, personalisation: true });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setTimeout(() => setVisible(true), 1800);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ essential: true, ...prefs, ts: Date.now() }));
    setVisible(false);
  };
  const savePrefs = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ essential: true, ...prefs, ts: Date.now() }));
    setVisible(false);
    setPrefsOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className={`cookie-banner ${visible ? 'cb-visible' : ''}`}>
        <div className="cb-inner">
          <div className="cb-text">
            <div className="cb-title">We value your privacy</div>
            <p className="cb-desc">
              We use cookies to enhance your browsing experience, serve personalised ads, and analyse our traffic.
              By clicking "Accept All" you consent to our use of cookies.{' '}
              <a href="#">Learn more</a>
            </p>
          </div>
          <div className="cb-actions">
            <button className="cb-manage" onClick={() => setPrefsOpen(true)}>Manage Preferences</button>
            <button className="cb-accept" onClick={acceptAll}>Accept All</button>
          </div>
        </div>
      </div>

      {prefsOpen && (
        <div className="cookie-prefs-overlay" onClick={(e) => e.target === e.currentTarget && setPrefsOpen(false)}>
          <div className="cookie-prefs-card">
            <button className="cookie-prefs-close" onClick={() => setPrefsOpen(false)}>✕</button>
            <div className="cookie-prefs-title">Cookie Preferences</div>
            <p className="cookie-prefs-desc">Choose which cookies you allow. Essential cookies are always active.</p>

            {[
              { key: 'analytics', label: 'Analytics Cookies', desc: 'Help us understand how visitors interact with our site.' },
              { key: 'marketing', label: 'Marketing Cookies', desc: 'Used to track visitors across websites for personalised ads.' },
              { key: 'personalisation', label: 'Personalisation Cookies', desc: 'Allow us to remember your preferences and customise your experience.' },
            ].map(c => (
              <div key={c.key} className="cookie-pref-row">
                <div>
                  <div className="cookie-pref-label">{c.label}</div>
                  <div className="cookie-pref-desc">{c.desc}</div>
                </div>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={prefs[c.key]}
                    onChange={() => setPrefs(p => ({ ...p, [c.key]: !p[c.key] }))}
                  />
                  <span className="toggle-track" />
                </label>
              </div>
            ))}

            <div className="cookie-pref-essential">
              <div>
                <div className="cookie-pref-label">Essential Cookies</div>
                <div className="cookie-pref-desc">Always active — required for basic site functionality.</div>
              </div>
              <div className="cookie-always-on">Always On</div>
            </div>

            <button className="cb-accept" style={{ width: '100%', marginTop: 24 }} onClick={savePrefs}>
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
}
