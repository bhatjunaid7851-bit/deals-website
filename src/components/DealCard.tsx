'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Clock, Flame } from 'lucide-react';
import type { Deal } from '@/lib/schema';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
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

  const isUrgent = deal.discountPct >= 65 || deal.isFeatured;

  return (
    <div className="deal-card">
      <Link href={`/deal/${deal.id}`} className="deal-card-image-wrap">
        <img
          src={deal.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'}
          alt={deal.title}
          className="deal-card-image"
          loading="lazy"
        />
        <div className="badge-discount">
          {deal.discountPct}% OFF
        </div>
        
        <div className="badge-platform">
          {deal.platform}
        </div>

        {isUrgent && (
          <div className="badge-urgent" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Flame size={13} /> LOOT DEAL
          </div>
        )}
      </Link>

      <div className="deal-card-body">
        <Link href={`/deal/${deal.id}`}>
          <h3 className="deal-card-title" title={deal.title}>
            {deal.title}
          </h3>
        </Link>

        <div className="deal-card-pricing">
          <span className="deal-price">{formattedDealPrice}</span>
          <span className="original-price">{formattedOriginalPrice}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Link href={`/deal/${deal.id}`} className="deal-card-btn" style={{ flex: 1 }}>
            View Offer <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
