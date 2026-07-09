import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section" style={{ maxWidth: '320px' }}>
            <div className="logo" style={{ marginBottom: '12px' }}>
              <Sparkles size={22} color="#EA580C" />
              AutoClaimer <span>Deals</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              India&apos;s smartest shopping intelligence platform. We automatically track, verify, and curate the best discounts across Amazon, Flipkart, Myntra, and top deal channels so you never overpay.
            </p>
          </div>

          <div className="footer-section">
            <h4>Popular Categories</h4>
            <ul className="footer-links">
              <li><Link href="/category/electronics">Electronics & Gadgets</Link></li>
              <li><Link href="/category/fashion">Fashion & Clothing</Link></li>
              <li><Link href="/category/food">Food & Delivery</Link></li>
              <li><Link href="/category/home">Home & Kitchen</Link></li>
              <li><Link href="/category/travel">Travel & Flights</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><Link href="/search">Search All Deals</Link></li>
              <li><Link href="/privacy">Privacy & Affiliate Disclosure</Link></li>
              <li><a href="https://t.me/AutoClaimerDeals" target="_blank" rel="noopener noreferrer">Telegram Channel</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Trust & Transparency</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '240px' }}>
              As an Amazon Associate and Flipkart Affiliate, we earn from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AutoClaimer Deals (`www.autoclaimer.in`). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
