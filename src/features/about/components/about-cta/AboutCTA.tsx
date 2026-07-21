"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { aboutCtaContent } from "../../data/about-cta.data";

import styles from "./AboutCTA.module.css";

export function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const items = section.querySelectorAll<HTMLElement>(
      "[data-about-cta-reveal]",
    );

    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(items, { autoAlpha: 0, y: 22 });

    const tween = gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-cta-heading"
    >
      <div className={styles.atmosphere} aria-hidden>
        <div className={styles.atmosphereGlow} />
        <div className={styles.atmosphereGrain} />
      </div>

      <div className={styles.inner}>
        <p
          data-about-cta-reveal
          className={`${styles.eyebrow} ${styles.reveal}`}
        >
          {aboutCtaContent.eyebrow}
        </p>

        <h2
          id="about-cta-heading"
          data-about-cta-reveal
          className={`${styles.title} ${styles.reveal}`}
        >
          {aboutCtaContent.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p
          data-about-cta-reveal
          className={`${styles.lead} ${styles.reveal}`}
        >
          {aboutCtaContent.lead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <ul className={styles.actions}>
          {aboutCtaContent.actions.map((action) => (
            <li key={action.id} data-about-cta-reveal className={styles.reveal}>
              <Link href={action.href} className={styles.link}>
                {action.label}
                <ArrowRight className={styles.linkIcon} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
