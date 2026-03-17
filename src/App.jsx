import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home          = lazy(() => import('./pages/Home'));
const Shop          = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login         = lazy(() => import('./pages/Login'));
const Signup        = lazy(() => import('./pages/Signup'));
const Cart          = lazy(() => import('./pages/Cart'));
const WishlistPage  = lazy(() => import('./pages/Wishlist').then(m => ({ default: m.Wishlist })));
const CheckoutPage  = lazy(() => import('./pages/Wishlist').then(m => ({ default: m.Checkout })));

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn
    ? children
    : <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
};

const Loader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', letterSpacing: '0.3em', color: '#c9a96e' }}>
      LUXE
    </div>
  </div>
);

const OrdersPage = () => (
  <div style={{ padding: '60px', textAlign: 'center' }}>
    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '8px' }}>My Orders</h2>
    <p style={{ color: '#888' }}>No orders yet. <a href="/shop" style={{ color: '#c9a96e' }}>Shop now →</a></p>
  </div>
);

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/shop"        element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/signup"      element={<Signup />} />
          <Route path="/cart"        element={<Cart />} />
          <Route path="/wishlist"    element={<WishlistPage />} />
          <Route path="/checkout"    element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/orders"      element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
