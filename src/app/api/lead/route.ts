import { NextResponse } from "next/server";

/**
 * POST /api/lead
 * Receives popup form submissions.
 * Forwards to HubSpot + Sales Control webhook (STUB).
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, visitorId } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // STUB: Forward to HubSpot
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (hubspotToken) {
    try {
      await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hubspotToken}`,
        },
        body: JSON.stringify({
          properties: {
            email,
            firstname: name || "",
            lead_source: "Website Popup",
          },
        }),
      });
    } catch {
      // Silently fail — HubSpot connection may not be active
    }
  }

  // STUB: Forward to Sales Control inbound webhook
  const salesControlUrl = process.env.SALES_CONTROL_URL;
  const webhookSecret = process.env.INBOUND_WEBHOOK_SECRET;
  if (salesControlUrl && webhookSecret) {
    try {
      await fetch(`${salesControlUrl}/api/webhooks/inbound`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, visitorId, secret: webhookSecret }),
      });
    } catch {
      // Silently fail — Sales Control not yet built
    }
  }

  return NextResponse.json({ success: true });
}
