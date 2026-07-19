export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSocialIcon = "instagram" | "youtube" | "whatsapp";

export type FooterSocialLink = {
  label: string;
  /** `null` or empty = placeholder (non-interactive until a real URL arrives) */
  href: string | null;
  external: boolean;
  icon: FooterSocialIcon;
  ariaLabel: string;
};

export type FooterCredit = {
  label: string;
  href?: string;
};

export const footerBrand = {
  wordmark: "Neyleyim",
  homeHref: "/",
  homeAriaLabel: "Neyleyim ana sayfa",
  statement: [
    "Nefesin, ritmin ve sözün",
    "aynı sahnede buluştuğu",
    "tasavvuf musikisi topluluğu.",
  ],
} as const;

export const footerNavigation: FooterLink[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Programlar", href: "/programlar" },
  { label: "İletişim", href: "/#iletisim" },
];

export const footerSocials: FooterSocialLink[] = [
  {
    label: "Instagram",
    href: null,
    external: true,
    icon: "instagram",
    ariaLabel: "Instagram hesabımız",
  },
  {
    label: "YouTube",
    href: null,
    external: true,
    icon: "youtube",
    ariaLabel: "YouTube kanalımız",
  },
  {
    label: "WhatsApp",
    href: null,
    external: true,
    icon: "whatsapp",
    ariaLabel: "WhatsApp üzerinden iletişim",
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Gizlilik", href: "/gizlilik" },
  { label: "Çerezler", href: "/cerezler" },
];

export const footerMeta = {
  copyrightName: "Neyleyim",
  copyrightYear: 2026,
  credit: {
    label: "Tasarım ve geliştirme — Atlas Studio",
  } satisfies FooterCredit,
};
