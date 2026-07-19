"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  instruments,
  instrumentsIntro,
  type InstrumentId,
} from "../../data/instruments.data";
import { InstrumentList } from "./InstrumentList";
import { InstrumentPreview } from "./InstrumentPreview";

import styles from "./Instruments.module.css";

function findInstrument(id: InstrumentId) {
  return instruments.find((item) => item.id === id) ?? instruments[0];
}

export function Instruments() {
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const listId = `instruments-list-${reactId}`;
  const previewId = `instruments-preview-${reactId}`;

  const [activeId, setActiveId] = useState<InstrumentId>(instruments[0].id);
  const active = useMemo(() => findInstrument(activeId), [activeId]);

  const focusInstrumentButton = useCallback((id: InstrumentId) => {
    const section = sectionRef.current;
    if (!section) return;
    const button = section.querySelector<HTMLButtonElement>(
      `[data-instrument-id="${id}"]`,
    );
    button?.focus();
  }, []);

  const selectInstrument = useCallback((id: InstrumentId) => {
    setActiveId(id);
  }, []);

  const stepInstrument = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = instruments.findIndex((item) => item.id === activeId);
      const nextIndex =
        (currentIndex + direction + instruments.length) % instruments.length;
      const nextId = instruments[nextIndex].id;
      setActiveId(nextId);
      focusInstrumentButton(nextId);
    },
    [activeId, focusInstrumentButton],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!section.contains(document.activeElement)) return;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        stepInstrument(1);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        stepInstrument(-1);
      }
    };

    section.addEventListener("keydown", onKeyDown);
    return () => section.removeEventListener("keydown", onKeyDown);
  }, [stepInstrument]);

  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;

    const gsap = registerGsap();
    const nodes = detail.querySelectorAll("[data-instrument-copy]");

    if (prefersReducedMotion()) {
      gsap.set(nodes, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      nodes,
      { autoAlpha: 0, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.06,
      },
    );
  }, [activeId]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsap = registerGsap();
    const reveal = section.querySelectorAll("[data-instruments-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(reveal, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(reveal, { autoAlpha: 0, y: 20 });

    const tween = gsap.to(reveal, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
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
      className={styles.section}
      style={
        {
          "--instrument-accent": active.themeColor,
        } as CSSProperties
      }
      aria-labelledby="instruments-heading"
    >
      <div className={styles.atmosphere} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p
            data-instruments-reveal
            className={styles.eyebrow}
          >
            {instrumentsIntro.eyebrow}
          </p>

          <h2
            id="instruments-heading"
            data-instruments-reveal
            className={styles.title}
          >
            {instrumentsIntro.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p data-instruments-reveal className={styles.lead}>
            {instrumentsIntro.lead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <div data-instruments-reveal>
            <InstrumentList
              activeId={activeId}
              onSelect={selectInstrument}
              listId={listId}
              previewId={previewId}
            />
          </div>

          <div ref={detailRef} className={styles.detail}>
            <p data-instrument-copy className={styles.detailSubtitle}>
              {active.subtitle}
            </p>
            <p data-instrument-copy className={styles.detailDescription}>
              {active.description}
            </p>
          </div>
        </div>

        <div data-instruments-reveal>
          <InstrumentPreview active={active} previewId={previewId} />
        </div>
      </div>
    </section>
  );
}
