import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const COUPONS = { LUXE10: 10, LUXE20: 20, WELCOME15: 15 };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) { setDiscount(COUPONS[code]); setCouponMsg(`✓ ${COUPONS[code]}% discount applied!`); }
    else { setDiscount(0); setCouponMsg('Invalid coupon code.'); }
  };

  const discountedTotal = cartTotal - (cartTotal * discount / 100);
  const shipping = cartTotal > 200 ? 0 : 18;

  if (cart.length === 0) return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', marginBottom: '16px', opacity: 0.15 }}>∅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, marginBottom: '8px' }}>Your cart is empty</h2>
      <p style={{ color: '#888', marginBottom: '28px' }}>Add some pieces to get started</p>
      <Link to="/shop" style={{ background: '#1a1a1a', color: '#fff', padding: '13px 36px', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Browse Shop</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '40px' }}>Shopping Cart ({cart.reduce((s,i)=>s+i.qty,0)} items)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>
        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '20px', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f0ece6' }}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '130px', objectFit: 'cover', background: '#f0ece6' }} />
              </Link>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.category}</div>
                <div style={{ fontSize: '1rem', marginBottom: '8px' }}>{item.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#888', marginBottom: '16px' }}>Color: {item.colors?.[0]} · Size: {item.sizes?.[0]}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #e8e4de', width: 'fit-content' }}>
                  <button onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                  <span style={{ width: '36px', textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '8px' }}>${(item.price * item.qty).toFixed(2)}</div>
                <div style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '16px' }}>${item.price} each</div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Link to="/shop" style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem' }}>← Continue Shopping</Link>
            <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}>Clear Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#f0ece6', padding: '28px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, marginBottom: '24px' }}>Order Summary</h2>

          <div style={{ marginBottom: '20px' }}>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#666' }}>{i.name} × {i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #d0cbc4', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: '#666' }}>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span style={{ color: shipping === 0 ? '#2d6a4f' : '#1a1a1a' }}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#2d6a4f' }}>Discount ({discount}%)</span>
                <span style={{ color: '#2d6a4f' }}>-${(cartTotal * discount / 100).toFixed(2)}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: '1.05rem', marginBottom: '24px', borderTop: '1px solid #d0cbc4', paddingTop: '16px' }}>
            <span>Total</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>${(discountedTotal + shipping).toFixed(2)}</span>
          </div>

          {/* Coupon */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: '10px 12px', border: '1px solid #d0cbc4', background: 'transparent', fontSize: '0.82rem', outline: 'none', fontFamily: "'Jost', sans-serif" }} />
              <button onClick={applyCoupon} style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '10px 16px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>Apply</button>
            </div>
            {couponMsg && <p style={{ fontSize: '0.75rem', marginTop: '6px', color: couponMsg.startsWith('✓') ? '#2d6a4f' : '#c0392b' }}>{couponMsg}</p>}
            <p style={{ fontSize: '0.72rem', color: '#aaa', marginTop: '6px' }}>Try: LUXE10 · LUXE20 · WELCOME15</p>
          </div>

          <button
            onClick={() => isLoggedIn ? navigate('/checkout') : navigate('/login', { state: { from: '/cart' } })}
            style={{ width: '100%', background: '#1a1a1a', color: '#fff', border: 'none', padding: '15px', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif' }}>
            {isLoggedIn ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </button>

          {!isLoggedIn && (
            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#888', marginTop: '12px' }}>
              <Link to="/login" style={{ color: '#c9a96e', textDecoration: 'none' }}>Sign in</Link> or <Link to="/signup" style={{ color: '#c9a96e', textDecoration: 'none' }}>create account</Link>
            </p>
          )}

          {cartTotal < 200 && (
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '12px' }}>
              Add <strong>${(200 - cartTotal).toFixed(2)}</strong> more for free shipping
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
