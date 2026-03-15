import { useEffect, useRef } from 'react';
import './Collections.css';

import colStraight  from '../assets/col-straight.png';
import colBodyWave  from '../assets/col-bodywave.png';
import colDeepWave  from '../assets/col-deepwave.png';
import colWaterWave from '../assets/col-waterwave.png';

// Grid layout: card 1 = big featured (2 rows tall), cards 2-5 = small tiles
const COLLECTION_CARDS = [
  {
    id: 1,
    img: colStraight,
    tag: 'Signature Collection',
    name: 'Silky Straight',
    featured: true,
  },
  {
    id: 2,
    img: colBodyWave,
    tag: 'Classic Edit',
    name: 'Body Wave',
    featured: false,
  },
  {
    id: 3,
    img: colDeepWave,
    tag: 'Textured Series',
    name: 'Deep Wave',
    featured: false,
  },
  {
    id: 4,
    img: colWaterWave,
    tag: 'Water Wave Series',
    name: 'Water Wave',
    featured: false,
  },
];

export default function Collections({ onQuizOpen }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="collections-section" ref={sectionRef}>
      <div className="collections-header reveal">
        <div className="section-eyebrow">Curated Collections</div>
        <h2 className="section-title">Wigs Designed for<br /><em>Every Woman</em></h2>
      </div>

      <div className="collections-grid reveal">
        {COLLECTION_CARDS.map((col) => (
          <div
            key={col.id}
            className={`col-card ${col.featured ? 'col-featured' : ''}`}
          >
            {/* Real photo background */}
            <div className="col-visual">
              <img
                src={col.img}
                alt={col.name}
                className="col-photo"
              />
            </div>
            <div className="col-overlay" />
            <div className="col-info">
              <span className="col-tag">{col.tag}</span>
              <div className="col-name">{col.name}</div>
              <a href="#" className="col-link">Explore</a>
            </div>
          </div>
        ))}

        {/* Style Quiz card — slot 5 */}
        <div className="col-card col-card-quiz" onClick={onQuizOpen}>
          <div className="col-visual">
            <div className="col-visual-bg col-bg-quiz">
              <div className="col-quiz-wand">✦</div>
              <div className="col-quiz-ring" />
            </div>
          </div>
          <div className="col-overlay col-overlay-quiz" />
          <div className="col-info col-info-quiz">
            <span className="col-tag">Personalised for You</span>
            <div className="col-name">Find Your<br /><em>Perfect Wig</em></div>
            <a href="#" className="col-link" onClick={e => { e.preventDefault(); e.stopPropagation(); onQuizOpen?.(); }}>
              Take the Style Quiz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
