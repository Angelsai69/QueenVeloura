import { useState, useRef, useEffect } from 'react';
import './JournalSection.css';

import j1 from '../assets/journal-1.png'; // Water Wave beach — Style Guide card
import j2 from '../assets/journal-2.png'; // Body Wave close-up — Technology card
import j3 from '../assets/journal-3.png'; // Deep Wave black — Care card
import j4 from '../assets/journal-4.jpg'; // Straight birthday — Installation card
import j5 from '../assets/journal-5.png'; // Water Wave curly — Hair Investment card
import j6 from '../assets/journal-6.png'; // Deep Wave brown — Beginner Guide card

const ARTICLES = [
  {
    id: 'blog3',
    img: j1,
    cat: 'Style Guide',
    title: 'How to Choose the Right Wig for Your Face Shape',
    article: {
      cat: 'Style Guide',
      title: 'How to Choose the Right Wig for Your Face Shape 👑',
      img: j1,
      body: <>
        Ever tried on a wig that looked amazing on someone else… but not quite right on you?<br/><br/>
        Here's the secret many beauty professionals know: <strong>the right wig should match your face shape.</strong>
        <div className="ic-divider"/>
        <strong>Round Face</strong><br/>
        Best styles: Long layered wigs · Body wave · Side parts — these create the illusion of length and balance.
        <div className="ic-divider"/>
        <strong>Oval Face</strong><br/>
        The most versatile — almost any style works. Straight wigs, curly styles, bobs, long glamorous waves.
        <div className="ic-divider"/>
        <strong>Square Face</strong><br/>
        Soften strong angles with: Soft curls · Loose waves · Layered wigs that add movement.
        <div className="ic-divider"/>
        <strong>Heart-Shaped Face</strong><br/>
        Balance a wider forehead with: Chin-length bobs · Soft layered wigs · Side-swept bangs.
        <div className="ic-divider"/>
        <em>💬 Which wig style is your favourite right now?</em>
      </>,
    },
  },
  {
    id: 'blog4',
    img: j2,
    cat: 'Technology',
    title: "Lace vs HD Lace: What's the Real Difference?",
    article: {
      cat: 'Technology',
      title: "Lace vs HD Lace: What's the Real Difference? 🤔",
      img: j2,
      body: <>
        If you've been shopping for wigs online, you've probably seen two terms: <em>Lace wigs</em> and <em>HD lace wigs.</em> But what do they actually mean?
        <div className="ic-divider"/>
        <strong>Standard Lace Wigs</strong><br/>
        ✨ Durable · ✨ Great for everyday wear · ✨ More affordable<br/>
        May need a little tinting or makeup to perfectly match your skin tone.
        <div className="ic-divider"/>
        <strong>HD Lace Wigs</strong><br/>
        ✨ Extremely natural appearance · ✨ Blends with many skin tones · ✨ Less customisation needed<br/>
        Thinner, softer lace — the hairline can appear almost invisible when installed properly.
        <div className="ic-divider"/>
        <strong>Choose standard lace if you want:</strong> Durability · Affordability · Everyday wear<br/><br/>
        <strong>Choose HD lace if you want:</strong> Ultra-natural hairline · Luxury look · Minimal customisation
        <div className="ic-divider"/>
        <em>💬 Team HD lace or team traditional lace?</em>
      </>,
    },
  },
  {
    id: 'care',
    img: j3,
    cat: 'Care & Maintenance',
    title: 'The Complete Wig Care Guide: Making It Last 2+ Years',
    article: {
      cat: 'Care & Maintenance',
      title: 'The Complete Wig Care Guide',
      img: j3,
      body: <>
        With the right care, a Veloura wig can last 2–3 years. Here's everything you need to know.
        <div className="ic-divider"/>
        <strong>Washing</strong><br/>
        Use a sulphate-free, moisturising shampoo. Wash in cool water, gently working from root to tip. Avoid rubbing or wringing.
        <div className="ic-divider"/>
        <strong>Conditioning</strong><br/>
        Apply conditioner from mid-length to ends only — avoid the roots and knots. Leave for 3–5 minutes, then rinse thoroughly.
        <div className="ic-divider"/>
        <strong>Drying</strong><br/>
        Air dry on a wig stand whenever possible. If using a blow dryer, use low heat and a diffuser attachment.
        <div className="ic-divider"/>
        <strong>Storing</strong><br/>
        Store on a wig stand or in a satin bag when not worn. Keep away from direct sunlight and humidity.
        <div className="ic-divider"/>
        <strong>Heat Styling</strong><br/>
        Always use a heat protectant. Keep temperatures below 380°F / 195°C to prevent damage.
        <div className="ic-divider"/>
        <em>✦ Consistent care = a wig that stays beautiful for years.</em>
      </>,
    },
  },
  {
    id: 'install',
    img: j4,
    cat: 'Installation',
    title: "Beginner's Guide: Glueless Installation in Under 10 Minutes",
    article: {
      cat: 'Installation',
      title: "Beginner's Guide: Glueless Installation in Under 10 Minutes",
      img: j4,
      body: <>
        Glueless wigs are designed for easy, damage-free installation. Follow these steps for a flawless result.
        <div className="ic-divider"/>
        <strong>Step 1: Prepare Your Natural Hair</strong><br/>
        Braid or flatten your natural hair. For longer hair, use a wig cap to create a smooth base.
        <div className="ic-divider"/>
        <strong>Step 2: Put On the Wig</strong><br/>
        Place the wig on your head starting from the front. Align the hairline with your natural hairline. Secure the adjustable straps at the back for a snug fit.
        <div className="ic-divider"/>
        <strong>Step 3: Secure with Combs</strong><br/>
        Most glueless wigs have built-in combs. Click them into your natural hair or wig cap for extra security.
        <div className="ic-divider"/>
        <strong>Step 4: Melt the Lace</strong><br/>
        Use a fine-tooth comb to lay the lace flat. Apply a small amount of edge control along the hairline for a seamless finish.
        <div className="ic-divider"/>
        <strong>Step 5: Style</strong><br/>
        Part, curl, or straighten as desired. Use a light-hold spray to set your style.
        <div className="ic-divider"/>
        <em>👑 That's it — your Veloura wig is ready in under 10 minutes.</em>
      </>,
    },
  },
  {
    id: 'blog1',
    img: j5,
    cat: 'Hair Investment',
    title: "The $80 Hair vs $400 Hair Test – Is Expensive Hair Really Worth It?",
    article: {
      cat: 'Hair Investment',
      title: 'The $80 Hair vs $400 Hair Test',
      img: j5,
      body: <>
        A lot of people ask: <em>"Why would anyone spend hundreds of dollars on hair?"</em> Let's talk about it.
        <div className="ic-divider"/>
        <strong>The Cheap Hair Problem</strong><br/>
        Cheap hair might look great at first. But after a few weeks: tangling, lost shine, won't hold curls, heavy shedding. Eventually you replace it — again and again.
        <div className="ic-divider"/>
        <strong>Virgin Human Hair is Different</strong><br/>
        Because it hasn't been chemically processed, it keeps its natural strength and structure.<br/><br/>
        ✨ Holds curls longer · ✨ Heat-styleable · ✨ Stays soft and smooth · ✨ Lasts much longer
        <div className="ic-divider"/>
        <strong>The Real Cost Comparison</strong><br/>
        Buying cheap hair several times a year may actually cost <em>more</em> than investing in quality once. Premium hair saves time, frustration, and money in the long run.
        <div className="ic-divider"/>
        <em>💬 Would you rather buy cheap hair often or invest in quality once?</em>
      </>,
    },
  },
  {
    id: 'blog2',
    img: j6,
    cat: 'Beginner Guide',
    title: '7 Common Wig Mistakes Beginners Should Avoid',
    article: {
      cat: 'Beginner Guide',
      title: '7 Common Wig Mistakes Beginners Should Avoid',
      img: j6,
      body: <>
        Avoid these simple mistakes and your wig will look more natural and last longer.
        <div className="ic-divider"/>
        <strong>1. Wrong Cap Size</strong> — Always measure your head first. Too tight or too loose looks unnatural.
        <div className="ic-divider"/>
        <strong>2. Skipping Lace Customisation</strong> — Trim and customise the lace for a truly natural hairline.
        <div className="ic-divider"/>
        <strong>3. Too Much Heat</strong> — Always use heat protectant. Keep temps below 380°F to preserve the hair.
        <div className="ic-divider"/>
        <strong>4. Neglecting Maintenance</strong> — Regular washing, conditioning, and detangling keeps wigs beautiful.
        <div className="ic-divider"/>
        <strong>5. Improper Storage</strong> — Store on a wig stand or in a satin bag. Never just toss it in a drawer.
        <div className="ic-divider"/>
        <strong>6. Overusing Products</strong> — Heavy oils cause buildup. Use lightweight products designed for human hair.
        <div className="ic-divider"/>
        <strong>7. Incorrect Installation</strong> — Watch tutorials or visit a stylist until you feel confident.
        <div className="ic-divider"/>
        <em>Avoid these mistakes and your wig will look flawless every time.</em>
      </>,
    },
  },
];

