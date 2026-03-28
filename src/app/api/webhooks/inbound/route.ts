import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/inbound
 * Inbound lead capture webhook (STUB for Sales Control).
 * Receives form submissions forwarded from /api/lead.
 */
export async function POST() {
  // STUB: Process inbound lead
  // When Sales Control is built:
  // 1. Parse request body and verify secret
  // 2. Create lead with status='pending_optin'
  // 3. Send double opt-in email (HMAC-signed confirmation link, 7-day expiry)
  // 4. Link anonymous visitor clicks by visitorId

  return NextResponse.json({ received: true });
}
