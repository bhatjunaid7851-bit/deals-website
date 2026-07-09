import React from 'react';
import CategoryNav from '@/components/CategoryNav';
import DealGrid from '@/components/DealGrid';
import { MOCK_DEALS } from '@/lib/mock-data';
import { Sparkles, Flame, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

async function getInitialDeals() {
  try {
    // Attempt internal fetch or use mock fallback
    return MOCK_DEALS;
  } catch {
    return MOCK_DEALS;
  }
}

export default async function HomePage() {
  const allDeals = await getInitialDeals();
  const lootDeals = allDeals.filter((d) => d.isFeatured || d.discountPct >= 50);
  const trendingDeals = allDeals.slice(0, 9);

  return (
    <div className="container">
      {/* Category Pills */}
      <CategoryNav activeSlug="all" />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', backdropFilter: 'blur(4px)' }}>
            <Sparkles size={14} color="#FFFFFF" /> VERIFIED DEALS UPDATED EVERY 10 MINUTES
          </div>
          <h1 className="hero-title">
            Never Pay Full Price Again.
          </h1>
          <p className="hero-subtitle">
            AutoClaimer instantly tracks, verifies, and curates the biggest price drops, coupon codes, and flash loot deals across Amazon, Flipkart, Myntra, and Telegram.
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '16px', 
        margin: '24px 0 40px 0' 
      }}>
        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{allDeals.length}+ Active</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Verified Loot Deals Today</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px' }}>
          <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>100% Genuine</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct Official Store Links</div>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px' }}>
          <div style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <Zap size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Instant Alerts</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Via Telegram Channel</div>
          </div>
        </div>
      </div>

      {/* Featured Loot Section */}
      <div className="section-header">
        <h2 className="section-title">
          <Flame color="#EA580C" fill="#EA580C" size={24} /> Today&apos;s Top Loot Deals
        </h2>
        <Link href="/category/all" style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          See All Offers <ArrowRight size={16} />
        </Link>
      </div>
      <DealGrid deals={lootDeals} />

      {/* Latest & Trending Section */}
      <div className="section-header">
        <h2 className="section-title">
          <Sparkles color="#EA580C" size={24} /> Latest Verified Drops
        </h2>
      </div>
      <DealGrid deals={trendingDeals} />
    </div>
  );
}
