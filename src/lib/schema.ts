import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon').notNull().default('tag'),
  order: integer('order').notNull().default(0),
});

export const deals = sqliteTable('deals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  originalPrice: real('original_price').notNull(),
  dealPrice: real('deal_price').notNull(),
  discountPct: integer('discount_pct').notNull(),
  affiliateUrl: text('affiliate_url').notNull(),
  sourceUrl: text('source_url').notNull(),
  imageUrl: text('image_url').notNull(),
  platform: text('platform').notNull().default('Amazon'), // Amazon, Flipkart, Myntra, Swiggy, Zomato, Other
  categoryId: integer('category_id').references(() => categories.id),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  isExpired: integer('is_expired', { mode: 'boolean' }).notNull().default(false),
  isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
  source: text('source').notNull().default('manual'), // manual, telegram, scraper
  sourceMsgId: text('source_msg_id'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  expiresAt: text('expires_at'),
});

export const clicks = sqliteTable('clicks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  dealId: integer('deal_id').notNull().references(() => deals.id),
  clickedAt: text('clicked_at').notNull().default('CURRENT_TIMESTAMP'),
});

export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Click = typeof clicks.$inferSelect;
