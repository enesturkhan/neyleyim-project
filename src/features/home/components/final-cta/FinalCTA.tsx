"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { FinalCTAHeader } from "./FinalCTAHeader";
import { FinalCTALinks } from "./FinalCTALinks";

import styles from "./FinalCTA.module.css";

const reeds: Array<{ x: string; rotate: string }> = [
  { x: "22%", rotate: "-10deg" },
  { x: "48%", rotate: "-7deg" },
  { x: "76%", rotate: "-12deg" },
];

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const reveals = section.querySelectorAll("[data-final-cta-reveal]");
    const titleLines = section.querySelectorAll("[data-final-cta-title-line]");
    const links = section.querySelectorAll("[data-final-cta-link]");

    if (prefersReducedMotion()) {
      gsap.set([reveals, titleLines, links], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    gsap.set(reveals, { autoAlpha: 0, y: 18 });
    gsap.set(titleLines, { yPercent: 110 });
    gsap.set(links, { autoAlpha: 0, y: 16 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        once: true,
      },
    });

    timeline
      .to(reveals[0], { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
      .to(titleLines, { yPercent: 0, stagger: 0.07 }, 0.1)
      .to(reveals[1], { autoAlpha: 1, y: 0 }, 0.28)
      .to(links, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.42);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="iletisim"
      className={styles.section}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.atmosphere} aria-hidden>
        <div className={styles.atmosphereGlow} />
        <div className={styles.atmosphereGrain} />
        {reeds.map((reed) => (
          <span
            key={reed.x}
            className={styles.atmosphereReed}
            style={
              {
                "--reed-x": reed.x,
                "--reed-rotate": reed.rotate,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.inner}>
        <FinalCTAHeader />
        <FinalCTALinks />
      </div>
    </section>
  );
}
