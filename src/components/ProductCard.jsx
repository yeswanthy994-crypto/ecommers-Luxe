import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TAG_COLORS = { New: '#2d6a4f', Bestseller: '#c9a96e', Sale: '#c0392b' };

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, inWishlist } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const wishlisted = inWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f0ece6', marginBottom: '14px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {/* Tag */}
          {product.tag && (
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: TAG_COLORS[product.tag] || '#1a1a1a', color: '#fff', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px' }}>
              {product.tag}
            </div>
          )}

          {/* Discount badge */}
          {discount && (
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#c0392b', color: '#fff', fontSize: '0.68rem', fontWeight: 600, padding: '3px 7px' }}>
              -{discount}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#fff', border: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: hovered || wishlisted ? 1 : 0, transition: 'opacity .2s' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#c0392b' : 'none'} stroke={wishlisted ? '#c0392b' : '#1a1a1a'} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Quick Add */}
          <button
            onClick={handleAdd}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: added ? '#2d6a4f' : '#1a1a1a', color: '#fff', border: 'none', padding: '12px', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .3s ease, background .2s', fontFamily: "'Jost', sans-serif" }}
          >
            {added ? '✓ Added' : 'Quick Add'}
          </button>
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: '0.68rem', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 400, marginBottom: '6px', color: '#1a1a1a' }}>{product.name}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: product.originalPrice ? '#c0392b' : '#1a1a1a' }}>${product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.82rem', color: '#aaa', textDecoration: 'line-through' }}>${product.originalPrice}</span>
            )}
          </div>
          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#c9a96e' : '#ddd'}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
            <span style={{ fontSize: '0.72rem', color: '#aaa', marginLeft: '2px' }}>({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
