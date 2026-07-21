"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { aboutManifestoContent } from "../../data/about-manifesto.data";

import styles from "./AboutManifesto.module.css";

export function AboutManifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const blocks = section.querySelectorAll<HTMLElement>(
      "[data-about-manifesto-block]",
    );

    if (prefersReducedMotion()) {
      gsap.set(blocks, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    const tweens = Array.from(blocks).map((block) => {
      gsap.set(block, {
        autoAlpha: 0,
        y: 28,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      return gsap.to(block, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 78%",
          once: true,
        },
      });
    });

    return () => {
      for (const tween of tweens) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-manifesto-heading"
    >
      <h2 id="about-manifesto-heading" className={styles.headingVisuallyHidden}>
        Manifesto
      </h2>

      {aboutManifestoContent.statements.map((statement) => (
        <div key={statement.id} className={styles.block}>
          <div
            data-about-manifesto-block
            className={`${styles.clip} ${styles.reveal}`}
          >
            <p className={styles.statement}>
              {statement.lines.map((line) => (
                <span key={line} className={styles.statementLine}>
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}

      <div className={`${styles.block} ${styles.blockClosing}`}>
        <div
          data-about-manifesto-block
          className={`${styles.clip} ${styles.reveal}`}
        >
          <p className={styles.closing}>
            {aboutManifestoContent.closing.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
