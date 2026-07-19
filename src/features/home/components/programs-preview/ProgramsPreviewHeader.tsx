import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { programsPreviewIntro } from "../../data/programs-preview.data";

import styles from "./ProgramsPreview.module.css";

export function ProgramsPreviewHeader() {
  return (
    <header className={`${styles.header} ${styles.headerSticky}`}>
      <p data-programs-reveal className={styles.eyebrow}>
        {programsPreviewIntro.eyebrow}
      </p>

      <h2 id="programs-preview-heading" className={styles.title}>
        {programsPreviewIntro.title.map((line) => (
          <span key={line} className={styles.titleClip}>
            <span data-programs-title-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h2>

      <p data-programs-reveal className={styles.lead}>
        {programsPreviewIntro.lead.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <Link
        href={programsPreviewIntro.cta.href}
        data-programs-reveal
        className={styles.cta}
      >
        {programsPreviewIntro.cta.label}
        <ArrowRight className={styles.ctaIcon} aria-hidden />
      </Link>
    </header>
  );
}
