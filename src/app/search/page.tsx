import React from 'react';
import CategoryNav from '@/components/CategoryNav';
import DealGrid from '@/components/DealGrid';
import { MOCK_DEALS } from '@/lib/mock-data';
import { Search, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const q = resolved.q;
  return {
    title: q ? `Search results for "${q}" — AutoClaimer Deals` : 'Search Deals & Coupons — AutoClaimer Deals',
    description: `Find the best verified offers and discounts matching "${q || 'your search'}".`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = await searchParams;
  const query = resolved.q || '';

  const filteredDeals = query.trim()
    ? MOCK_DEALS.filter((d) =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.description?.toLowerCase().includes(query.toLowerCase()) ||
        d.platform.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_DEALS;

  return (
    <div className="container" style={{ padding: '24px 20px' }}>
      <CategoryNav activeSlug="all" />

      <div style={{
        background: 'var(--surface)',
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        margin: '24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
            <Search size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', marginBottom: '2px' }}>
              {query ? `Search Results for "${query}"` : 'All Available Deals'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Found {filteredDeals.length} active price drops & verified coupons
            </p>
          </div>
        </div>
      </div>

      <DealGrid deals={filteredDeals} />
    </div>
  );
}
