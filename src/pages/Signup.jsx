import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!form.confirm) e.confirm = 'Please confirm your password.';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError('');
    await new Promise(r => setTimeout(r, 700));
    const result = signup(form.name.trim(), form.email.trim(), form.password);
    setLoading(false);
    if (result.success) navigate('/');
    else setApiError(result.error);
  };

  const handleChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
    setApiError('');
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthColors = ['#e8e4de', '#c0392b', '#e67e22', '#c9a96e', '#2d6a4f'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex' }}>
      {/* Image panel */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end', padding: '48px' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#fff', fontWeight: 300, lineHeight: 1.3 }}>
              Join a world<br />of refined taste
            </div>
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
              {['Free shipping over $200', 'Easy 30-day returns', 'Members-only offers'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', background: '#c9a96e', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: '#ffffffcc' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', background: '#faf9f7', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', letterSpacing: '0.25em', color: '#1a1a1a', marginBottom: '48px', textAlign: 'center' }}>LUXE</div>
          </Link>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '36px' }}>Already a member? <Link to="/login" style={{ color: '#c9a96e', textDecoration: 'none' }}>Sign in</Link></p>

          {apiError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#c0392b', padding: '12px 16px', fontSize: '0.85rem', marginBottom: '20px', borderRadius: '2px' }}>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'name',     label: 'Full Name',     type: 'text',     placeholder: 'Jane Doe' },
              { id: 'email',    label: 'Email Address', type: 'email',    placeholder: 'you@example.com' },
              { id: 'password', label: 'Password',      type: 'password', placeholder: '••••••••' },
              { id: 'confirm',  label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '8px' }}>{label}</label>
                <input
                  type={type}
                  value={form[id]}
                  onChange={handleChange(id)}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: `1px solid ${errors[id] ? '#c0392b' : '#d0cbc4'}`, background: 'transparent', fontSize: '0.95rem', color: '#1a1a1a', outline: 'none', fontFamily: "'Jost', sans-serif" }}
                />
                {id === 'password' && form.password && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{ flex: 1, height: '3px', background: i <= strength ? strengthColors[strength] : '#e8e4de', transition: 'background .3s' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                  </div>
                )}
                {errors[id] && <p style={{ color: '#c0392b', fontSize: '0.78rem', marginTop: '4px' }}>{errors[id]}</p>}
              </div>
            ))}

            <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '28px', lineHeight: 1.6 }}>
              By creating an account you agree to our <span style={{ color: '#1a1a1a', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#1a1a1a', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>

            <button type="submit" disabled={loading} style={{ width: '100%', background: '#1a1a1a', color: '#fff', border: 'none', padding: '15px', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: "'Jost', sans-serif", transition: 'opacity .2s' }}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#888' }}>
            Already have an account? <Link to="/login" style={{ color: '#1a1a1a', fontWeight: 500, textDecoration: 'none' }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
