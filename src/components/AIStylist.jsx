import { useState, useRef, useEffect } from 'react';
import './AIStylist.css';

const SYSTEM_PROMPT = `You are a luxury wig brand stylist for Queen Veloura. 
Answer questions about human hair wigs, lace types, densities, lengths, installation, and care. 
Be warm, expert, and concise — 2-3 sentences max per reply. 
Always refer to Queen Veloura products when relevant. 
Never suggest visiting other brands. 
If asked about pricing, mention our range starts from $390. 
If asked about returns, mention our 30-day hassle-free return policy. 
If someone seems ready to buy, gently guide them to our best sellers or the Style Quiz.`;

const SUGGESTIONS = [
  'Which wig suits my face shape?',
  'What density should I choose?',
  'HD Lace vs regular lace?',
  'How do I install a glueless wig?',
];

const FALLBACK_REPLIES = {
  'face shape': "For oval faces, almost any Veloura style works beautifully. For round faces, our longer Body Wave or Deep Wave wigs add lovely length. Heart-shaped faces shine in our Water Wave styles with side parts.",
  'density': "130% gives a natural everyday drape, 150% is our most popular full look, and 180% delivers red-carpet volume. Our Body Wave 24\" at 150% is our number one best seller!",
  'hd lace': "HD lace is ultra-thin and melts into all skin tones — completely undetectable even up close. All Queen Veloura wigs feature our proprietary HD lace for the most natural hairline imaginable.",
  'glueless': "All our wigs are designed for glueless installation in under 10 minutes — no salon, no glue, no experience needed. Simply adjust the elastic band, position the wig, and secure the built-in combs.",
  'care': "Wash every 8–10 wears with sulphate-free shampoo, detangle gently from ends to roots, and air dry on a wig stand. With proper care, your Veloura wig will look flawless for 2+ years.",
  'price': "Our collection starts from $390 for the Water Wave 22\" and goes up to $510 for our Bone Straight Signature style. Every wig includes free express shipping and our 2-year quality guarantee.",
  'return': "We offer a 30-day hassle-free return policy — if you're not in love with your wig, we'll sort it out, no questions asked. Just email support@queenveloura.shop with your order number.",
};

function getFallbackReply(msg) {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(FALLBACK_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return "Thank you for your question! I'd love to help you find your perfect wig. You can also take our Wig Finder Quiz for a personalised recommendation, or browse our Best Sellers — all with our 2-year guarantee.";
}

export default function AIStylist() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  const threadRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || typing) return;
    setInput('');
    setShowSuggestions(false);
    const userMsg = { role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const newHistory = [...conversationHistory, { role: 'user', content: msg }];

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const reply = data.content?.[0]?.text || getFallbackReply(msg);

      setConversationHistory([...newHistory, { role: 'assistant', content: reply }]);
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      // Graceful fallback to local keyword matching
      setTyping(false);
      const fallback = getFallbackReply(msg);
      setConversationHistory([...newHistory, { role: 'assistant', content: fallback }]);
      setMessages(prev => [...prev, { role: 'ai', text: fallback }]);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <button
        className={`ai-fab ${open ? 'ai-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Stylist"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
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
              Hi! I'm your personal Veloura stylist. Ask me anything about wig styles, lengths, densities, or care tips.
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
                <div key={i} className={`ai-bubble ${m.role === 'user' ? 'user' : 'assistant'}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="ai-typing">
                  <div className="ai-typing-dot"/><div className="ai-typing-dot"/><div className="ai-typing-dot"/>
                </div>
              )}
            </div>
          )}

          <div className="ai-input-row">
            <input
              ref={inputRef}
              className="ai-input"
              placeholder="Ask about wigs, styling, care…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
            />
            <button className="ai-send" onClick={() => send()} disabled={typing || !input.trim()}>→</button>
          </div>
        </div>
      </div>
    </>
  );
}
