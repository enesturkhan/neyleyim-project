"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  aboutJourneyIntro,
  aboutJourneySteps,
} from "../../data/about-journey.data";

import styles from "./AboutJourney.module.css";

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const introItems = section.querySelectorAll<HTMLElement>(
      "[data-about-journey-intro]",
    );
    const steps = section.querySelectorAll<HTMLElement>(
      "[data-about-journey-step]",
    );

    if (prefersReducedMotion()) {
      gsap.set(introItems, { autoAlpha: 1, y: 0 });
      gsap.set(steps, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    gsap.set(introItems, { autoAlpha: 0, y: 22 });

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

    const stepTweens = Array.from(steps).map((step) => {
      gsap.set(step, {
        autoAlpha: 0,
        y: 26,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      return gsap.to(step, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 82%",
          once: true,
        },
      });
    });

    return () => {
      introTween.scrollTrigger?.kill();
      introTween.kill();
      for (const tween of stepTweens) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-journey-heading"
    >
      <div className={styles.inner}>
        <div className={styles.guide} aria-hidden />

        <header className={styles.intro}>
          <p
            data-about-journey-intro
            className={`${styles.eyebrow} ${styles.reveal}`}
          >
            {aboutJourneyIntro.eyebrow}
          </p>

          <h2
            id="about-journey-heading"
            data-about-journey-intro
            className={`${styles.title} ${styles.reveal}`}
          >
            {aboutJourneyIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            data-about-journey-intro
            className={`${styles.lead} ${styles.reveal}`}
          >
            {aboutJourneyIntro.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </header>

        <ol className={styles.list}>
          {aboutJourneySteps.map((step) => (
            <li key={step.id} className={styles.step}>
              <div
                data-about-journey-step
                className={`${styles.stepClip} ${styles.reveal}`}
              >
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>
                  {step.description.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
