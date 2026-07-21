import {
  InstagramIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/icons";

import type { FooterSocialIcon, FooterSocialLink } from "./footer.data";
import { footerSocials } from "./footer.data";

import styles from "./Footer.module.css";

function isActiveHref(href: string | null): href is string {
  return typeof href === "string" && href.trim().length > 0 && href !== "#";
}

function SocialIcon({
  icon,
  className,
}: {
  icon: FooterSocialIcon;
  className?: string;
}) {
  switch (icon) {
    case "instagram":
      return <InstagramIcon className={className} />;
    case "youtube":
      return <YoutubeIcon className={className} />;
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
  }
}

function SocialItem({ item }: { item: FooterSocialLink }) {
  const href = item.href;
  const content = (
    <>
      <SocialIcon icon={item.icon} className={styles.socialIcon} />
      <span className={styles.socialTooltip}>{item.label}</span>
    </>
  );

  if (isActiveHref(href)) {
    return (
      <a
        href={href}
        className={styles.socialLink}
        aria-label={item.ariaLabel}
        {...(item.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={`${styles.socialLink} ${styles.socialPending}`}
      aria-disabled="true"
      aria-label={item.ariaLabel}
    >
      {content}
    </span>
  );
}

export function FooterSocials() {
  return (
    <ul data-footer-reveal className={styles.socialList}>
      {footerSocials.map((item) => (
        <li key={item.icon}>
          <SocialItem item={item} />
        </li>
      ))}
    </ul>
  );
}
