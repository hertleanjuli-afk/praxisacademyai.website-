import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/brevo
 * Brevo email event webhook handler (STUB).
 * Events: delivered, opened, click, unsubscribed, complaint, hard_bounce, soft_bounce, reply
 * Verification: HMAC-SHA256 via x-brevo-signature header
 */
export async function POST() {
  const secret = process.env.BREVO_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Brevo webhook not configured" },
      { status: 503 }
    );
  }

  // STUB: Verify HMAC-SHA256 signature from x-brevo-signature header
  // crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  // timingSafeEqual to prevent timing attacks

  return NextResponse.json({ received: true });
}
