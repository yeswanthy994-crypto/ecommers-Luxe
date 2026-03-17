import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlist } = useAuth();
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '40px' }}>Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#aaa', marginBottom: '16px' }}>Your wishlist is empty</p>
          <Link to="/shop" style={{ color: '#c9a96e', textDecoration: 'none', fontSize: '0.85rem' }}>Start browsing →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
          {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export const Checkout = () => {
  const { cart, cartTotal, clearCart, isLoggedIn } = useAuth();
  const [done, setDone] = React.useState(false);

  if (!isLoggedIn) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <p style={{ marginBottom: '16px' }}>Please sign in to checkout.</p>
      <Link to="/login" style={{ background: '#1a1a1a', color: '#fff', padding: '12px 28px', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.12em' }}>Sign In</Link>
    </div>
  );

  if (done) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#c9a96e', marginBottom: '16px' }}>✓</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, marginBottom: '8px' }}>Order Confirmed!</h2>
      <p style={{ color: '#888', marginBottom: '28px' }}>Thank you for your purchase. Your order will arrive in 3–5 business days.</p>
      <Link to="/shop" style={{ background: '#1a1a1a', color: '#fff', padding: '13px 36px', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Continue Shopping</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '40px' }}>Checkout</h1>
      <div style={{ background: '#f0ece6', padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', marginBottom: '16px' }}>Order Summary</h3>
        {cart.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
            <span>{i.name} × {i.qty}</span><span>${(i.price * i.qty).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #d0cbc4', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
          <span>Total</span><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px', lineHeight: 1.7 }}>
        This is a demo checkout. In a production app, this would integrate with Stripe, PayPal, or another payment processor.
      </p>
      <button onClick={() => { clearCart(); setDone(true); }} style={{ width: '100%', background: '#1a1a1a', color: '#fff', border: 'none', padding: '15px', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>
        Place Order (Demo)
      </button>
    </div>
  );
};
