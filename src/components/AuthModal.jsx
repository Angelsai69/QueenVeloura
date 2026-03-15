import { useState, useEffect } from 'react';
import './AuthModal.css';

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ isOpen, onClose, defaultTab = 'signin' }) {
  const [tab, setTab]       = useState(defaultTab);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });

  useEffect(() => { setTab(defaultTab); setSuccess(false); setErrors({}); }, [defaultTab, isOpen]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  const validateSignin = () => {
    const e = {};
    if (!emailRx.test(form.email)) e.email = 'Valid email required';
    if (!form.password.trim()) e.password = 'Password required';
    return e;
  };

  const validateJoin = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!emailRx.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = 'Min. 8 characters';
    return e;
  };

  const handleSubmit = async () => {
    const errs = tab === 'signin' ? validateSignin() : validateJoin();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    // ── BACKEND HOOKUP POINT ─────────────────────────────────
    // Sign In:
    // const res = await fetch('/api/auth/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: form.email, password: form.password }),
    // });
    // const { token, user } = await res.json();
    // localStorage.setItem('veloura_token', token);
    //
    // Register:
    // const res = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName,
    //                          email: form.email, password: form.password }),
    // });
    //
    // With Supabase:
    // import { supabase } from '../lib/supabase'
    // tab === 'signin'
    //   ? await supabase.auth.signInWithPassword({ email, password })
    //   : await supabase.auth.signUp({ email, password, options: { data: { first_name } } })
    // ─────────────────────────────────────────────────────────

    await new Promise(r => setTimeout(r, 1000)); // remove when backend connected
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { onClose(); setSuccess(false); setForm({ email:'', password:'', firstName:'', lastName:'' }); }, 2200);
  };

  const handleSocial = (provider) => {
    // window.location.href = `/api/auth/${provider}`;
    alert(`${provider} OAuth — connect /api/auth/${provider.toLowerCase()} on your backend`);
  };

  if (!isOpen) return null;

  const Field = ({ id, label, type='text', placeholder, autoComplete }) => (
    <div className="auth-field">
      <label className="auth-label">{label}</label>
      <input
        className={`auth-input ${errors[id] ? 'invalid' : ''}`}
        type={type} placeholder={placeholder} autoComplete={autoComplete}
        value={form[id]} onChange={update(id)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />
      {errors[id] && <div className="auth-field-error">{errors[id]}</div>}
    </div>
  );

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Close">×</button>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'signin' ? 'active' : ''}`} onClick={() => { setTab('signin'); setSuccess(false); setErrors({}); }}>Sign In</button>
          <button className={`auth-tab ${tab === 'join' ? 'active' : ''}`} onClick={() => { setTab('join'); setSuccess(false); setErrors({}); }}>Join Free</button>
        </div>

        {success ? (
          <div className="auth-success">
            <div className="auth-success-icon">✦</div>
            <div className="auth-success-title">{tab === 'signin' ? 'Welcome back' : 'Welcome to Veloura'}</div>
            <div className="auth-success-msg">
              {tab === 'signin'
                ? "You're signed in. Redirecting to your account…"
                : 'Your account has been created. Check your email to verify and claim your 10% welcome discount.'}
            </div>
          </div>
        ) : tab === 'signin' ? (
          <div className="auth-body">
            <div className="auth-title">Welcome back</div>
            <div className="auth-subtitle">Sign in to access your orders, wishlist, and exclusive member benefits.</div>
            <Field id="email"    label="Email Address"  type="email"    placeholder="you@example.com"  autoComplete="email" />
            <Field id="password" label="Password"       type="password" placeholder="••••••••"          autoComplete="current-password" />
            <div className="auth-forgot">
              <button className="auth-text-btn" onClick={() => { /* /api/auth/forgot-password */ }}>Forgot password?</button>
            </div>
            <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
              <span>{loading ? '⟳  Signing in…' : 'Sign In'}</span>
            </button>
            <div className="auth-divider">or continue with</div>
            <div className="auth-social-btns">
              <button className="auth-social-btn" onClick={() => handleSocial('Google')}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="auth-social-btn" onClick={() => handleSocial('Facebook')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
            <div className="auth-switch">
              Don't have an account? <button className="auth-text-btn" onClick={() => { setTab('join'); setErrors({}); }}>Join free →</button>
            </div>
          </div>
        ) : (
          <div className="auth-body">
            <div className="auth-title">Join Veloura</div>
            <div className="auth-subtitle">Create your account for exclusive member pricing, early access, and a personalised styling experience.</div>
            <div className="auth-name-row">
              <Field id="firstName" label="First Name" placeholder="Angela"  autoComplete="given-name" />
              <Field id="lastName"  label="Last Name"  placeholder="Mitchell" autoComplete="family-name" />
            </div>
            <Field id="email"    label="Email Address"  type="email"    placeholder="you@example.com" autoComplete="email" />
            <Field id="password" label="Create Password" type="password" placeholder="Min. 8 characters" autoComplete="new-password" />
            <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
              <span>{loading ? '⟳  Creating account…' : 'Create My Account'}</span>
            </button>
            <div className="auth-terms">
              By joining you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
            <div className="auth-switch">
              Already have an account? <button className="auth-text-btn" onClick={() => { setTab('signin'); setErrors({}); }}>Sign in →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
