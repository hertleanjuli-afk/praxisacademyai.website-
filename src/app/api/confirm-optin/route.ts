import { NextResponse } from "next/server";

/**
 * GET /api/confirm-optin?token=...
 * Double opt-in confirmation link (STUB for future Brevo).
 * HMAC-signed confirmation link with 7-day expiry.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // STUB: Verify HMAC signature and confirm opt-in
  // When Brevo is connected:
  // 1. Decode token and verify HMAC-SHA256 signature
  // 2. Check 7-day expiry
  // 3. Update lead status from 'pending_optin' to 'active'
  // 4. Only then: marketing emails can be sent

  return NextResponse.json({
    success: true,
    message: "Opt-in confirmation endpoint ready. Connect Brevo to activate.",
  });
}
