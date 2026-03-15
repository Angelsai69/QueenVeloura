import { useState } from 'react';
import './WigQuiz.css';

const steps = [
  {
    id: 1,
    question: "What's your primary reason for wearing a wig?",
    options: [
      { val: 'everyday', icon: '☀️', label: 'Everyday wear', desc: 'My go-to daily look' },
      { val: 'events', icon: '✨', label: 'Special occasions', desc: 'Weddings, events & dates' },
      { val: 'protective', icon: '🌿', label: 'Protective styling', desc: 'Give my hair a break' },
      { val: 'fashion', icon: '💃', label: 'Fashion & fun', desc: 'Change up my look often' },
    ],
  },
  {
    id: 2,
    question: 'What length feels most like you?',
    options: [
      { val: 'short', icon: '💆', label: 'Short (10–14")', desc: 'Effortless & chic' },
      { val: 'medium', icon: '💁', label: 'Medium (16–20")', desc: 'Versatile & classic' },
      { val: 'long', icon: '👸', label: 'Long (22–26")', desc: 'Glamorous & bold' },
      { val: 'xlong', icon: '🌊', label: 'Extra long (28"+)', desc: 'Maximum drama' },
    ],
  },
  {
    id: 3,
    question: 'Which texture speaks to your style?',
    options: [
      { val: 'straight', icon: '〰️', label: 'Sleek Straight', desc: 'Polished & refined' },
      { val: 'wave', icon: '🌊', label: 'Body Wave', desc: 'Soft & feminine' },
      { val: 'deep', icon: '🌀', label: 'Deep Wave', desc: 'Rich & textured' },
      { val: 'curly', icon: '🪷', label: 'Curly / Coily', desc: 'Natural & voluminous' },
    ],
  },
  {
    id: 4,
    question: 'How comfortable are you with wig installation?',
    options: [
      { val: 'beginner', icon: '🌱', label: 'Complete beginner', desc: 'First time wearing a wig' },
      { val: 'some', icon: '⭐', label: 'Some experience', desc: "I've worn wigs before" },
      { val: 'confident', icon: '👑', label: 'Fully confident', desc: 'I install wigs regularly' },
      { val: 'glam', icon: '💎', label: 'I want max drama', desc: 'Full glam, glue & all' },
    ],
  },
];

const resultMap = {
  wave: { name: 'Silk Crown 24" Body Wave', price: '$420', detail: 'HD Lace · Glueless · 150% Density', icon: '🌊' },
  deep: { name: 'Royal Wave 26" Deep Wave', price: '$460', detail: 'HD Lace · Pre-bleached knots · 180% Density', icon: '🌀' },
  straight: { name: 'Velvet Straight 22" Sleek', price: '$390', detail: 'Signature Lace · Glueless · 130% Density', icon: '〰️' },
  curly: { name: 'Water Wave 22" HD Lace', price: '$390', detail: 'HD Lace · Glueless · 150% Density', icon: '🌊' },
};

export default function WigQuiz({ isOpen, onClose, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const select = (stepId, val) => setAnswers(prev => ({ ...prev, [stepId]: val }));

  const next = (stepId) => {
    if (!answers[stepId]) return;
    if (stepId < 4) setStep(stepId + 1);
    else finish();
  };

  const finish = () => {
    const texture = answers[3] || 'wave';
    setResult(resultMap[texture] || resultMap.wave);
    setStep(5);
  };

  const reset = () => { setStep(1); setAnswers({}); setResult(null); };

  if (!isOpen) return null;

  return (
    <div className="quiz-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="quiz-modal">
        <button className="quiz-close" onClick={onClose}>×</button>

        {step <= 4 ? (
          <>
            <div className="quiz-header">
              <div className="quiz-eyebrow">Wig Finder Quiz</div>
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
              </div>
            </div>

            <div className="quiz-question">{steps[step - 1].question}</div>
            <div className="quiz-options">
              {steps[step - 1].options.map(opt => (
                <button
                  key={opt.val}
                  className={`quiz-option ${answers[step] === opt.val ? 'selected' : ''}`}
                  onClick={() => select(step, opt.val)}
                >
                  <span className="quiz-option-icon">{opt.icon}</span>
                  <span className="quiz-option-label">{opt.label}</span>
                  <span className="quiz-option-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="quiz-nav">
              <span className="quiz-step-count">Step {step} of 4</span>
              <button
                className={`quiz-btn-next ${!answers[step] ? 'disabled' : ''}`}
                onClick={() => next(step)}
              >
                <span>{step < 4 ? 'Continue →' : 'See My Match ✦'}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-result-screen">
            <div className="quiz-result-eyebrow">Your Perfect Match ✦</div>
            <div className="quiz-result-card">
              <div className="quiz-result-icon">{result?.icon}</div>
              <div>
                <div className="quiz-result-name">{result?.name}</div>
                <div className="quiz-result-detail">{result?.detail}</div>
                <div className="quiz-result-price">{result?.price}</div>
              </div>
            </div>
            <p className="quiz-result-why">
              Based on your answers, this wig is your ideal match — perfectly suited to your style, length preference, and experience level.
            </p>
            <div className="quiz-result-cta">
              <button className="btn-primary" style={{ flex: 1 }} onClick={onClose}>
                <span>Shop This Style</span>
              </button>
              <button className="btn-outline" onClick={reset} style={{ padding: '14px 20px' }}>
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
