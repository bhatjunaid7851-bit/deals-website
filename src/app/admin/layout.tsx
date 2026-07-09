'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, PlusCircle, List, Tag, LogOut, Lock } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('autoclaimer_admin_auth');
    if (saved === 'raju@admin2024' || saved === 'admin') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'raju@admin2024' || password === 'admin') {
      localStorage.setItem('autoclaimer_admin_auth', password);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Admin Key');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('autoclaimer_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '64px 20px', maxWidth: '480px' }}>
        <div className="admin-card" style={{ textAlign: 'center' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Admin Portal Login</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Enter your secret master key to manage deals, loot offers, and Telegram broadcasts.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="password"
              className="form-input"
              placeholder="Enter Admin Password or Secret Key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: 'center', fontSize: '1rem' }}
            />
            {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600 }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ padding: '12px', fontSize: '1rem' }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 20px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--surface)',
        padding: '16px 24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-sm)',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={24} color="var(--accent-primary)" />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            AutoClaimer <span style={{ color: 'var(--text-secondary)' }}>Admin Portal</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/admin" className={`btn ${pathname === '/admin' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            Dashboard
          </Link>
          <Link href="/admin/deals/new" className={`btn ${pathname === '/admin/deals/new' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <PlusCircle size={16} /> Add Deal
          </Link>
          <Link href="/admin/deals" className={`btn ${pathname === '/admin/deals' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <List size={16} /> All Deals
          </Link>
          <Link href="/admin/categories" className={`btn ${pathname === '/admin/categories' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <Tag size={16} /> Categories
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem', color: 'var(--danger)' }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
