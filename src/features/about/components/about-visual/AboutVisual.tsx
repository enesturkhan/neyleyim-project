"use client";

import { useEffect, useRef } from "react";

import { imageMaskReveal, prefersReducedMotion } from "@/lib/animations";

import { aboutVisualContent } from "../../data/about-visual.data";

import styles from "./AboutVisual.module.css";

export function AboutVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    if (prefersReducedMotion()) {
      frame.style.clipPath = "inset(0% 0% 0% 0%)";
      stage.style.transform = "none";
      return;
    }

    const timeline = imageMaskReveal({
      container: frame,
      media: stage,
      duration: 1.25,
      ease: "power3.out",
      fromScale: 1.02,
      scrollTrigger: {
        trigger: frame,
        start: "top 78%",
        once: true,
      },
    });

    return () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Görsel ara"
    >
      <div ref={frameRef} className={styles.frame}>
        <div ref={stageRef} className={styles.stage} aria-hidden>
          <div className={styles.silhouette} />
          <div className={styles.veil} />
        </div>

        <div className={styles.captionBlock}>
          <p className={styles.label}>{aboutVisualContent.label}</p>
          <p className={styles.caption}>
            {aboutVisualContent.caption.map((line) => (
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
