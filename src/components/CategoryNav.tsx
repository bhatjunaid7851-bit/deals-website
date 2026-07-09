'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  Smartphone, 
  Shirt, 
  Utensils, 
  Home, 
  Sparkles, 
  Plane, 
  ShoppingBag 
} from 'lucide-react';

const CATEGORIES = [
  { name: 'All Deals', slug: 'all', icon: Zap },
  { name: 'Electronics', slug: 'electronics', icon: Smartphone },
  { name: 'Fashion', slug: 'fashion', icon: Shirt },
  { name: 'Food & Dining', slug: 'food', icon: Utensils },
  { name: 'Home & Kitchen', slug: 'home', icon: Home },
  { name: 'Beauty & Care', slug: 'beauty', icon: Sparkles },
  { name: 'Travel & Flights', slug: 'travel', icon: Plane },
  { name: 'Daily Essentials', slug: 'essentials', icon: ShoppingBag },
];

interface CategoryNavProps {
  activeSlug?: string;
}

export default function CategoryNav({ activeSlug = 'all' }: CategoryNavProps) {
  return (
    <nav className="category-nav">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeSlug === cat.slug;
        const href = cat.slug === 'all' ? '/' : `/category/${cat.slug}`;

        return (
          <Link
            key={cat.slug}
            href={href}
            className={`category-pill ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} />
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
