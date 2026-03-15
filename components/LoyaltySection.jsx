import { useEffect, useRef } from 'react';
import { loyaltyTiers } from '../data/siteData';
import './LoyaltySection.css';

export default function LoyaltySection({ onAuthOpen }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="loyalty-section" ref={sectionRef}>
      <div className="loyalty-inner">
        <div className="loyalty-left reveal">
          <div className="section-eyebrow">Members Only</div>
          <h2 className="loyalty-title">The Veloura<br /><em>Circle</em></h2>
          <p className="loyalty-desc">
            Our loyalty programme rewards the women who love Veloura most. Earn points on every purchase,
            unlock exclusive tiers, and access benefits that money alone can't buy.
          </p>
          <div className="loyalty-cta">
            <button className="btn-primary" onClick={() => onAuthOpen('join')}>
              <span>Join Free Today</span>
            </button>
            <a href="#" className="btn-outline" style={{ color: 'var(--pearl)', borderColor: 'rgba(201,169,110,0.3)' }}>
              Learn More
            </a>
          </div>
        </div>
        <div className="loyalty-tiers">
          {loyaltyTiers.map((tier, i) => (
            <div key={tier.name} className={`loyalty-tier reveal reveal-delay-${i} ${tier.featured ? 'featured' : ''}`}>
              <div className="tier-icon">{tier.icon}</div>
              <div>
                <div className="tier-name">{tier.name}</div>
                <div className="tier-threshold">{tier.threshold}</div>
                <div className="tier-perks">
                  {tier.perks.map(p => (
                    <span key={p} className="tier-perk">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
