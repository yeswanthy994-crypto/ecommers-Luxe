import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../utils/products';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('cat') || 'All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState(1000);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter(p => p.price <= priceMax);
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     list = list.filter(p => p.tag === 'New').concat(list.filter(p => p.tag !== 'New')); break;
      default: break;
    }
    return list;
  }, [category, sort, search, priceMax]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px', display: 'flex', gap: '48px' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0 }}>
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>Categories</div>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 0', fontSize: '0.9rem', cursor: 'pointer', color: category === c ? '#1a1a1a' : '#888', fontWeight: category === c ? 500 : 400, borderBottom: category === c ? '1px solid #c9a96e' : '1px solid transparent', fontFamily: "'Jost', sans-serif", transition: 'color .15s' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>Max Price: ${priceMax}</div>
          <input type="range" min="50" max="1000" step="50" value={priceMax} onChange={e => setPriceMax(+e.target.value)}
            style={{ width: '100%', accentColor: '#c9a96e' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#aaa', marginTop: '4px' }}>
            <span>$50</span><span>$1000</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px', color: '#888' }}>Tags</div>
          {['New', 'Bestseller', 'Sale'].map(tag => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
              <div style={{ width: '14px', height: '14px', border: '1px solid #d0cbc4' }} />
              <span style={{ fontSize: '0.85rem', color: '#666' }}>{tag}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400 }}>{category === 'All' ? 'All Products' : category}</h1>
            <p style={{ color: '#888', fontSize: '0.82rem', marginTop: '4px' }}>{filtered.length} pieces</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '9px 14px', border: '1px solid #e8e4de', background: 'transparent', fontSize: '0.85rem', outline: 'none', fontFamily: "'Jost', sans-serif", width: '180px' }}
            />
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: '9px 14px', border: '1px solid #e8e4de', background: '#faf9f7', fontSize: '0.82rem', fontFamily: "'Jost', sans-serif", cursor: 'pointer', outline: 'none' }}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#888' }}>No products found</p>
            <p style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '8px' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
