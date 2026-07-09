import React from 'react';
import DealCard from './DealCard';
import type { Deal } from '@/lib/schema';
import { Tag } from 'lucide-react';

interface DealGridProps {
  deals: Deal[];
}

export default function DealGrid({ deals }: DealGridProps) {
  if (!deals || deals.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '64px 20px',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        margin: '24px 0'
      }}>
        <Tag size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No deals found right now</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
          Check back shortly or pick a different category! Our automated system updates loot offers every 10 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="deal-grid">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
