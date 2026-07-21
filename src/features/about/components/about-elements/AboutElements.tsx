"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  aboutElements,
  aboutElementsIntro,
} from "../../data/about-elements.data";

import styles from "./AboutElements.module.css";

export function AboutElements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const introItems = section.querySelectorAll<HTMLElement>(
      "[data-about-elements-intro]",
    );
    const conceptItems = section.querySelectorAll<HTMLElement>(
      "[data-about-elements-item]",
    );

    if (prefersReducedMotion()) {
      gsap.set([introItems, conceptItems], { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(introItems, { autoAlpha: 0, y: 22 });
    gsap.set(conceptItems, { autoAlpha: 0, y: 24 });

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

    const itemTweens = Array.from(conceptItems).map((item) =>
      gsap.to(item, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          once: true,
        },
      }),
    );

    return () => {
      introTween.scrollTrigger?.kill();
      introTween.kill();
      for (const tween of itemTweens) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-elements-heading"
    >
      <div className={styles.inner}>
        <header className={`${styles.intro} ${styles.introSticky}`}>
          <p
            data-about-elements-intro
            className={`${styles.eyebrow} ${styles.reveal}`}
          >
            {aboutElementsIntro.eyebrow}
          </p>

          <h2
            id="about-elements-heading"
            data-about-elements-intro
            className={`${styles.title} ${styles.reveal}`}
          >
            {aboutElementsIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            data-about-elements-intro
            className={`${styles.lead} ${styles.reveal}`}
          >
            {aboutElementsIntro.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </header>

        <ul className={styles.list}>
          {aboutElements.map((element) => (
            <li
              key={element.id}
              data-about-elements-item
              className={`${styles.item} ${styles.reveal}`}
            >
              <div className={styles.itemInner}>
                <h3 className={styles.itemTitle}>{element.title}</h3>
                <p className={styles.itemDescription}>
                  {element.description.map((line) => (
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
