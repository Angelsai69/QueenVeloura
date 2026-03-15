import { useState, useEffect } from 'react';
import './PageLoader.css';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1800);
    const t2 = setTimeout(() => setRemoved(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (removed) return null;

  return (
    <div id="page-loader" className={hidden ? 'hidden' : ''}>
      {/* Skeleton nav */}
      <div className="sk-nav">
        <div className="sk-logo" />
        <div className="sk-nav-links">
          <div className="sk-nav-link" style={{ width: '80px' }} />
          <div className="sk-nav-link" style={{ width: '52px' }} />
          <div className="sk-nav-link" style={{ width: '68px' }} />
          <div className="sk-nav-link" style={{ width: '76px' }} />
        </div>
      </div>
      {/* Skeleton hero */}
      <div className="sk-hero">
        <div className="sk-hero-visual" />
        <div className="sk-hero-content">
          <div className="sk-line" style={{ width: '60%', height: '12px' }} />
          <div className="sk-line" style={{ width: '85%', height: '52px', marginTop: '4px' }} />
          <div className="sk-line" style={{ width: '78%', height: '52px' }} />
          <div className="sk-line" style={{ width: '65%', height: '52px' }} />
          <div className="sk-line" style={{ width: '90%', height: '16px', marginTop: '8px' }} />
          <div className="sk-line" style={{ width: '80%', height: '16px' }} />
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div className="sk-line" style={{ width: '160px', height: '44px', borderRadius: 0 }} />
            <div className="sk-line" style={{ width: '140px', height: '44px', borderRadius: 0 }} />
          </div>
        </div>
      </div>
      {/* Brand reveal overlay */}
      <div className="sk-brand-reveal">
        <div className="sk-brand-word">Velo<em>ura</em></div>
        <div className="sk-brand-line" />
        <div className="sk-brand-sub">Luxury Human Hair</div>
      </div>
    </div>
  );
}
