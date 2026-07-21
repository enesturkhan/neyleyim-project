import type { NavigationItem } from "@/lib/navigation/navigation.types";

export const WHATSAPP_URL = "https://wa.me/905000000000";

export const brand = {
  wordmark: "Neyleyim",
  label: "Tasavvuf Musikîsi",
  statement: ["Nefesten nağmeye,", "nağmeden gönüle."],
} as const;

export const mainNavigation: NavigationItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Programlar", href: "/programlar" },
  { label: "İletişim", href: "/#iletisim" },
];

export type MobileSocialItem = {
  label: string;
  href: string | null;
  icon: "instagram" | "youtube";
  ariaLabel: string;
};

export type MobileContactItem = {
  label: string;
  href: string | null;
  icon: "whatsapp";
  ariaLabel: string;
};

/** Icon-only socials in the mobile menu. `null` href = non-interactive placeholder. */
export const mobileSocialLinks: MobileSocialItem[] = [
  {
    label: "Instagram",
    href: null,
    icon: "instagram",
    ariaLabel: "Instagram hesabımız",
  },
  {
    label: "YouTube",
    href: null,
    icon: "youtube",
    ariaLabel: "YouTube kanalımız",
  },
];

/** Mobile WhatsApp contact — no real number yet; keep non-interactive. */
export const mobileWhatsAppContact: MobileContactItem = {
  label: "WhatsApp ile iletişim",
  href: null,
  icon: "whatsapp",
  ariaLabel: "WhatsApp ile iletişim",
};