export default function JournalSection() {
  const [activeBlog, setActiveBlog] = useState(null);
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.edu-card');
    if (!card) return;
    const gap = 28;
    const cardW = card.offsetWidth + gap;
    track.scrollBy({ left: dir * cardW * 3, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      const idx = Math.round((track.scrollLeft / max) * 2);
      setActiveDot(idx);
    };
    track.addEventListener('scroll', handler, { passive: true });
    return () => track.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <section className="education-section reveal" id="journalSection">
        <div className="education-header">
          <div>
            <div className="section-eyebrow">The Veloura Journal</div>
            <h2 className="section-title">Beauty &amp;<br/><em>Wisdom</em></h2>
          </div>
          <a href="#" className="view-all">All Articles</a>
        </div>

        <div className="edu-carousel-wrap">
          <button className="edu-arrow" onClick={() => scroll(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="education-grid" ref={trackRef}>
            {ARTICLES.map(a => (
              <div key={a.id} className="edu-card" onClick={() => setActiveBlog(a)}>
                {/* Real photo thumbnail */}
                <div className="edu-img">
                  <img src={a.img} alt={a.title} className="edu-photo" />
                </div>
                <div className="edu-cat">{a.cat}</div>
                <div className="edu-title">{a.title}</div>
                <a href="#" className="edu-read" onClick={(e) => { e.preventDefault(); setActiveBlog(a); }}>
                  Read Article
                </a>
              </div>
            ))}
          </div>

          <button className="edu-arrow" onClick={() => scroll(1)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="edu-dots">
          {[0,1,2].map(i => (
            <div key={i} className={`edu-dot ${activeDot === i ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      {/* Blog article overlay — with hero image at top */}
      {activeBlog && (
        <div
          className="info-card-overlay open"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveBlog(null); }}
        >
          <div className="info-card info-card-scroll blog-card">
            <button className="info-card-close" onClick={() => setActiveBlog(null)}>✕</button>

            {/* Hero photo inside the card */}
            <div className="blog-card-hero-img">
              <img src={activeBlog.article.img} alt={activeBlog.article.title} />
            </div>

            <div className="blog-card-cat">{activeBlog.article.cat}</div>
            <div className="info-card-title">{activeBlog.article.title}</div>
            <div className="blog-card-meta">Queen Veloura Journal · Beauty &amp; Wisdom</div>
            <div className="ic-divider"/>
            <div className="info-card-body blog-body">{activeBlog.article.body}</div>
          </div>
        </div>
      )}
    </>
  );
}
