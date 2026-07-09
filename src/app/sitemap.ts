import { MetadataRoute } from 'next';
import { MOCK_DEALS, MOCK_CATEGORIES } from '@/lib/mock-data';

export const runtime = 'edge';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.autoclaimer.in';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Category routes
  const categoryRoutes = MOCK_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }));

  // Deal detail routes
  const dealRoutes = MOCK_DEALS.map((deal) => ({
    url: `${baseUrl}/deal/${deal.id}`,
    lastModified: new Date(deal.createdAt),
    changeFrequency: 'daily' as const,
    priority: deal.isFeatured ? 0.95 : 0.85,
  }));

  return [...routes, ...categoryRoutes, ...dealRoutes];
}
