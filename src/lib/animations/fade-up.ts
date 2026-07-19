import type { gsap } from "gsap";

import { registerGsap } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

type FadeUpOptions = gsap.TweenVars & {
  y?: number;
};

/**
 * Soft upward fade — default entrance for editorial copy blocks.
 */
export function fadeUp(
  targets: gsap.TweenTarget,
  options: FadeUpOptions = {},
): gsap.core.Tween | undefined {
  const gsapInstance = registerGsap();
  const { y = 32, duration = 1, ease = "power3.out", ...rest } = options;

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
      ...rest,
    },
  );
}
