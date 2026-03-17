# LUXE — React eCommerce Store

A full-featured luxury eCommerce website built with React 18, React Router v6, and Vite.

## 🚀 Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # production build
npm run preview   # preview production build
```

## 🔑 Features

### Auth
- **Sign Up** — register with name, email, password + strength meter
- **Sign In** — login with validation + error messages
- **Persistent sessions** — stored in localStorage
- **Protected routes** — /checkout, /orders require login

### Shopping
- **Home** — hero, category strips, featured products
- **Shop** — filter by category, price range, search, sort
- **Product Detail** — gallery, size/color selector, qty, tabs
- **Cart** — add/remove, qty controls, coupon codes, order summary
- **Wishlist** — save favorite products
- **Checkout** — demo checkout flow

### Tech
- React 18 + React Router v6
- Vite with code splitting + aliases
- Context API for auth + cart + wishlist
- localStorage persistence
- Lazy-loaded pages via React.lazy + Suspense

## 📁 Structure

```
ecommerce/
├── index.html              ← Project root (Vite requires this here)
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx             ← Routes + lazy loading
│   ├── context/
│   │   └── AuthContext.jsx ← Auth + Cart + Wishlist state
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Cart.jsx
│   │   └── Wishlist.jsx    ← also exports Checkout
│   └── utils/
│       └── products.js     ← product data
```

## 🎫 Test Coupons
- `LUXE10` — 10% off
- `LUXE20` — 20% off
- `WELCOME15` — 15% off
