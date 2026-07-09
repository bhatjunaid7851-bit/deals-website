import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_DEALS } from '@/lib/mock-data';
import DealGrid from '@/components/DealGrid';
import { ExternalLink, ShieldCheck, Clock, Share2, Sparkles, Send, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface DealPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DealPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const deal = MOCK_DEALS.find((d) => d.id === Number(resolvedParams.id));
  if (!deal) return { title: 'Deal Not Found — AutoClaimer Deals' };
  return {
    title: `${deal.title} (${deal.discountPct}% OFF) — AutoClaimer Deals`,
    description: deal.description || `Buy ${deal.title} at ${deal.dealPrice} INR. Lowest verified price on ${deal.platform}.`,
  };
}

export default async function DealDetailPage({ params }: DealPageProps) {
  const resolvedParams = await params;
  const dealId = Number(resolvedParams.id);
  const deal = MOCK_DEALS.find((d) => d.id === dealId);

  if (!deal) {
    notFound();
  }

  const formattedDealPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(deal.dealPrice);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(deal.originalPrice);

  const savings = deal.originalPrice - deal.dealPrice;
  const formattedSavings = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(savings);

  const relatedDeals = MOCK_DEALS.filter((d) => d.categoryId === deal.categoryId && d.id !== deal.id).slice(0, 3);

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      {/* Back link */}
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to All Deals
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        background: 'var(--surface)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '48px',
      }} className="deal-detail-layout">
        {/* Left: Product Image */}
        <div style={{
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '400px',
        }}>
          <img
            src={deal.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
            alt={deal.title}
            style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
          />
          <div className="badge-discount" style={{ fontSize: '1rem', padding: '6px 14px' }}>
            {deal.discountPct}% OFF
          </div>
        </div>

        {/* Right: Deal Details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="badge" style={{ background: 'var(--text-primary)', color: '#FFFFFF' }}>
              {deal.platform}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
              <ShieldCheck size={16} /> 100% Verified Price Drop
            </span>
          </div>

          <h1 style={{ fontSize: '1.75rem', marginBottom: '20px', lineHeight: 1.3 }}>
            {deal.title}
          </h1>

          <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>CURRENT OFFER PRICE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'Outfit, sans-serif' }}>
                {formattedDealPrice}
              </span>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formattedOriginalPrice}
              </span>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--success)', fontWeight: 700, marginTop: '8px' }}>
              You Save: {formattedSavings} ({deal.discountPct}% discount)
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
            {deal.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
            <a
              href={deal.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, padding: '16px 24px', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)' }}
            >
              Buy on {deal.platform} <ExternalLink size={20} />
            </a>
          </div>

          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: '#EFF6FF', 
            border: '1px solid #BFDBFE', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px' 
          }}>
            <div style={{ background: '#2563EB', color: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-full)' }}>
              <Send size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1E3A8A', fontSize: '0.95rem' }}>Don&apos;t miss flash loot deals!</div>
              <div style={{ fontSize: '0.85rem', color: '#3B82F6' }}>Join our Telegram Channel for instant price error & coupon alerts.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Deals */}
      {relatedDeals.length > 0 && (
        <>
          <div className="section-header">
            <h2 className="section-title">
              <Sparkles color="#EA580C" size={24} /> Similar Offers in this Category
            </h2>
          </div>
          <DealGrid deals={relatedDeals} />
        </>
      )}
    </div>
  );
}
