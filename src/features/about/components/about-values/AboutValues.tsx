"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { aboutValues, aboutValuesIntro } from "../../data/about-values.data";

import styles from "./AboutValues.module.css";

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const introItems = section.querySelectorAll<HTMLElement>(
      "[data-about-values-intro]",
    );
    const rows = section.querySelectorAll<HTMLElement>(
      "[data-about-values-row]",
    );

    if (prefersReducedMotion()) {
      gsap.set([introItems, rows], { autoAlpha: 1, y: 0, scaleX: 1 });
      const rules = section.querySelectorAll<HTMLElement>(
        "[data-about-values-rule]",
      );
      gsap.set(rules, { scaleX: 1 });
      return;
    }

    gsap.set(introItems, { autoAlpha: 0, y: 20 });

    const introTween = gsap.to(introItems, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });

    const rowTimelines = Array.from(rows).map((row) => {
      const rule = row.querySelector<HTMLElement>("[data-about-values-rule]");
      const title = row.querySelector<HTMLElement>("[data-about-values-title]");
      const description = row.querySelector<HTMLElement>(
        "[data-about-values-description]",
      );

      gsap.set(rule, { scaleX: 0 });
      gsap.set([title, description], { autoAlpha: 0, y: 18 });

      return gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: row,
            start: "top 84%",
            once: true,
          },
        })
        .to(rule, { scaleX: 1, duration: 0.7 }, 0)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.08)
        .to(description, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.18);
    });

    return () => {
      introTween.scrollTrigger?.kill();
      introTween.kill();
      for (const timeline of rowTimelines) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-values-heading"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p
            data-about-values-intro
            className={`${styles.eyebrow} ${styles.reveal}`}
          >
            {aboutValuesIntro.eyebrow}
          </p>

          <h2
            id="about-values-heading"
            data-about-values-intro
            className={`${styles.title} ${styles.reveal}`}
          >
            {aboutValuesIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            data-about-values-intro
            className={`${styles.lead} ${styles.reveal}`}
          >
            {aboutValuesIntro.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </header>

        <ul className={styles.list}>
          {aboutValues.map((value) => (
            <li
              key={value.id}
              data-about-values-row
              className={`${styles.item} ${styles.reveal}`}
            >
              <span
                data-about-values-rule
                className={styles.rule}
                aria-hidden
              />
              <div className={styles.row}>
                <h3
                  data-about-values-title
                  className={styles.itemTitle}
                >
                  {value.title}
                </h3>
                <p
                  data-about-values-description
                  className={styles.itemDescription}
                >
                  {value.description.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
