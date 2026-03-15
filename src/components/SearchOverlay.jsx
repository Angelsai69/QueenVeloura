import { useState, useEffect, useRef } from 'react';
import './SearchOverlay.css';
import { products } from '../data/siteData';

const SEARCH_PRODUCTS = products.map(p => ({
  id: p.id,
  name: p.name,
  meta: p.category + ' · ' + p.specs,
  price: '$' + p.price,
  icon: p.id === 1 ? '👑' : p.id === 2 ? '🌊' : p.id === 3 ? '💧' : '✨',
  tags: p.name.toLowerCase().split(' ').concat([p.category.toLowerCase()]),
}));

const HINTS = ['HD Lace wigs', 'Glueless wigs', 'Body wave', '26 inch', 'Deep wave', 'Straight wig'];

export default function SearchOverlay({ isOpen, onClose, onAddToCart }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const runSearch = (q) => {
    const term = q.toLowerCase().trim();
    if (!term) { setResults([]); return; }
    setResults(
      SEARCH_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.meta.toLowerCase().includes(term) ||
        p.tags.some(t => t.includes(term))
      )
    );
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    runSearch(e.target.value);
  };

  const fillSearch = (q) => {
    setQuery(q);
    runSearch(q);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleResultClick = (product) => {
    onClose();
  };

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="search-close" onClick={onClose} aria-label="Close search">×</button>
      <div className="search-eyebrow">Search Veloura</div>

      <div className="search-bar">
        <svg className="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search wigs, lengths, styles…"
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
        <button className={`search-clear ${query ? 'show' : ''}`} onClick={clearSearch} aria-label="Clear">×</button>
      </div>

      {!query && (
        <div className="search-hints">
          <span className="search-hint-label">Popular searches</span>
          {HINTS.map(h => (
            <button key={h} className="search-hint" onClick={() => fillSearch(h)}>{h}</button>
          ))}
        </div>
      )}

      <div className="search-results">
        {query && results.length === 0 && (
          <div className="search-no-results">
            No results — try HD Lace, body wave, or a length like 24".
          </div>
        )}
        {results.map(p => (
          <div key={p.id} className="search-result-item" onClick={() => handleResultClick(p)}>
            <div className="search-result-thumb">{p.icon}</div>
            <div>
              <div className="search-result-name">{p.name}</div>
              <div className="search-result-meta">{p.meta}</div>
            </div>
            <div className="search-result-price">{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
