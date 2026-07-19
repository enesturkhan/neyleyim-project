"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  memories as defaultMemories,
  type MemoryItem,
} from "../../data/memories.data";
import { MemoriesHeader } from "./MemoriesHeader";
import { MemoryList } from "./MemoryList";

import styles from "./Memories.module.css";

type MemoriesProps = {
  items?: MemoryItem[];
};

export function Memories({ items = defaultMemories }: MemoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const headerItems = section.querySelectorAll("[data-memories-reveal]");
    const titleLines = section.querySelectorAll("[data-memories-title-line]");
    const frames = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-memory-frame]"),
    );
    const captions = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-memory-caption]"),
    );
    const parallaxLayers = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-memory-parallax]"),
    );

    if (prefersReducedMotion()) {
      gsap.set([headerItems, titleLines, frames, captions], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    gsap.set(headerItems, { autoAlpha: 0, y: 18 });
    gsap.set(titleLines, { yPercent: 110 });
    gsap.set(frames, {
      autoAlpha: 0,
      y: 18,
      clipPath: "inset(14% 0% 14% 0%)",
    });
    gsap.set(captions, { autoAlpha: 0, y: 14 });

    const headerTimeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });

    headerTimeline
      .to(headerItems[0], { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
      .to(titleLines, { yPercent: 0, duration: 0.85, stagger: 0.06 }, 0.1)
      .to(headerItems, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 }, 0.22);

    const memoryTweens = frames.map((frame, index) => {
      const caption = captions[index];

      return gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: frame,
            start: "top 84%",
            once: true,
          },
        })
        .to(frame, {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
        })
        .to(
          caption ?? [],
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.12,
        );
    });

    const parallaxTweens = parallaxLayers.map((layer) =>
      gsap.fromTo(
        layer,
        { y: -7 },
        {
          y: 8,
          ease: "none",
          scrollTrigger: {
            trigger: layer.parentElement ?? layer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );

    return () => {
      headerTimeline.scrollTrigger?.kill();
      headerTimeline.kill();

      memoryTweens.forEach((timeline) => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      });

      parallaxTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="memories-heading"
    >
      <div className={styles.inner}>
        <MemoriesHeader />
        <MemoryList items={items} />
      </div>
    </section>
  );
}
