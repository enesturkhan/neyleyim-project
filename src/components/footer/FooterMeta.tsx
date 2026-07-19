import Link from "next/link";

import { footerLegal, footerMeta } from "./footer.data";

import styles from "./Footer.module.css";

export function FooterMeta() {
  return (
    <div data-footer-reveal className={styles.bottom}>
      <div className={styles.metaLeft}>
        <p className={styles.copyright}>
          © {footerMeta.copyrightYear} {footerMeta.copyrightName}
        </p>
        {footerMeta.credit ? (
          <p className={styles.credit}>{footerMeta.credit.label}</p>
        ) : null}
      </div>

      <ul className={styles.legalList}>
        {footerLegal.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.legalLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
