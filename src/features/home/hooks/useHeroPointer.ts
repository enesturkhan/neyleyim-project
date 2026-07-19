"use client";

import { useEffect, useRef, type RefObject } from "react";

import { prefersReducedMotion } from "@/lib/animations";

import { POINTER_LERP } from "../data/hero.data";

export type HeroPointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  inside: boolean;
  rootLeft: number;
  rootTop: number;
};

type UseHeroPointerOptions = {
  rootRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

/**
 * Tracks pointer relative to the Hero root.
 * Updates CSS variables via RAF — no React rerenders.
 */
export function useHeroPointer({
  rootRef,
  enabled = true,
}: UseHeroPointerOptions) {
  const pointerRef = useRef<HeroPointerState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    inside: false,
    rootLeft: 0,
    rootTop: 0,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled || prefersReducedMotion()) return;

    let frame = 0;
    const state = pointerRef.current;

    const cacheRoot = () => {
      const rect = root.getBoundingClientRect();
      state.rootLeft = rect.left;
      state.rootTop = rect.top;
    };

    const render = () => {
      state.x += (state.targetX - state.x) * POINTER_LERP;
      state.y += (state.targetY - state.y) * POINTER_LERP;

      root.style.setProperty("--pointer-x", `${state.x}px`);
      root.style.setProperty("--pointer-y", `${state.y}px`);

      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      state.targetX = event.clientX - state.rootLeft;
      state.targetY = event.clientY - state.rootTop;
      state.inside = true;
    };

    const onPointerEnter = (event: PointerEvent) => {
      cacheRoot();
      state.x = event.clientX - state.rootLeft;
      state.y = event.clientY - state.rootTop;
      state.targetX = state.x;
      state.targetY = state.y;
      state.inside = true;
    };

    const onPointerLeave = () => {
      state.inside = false;
    };

    cacheRoot();
    const resizeObserver = new ResizeObserver(cacheRoot);
    resizeObserver.observe(root);

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        cacheRoot();
      });
    };

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, [enabled, rootRef]);

  return pointerRef;
}
