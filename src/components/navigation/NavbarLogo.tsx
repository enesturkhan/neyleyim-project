import Link from "next/link";

import { brand } from "./navigation.config";

import styles from "./Navbar.module.css";

type NavbarLogoProps = {
  onNavigate?: () => void;
};

export function NavbarLogo({ onNavigate }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Neyleyim ana sayfa"
      className={styles.logo}
    >
      <span className={styles.wordmark}>{brand.wordmark}</span>
      <span className={styles.logoLabel}>{brand.label}</span>
    </Link>
  );
}
