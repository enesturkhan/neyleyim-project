"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { aboutHeroContent } from "../../data/about-hero.data";

import styles from "./AboutHero.module.css";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const items = section.querySelectorAll<HTMLElement>("[data-about-hero-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(items, { autoAlpha: 0, y: 28 });

    const tween = gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.14,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
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
      className={styles.hero}
      aria-labelledby="about-hero-heading"
    >
      <div className={styles.atmosphere} aria-hidden />

      <div className={styles.inner}>
        <p
          data-about-hero-reveal
          className={`${styles.eyebrow} ${styles.reveal}`}
        >
          {aboutHeroContent.eyebrow}
        </p>

        <h1
          id="about-hero-heading"
          data-about-hero-reveal
          className={`${styles.heading} ${styles.reveal}`}
        >
          {aboutHeroContent.heading.map((line, index) =>
            line === "" ? (
              <span
                key={`break-${index}`}
                className={styles.headingBreak}
                aria-hidden
              />
            ) : (
              <span key={line} className={styles.headingLine}>
                {line}
              </span>
            ),
          )}
        </h1>

        <p
          data-about-hero-reveal
          className={`${styles.lead} ${styles.reveal}`}
        >
          {aboutHeroContent.lead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
