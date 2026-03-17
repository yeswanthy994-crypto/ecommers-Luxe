import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#1a1a1a', color: '#f0ece6', marginTop: '80px' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', letterSpacing: '0.3em', marginBottom: '16px', color: '#c9a96e' }}>LUXE</div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#999', maxWidth: '280px' }}>Curated luxury fashion for the discerning individual. Every piece tells a story of exceptional craftsmanship.</p>
        </div>
        {[
          { title: 'Shop', links: ['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'] },
          { title: 'Help', links: ['Shipping & Returns', 'Size Guide', 'Care Instructions', 'Contact Us', 'FAQ'] },
          { title: 'Company', links: ['About', 'Sustainability', 'Careers', 'Press', 'Stores'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', color: '#c9a96e' }}>{col.title}</div>
            {col.links.map(l => (
              <Link key={l} to="/shop" style={{ display: 'block', color: '#888', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '10px', transition: 'color .2s' }}>{l}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: '#666' }}>© 2025 LUXE. All rights reserved.</p>
        <p style={{ fontSize: '0.78rem', color: '#666' }}>Crafted with care · Built with React + Vite</p>
      </div>
    </div>
  </footer>
);

export default Footer;
