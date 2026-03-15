import './NotFound.css';

export default function NotFound({ isVisible, onClose, onOpenQuiz }) {
  if (!isVisible) return null;

  return (
    <div className="page-404">
      {/* Large faded 404 background number */}
      <div className="e404-bg-num">404</div>

      {/* Minimal nav */}
      <div className="e404-nav">
        <a href="#" className="e404-logo" onClick={onClose}>
          Queen <span>Veloura</span>
        </a>
      </div>

      {/* Decorative floating wig silhouettes */}
      <div className="e404-deco e404-deco-1">
        <svg width="180" height="280" viewBox="0 0 180 280" fill="var(--cocoa)">
          <ellipse cx="90" cy="60" rx="52" ry="58"/>
          <ellipse cx="90" cy="50" rx="66" ry="32"/>
          <rect x="58" y="100" width="64" height="160" rx="8"/>
          <ellipse cx="42" cy="110" rx="18" ry="80" transform="rotate(-10 42 110)"/>
          <ellipse cx="138" cy="110" rx="18" ry="80" transform="rotate(10 138 110)"/>
        </svg>
      </div>
      <div className="e404-deco e404-deco-2">
        <svg width="120" height="190" viewBox="0 0 120 190" fill="var(--cocoa)">
          <ellipse cx="60" cy="40" rx="35" ry="38"/>
          <ellipse cx="60" cy="33" rx="44" ry="22"/>
          <rect x="38" y="66" width="44" height="110" rx="6"/>
        </svg>
      </div>

      {/* Content */}
      <div className="e404-content">
        <div className="e404-eyebrow">Page Not Found</div>
        <h1 className="e404-title">Lost in the<br /><em>Beauty Aisle?</em></h1>
        <p className="e404-desc">
          This page seems to have had a bad hair day and gone missing. Let's get you back to something gorgeous.
        </p>
        <div className="e404-ctas">
          <button className="btn-primary" onClick={onClose}>
            <span>← Back to Home</span>
          </button>
          <button className="btn-outline" onClick={() => { onClose(); setTimeout(onOpenQuiz, 300); }}>
            Take the Style Quiz
          </button>
        </div>
        <div className="e404-suggestions">
          <div className="e404-suggestions-label">You might be looking for</div>
          <div className="e404-links">
            <a href="#" className="e404-link" onClick={onClose}>Shop All Wigs</a>
            <a href="#" className="e404-link" onClick={onClose}>Best Sellers</a>
            <a href="#" className="e404-link" onClick={onClose}>New Arrivals</a>
            <a href="#" className="e404-link" onClick={onClose}>Glueless Wigs</a>
            <a href="#" className="e404-link" onClick={onClose}>HD Lace</a>
            <a href="#" className="e404-link" onClick={onClose}>Wig Care</a>
            <a href="#" className="e404-link" onClick={onClose}>Our Story</a>
            <a href="#" className="e404-link" onClick={onClose}>Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
