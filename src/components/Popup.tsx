"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

const STORAGE_KEYS = {
  dismissed: "pa_popup_dismissed",
  dismissedAt: "pa_popup_dismissed_at",
  submitted: "pa_popup_submitted",
  visitorId: "pa_vid",
} as const;

const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 10_000;

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem(STORAGE_KEYS.visitorId);
  if (!vid) {
    vid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEYS.visitorId, vid);
  }
  return vid;
}

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false;

  // Already submitted
  if (localStorage.getItem(STORAGE_KEYS.submitted) === "true") return false;

  // Dismissed within 7 days
  const dismissedAt = localStorage.getItem(STORAGE_KEYS.dismissedAt);
  if (dismissedAt) {
    const elapsed = Date.now() - parseInt(dismissedAt, 10);
    if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return false;
  }

  return true;
}

export default function Popup() {
  const t = useTranslations("popup");
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (!shouldShowPopup()) return;
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEYS.dismissed, "true");
    localStorage.setItem(STORAGE_KEYS.dismissedAt, Date.now().toString());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !email) return;

    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          visitorId: getVisitorId(),
        }),
      });
      localStorage.setItem(STORAGE_KEYS.submitted, "true");
      setSubmitted(true);
    } catch {
      // Silently fail — stub endpoint may not exist yet
      localStorage.setItem(STORAGE_KEYS.submitted, "true");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-ink/8 relative"
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <h3 className="font-display text-xl font-bold text-ink mb-2">
                  {t("title")}
                </h3>
                <p className="font-body text-sm text-ink-soft font-light mb-6">
                  {t("subtitle")}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className="font-body text-sm border border-ink/15 rounded-lg px-4 py-3 bg-cream text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="font-body text-sm border border-ink/15 rounded-lg px-4 py-3 bg-cream text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors"
                  />

                  {/* DSGVO Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-accent rounded"
                    />
                    <span className="font-body text-xs text-ink-muted leading-relaxed">
                      {t("consent")}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consent || !email || loading}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-body font-medium text-[15px] shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "..." : t("submit")}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="font-display text-xl font-bold text-ink mb-2">
                  Danke! 🎉
                </p>
                <p className="font-body text-sm text-ink-soft font-light mb-6">
                  {t("success")}
                </p>
                <p className="font-body text-xs text-ink-muted mb-3">
                  {t("calendlyHint")}
                </p>
                <a
                  href={SITE_CONFIG.calendly}
                  className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-body font-medium text-sm shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors"
                >
                  Erstgespräch buchen
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
