import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";

import { WHATSAPP_URL } from "./navigation.config";

import styles from "./Navbar.module.css";

type WhatsAppActionProps = {
  className?: string;
  /** Hide on small screens; show from desktop nav breakpoint */
  desktopOnly?: boolean;
};

export function WhatsAppAction({
  className,
  desktopOnly = false,
}: WhatsAppActionProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp’tan iletişim kur"
      className={cn(
        styles.whatsapp,
        desktopOnly && styles.whatsappDesktop,
        className,
      )}
    >
      <WhatsAppIcon className={styles.whatsappIcon} />
      <span>WhatsApp&apos;tan İletişim</span>
    </a>
  );
}
