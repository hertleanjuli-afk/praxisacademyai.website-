export const SITE_CONFIG = {
  name: "PraxisAcademy AI",
  domain: "praxisacademyai.com",
  email: "info@praxisacademyai.com",
  calendly: "PLACEHOLDER_CALENDLY_LINK",
  sister: {
    name: "PraxisNova AI",
    url: "https://www.praxisnovaai.com",
  },
  social: {
    linkedin: "PLACEHOLDER_LINKEDIN_URL",
  },
  produkte: {
    workshop: {
      pilot: 3490,
      regular: 4900,
      paketPilot: 6290,
      paketRegular: 8820,
      proKopfEarly: 390,
      proKopfStandard: 490,
    },
    coaching: {
      s60: { pilot: 190, regular: 290, paket5: 1290, paket10: 1990 },
      s90: { pilot: 270, regular: 390, paket5: 1750, paket10: 2790 },
    },
    automatisierung: {
      pilotRabatt: 25,
    },
  },
} as const;
