/**
 * Client-side tracking library (DSGVO-compliant).
 * Tracking only initializes after analytics cookie consent.
 * See: Build Document Section 5.1
 */

const STORAGE_KEYS = {
  visitorId: "pa_vid",
  utm: "pa_utm",
  consent: "pa_cookie_consent",
} as const;

/* ─── Visitor ID ─── */

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem(STORAGE_KEYS.visitorId);
  if (!vid) {
    vid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEYS.visitorId, vid);
  }
  return vid;
}

/* ─── Cookie Consent Check ─── */

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.consent);
    if (!raw) return false;
    const consent = JSON.parse(raw);
    return consent.analytics === true;
  } catch {
    return false;
  }
}

/* ─── UTM Capture ─── */

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  if (Object.keys(utm).length > 0) {
    localStorage.setItem(STORAGE_KEYS.utm, JSON.stringify(utm));
  }
}

function getStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.utm);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/* ─── Track Event (sends to /api/track) ─── */

async function sendEvent(data: Record<string, unknown>): Promise<void> {
  if (!hasAnalyticsConsent()) return;

  const utm = getStoredUtm();
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        timestamp: new Date().toISOString(),
        ...utm,
        ...data,
      }),
    });
  } catch {
    // Silently fail — tracking should never break the UX
  }
}

/* ─── Page View ─── */

export function trackPageView(): void {
  sendEvent({
    type: "pageview",
    page: window.location.pathname,
    referrer: document.referrer || null,
  });
}

/* ─── Click ─── */

export function trackClick(buttonId: string, buttonText: string): void {
  sendEvent({
    type: "click",
    page: window.location.pathname,
    buttonId,
    buttonText,
  });
}

/* ─── Scroll Depth ─── */

export function trackScrollDepth(): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const milestones = new Set<number>();

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const threshold of [25, 50, 75, 100]) {
      if (percent >= threshold && !milestones.has(threshold)) {
        milestones.add(threshold);
        sendEvent({
          type: "scroll",
          page: window.location.pathname,
          depth: threshold,
        });
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ─── Init (call once on page load) ─── */

export function initTracking(): void {
  if (typeof window === "undefined") return;

  // Always capture UTMs (no consent needed — stored locally only)
  captureUtm();

  // Ensure visitor ID exists
  getVisitorId();

  // Only start tracking if analytics consent given
  if (hasAnalyticsConsent()) {
    trackPageView();
    trackScrollDepth();
  }
}
