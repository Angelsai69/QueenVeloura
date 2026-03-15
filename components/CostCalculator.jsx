import { useState, useEffect, useRef } from 'react';
import './CostCalculator.css';

export default function CostCalculator() {
  const [price, setPrice] = useState(420);
  const [wears, setWears] = useState(3);
  const [months, setMonths] = useState(24);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const totalWears = wears * 4.33 * months;
  const perWear = (price / totalWears).toFixed(2);
  const syntheticReplaces = Math.round(months / 4);

  return (
    <div className="cpw-section reveal" ref={sectionRef}>
      <div className="cpw-inner">
        <div className="cpw-left">
          <div className="section-eyebrow">The Real Value</div>
          <h2 className="cpw-title">
            $420 Sounds Expensive.<br /><em>Until You Do the Math.</em>
          </h2>
          <p className="cpw-desc">
            Luxury isn't what something costs — it's what it costs per use. Our wigs last up to 2 years
            with proper care. Adjust the sliders to see your real cost per wear.
          </p>
        </div>
        <div className="cpw-card">
          <div className="cpw-card-title">Your Cost Per Wear Calculator</div>

          <div className="cpw-slider-group">
            <div className="cpw-slider-label">
              <span className="cpw-slider-name">Wig Price</span>
              <span className="cpw-slider-val">${price}</span>
            </div>
            <input type="range" className="cpw-slider" min={390} max={510} value={price} step={10}
              onChange={e => setPrice(+e.target.value)} />
          </div>

          <div className="cpw-slider-group">
            <div className="cpw-slider-label">
              <span className="cpw-slider-name">Wears Per Week</span>
              <span className="cpw-slider-val">{wears}×</span>
            </div>
            <input type="range" className="cpw-slider" min={1} max={7} value={wears}
              onChange={e => setWears(+e.target.value)} />
          </div>

          <div className="cpw-slider-group">
            <div className="cpw-slider-label">
              <span className="cpw-slider-name">Lifespan (Months)</span>
              <span className="cpw-slider-val">{months} mo</span>
            </div>
            <input type="range" className="cpw-slider" min={6} max={24} value={months}
              onChange={e => setMonths(+e.target.value)} />
          </div>

          <div className="cpw-result">
            <div className="cpw-result-row">
              <span className="cpw-result-label">Total wears</span>
              <span className="cpw-result-num">{Math.round(totalWears)}</span>
            </div>
            <div className="cpw-result-highlight">
              <span className="cpw-result-label">Cost Per Wear</span>
              <span className="cpw-result-num">${perWear}</span>
            </div>
            <p className="cpw-comparison">
              Compare: a salon blowout costs <span>$65–$120</span> per visit. A cheap synthetic wig lasts{' '}
              <span>3–6 months</span> before looking worn. One Veloura wig replaces{' '}
              <span>{syntheticReplaces}+ synthetic purchases.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
