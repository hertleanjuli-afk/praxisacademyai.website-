"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

type PricingCardProps = {
  title: string;
  subtitle?: string;
  pilotPrice?: number;
  regularPrice: number;
  perSession?: string;
  discount?: string;
  badge?: string;
  features?: string[];
  popular?: boolean;
  animationIndex?: number;
};

export default function PricingCard({
  title,
  subtitle,
  pilotPrice,
  regularPrice,
  perSession,
  discount,
  badge,
  features,
  popular = false,
  animationIndex = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={animationIndex}
      variants={fadeUp}
      className={`rounded-2xl p-8 border relative ${
        popular
          ? "bg-ink text-white border-ink"
          : "bg-white text-ink border-ink/8"
      }`}
    >
      {/* Badge */}
      {badge && (
        <span
          className={`absolute -top-3 right-6 text-xs font-body font-medium px-3 py-1 rounded-full ${
            popular
              ? "bg-accent text-white"
              : "bg-accent-light text-accent"
          }`}
        >
          {badge}
        </span>
      )}

      <h3
        className={`font-display text-xl font-semibold mb-1 ${
          popular ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          className={`font-body text-xs mb-4 ${
            popular ? "text-white/50" : "text-ink-muted"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Price */}
      <div className="mb-4">
        <span
          className={`font-display text-3xl font-bold ${
            popular ? "text-white" : "text-ink"
          }`}
        >
          {formatPrice(regularPrice)}
        </span>
        <span
          className={`font-body text-sm ml-1 ${
            popular ? "text-white/50" : "text-ink-muted"
          }`}
        >
          netto
        </span>
      </div>

      {/* Per session / Discount info */}
      {(perSession || discount) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {perSession && (
            <span
              className={`font-body text-xs ${
                popular ? "text-white/60" : "text-ink-soft"
              }`}
            >
              {perSession}
            </span>
          )}
          {discount && (
            <span className="font-body text-xs text-accent font-medium">
              {discount}
            </span>
          )}
        </div>
      )}

      {/* Pilot price — prominent */}
      {pilotPrice && (
        <div className="mb-4">
          <span
            className={`inline-block font-body text-xs uppercase tracking-widest font-medium px-2.5 py-1 rounded-full mb-2 ${
              popular
                ? "bg-white/10 text-white/70"
                : "bg-accent-light text-accent"
            }`}
          >
            Pilot-Preis
          </span>
          <p
            className={`font-body text-base font-medium ${
              popular ? "text-accent" : "text-accent"
            }`}
          >
            {formatPrice(pilotPrice)}
          </p>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="flex flex-col gap-2 mt-4">
          {features.map((f) => (
            <li
              key={f}
              className={`font-body text-sm flex items-start gap-2 ${
                popular ? "text-white/70" : "text-ink-soft"
              }`}
            >
              <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export { formatPrice };
