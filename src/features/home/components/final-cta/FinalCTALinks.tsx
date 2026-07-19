import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./FinalCTA.module.css";

const links = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "#",
  },
  {
    id: "program-request",
    label: "Program Talebi",
    href: "/iletisim",
  },
] as const;

export function FinalCTALinks() {
  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li key={link.id} data-final-cta-link>
          <Link href={link.href} className={styles.link}>
            {link.label}
            <ArrowRight className={styles.linkArrow} aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
