import { useEffect, useRef } from 'react';
import { reviews } from '../data/siteData';
import './ReviewsSection.css';

export default function ReviewsSection() {
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
    <section className="reviews-section" ref={sectionRef}>
      <div className="reviews-header reveal">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Client Love</div>
        <h2 className="section-title">Words from Our<br /><em>Community</em></h2>
      </div>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div key={r.id} className={`review-card reveal reveal-delay-${i}`}>
            <div className="review-stars">
              {Array.from({ length: r.stars }).map((_, j) => (
                <span key={j} className="star">★</span>
              ))}
            </div>
            <p className="review-text">{r.text}</p>
            <div className="review-author">
              <div className="review-avatar">
                {r.author.charAt(0)}
              </div>
              <div>
                <div className="review-name">{r.author}</div>
                <div className="review-meta">
                  {r.location}
                  {r.verified && <span className="review-verified"> · ✓ Verified Purchase</span>}
                </div>
                <div className="review-product">{r.product}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="reviews-summary reveal">
        <div className="reviews-rating">
          <span className="reviews-big-num">4.9</span>
          <div>
            <div className="reviews-stars-row">★★★★★</div>
            <div className="reviews-count">Based on 742 verified reviews</div>
          </div>
        </div>
        <div className="reviews-bars">
          {[
            { label: '5 Stars', pct: 91 },
            { label: '4 Stars', pct: 7 },
            { label: '3 Stars', pct: 1 },
            { label: '2 Stars', pct: 0.5 },
            { label: '1 Star', pct: 0.5 },
          ].map(b => (
            <div key={b.label} className="reviews-bar-row">
              <span className="reviews-bar-label">{b.label}</span>
              <div className="reviews-bar-track">
                <div className="reviews-bar-fill" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="reviews-bar-pct">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
