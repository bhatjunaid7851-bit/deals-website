import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AutoClaimer Deals — India’s Smartest Shopping Discounts & Coupons',
  description: 'Instantly find the highest verified price drops, coupons, and loot offers from Amazon, Flipkart, Myntra, Swiggy, and top Telegram deal channels.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
