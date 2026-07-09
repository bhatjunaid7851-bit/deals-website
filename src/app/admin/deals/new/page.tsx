'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_CATEGORIES } from '@/lib/mock-data';
import { PlusCircle, Send, Check, AlertCircle } from 'lucide-react';

export default function AddDealPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    originalPrice: '',
    dealPrice: '',
    platform: 'Amazon',
    categoryId: '1',
    affiliateUrl: '',
    imageUrl: '',
    description: '',
    isFeatured: true,
    broadcastToTg: true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const calculateDiscount = () => {
    const orig = Number(formData.originalPrice);
    const deal = Number(formData.dealPrice);
    if (orig && deal && orig > deal) {
      return Math.round(((orig - deal) / orig) * 100);
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const adminSecret = localStorage.getItem('autoclaimer_admin_auth') || 'raju@admin2024';

      // 1. Save to database / API
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Admin-Secret': adminSecret,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save deal');
      }

      // 2. Broadcast to Telegram if requested
      if (formData.broadcastToTg) {
        await fetch('/api/telegram/post', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Admin-Secret': adminSecret,
          },
          body: JSON.stringify({
            title: formData.title,
            dealPrice: formData.dealPrice,
            originalPrice: formData.originalPrice,
            discountPct: calculateDiscount(),
            platform: formData.platform,
            url: formData.affiliateUrl,
            imageUrl: formData.imageUrl,
          }),
        }).catch(() => {}); // Don't fail the whole form if TG bot isn't configured locally yet
      }

      setSuccessMsg(`Deal "${formData.title}" published successfully!`);
      setFormData({
        title: '',
        originalPrice: '',
        dealPrice: '',
        platform: 'Amazon',
        categoryId: '1',
        affiliateUrl: '',
        imageUrl: '',
        description: '',
        isFeatured: true,
        broadcastToTg: true,
      });

      setTimeout(() => {
        router.push('/admin/deals');
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while saving the deal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Post New Deal</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Add a verified coupon or discount. This immediately publishes to the website and optional Telegram broadcast.
      </p>

      {successMsg && (
        <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={20} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={20} /> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="form-group">
          <label className="form-label">Deal Title / Product Name *</label>
          <input
            type="text"
            required
            className="form-input"
            placeholder="e.g. Apple AirPods Pro (2nd Gen) with MagSafe USB-C Case..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Original Price (₹) *</label>
            <input
              type="number"
              required
              className="form-input"
              placeholder="24900"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deal Price (₹) *</label>
            <input
              type="number"
              required
              className="form-input"
              placeholder="18999"
              value={formData.dealPrice}
              onChange={(e) => setFormData({ ...formData, dealPrice: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Discount (%)</label>
            <div style={{
              padding: '10px 14px',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              color: 'var(--success)',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              height: '45px'
            }}>
              {calculateDiscount()}% OFF
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Platform / Store *</label>
            <select
              className="form-select"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            >
              <option value="Amazon">Amazon India</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Myntra">Myntra</option>
              <option value="Swiggy">Swiggy</option>
              <option value="Zomato">Zomato</option>
              <option value="Nykaa">Nykaa</option>
              <option value="MakeMyTrip">MakeMyTrip</option>
              <option value="Other">Other Store</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              {MOCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Affiliate / Product Destination URL *</label>
          <input
            type="url"
            required
            className="form-input"
            placeholder="https://amazon.in/dp/B0CHX3?tag=autoclaimer-21"
            value={formData.affiliateUrl}
            onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL *</label>
          <input
            type="url"
            required
            className="form-input"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description & Offer Highlights</label>
          <textarea
            rows={3}
            className="form-textarea"
            placeholder="Enter key details, coupon code (e.g. Use code LOOT50), or bank card discounts..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
            />
            <span>Pin as Featured / Today&apos;s Top Loot Deal</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, color: '#2563EB' }}>
            <input
              type="checkbox"
              checked={formData.broadcastToTg}
              onChange={(e) => setFormData({ ...formData, broadcastToTg: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#2563EB' }}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={16} /> Auto-broadcast to Telegram Channel (@AutoClaimerDeals)
            </span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '14px', fontSize: '1.05rem', marginTop: '8px' }}>
          {loading ? 'Publishing Offer...' : 'Publish Deal & Broadcast'}
        </button>
      </form>
    </div>
  );
}
