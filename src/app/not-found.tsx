import React from 'react';
import Link from 'next/link';
import { Tag, Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '580px' }}>
      <div style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)', width: '72px', height: '72px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <Tag size={36} />
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Offer Expired or Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
        The deal or discount coupon you are looking for might have expired, sold out, or moved. Don&apos;t worry — hundreds of new loot offers are added every hour!
      </p>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
          <Home size={18} /> Back to Today&apos;s Top Deals
        </Link>
        <Link href="/search" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
          <Search size={18} /> Search Coupons
        </Link>
      </div>
    </div>
  );
}
