import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { heroContent } from "../../data/hero.data";

import styles from "./Hero.module.css";

export function HeroContent() {
  return (
    <div data-hero-content className={styles.content}>
      <p data-hero-eyebrow className={styles.eyebrow}>
        {heroContent.eyebrow}
      </p>

      <h1 data-hero-title className={styles.title}>
        <span data-hero-title-clip className={styles.titleClip}>
          <span data-hero-title-inner className="block">
            {heroContent.title}
          </span>
        </span>
      </h1>

      <p data-hero-statement className={styles.statement}>
        {heroContent.statement.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <p data-hero-description className={styles.description}>
        {heroContent.description}
      </p>

      <div data-hero-ctas className={styles.ctaRow}>
        <Link
          href={heroContent.primaryCta.href}
          className={styles.primaryCta}
        >
          {heroContent.primaryCta.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>

        <Link
          href={heroContent.secondaryCta.href}
          className={styles.secondaryCta}
        >
          {heroContent.secondaryCta.label}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
