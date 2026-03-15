import './Marquee.css';

const items = [
  '100% Virgin Human Hair',
  'Invisible HD Lace',
  'Glueless Installation',
  'Pre-Plucked Hairline',
  'Ethically Sourced',
  'Up to 2 Year Lifespan',
  'Free Shipping $300+',
  '30-Day Returns',
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <strong>{item}</strong>
            <div className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
