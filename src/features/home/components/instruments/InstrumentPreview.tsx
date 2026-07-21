"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { useMediaQuery } from "@/hooks";
import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { instruments, type Instrument } from "../../data/instruments.data";
import { useInstrumentPreviewAudio } from "../../hooks/useInstrumentPreviewAudio";
import { InstrumentBackground } from "./InstrumentBackground";

import styles from "./Instruments.module.css";

type InstrumentPreviewProps = {
  active: Instrument;
  previewId: string;
  children?: ReactNode;
};

export function InstrumentPreview({
  active,
  previewId,
  children,
}: InstrumentPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const activeIdRef = useRef(active.id);
  const initialized = useRef(false);
  const hoverSessionRef = useRef(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const useTouchAudio = isCoarsePointer || isMobile;

  const { playPreview, stopPreview, isPlaying, hasError } =
    useInstrumentPreviewAudio({
      src: active.audioSrc,
      volume: 0.16,
      maxDuration: active.audioDuration,
      fadeInMs: 220,
      fadeOutMs: 320,
    });

  useEffect(() => {
    stopPreview();
    hoverSessionRef.current = false;
  }, [active.id, stopPreview]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) stopPreview();
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [stopPreview]);

  useEffect(() => {
    const gsap = registerGsap();
    const nextId = active.id;
    const previousId = activeIdRef.current;
    const nextPanel = panelsRef.current.get(nextId);
    const previousPanel = panelsRef.current.get(previousId);

    if (!initialized.current) {
      initialized.current = true;
      activeIdRef.current = nextId;

      for (const [id, panel] of panelsRef.current) {
        gsap.set(panel, {
          autoAlpha: id === nextId ? 1 : 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        });
      }
      return;
    }

    if (previousId === nextId || !nextPanel) return;

    activeIdRef.current = nextId;
    stopPreview();

    if (prefersReducedMotion()) {
      if (previousPanel) gsap.set(previousPanel, { autoAlpha: 0 });
      gsap.set(nextPanel, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (previousPanel) {
      timeline.to(
        previousPanel,
        {
          autoAlpha: 0,
          scale: 0.98,
          filter: "blur(6px)",
          duration: 0.28,
        },
        0,
      );
    }

    timeline.fromTo(
      nextPanel,
      {
        autoAlpha: 0,
        y: 18,
        scale: 0.98,
        filter: "blur(6px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.55,
      },
      previousPanel ? 0.18 : 0,
    );

    return () => {
      timeline.kill();
    };
  }, [active, stopPreview]);

  const onPointerEnter = () => {
    if (useTouchAudio) return;
    if (hoverSessionRef.current) return;
    hoverSessionRef.current = true;
    playPreview();
  };

  const onPointerLeave = () => {
    if (useTouchAudio) return;
    hoverSessionRef.current = false;
    stopPreview();
  };

  const onToggle = () => {
    if (isPlaying) {
      stopPreview();
      return;
    }
    playPreview();
  };

  return (
    <div
      ref={rootRef}
      id={previewId}
      className={styles.preview}
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${active.title}: ${active.subtitle}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.previewStage}>
        {instruments.map((instrument) => (
          <div
            key={instrument.id}
            ref={(element) => {
              if (element) panelsRef.current.set(instrument.id, element);
              else panelsRef.current.delete(instrument.id);
            }}
            className={styles.previewPanel}
            data-instrument-visual={instrument.id}
            aria-hidden={instrument.id !== active.id}
          >
            <InstrumentBackground variant={instrument.backgroundVariant} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.audioControl}
        onClick={onToggle}
        aria-pressed={isPlaying}
        aria-label={
          isPlaying
            ? `${active.audioLabel} durdur`
            : active.audioLabel
        }
      >
        {isPlaying ? (
          <VolumeX className={styles.audioIcon} aria-hidden />
        ) : (
          <Volume2 className={styles.audioIcon} aria-hidden />
        )}
        <span>{isPlaying ? "Durdur" : "Sesi dinle"}</span>
      </button>

      {hasError ? (
        <p className={styles.audioHint} role="status">
          Ses dosyası henüz eklenmedi
        </p>
      ) : null}

      {children}
    </div>
  );
}
