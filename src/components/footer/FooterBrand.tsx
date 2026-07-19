import Link from "next/link";

import { footerBrand } from "./footer.data";

import styles from "./Footer.module.css";

export function FooterBrand() {
  return (
    <div data-footer-reveal className={styles.brandBlock}>
      <Link
        href={footerBrand.homeHref}
        className={styles.wordmark}
        aria-label={footerBrand.homeAriaLabel}
      >
        {footerBrand.wordmark}
      </Link>

      <p className={styles.statement}>
        {footerBrand.statement.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
