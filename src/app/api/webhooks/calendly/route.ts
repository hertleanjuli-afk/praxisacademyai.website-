import { NextResponse } from "next/server";

/**
 * POST /api/webhooks/calendly
 * Calendly booking event webhook handler (STUB).
 * Receives booking confirmations when users schedule via Calendly.
 */
export async function POST() {
  // STUB: Process Calendly booking event
  // When Calendly is connected:
  // 1. Parse request body for booking details
  // 2. Verify webhook signature
  // 3. Extract booking details (email, time, type)
  // 4. Update lead status to 'booked' in database
  // 5. Update lead score (+50 points)

  return NextResponse.json({ received: true });
}
