"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { HeroAtmosphere } from "./HeroAtmosphere";
import { HeroContent } from "./HeroContent";

import styles from "./Hero.module.css";

/**
 * Full-viewport hero. Atmosphere extends below into the Manifesto top.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const canes = section.querySelector("[data-hero-canes]");
    const eyebrow = section.querySelector("[data-hero-eyebrow]");
    const titleInner = section.querySelector("[data-hero-title-inner]");
    const statement = section.querySelector("[data-hero-statement]");
    const description = section.querySelector("[data-hero-description]");
    const ctas = section.querySelector("[data-hero-ctas]");

    if (prefersReducedMotion()) {
      gsap.set(
        [canes, eyebrow, titleInner, statement, description, ctas],
        { clearProps: "all", autoAlpha: 1, y: 0, yPercent: 0 },
      );
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    timeline
      .fromTo(
        canes,
        { autoAlpha: 0.7 },
        { autoAlpha: 1, duration: 1.1 },
        0,
      )
      .fromTo(
        eyebrow,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.12,
      )
      .fromTo(
        titleInner,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85 },
        0.22,
      )
      .fromTo(
        statement,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65 },
        0.42,
      )
      .fromTo(
        description,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.58,
      )
      .fromTo(
        ctas,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.72,
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} data-hero className={styles.hero}>
      <div
        ref={atmosphereRef}
        className={styles.atmosphereOverflow}
        data-hero-atmosphere-overflow
      >
        <HeroAtmosphere rootRef={atmosphereRef} />
      </div>

      <div className={styles.stage}>
        <div className={styles.veil} data-hero-veil aria-hidden />
        <HeroContent />
      </div>
    </section>
  );
}
