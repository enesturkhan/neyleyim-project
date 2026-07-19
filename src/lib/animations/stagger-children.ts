import type { gsap } from "gsap";

import { registerGsap } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

type StaggerChildrenOptions = gsap.TweenVars & {
  y?: number;
  stagger?: number | gsap.StaggerVars;
};

/**
 * Staggers child elements with a shared fade-up motion.
 */
export function staggerChildren(
  targets: gsap.TweenTarget,
  options: StaggerChildrenOptions = {},
): gsap.core.Tween | undefined {
  const gsapInstance = registerGsap();
  const {
    y = 24,
    duration = 0.9,
    ease = "power3.out",
    stagger = 0.08,
    ...rest
  } = options;

  if (prefersReducedMotion()) {
    gsapInstance.set(targets, { autoAlpha: 1, y: 0 });
    return undefined;
  }

  return gsapInstance.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      ease,
      stagger,
      ...rest,
    },
  );
}
