CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`icon` text DEFAULT 'tag' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`deal_id` integer NOT NULL,
	`clicked_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`referrer` text,
	`user_agent` text,
	FOREIGN KEY (`deal_id`) REFERENCES `deals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `deals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`original_price` real NOT NULL,
	`deal_price` real NOT NULL,
	`discount_pct` integer NOT NULL,
	`affiliate_url` text NOT NULL,
	`source_url` text NOT NULL,
	`image_url` text NOT NULL,
	`platform` text DEFAULT 'Amazon' NOT NULL,
	`category_id` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`is_expired` integer DEFAULT false NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`source` text DEFAULT 'manual' NOT NULL,
	`source_msg_id` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`expires_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
