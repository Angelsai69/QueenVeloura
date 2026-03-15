import { useEffect, useRef } from 'react';
import { compareRows } from '../data/siteData';
import './CompareSection.css';

export default function CompareSection() {
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
    <section className="compare-section reveal" ref={sectionRef}>
      <div className="compare-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Why Veloura Wins</div>
        <h2 className="section-title">The Honest <em>Comparison</em></h2>
      </div>
      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Feature</th>
              <th className="veloura-col">✦ Queen Veloura</th>
              <th>Salon Extensions</th>
              <th>Cheap Synthetic</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map(row => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td className="veloura-col">
                  <span className={row.velouraCheck ? 'check' : ''}>{row.veloura}</span>
                </td>
                <td>
                  <span className={row.salonCross ? 'cross' : ''}>{row.salon}</span>
                </td>
                <td>
                  <span className={row.syntheticCross ? 'cross' : ''}>{row.synthetic}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
