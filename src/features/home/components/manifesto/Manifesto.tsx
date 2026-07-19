"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { manifestoContent } from "../../data/manifesto.data";

import styles from "./Manifesto.module.css";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const items = section.querySelectorAll<HTMLElement>("[data-manifesto-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(items, { autoAlpha: 0, y: 20 });

    const tween = gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
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
      aria-labelledby="manifesto-heading"
    >
      <div className={styles.inner}>
        <p
          data-manifesto-reveal
          className={`${styles.eyebrow} ${styles.reveal}`}
        >
          {manifestoContent.eyebrow}
        </p>

        <h2
          id="manifesto-heading"
          data-manifesto-reveal
          className={`${styles.heading} ${styles.reveal}`}
        >
          {manifestoContent.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p
          data-manifesto-reveal
          className={`${styles.subheading} ${styles.reveal}`}
        >
          {manifestoContent.subheading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <p data-manifesto-reveal className={`${styles.body} ${styles.reveal}`}>
          {manifestoContent.body.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <p
          data-manifesto-reveal
          className={`${styles.supporting} ${styles.reveal}`}
        >
          {manifestoContent.supporting}
        </p>

        <ul
          data-manifesto-reveal
          className={`${styles.offerings} ${styles.reveal}`}
        >
          {manifestoContent.offerings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div
          data-manifesto-reveal
          className={`${styles.rule} ${styles.reveal}`}
          aria-hidden
        />

        <Link
          href={manifestoContent.cta.href}
          data-manifesto-reveal
          className={`${styles.cta} ${styles.reveal}`}
        >
          {manifestoContent.cta.label}
          <ArrowRight className={styles.ctaIcon} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
