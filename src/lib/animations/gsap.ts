"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins once on the client.
 * Safe to call from multiple providers / effects.
 */
export function registerGsap(): typeof gsap {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
}

export { gsap, ScrollTrigger };
