'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_DEALS } from '@/lib/mock-data';
import { PlusCircle, ExternalLink, Trash2, Eye, EyeOff, Tag } from 'lucide-react';

export default function ManageDealsPage() {
  const [deals, setDeals] = useState(MOCK_DEALS);

  const toggleActive = (id: number) => {
    setDeals(deals.map((d) => d.id === id ? { ...d, isActive: !d.isActive } : d));
  };

  const deleteDeal = (id: number) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter((d) => d.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>All Published Deals ({deals.length})</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage active status, delete expired coupons, or inspect product links.</p>
        </div>
        <Link href="/admin/deals/new" className="btn btn-primary">
          <PlusCircle size={18} /> Add New Deal
        </Link>
      </div>

      <div className="admin-card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
              <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>DEAL PRODUCT</th>
              <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PLATFORM</th>
              <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PRICING</th>
              <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>STATUS</th>
              <th style={{ padding: '14px 18px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}>
                <td style={{ padding: '16px 18px', maxWidth: '320px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={deal.imageUrl} alt={deal.title} style={{ width: '48px', height: '48px', objectFit: 'contain', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', padding: '4px' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {deal.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ID: #{deal.id} • Source: {deal.source}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    {deal.platform}
                  </span>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'Outfit, sans-serif' }}>₹{deal.dealPrice}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>{deal.discountPct}% OFF</div>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => toggleActive(deal.id)}
                    className="badge"
                    style={{
                      background: deal.isActive ? 'var(--success-light)' : 'var(--danger-light)',
                      color: deal.isActive ? 'var(--success)' : 'var(--danger)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: 'none'
                    }}
                  >
                    {deal.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                    {deal.isActive ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }} title="Visit store link">
                      <ExternalLink size={14} />
                    </a>
                    <button onClick={() => deleteDeal(deal.id)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem', color: 'var(--danger)' }} title="Delete deal">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
