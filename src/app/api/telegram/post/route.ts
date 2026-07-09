import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { wrapAffiliateUrl } from '@/lib/affiliate';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'raju@admin2024';

    if (adminSecret !== expectedSecret) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid or missing Admin Secret Key' }, { status: 401 });
    }

    const body = await request.json();
    const { title, dealPrice, originalPrice, discountPct, platform, url, imageUrl } = body;

    let botToken = process.env.TG_DEALS_BOT_TOKEN;
    let channelId = process.env.TG_DEALS_CHANNEL_ID || '@AutoClaimerDeals';

    try {
      const { env } = await getCloudflareContext();
      if ((env as any).TG_DEALS_BOT_TOKEN) botToken = (env as any).TG_DEALS_BOT_TOKEN;
      if ((env as any).TG_DEALS_CHANNEL_ID) channelId = (env as any).TG_DEALS_CHANNEL_ID;
    } catch {}

    const monetizedUrl = wrapAffiliateUrl(url);

    // Format rich Telegram message with HTML styling and urgency triggers
    const messageHtml = `
🔥 <b>LOOT DEAL ALERT (${discountPct}% OFF)</b> 🔥

🏷️ <b>${title}</b>

💰 <b>Deal Price:</b> ₹${dealPrice}
❌ <del>Regular Price: ₹${originalPrice}</del>
⚡ <b>You Save: ₹${Number(originalPrice) - Number(dealPrice)} (${discountPct}% Discount)</b>

🏬 <b>Store:</b> ${platform || 'Amazon India'}
🛡️ <i>100% Verified Price Drop</i>

👉 <b>CLAIM OFFER NOW:</b>
${monetizedUrl}

⚠️ <i>Price & stock may change anytime! Order immediately.</i>
📌 Join @AutoClaimerDeals for instant error price alerts.
`.trim();

    if (!botToken) {
      // Return simulated success if bot token is not configured yet locally
      console.log('--- SIMULATED TELEGRAM BROADCAST ---');
      console.log(`To Channel: ${channelId}`);
      console.log(messageHtml);
      return NextResponse.json({
        success: true,
        simulated: true,
        message: 'Bot token not set. Simulated broadcast successfully!',
        formatted: messageHtml
      });
    }

    // If imageUrl is present, send as photo with caption, otherwise send message
    const apiUrl = imageUrl
      ? `https://api.telegram.org/bot${botToken}/sendPhoto`
      : `https://api.telegram.org/bot${botToken}/sendMessage`;

    const payload = imageUrl
      ? {
          chat_id: channelId,
          photo: imageUrl,
          caption: messageHtml,
          parse_mode: 'HTML',
        }
      : {
          chat_id: channelId,
          text: messageHtml,
          parse_mode: 'HTML',
          disable_web_page_preview: false,
        };

    const tgResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const tgResult = await tgResponse.json();

    if (!tgResponse.ok || !tgResult.ok) {
      return NextResponse.json({
        success: false,
        error: tgResult.description || 'Telegram Bot API rejected the message',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      messageId: tgResult.result.message_id,
      channel: channelId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
