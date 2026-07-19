"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  programsPreviewItems,
  type ProgramPreviewItem,
} from "../../data/programs-preview.data";
import { ProgramList } from "./ProgramList";
import { ProgramsPreviewHeader } from "./ProgramsPreviewHeader";

import styles from "./ProgramsPreview.module.css";

type ProgramsPreviewProps = {
  programs?: ProgramPreviewItem[];
};

export function ProgramsPreview({
  programs = programsPreviewItems,
}: ProgramsPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const headerItems = section.querySelectorAll("[data-programs-reveal]");
    const titleLines = section.querySelectorAll("[data-programs-title-line]");
    const rows = section.querySelectorAll("[data-programs-row]");

    if (prefersReducedMotion()) {
      gsap.set([headerItems, titleLines, rows], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    gsap.set(headerItems, { autoAlpha: 0, y: 18 });
    gsap.set(titleLines, { yPercent: 110 });
    gsap.set(rows, { autoAlpha: 0, y: 22 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        once: true,
      },
    });

    timeline
      .to(headerItems[0], { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
      .to(titleLines, { yPercent: 0, duration: 0.85, stagger: 0.06 }, 0.1)
      .to(headerItems, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 }, 0.22)
      .to(rows, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.32);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="programs-preview-heading"
    >
      <div className={styles.inner}>
        <ProgramsPreviewHeader />
        <ProgramList programs={programs} />
      </div>
    </section>
  );
}
