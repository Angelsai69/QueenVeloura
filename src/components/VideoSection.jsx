import './VideoSection.css';

export default function VideoSection() {
  return (
    <div className="video-section">
      <div className="video-bg-art" />
      <div className="video-lines">
        <div className="video-line" style={{ left: '25%' }} />
        <div className="video-line" style={{ left: '50%' }} />
        <div className="video-line" style={{ left: '75%' }} />
      </div>
      <div className="video-content">
        <div className="video-play-btn" aria-label="Play film">
          <div className="video-play-icon" />
          <div className="video-play-ring" />
        </div>
        <p className="video-label">Watch the Film</p>
        <h2 className="video-title">"The Art of<br />Natural Hair"</h2>
        <p className="video-subtitle">Installation · Styling · Care</p>
      </div>
    </div>
  );
}
