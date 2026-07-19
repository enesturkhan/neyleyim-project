"use client";

import { useEffect, useState } from "react";

type UseScrollDirectionOptions = {
  /** ScrollY after which the compact/opaque Navbar style applies */
  scrolledThreshold?: number;
  /** ScrollY after which hide-on-down becomes active */
  hideThreshold?: number;
  /** Ignore smaller scroll deltas to prevent flicker */
  delta?: number;
  /** Force the Navbar to remain visible (e.g. mobile menu open) */
  forceVisible?: boolean;
};

type ScrollDirectionState = {
  scrolled: boolean;
  hidden: boolean;
};

/**
 * Efficient scroll state for the fixed Navbar.
 * Uses a single passive listener + rAF — does not update on every pixel.
 */
export function useScrollDirection({
  scrolledThreshold = 48,
  hideThreshold = 160,
  delta = 10,
  forceVisible = false,
}: UseScrollDirectionOptions = {}): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let frame = 0;
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrolled = lastY > scrolledThreshold;
    let hidden = false;

    const commit = (nextScrolled: boolean, nextHidden: boolean) => {
      if (nextScrolled === scrolled && nextHidden === hidden) return;
      scrolled = nextScrolled;
      hidden = nextHidden;
      setState({ scrolled, hidden });
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nextScrolled = y > scrolledThreshold;
      const diff = y - lastY;

      let nextHidden = hidden;

      if (forceVisible || y <= hideThreshold) {
        nextHidden = false;
      } else if (Math.abs(diff) >= delta) {
        nextHidden = diff > 0;
      }

      lastY = y;
      commit(nextScrolled, nextHidden);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [delta, forceVisible, hideThreshold, scrolledThreshold]);

  return {
    scrolled: state.scrolled,
    hidden: forceVisible ? false : state.hidden,
  };
}
