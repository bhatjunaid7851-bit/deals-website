import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Affiliate Disclosure — AutoClaimer Deals',
  description: 'Legal transparency, data privacy compliance (DPDP Act 2023), and affiliate disclosure for AutoClaimer Deals.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Today&apos;s Top Deals
      </Link>

      <div style={{
        background: 'var(--surface)',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.85rem', marginBottom: '2px' }}>Privacy Policy & Affiliate Disclosure</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '32px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Lock color="#2563EB" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 700, color: '#1E3A8A', fontSize: '0.95rem' }}>Data Minimization & Security Commitment</div>
            <div style={{ fontSize: '0.85rem', color: '#3B82F6', lineHeight: 1.5, marginTop: '4px' }}>
              We strictly adhere to the principle of <strong>data minimization</strong> and implement appropriate technical and organizational security measures. We do not require account registration, nor do we request or store names, phone numbers, email addresses, payment cards, or physical shipping addresses inside our application databases.
            </div>
          </div>
        </div>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            1. Information Collection & Data Privacy (India DPDP Act 2023)
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            In alignment with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and standard industry privacy practices, our platform operates as a public shopping discovery and deals aggregator:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <CheckCircle2 size={18} color="var(--success)" /> No user registration databases or mandatory login barriers.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <CheckCircle2 size={18} color="var(--success)" /> Application databases store only public deal listings and anonymous interaction counts.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <CheckCircle2 size={18} color="var(--success)" /> Standard network connectivity and edge infrastructure providers (like Cloudflare) may process standard TCP/IP network connection headers (such as IP addresses and basic TLS access logs) strictly for security, DDoS protection, and traffic routing.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            2. Third-Party E-Commerce Transactions
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            When you click any deal, coupon, or &quot;Buy on Store&quot; button on AutoClaimer Deals, your web browser redirects directly to the official merchant platform (such as <strong>Amazon India, Flipkart, Myntra, Swiggy, Zomato, Nykaa, or MakeMyTrip</strong>). All purchases, payments, shipping, warranties, and returns are handled directly and securely on the respective merchant&apos;s servers under their individual privacy policies and terms of service.
          </p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            3. Mandatory Affiliate & Financial Disclosure
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            To maintain and operate our high-speed automated price-verification servers free of cost for consumers, AutoClaimer Deals participates in various official e-commerce affiliate programs:
          </p>
          <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Amazon Associates Disclosure:
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
              &quot;AutoClaimer Deals is a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.&quot;
            </p>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Flipkart & Brand Affiliate Disclosure:
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We also participate in affiliate networks with Flipkart, Myntra, and other leading retail partners. When you click our links and make qualifying purchases, we may earn a small referral commission at <strong>absolutely zero additional cost to you</strong>.
            </p>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            4. Contact & Legal Inquiries
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            If you have any questions regarding our compliance, copyright protection, or price verification algorithms, you may contact our administrators directly via our official Telegram Channel at <a href="https://t.me/AutoClaimerDeals" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>@AutoClaimerDeals</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
