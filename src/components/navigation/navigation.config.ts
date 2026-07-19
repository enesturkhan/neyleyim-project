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

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/", external: true },
  { label: "YouTube", href: "https://youtube.com/", external: true },
] as const;
