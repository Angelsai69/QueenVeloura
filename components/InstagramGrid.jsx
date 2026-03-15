import './InstagramGrid.css';

const ITEMS = [
  { bg: 'ig-b1', inner: <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'40px',color:'var(--champagne)',opacity:0.3}}>✦</span> },
  { bg: 'ig-b2', inner: <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'60px',color:'var(--champagne)',opacity:0.2}}>V</span> },
  { bg: 'ig-b3', inner: <span style={{fontSize:'48px',opacity:0.25}}>👑</span> },
  { bg: 'ig-b4', inner: null },
  { bg: 'ig-b5', inner: <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'40px',color:'var(--champagne)',opacity:0.2}}>✦</span> },
  { bg: 'ig-b6', inner: null },
];

export default function InstagramGrid() {
  return (
    <div className="ig-section">
      <div className="ig-header reveal">
        <div>
          <div className="section-eyebrow">Community</div>
          <h2 className="section-title" style={{fontSize:'clamp(28px,3vw,44px)'}}>@QueenVeloura</h2>
        </div>
        <a href="#" className="view-all">Follow Us</a>
      </div>
      <div className="ig-grid">
        {ITEMS.map((item, i) => (
          <div key={i} className="ig-item">
            <div className={`ig-item-bg ${item.bg}`}>
              {item.inner && (
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {item.inner}
                </div>
              )}
            </div>
            <div className="ig-overlay">📸</div>
          </div>
        ))}
      </div>
    </div>
  );
}
