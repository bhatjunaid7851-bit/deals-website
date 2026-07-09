'use client';

import React, { useState } from 'react';
import { MOCK_CATEGORIES } from '@/lib/mock-data';
import { PlusCircle, Tag, Check } from 'lucide-react';

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    const newCat = {
      id: categories.length + 1,
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      icon: 'tag',
      order: categories.length + 1,
    };
    setCategories([...categories, newCat]);
    setName('');
    setSlug('');
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Category Management ({categories.length})</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Organize shopping categories and navigation pills for your visitors.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <form onSubmit={handleAdd} className="admin-card" style={{ height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem' }}>Add New Category</h3>
          
          <div className="form-group">
            <label className="form-label">Category Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Footwear & Shoes"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL Slug *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. footwear"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
            <PlusCircle size={18} /> Create Category
          </button>
        </form>

        <div className="admin-card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>ID</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>CATEGORY NAME</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>URL SLUG</th>
                <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>ORDER</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 18px', fontWeight: 700 }}>#{cat.id}</td>
                  <td style={{ padding: '16px 18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={16} color="var(--accent-primary)" /> {cat.name}
                  </td>
                  <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>/category/{cat.slug}</td>
                  <td style={{ padding: '16px 18px' }}>{cat.order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
