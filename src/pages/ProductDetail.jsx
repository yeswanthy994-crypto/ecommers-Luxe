import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../utils/products';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, inWishlist, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('description');

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem' }}>Product not found</h2>
      <Link to="/shop" style={{ color: '#c9a96e', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>Back to Shop</Link>
    </div>
  );

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px', fontSize: '0.78rem', color: '#aaa' }}>
          <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: '#aaa', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: '#1a1a1a' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#f0ece6' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {product.tag && (
              <div style={{ display: 'inline-block', marginTop: '12px', background: '#1a1a1a', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '4px 12px' }}>
                {product.tag}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div style={{ fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>{product.category}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#c9a96e' : '#e8e4de'}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#888' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', marginBottom: '28px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: product.originalPrice ? '#c0392b' : '#1a1a1a' }}>${product.price}</span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: '1.1rem', color: '#aaa', textDecoration: 'line-through' }}>${product.originalPrice}</span>
                  <span style={{ background: '#c0392b', color: '#fff', fontSize: '0.72rem', padding: '3px 8px', fontWeight: 600 }}>-{discount}%</span>
                </>
              )}
            </div>

            {/* Color */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Color {selectedColor && <span style={{ fontWeight: 400, color: '#888', textTransform: 'none' }}>— {selectedColor}</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: '6px 14px', border: `1px solid ${selectedColor === c ? '#1a1a1a' : '#e8e4de'}`, background: selectedColor === c ? '#1a1a1a' : 'transparent', color: selectedColor === c ? '#fff' : '#1a1a1a', fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Jost', sans-serif", transition: 'all .2s' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Size {selectedSize && <span style={{ fontWeight: 400, color: '#888', textTransform: 'none' }}>— {selectedSize}</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{ width: '48px', height: '48px', border: `1px solid ${selectedSize === s ? '#1a1a1a' : '#e8e4de'}`, background: selectedSize === s ? '#1a1a1a' : 'transparent', color: selectedSize === s ? '#fff' : '#1a1a1a', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'Jost', sans-serif", transition: 'all .2s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', border: '1px solid #e8e4de' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>−</button>
                <div style={{ width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)} style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
              </div>
              <button onClick={handleAddToCart} style={{ flex: 1, background: added ? '#2d6a4f' : '#1a1a1a', color: '#fff', border: 'none', padding: '0 24px', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background .3s', fontFamily: "'Jost', sans-serif" }}>
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleWishlist(product)} style={{ width: '52px', height: '52px', border: '1px solid #e8e4de', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist(product.id) ? '#c0392b' : 'none'} stroke={inWishlist(product.id) ? '#c0392b' : '#1a1a1a'} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <Link to="/cart" style={{ display: 'block', textAlign: 'center', border: '1px solid #1a1a1a', color: '#1a1a1a', padding: '14px', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '28px' }}>
              View Cart & Checkout
            </Link>

            {/* Tabs */}
            <div style={{ borderTop: '1px solid #e8e4de', paddingTop: '28px' }}>
              <div style={{ display: 'flex', gap: '28px', marginBottom: '20px' }}>
                {['description', 'details', 'shipping'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', color: tab === t ? '#1a1a1a' : '#aaa', borderBottom: tab === t ? '1px solid #1a1a1a' : '1px solid transparent', paddingBottom: '4px', fontFamily: "'Jost', sans-serif", transition: 'color .15s' }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.8 }}>
                {tab === 'description' && <p>{product.description}</p>}
                {tab === 'details' && <ul style={{ paddingLeft: '16px' }}>{['Premium natural materials', 'Ethically sourced and produced', 'Dry clean recommended', 'Made in Italy'].map(d => <li key={d} style={{ marginBottom: '6px' }}>{d}</li>)}</ul>}
                {tab === 'shipping' && <p>Free shipping on orders over $200. Standard delivery 3–5 business days. Express available at checkout. Free returns within 30 days.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, marginBottom: '32px', textAlign: 'center' }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
