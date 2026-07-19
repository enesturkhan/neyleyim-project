import type { gsap } from "gsap";

import { registerGsap } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

export type SplitLineRevealOptions = {
  /** Line elements already wrapped (e.g. `.line` children). */
  lines: gsap.TweenTarget;
  duration?: number;
  stagger?: number | gsap.StaggerVars;
  ease?: string;
  delay?: number;
  scrollTrigger?: gsap.TweenVars["scrollTrigger"];
};

/**
 * Foundation for line-by-line reveal.
 * Expects each line to be clipped (overflow hidden) with an inner
 * moving element, or plain line nodes that translate upward.
 *
 * Full text-splitting (SplitText / custom splitter) can plug in later.
 */
export function splitLineReveal(
  options: SplitLineRevealOptions,
): gsap.core.Tween | undefined {
  const gsapInstance = registerGsap();
  const {
    lines,
    duration = 1.1,
    stagger = 0.1,
    ease = "power4.out",
    delay = 0,
    scrollTrigger,
  } = options;

  if (prefersReducedMotion()) {
    gsapInstance.set(lines, { yPercent: 0, autoAlpha: 1 });
    return undefined;
  }

  return gsapInstance.fromTo(
    lines,
    { yPercent: 110, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration,
      stagger,
      ease,
      delay,
      ...(scrollTrigger ? { scrollTrigger } : {}),
    },
  );
}
