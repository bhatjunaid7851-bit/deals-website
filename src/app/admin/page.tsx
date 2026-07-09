'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_DEALS, MOCK_CATEGORIES } from '@/lib/mock-data';
import { Flame, ShieldCheck, PlusCircle, List, Tag, Send, CheckCircle2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const activeDeals = MOCK_DEALS.filter((d) => d.isActive);
  const featuredDeals = MOCK_DEALS.filter((d) => d.isFeatured);

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Welcome back! Here is what&apos;s happening across your AutoClaimer Deals network.
      </p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        <div className="admin-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>TOTAL DEALS</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{MOCK_DEALS.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} /> {activeDeals.length} Active Offers
          </div>
        </div>

        <div className="admin-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>FEATURED LOOT</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--accent-primary)' }}>{featuredDeals.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Pinned to Hero Section</div>
        </div>

        <div className="admin-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>CATEGORIES</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{MOCK_CATEGORIES.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Active Shopping Niches</div>
        </div>

        <div className="admin-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>TELEGRAM BOT STATUS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Send size={22} /> Standby
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Ready for manual & auto broadcasts</div>
        </div>
      </div>

      {/* Quick Actions & Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle color="var(--accent-primary)" size={20} /> Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/admin/deals/new" className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '12px 16px' }}>
              <PlusCircle size={18} /> Post New Loot Deal & Broadcast
            </Link>
            <Link href="/admin/deals" className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '12px 16px' }}>
              <List size={18} /> View & Manage All Published Deals
            </Link>
            <Link href="/admin/categories" className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '12px 16px' }}>
              <Tag size={18} /> Manage Category Niches
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck color="var(--success)" size={20} /> System Architecture Note
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '14px' }}>
            Your deals website runs on <strong>Cloudflare Pages & D1 Edge Database</strong>, which consumes <strong>0 MB RAM</strong> on your host VPS.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Your existing TG Auto Claimer application and 5x GramJS listeners (`/opt/tg-listener*`) remain 100% untouched on your VPS (`api.autoclaimer.in`).
          </p>
        </div>
      </div>
    </div>
  );
}
