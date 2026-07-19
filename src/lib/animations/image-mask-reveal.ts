import type { gsap } from "gsap";

import { registerGsap } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

export type ImageMaskRevealOptions = {
  /** Outer clip/mask container. */
  container: gsap.TweenTarget;
  /** Inner image or media element. */
  media?: gsap.TweenTarget;
  duration?: number;
  ease?: string;
  delay?: number;
  fromScale?: number;
  scrollTrigger?: gsap.TweenVars["scrollTrigger"];
};

/**
 * Foundation for cinematic image reveals via clip-path + subtle scale.
 * Apply `overflow: hidden` on the container; media fills the frame.
 */
export function imageMaskReveal(
  options: ImageMaskRevealOptions,
): gsap.core.Timeline | undefined {
  const gsapInstance = registerGsap();
  const {
    container,
    media,
    duration = 1.4,
    ease = "power3.inOut",
    delay = 0,
    fromScale = 1.08,
    scrollTrigger,
  } = options;

  if (prefersReducedMotion()) {
    gsapInstance.set(container, { clipPath: "inset(0% 0% 0% 0%)" });
    if (media) gsapInstance.set(media, { scale: 1 });
    return undefined;
  }

  const timeline = gsapInstance.timeline({
    delay,
    ...(scrollTrigger ? { scrollTrigger } : {}),
  });

  timeline.fromTo(
    container,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration, ease },
  );

  if (media) {
    timeline.fromTo(
      media,
      { scale: fromScale },
      { scale: 1, duration, ease },
      "<",
    );
  }

  return timeline;
}
