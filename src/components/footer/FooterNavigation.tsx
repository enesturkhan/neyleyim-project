import Link from "next/link";

import { footerNavigation } from "./footer.data";

import styles from "./Footer.module.css";

export function FooterNavigation() {
  return (
    <nav data-footer-reveal className={styles.nav} aria-label="Alt menü">
      <ul className={styles.navList}>
        {footerNavigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
