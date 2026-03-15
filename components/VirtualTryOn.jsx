import './VirtualTryOn.css';

export default function VirtualTryOn({ onShopClick }) {
  return (
    <section className="virtual-section reveal">

      {/* Left: animated phone mockup */}
      <div className="virtual-visual">
        <div className="virtual-swatch vs1">BW</div>
        <div className="virtual-swatch vs2">DW</div>
        <div className="virtual-swatch vs3">ST</div>
        <div className="virtual-swatch vs4">CL</div>

        <div className="virtual-phone">
          <div className="virtual-phone-notch" />
          <div className="virtual-phone-screen">
            <div className="virtual-scan-lines" />
            <div className="virtual-ar-brackets" />
            <div className="virtual-face">
              <div className="virtual-wig" />
              <div className="virtual-wig-flow" />
              <div className="virtual-face-head" />
              <div className="virtual-face-neck" />
            </div>
            <div className="virtual-wig-labels">
              <span className="vwl vwl-1">Body Wave</span>
              <span className="vwl vwl-2">Deep Wave</span>
              <span className="vwl vwl-3">Silk Straight</span>
              <span className="vwl vwl-4">Crown Curl</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: content */}
      <div className="virtual-content">
        <div className="virtual-badge">
          <div className="virtual-badge-dot" />
          <span className="virtual-badge-text">New · Augmented Reality</span>
        </div>

        <h2 className="virtual-title">Try Before<br/>You <em>Buy</em></h2>

        <p className="virtual-desc">
          See every wig on your own face before you order. Our AR try-on technology maps your facial features in real time — switch styles, lengths, and textures instantly. No commitment, no guesswork.
        </p>

        <div className="virtual-steps">
          <div className="virtual-step">
            <div className="virtual-step-num">1</div>
            <div className="virtual-step-text">
              <strong>Open the camera</strong>
              Allow camera access — no account needed to try.
            </div>
          </div>
          <div className="virtual-step">
            <div className="virtual-step-num">2</div>
            <div className="virtual-step-text">
              <strong>Browse any wig</strong>
              Tap "Try On" on any product to map it live to your face.
            </div>
          </div>
          <div className="virtual-step">
            <div className="virtual-step-num">3</div>
            <div className="virtual-step-text">
              <strong>Find your match</strong>
              Save favourites, compare looks, and order with confidence.
            </div>
          </div>
        </div>

        <div className="virtual-ctas">
          <button className="btn-primary" onClick={onShopClick}><span>Try On Now — It's Free</span></button>
          <a href="#" className="btn-outline" style={{fontSize:'11px'}}>Browse All Wigs</a>
        </div>
        <div className="virtual-note">Works on all modern phones · No app download required</div>
      </div>

    </section>
  );
}
