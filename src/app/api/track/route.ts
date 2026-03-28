import { NextResponse } from "next/server";

/**
 * POST /api/track
 * Receives visitor tracking data (page views, clicks, scroll depth).
 * Forwards to Sales Control webhook (STUB).
 */
export async function POST(request: Request) {
  const body = await request.json();

  // STUB: Forward to Sales Control website-clicks webhook
  const salesControlUrl = process.env.SALES_CONTROL_URL;
  if (salesControlUrl) {
    try {
      await fetch(`${salesControlUrl}/api/webhooks/website-clicks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      // Silently fail — Sales Control not yet built
    }
  }

  return NextResponse.json({ success: true });
}
