import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, user, logout, cartCount, wishlist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const isHome = location.pathname === '/';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || !isHome ? 'rgba(250,249,247,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled || !isHome ? '1px solid #e8e4de' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 40px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.25em', color: '#1a1a1a' }}>
              LUXE
            </span>
          </Link>

          {/* Center Nav */}
          <div style={{ display: 'flex', gap: '36px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/shop?cat=Women', 'Women'], ['/shop?cat=Men', 'Men'], ['/shop?cat=Accessories', 'Accessories']].map(([path, label]) => (
              <Link key={label} to={path} style={{
                textDecoration: 'none', color: '#1a1a1a', fontSize: '0.82rem',
                fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                opacity: location.pathname === path ? 1 : 0.65,
                borderBottom: location.pathname === path ? '1px solid #c9a96e' : '1px solid transparent',
                paddingBottom: '2px', transition: 'all .2s',
              }}>{label}</Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Wishlist */}
            <Link to="/wishlist" style={{ textDecoration: 'none', position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#c9a96e', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#1a1a1a', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{cartCount}</span>
              )}
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <div style={{ position: 'relative' }} onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', letterSpacing: '0.08em', color: '#1a1a1a', fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                {menuOpen && (
                  <div style={{ position: 'absolute', right: 0, top: '100%', background: '#fff', border: '1px solid #e8e4de', borderRadius: '2px', minWidth: '180px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '8px 0' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0ece6' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>{user.email}</div>
                    </div>
                    <Link to="/orders" style={{ display: 'block', padding: '10px 16px', fontSize: '0.82rem', color: '#1a1a1a', textDecoration: 'none', letterSpacing: '0.06em' }}>My Orders</Link>
                    <Link to="/wishlist" style={{ display: 'block', padding: '10px 16px', fontSize: '0.82rem', color: '#1a1a1a', textDecoration: 'none', letterSpacing: '0.06em' }}>Wishlist</Link>
                    <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '0.82rem', color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Jost', sans-serif" }}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link to="/login" style={{ textDecoration: 'none', fontSize: '0.8rem', color: '#1a1a1a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sign In</Link>
                <Link to="/signup" style={{ textDecoration: 'none', background: '#1a1a1a', color: '#fff', padding: '8px 18px', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Join</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={{ height: '72px' }} />
    </>
  );
};

export default Navbar;
