import { NextResponse } from "next/server";

/**
 * GET /api/unsubscribe?token=...
 * HMAC-signed unsubscribe link handler (STUB for future Brevo).
 * Token format: base64(email:expiry_timestamp):hmac_signature
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // STUB: Verify HMAC signature and process unsubscribe
  // When Brevo is connected:
  // 1. Decode base64(email:expiry) from token
  // 2. Verify HMAC-SHA256 signature with BREVO_WEBHOOK_SECRET
  // 3. Check expiry (365 days)
  // 4. Set permanently_blocked = TRUE in database
  // 5. DSGVO: permanently blocked leads MUST NEVER be re-enrolled

  return NextResponse.json({
    success: true,
    message: "Unsubscribe endpoint ready. Connect Brevo to activate.",
  });
}
