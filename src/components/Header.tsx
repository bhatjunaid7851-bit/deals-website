'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Tag, Sparkles, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <Sparkles size={26} color="#EA580C" />
          AutoClaimer <span>Deals</span>
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search deals, laptops, fashion, Amazon coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/category/all" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <Tag size={16} /> All Categories
          </Link>
        </div>
      </div>
    </header>
  );
}
