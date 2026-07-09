import React from 'react';
import CategoryNav from '@/components/CategoryNav';
import DealGrid from '@/components/DealGrid';
import { MOCK_DEALS, MOCK_CATEGORIES } from '@/lib/mock-data';
import { Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = MOCK_CATEGORIES.find((c) => c.slug === resolvedParams.slug);
  const name = cat ? cat.name : resolvedParams.slug === 'all' ? 'All Deals' : 'Category';
  return {
    title: `${name} Discounts & Coupons — AutoClaimer Deals`,
    description: `Browse verified ${name.toLowerCase()} price drops, promo codes, and loot offers across Amazon and Flipkart.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let filteredDeals = MOCK_DEALS;
  let categoryName = 'All Deals';

  if (slug && slug !== 'all') {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === slug);
    if (cat) {
      categoryName = cat.name;
      filteredDeals = MOCK_DEALS.filter((d) => d.categoryId === cat.id);
    } else {
      filteredDeals = [];
      categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  }

  return (
    <div className="container" style={{ padding: '24px 20px' }}>
      <CategoryNav activeSlug={slug} />

      <div className="section-header" style={{ marginTop: '24px' }}>
        <h1 className="section-title">
          <Tag color="#EA580C" size={24} /> {categoryName} Offers ({filteredDeals.length})
        </h1>
      </div>

      <DealGrid deals={filteredDeals} />
    </div>
  );
}
