export const AFFILIATE_CONFIG = {
  amazonTag: 'autoclaimer-21',
  flipkartId: 'autoclaimer',
  campaign: 'autoclaimer_deals',
};

/**
 * Automatically wraps e-commerce destination URLs with your configured affiliate tags.
 * Preserves existing URL parameters while ensuring proper monetization.
 */
export function wrapAffiliateUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  try {
    const urlObj = new URL(rawUrl.trim());
    const hostname = urlObj.hostname.toLowerCase();

    // 1. Amazon India (amazon.in / amzn.in)
    if (hostname.includes('amazon.') || hostname.includes('amzn.')) {
      urlObj.searchParams.set('tag', AFFILIATE_CONFIG.amazonTag);
      return urlObj.toString();
    }

    // 2. Flipkart (flipkart.com)
    if (hostname.includes('flipkart.com')) {
      urlObj.searchParams.set('affid', AFFILIATE_CONFIG.flipkartId);
      return urlObj.toString();
    }

    // 3. Myntra (myntra.com)
    if (hostname.includes('myntra.com')) {
      urlObj.searchParams.set('utm_source', 'affiliate');
      urlObj.searchParams.set('utm_campaign', AFFILIATE_CONFIG.campaign);
      return urlObj.toString();
    }

    // 4. Nykaa (nykaa.com)
    if (hostname.includes('nykaa.com')) {
      urlObj.searchParams.set('utm_source', 'autoclaimer');
      urlObj.searchParams.set('utm_medium', 'affiliate');
      return urlObj.toString();
    }

    // Default: return valid URL untouched or with general UTM tracking
    if (!urlObj.searchParams.has('utm_source')) {
      urlObj.searchParams.set('utm_source', 'autoclaimer_deals');
    }
    return urlObj.toString();
  } catch {
    // If not a valid absolute URL, return as is
    return rawUrl;
  }
}
