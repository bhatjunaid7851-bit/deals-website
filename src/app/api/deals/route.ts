import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDb } from '@/lib/db';
import { deals } from '@/lib/schema';
import { MOCK_DEALS } from '@/lib/mock-data';
import { wrapAffiliateUrl } from '@/lib/affiliate';
import { desc, eq, like, and } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const query = searchParams.get('q');

  try {
    const { env } = await getCloudflareContext();
    const db = getDb((env as any).DB);

    const conditions = [];
    if (category && category !== 'all') {
      // Map slug to categoryId roughly or query join
      const catMap: Record<string, number> = {
        electronics: 1,
        fashion: 2,
        food: 3,
        home: 4,
        beauty: 5,
        travel: 6,
        essentials: 7,
      };
      if (catMap[category]) {
        conditions.push(eq(deals.categoryId, catMap[category]));
      }
    }
    if (featured === 'true') {
      conditions.push(eq(deals.isFeatured, true));
    }
    if (query) {
      conditions.push(like(deals.title, `%${query}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const dbDeals = await db.select().from(deals).where(whereClause).orderBy(desc(deals.createdAt)).limit(50);

    if (dbDeals.length > 0) {
      return NextResponse.json({ deals: dbDeals, source: 'd1' });
    }
  } catch (err) {
    // Local dev fallback if D1 binding is not initialized or running without wrangler
  }

  // Fallback to mock data with client-side style filtering
  let filtered = [...MOCK_DEALS];
  if (category && category !== 'all') {
    const catMap: Record<string, number> = {
      electronics: 1,
      fashion: 2,
      food: 3,
      home: 4,
      beauty: 5,
      travel: 6,
      essentials: 7,
    };
    if (catMap[category]) {
      filtered = filtered.filter((d) => d.categoryId === catMap[category]);
    }
  }
  if (featured === 'true') {
    filtered = filtered.filter((d) => d.isFeatured);
  }
  if (query) {
    const qLower = query.toLowerCase();
    filtered = filtered.filter((d) => d.title.toLowerCase().includes(qLower) || d.description?.toLowerCase().includes(qLower));
  }

  return NextResponse.json({ deals: filtered, source: 'mock' });
}

export async function POST(request: NextRequest) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'raju@admin2024';

    if (adminSecret !== expectedSecret) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid or missing Admin Secret Key' }, { status: 401 });
    }

    const body = await request.json();
    const { env } = await getCloudflareContext();
    const db = getDb((env as any).DB);

    const inserted = await db.insert(deals).values({
      title: body.title,
      description: body.description || '',
      originalPrice: Number(body.originalPrice),
      dealPrice: Number(body.dealPrice),
      discountPct: Math.round(((Number(body.originalPrice) - Number(body.dealPrice)) / Number(body.originalPrice)) * 100),
      affiliateUrl: wrapAffiliateUrl(body.affiliateUrl),
      sourceUrl: body.sourceUrl || body.affiliateUrl,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      platform: body.platform || 'Amazon',
      categoryId: Number(body.categoryId) || 1,
      isFeatured: Boolean(body.isFeatured),
      source: body.source || 'manual',
    }).returning();

    return NextResponse.json({ success: true, deal: inserted[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
