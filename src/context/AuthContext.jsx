import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// Simulated user database (localStorage-persisted)
const getUsers = () => JSON.parse(localStorage.getItem('luxe_users') || '[]');
const saveUsers = (u) => localStorage.setItem('luxe_users', JSON.stringify(u));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxe_user')); }
    catch { return null; }
  });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxe_cart') || '[]'); }
    catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxe_wishlist') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const signup = useCallback((name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered.' };
    }
    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
    saveUsers([...users, newUser]);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('luxe_user', JSON.stringify(safeUser));
    return { success: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('luxe_user', JSON.stringify(safeUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('luxe_user');
  }, []);

  // Cart actions
  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);
  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);

  // Wishlist actions
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  }, []);
  const inWishlist = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn: !!user,
      signup, login, logout,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      wishlist, toggleWishlist, inWishlist,
      cartTotal, cartCount,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
