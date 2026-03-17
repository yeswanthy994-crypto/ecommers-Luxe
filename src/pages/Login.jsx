import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError('');
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate(from, { replace: true });
    else setApiError(result.error);
  };

  const handleChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
    setApiError('');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex' }}>
      {/* Left image */}
      <div style={{ flex: 1, display: 'none', position: 'relative', overflow: 'hidden' }} className="auth-image">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'flex-end', padding: '48px' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#fff', fontWeight: 300, lineHeight: 1.3 }}>
              Welcome back<br />to LUXE
            </div>
            <p style={{ color: '#ffffff99', fontSize: '0.88rem', marginTop: '12px' }}>Your curated wardrobe awaits.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', background: '#faf9f7' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', letterSpacing: '0.25em', color: '#1a1a1a', marginBottom: '48px', textAlign: 'center' }}>LUXE</div>
          </Link>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '8px' }}>Sign In</h1>
          <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '36px' }}>Don't have an account? <Link to="/signup" style={{ color: '#c9a96e', textDecoration: 'none' }}>Join LUXE</Link></p>

          {apiError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#c0392b', padding: '12px 16px', fontSize: '0.85rem', marginBottom: '20px', borderRadius: '2px' }}>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '8px' }}>{label}</label>
                <input
                  type={type}
                  value={form[id]}
                  onChange={handleChange(id)}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '12px 0', borderBottom: `1px solid ${errors[id] ? '#c0392b' : '#d0cbc4'}`, border: 'none', borderBottom: `1px solid ${errors[id] ? '#c0392b' : '#d0cbc4'}`, background: 'transparent', fontSize: '0.95rem', color: '#1a1a1a', outline: 'none', fontFamily: "'Jost', sans-serif" }}
                />
                {errors[id] && <p style={{ color: '#c0392b', fontSize: '0.78rem', marginTop: '4px' }}>{errors[id]}</p>}
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '28px' }}>
              <span style={{ fontSize: '0.8rem', color: '#888', cursor: 'pointer' }}>Forgot password?</span>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', background: '#1a1a1a', color: '#fff', border: 'none', padding: '15px', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: "'Jost', sans-serif", transition: 'opacity .2s' }}>
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>

          <div style={{ margin: '28px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e8e4de' }} />
            <span style={{ fontSize: '0.75rem', color: '#aaa' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#e8e4de' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
            New to LUXE? <Link to="/signup" style={{ color: '#1a1a1a', fontWeight: 500, textDecoration: 'none' }}>Create an account →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
