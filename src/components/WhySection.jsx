import { useEffect, useRef } from 'react';
import { whyFeatures } from '../data/siteData';
import './WhySection.css';

export default function WhySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-visual">
        <div className="why-visual-art">
          <div className="why-stat reveal">
            <div className="why-stat-num">2+</div>
            <div className="why-stat-label">Year Lifespan</div>
          </div>
          <div className="why-stat reveal reveal-delay-1">
            <div className="why-stat-num">98%</div>
            <div className="why-stat-label">Customer Satisfaction</div>
          </div>
          <div className="why-stat reveal reveal-delay-2">
            <div className="why-stat-num">12K+</div>
            <div className="why-stat-label">Happy Clients</div>
          </div>
          <div className="why-stat reveal reveal-delay-3">
            <div className="why-stat-num">100%</div>
            <div className="why-stat-label">Virgin Hair</div>
          </div>
          <div className="why-circle why-circle-1" />
          <div className="why-circle why-circle-2" />
          <div className="why-center-icon">✦</div>
        </div>
      </div>

      <div className="why-content">
        <div className="section-eyebrow newsletter-eyebrow">The Veloura Difference</div>
        <h2 className="section-title" style={{ color: 'var(--pearl)' }}>
          Crafted with<br /><em>Intention</em>
        </h2>
        <div className="why-features">
          {whyFeatures.map((f, i) => (
            <div key={f.num} className={`why-feature reveal reveal-delay-${i}`}>
              <div className="why-feature-num">{f.num}</div>
              <div className="why-feature-body">
                <div className="why-feature-title">{f.title}</div>
                <div className="why-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
