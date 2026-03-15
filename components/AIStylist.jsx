import { useState, useRef, useEffect } from 'react';
import './AIStylist.css';

const SUGGESTIONS = [
  'Which wig suits my face shape?',
  'What density should I choose?',
  'HD Lace vs regular lace?',
  'How do I install a glueless wig?',
];

const AUTO_REPLIES = {
  'face shape': "Great question! For oval faces, almost any style works. For round faces, longer lengths with volume at the crown flatter most. Heart-shaped faces love chin-length bobs or layered waves that balance the jaw. What's your face shape?",
  'density': "Density refers to how thick the hair looks. 130% is natural and lightweight — great for beginners. 150% gives a fuller everyday look. 180% is voluminous and glamorous. Our best sellers are all 150%.",
  'hd lace': "HD lace is ultra-thin and melts into all skin tones for a truly undetectable hairline. Standard lace is more durable and affordable. For the most natural look, HD lace is worth every penny — especially for photos and events.",
  'glueless': "Glueless wigs use adjustable elastic bands and combs to secure without any adhesive. Just adjust the band, position the wig, snap in the combs, and you're done in under 10 minutes. No salon, no experience needed!",
  'care': "Wash every 8–10 wears with a sulphate-free shampoo. Always detangle gently from ends to roots. Air dry when possible, and store on a wig stand. With proper care, your Veloura wig will last 2+ years.",
  'default': "Thank you for your question! Our team of expert stylists recommends browsing our best sellers or taking our Wig Finder Quiz for a personalised match. Can I help with anything else?",
};

function getReply(msg) {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (key !== 'default' && lower.includes(key)) return reply;
  }
  return AUTO_REPLIES.default;
}

export default function AIStylist() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getReply(msg) }]);
    }, 1200 + Math.random() * 600);
  };

  return (
    <>
      <button
        className={`ai-fab ${open ? 'ai-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Stylist"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <path d="M9.5 2L11 7l5 1.5-5 1.5L9.5 15l-1.5-5L3 8.5 8 7z"/>
            <path d="M17 13l.8 2.5 2.5.8-2.5.8L17 19.5l-.8-2.4-2.4-.8 2.4-.8z"/>
          </svg>
        )}
      </button>

      <div className={`ai-panel ${open ? 'open' : ''}`}>
        <div className="ai-panel-header">
          <div className="ai-panel-title">
            <div className="ai-dot" />
            Beauty AI Stylist
          </div>
          <button className="ai-panel-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="ai-body">
          {messages.length === 0 && (
            <p className="ai-greeting">
              Hi there! I'm your personal Veloura stylist. Ask me anything about wig styles, lengths, densities, or care tips.
            </p>
          )}

          {showSuggestions && messages.length === 0 && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="ai-suggestion" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}

          {messages.length > 0 && (
            <div className="ai-thread" ref={threadRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-message ${m.role === 'user' ? 'ai-user' : 'ai-bot'}`}>
                  {m.role === 'ai' && <div className="ai-bot-avatar">✦</div>}
                  <div className="ai-message-bubble">{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="ai-message ai-bot">
                  <div className="ai-bot-avatar">✦</div>
                  <div className="ai-typing-bubble">
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="ai-input-row">
            <input
              className="ai-input"
              placeholder="Ask about wigs, styling, care…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              autoComplete="off"
            />
            <button className="ai-send" onClick={() => send()}>→</button>
          </div>
        </div>
      </div>
    </>
  );
}
