"use client";

import type { RefObject } from "react";

import { InteractiveCanes } from "./InteractiveCanes";
import { PointerGlow } from "./PointerGlow";

import styles from "./Hero.module.css";

type HeroAtmosphereProps = {
  rootRef: RefObject<HTMLElement | null>;
};

export function HeroAtmosphere({ rootRef }: HeroAtmosphereProps) {
  return (
    <div
      className={styles.atmosphere}
      data-hero-atmosphere
      aria-hidden
    >
      <InteractiveCanes rootRef={rootRef} />
      <PointerGlow />
    </div>
  );
}
