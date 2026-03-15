import { useState, useEffect, useRef } from 'react';
import './Hero.css';

import hero1 from '../assets/hero-1.jpg'; // Crown / straight flowing — pan left→right
import hero2 from '../assets/hero-2.png'; // Water Wave beach — pan right→left
import hero3 from '../assets/hero-3.png'; // Straight smiling — pan bottom→top (zoom in)
import hero4 from '../assets/hero-4.png'; // Deep Wave curly — pan top→bottom

const slides = [
  {
    id: 1,
    img: hero1,
    pan: 'pan-face-to-hair',
    eyebrow: 'New Arrivals — Spring Collection',
    headline: ['The Art of', 'Natural Hair'],
    sub: 'Handcrafted from 100% virgin human hair. Invisible HD lace. Glueless installation in under 10 minutes.',
    cta: 'Shop the Collection',
    ctaSecondary: 'Learn More',
  },
  {
    id: 2,
    img: hero2,
    pan: 'pan-right-left',
    eyebrow: 'Water Wave · HD Lace',
    headline: ['Effortless.', 'Undeniable.'],
    sub: 'Beachy water wave texture that holds its shape beautifully. Pre-plucked hairline for a seamless, natural finish.',
    cta: 'Shop Water Wave',
    ctaSecondary: 'See Details',
  },
  {
    id: 3,
    img: hero3,
    pan: 'pan-zoom-in',
    eyebrow: 'Silky Straight · Signature',
    headline: ['Sleek.', 'Flawless.'],
    sub: 'Our iconic silky straight wig — smooth, glossy, and natural-looking from root to tip. Lasts 2+ years with care.',
    cta: 'Shop Straight',
    ctaSecondary: 'Our Guarantee',
  },
  {
    id: 4,
    img: hero4,
    pan: 'pan-zoom-out',
    eyebrow: 'Deep Wave · HD Lace',
    headline: ['Defined.', 'Luxurious.'],
    sub: 'Deep, voluminous waves crafted from 100% raw Vietnamese hair. Pre-bleached knots. 180% density.',
    cta: 'Shop Deep Wave',
    ctaSecondary: 'Explore Textures',
  },
];

const SLIDE_DURATION = 6000; // ms each slide shows
const TRANSITION_MS  = 900;  // fade transition duration

export default function Hero({ onShopClick }) {
  const [current, setCurrent]   = useState(0);
  const [prev, setPrev]         = useState(null);
  const [fading, setFading]     = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (idx === current || fading) return;
    setPrev(current);
    setFading(true);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setFading(false); }, TRANSITION_MS);
  };

  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [current, fading]);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <div className="hero">

      {/* ── Photo visual side ── */}
      <div className="hero-visual">

        {/* Outgoing slide (fades out) */}
        {prevSlide && (
          <div className={`hero-photo-layer hero-photo-out`}>
            <img
              src={prevSlide.img}
              alt=""
              className={`hero-photo-img ${prevSlide.pan}`}
            />
          </div>
        )}

        {/* Incoming slide (fades in + pan animation restarts) */}
        <div className="hero-photo-layer hero-photo-in">
          <img
            key={current}
            src={slide.img}
            alt={slide.headline.join(' ')}
            className={`hero-photo-img ${slide.pan}`}
          />
        </div>

        {/* Dark gradient overlay for readability */}
        <div className="hero-photo-overlay" />

        {/* Slide dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'active' : ''}`}
              onClick={() => { clearInterval(timerRef.current); goTo(i); }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Rotating badge */}
        <div className="hero-badge">
          <span>Virgin</span>
          <span>Hair</span>
          <span>✦</span>
          <span>HD</span>
          <span>Lace</span>
        </div>
      </div>

      {/* ── Content side ── */}
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-eyebrow" key={`ey-${current}`}>{slide.eyebrow}</div>
          <h1 className="hero-h1" key={`h-${current}`}>
            {slide.headline[0]}<br />
            <em>{slide.headline[1]}</em>
          </h1>
          <p className="hero-sub" key={`s-${current}`}>{slide.sub}</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={onShopClick}>
              <span>{slide.cta}</span>
            </button>
            <a href="#" className="btn-outline">{slide.ctaSecondary}</a>
          </div>
          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>100% Virgin Hair</span>
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>HD Lace</span>
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>2-Year Guarantee</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}
