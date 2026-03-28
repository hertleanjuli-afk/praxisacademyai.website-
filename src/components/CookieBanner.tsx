"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

const CONSENT_KEY = "pa_cookie_consent";

type ConsentState = {
  essential: true; // Always on
  analytics: boolean;
};

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    save({ essential: true, analytics: true });
  }

  function acceptEssential() {
    save({ essential: true, analytics: false });
  }

  function saveCustom() {
    save({ essential: true, analytics });
  }

  function save(consent: ConsentState) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
    // Future: initialize analytics tracking here if consent.analytics === true
  }

  if (!visible) return null;

  const isDE = locale === "de";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-ink/8 p-6">
        <p className="font-body text-sm text-ink font-medium mb-1">
          {isDE ? "Cookie-Einstellungen" : "Cookie Settings"}
        </p>
        <p className="font-body text-xs text-ink-soft font-light mb-4 leading-relaxed">
          {isDE
            ? "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Essenzielle Cookies sind immer aktiv. Analytische Cookies helfen uns, die Seite zu optimieren."
            : "We use cookies to improve your experience. Essential cookies are always active. Analytics cookies help us optimize the site."}
        </p>

        {showDetails && (
          <div className="mb-4 flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 accent-accent rounded"
              />
              <span className="font-body text-xs text-ink">
                {isDE ? "Essenziell (immer aktiv)" : "Essential (always active)"}
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 accent-accent rounded"
              />
              <span className="font-body text-xs text-ink">
                {isDE ? "Analytisch" : "Analytics"}
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={acceptAll}
            className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-body font-medium hover:bg-accent-hover transition-colors"
          >
            {isDE ? "Alle akzeptieren" : "Accept All"}
          </button>
          <button
            onClick={acceptEssential}
            className="border border-ink/15 text-ink px-5 py-2.5 rounded-lg text-sm font-body font-medium hover:border-ink/30 transition-colors"
          >
            {isDE ? "Nur essenzielle" : "Essential Only"}
          </button>
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              className="text-ink-muted hover:text-ink text-xs font-body transition-colors"
            >
              {isDE ? "Einstellungen" : "Settings"}
            </button>
          ) : (
            <button
              onClick={saveCustom}
              className="text-accent hover:text-accent-hover text-xs font-body font-medium transition-colors"
            >
              {isDE ? "Auswahl speichern" : "Save Selection"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
