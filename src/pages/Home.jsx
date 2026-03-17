import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../utils/products';

const Home = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const featured = PRODUCTS.filter(p => p.tag === 'Bestseller' || p.tag === 'New').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'calc(100vh - 72px)', overflow: 'hidden', background: '#1a1a1a' }}>
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=80"
          alt="Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease 0.2s' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.4em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '20px' }}>
              New Collection 2025
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '0.05em' }}>
              Dressed in<br /><em>Quiet Luxury</em>
            </h1>
            <Link to="/shop" style={{ display: 'inline-block', background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '14px 44px', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
              onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#1a1a1a'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}>
              Explore Collection
            </Link>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: '#ffffff88', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(#ffffff88, transparent)', animation: 'scrollBar 1.5s ease-in-out infinite' }} />
          <style>{`@keyframes scrollBar{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(0.5);opacity:0.5}}`}</style>
        </div>
      </section>

      {/* Category strips */}
      <section style={{ maxWidth: '1400px', margin: '80px auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Women', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', cat: 'Women' },
            { label: 'Men',   img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80', cat: 'Men' },
            { label: 'Accessories', img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', cat: 'Accessories' },
          ].map(c => (
            <Link key={c.label} to={`/shop?cat=${c.cat}`} style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden', aspectRatio: '2/3', display: 'block' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
              <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', display: 'flex', alignItems: 'flex-end', padding: '28px' }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#fff', fontWeight: 400 }}>{c.label}</div>
                  <div style={{ fontSize: '0.72rem', color: '#ffffff99', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>Shop Now →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '12px' }}>Curated Selection</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 300 }}>Featured Pieces</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop" style={{ display: 'inline-block', border: '1px solid #1a1a1a', color: '#1a1a1a', padding: '13px 44px', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}>
            View All
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section style={{ background: '#f0ece6', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '16px' }}>Our Promise</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, marginBottom: '16px' }}>Crafted to Last a Lifetime</h2>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.8, fontSize: '0.9rem' }}>
          Every piece in our collection is made from the finest natural materials, by artisans who have spent decades perfecting their craft.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px' }}>
          {[['Free Shipping', 'On orders over $200'], ['Easy Returns', '30-day return policy'], ['Secure Payment', 'Encrypted & safe']].map(([t, s]) => (
            <div key={t} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '4px' }}>{t}</div>
              <div style={{ fontSize: '0.78rem', color: '#888' }}>{s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
