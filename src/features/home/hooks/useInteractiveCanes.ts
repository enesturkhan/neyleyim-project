"use client";

import { useEffect, type RefObject } from "react";

import { prefersReducedMotion } from "@/lib/animations";

import {
  CORE_RADIUS_DESKTOP,
  CORE_RADIUS_TABLET,
  INTERACTION_RADIUS_DESKTOP,
  INTERACTION_RADIUS_TABLET,
  MOBILE_STATIC_FOCUS,
  STRENGTH_LERP,
} from "../data/hero.data";

import type { HeroPointerState } from "./useHeroPointer";

type CaneCache = {
  el: HTMLElement;
  x: number;
  y: number;
  restOpacity: number;
  activeOpacity: number;
  baseRotate: number;
};

type UseInteractiveCanesOptions = {
  rootRef: RefObject<HTMLElement | null>;
  caneRefs: RefObject<Array<HTMLElement | null>>;
  pointerRef?: RefObject<HeroPointerState>;
  enabled?: boolean;
};

function getRadii(width: number) {
  if (width < 1024) {
    return {
      radius: INTERACTION_RADIUS_TABLET,
      core: CORE_RADIUS_TABLET,
    };
  }
  return {
    radius: INTERACTION_RADIUS_DESKTOP,
    core: CORE_RADIUS_DESKTOP,
  };
}

function influenceStrength(distance: number, radius: number, core: number) {
  const normalized = Math.max(0, 1 - distance / radius);
  if (distance <= core) return 1;
  return Math.pow(normalized, 1.05);
}

/**
 * Cane color / opacity / subtle motion via refs + RAF.
 * Pointer position comes from useHeroPointer when enabled.
 */
export function useInteractiveCanes({
  rootRef,
  caneRefs,
  pointerRef,
  enabled = true,
}: UseInteractiveCanesOptions) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();
    let frame = 0;
    let rootWidth = 1;
    let rootHeight = 1;
    let radius = INTERACTION_RADIUS_DESKTOP;
    let core = CORE_RADIUS_DESKTOP;
    let cache: CaneCache[] = [];
    const strengths = new Map<HTMLElement, number>();
    let prevX = 0;
    let prevY = 0;

    const applyCane = (
      entry: CaneCache,
      strength: number,
      distanceNorm: number,
      dirX: number,
      dirY: number,
    ) => {
      entry.el.style.setProperty("--green-strength", strength.toFixed(3));
      entry.el.style.setProperty("--distance", distanceNorm.toFixed(3));

      const opacity =
        entry.restOpacity +
        strength * (entry.activeOpacity - entry.restOpacity);
      entry.el.style.opacity = opacity.toFixed(3);

      const moveX = dirX * strength * (4 + strength * 6);
      const moveY = dirY * strength * (2 + strength * 3);
      const rotDelta = strength * 0.8;
      entry.el.style.transform = `translate3d(calc(-50% + ${moveX.toFixed(2)}px), ${moveY.toFixed(2)}px, 0) rotate(${(entry.baseRotate + rotDelta).toFixed(2)}deg)`;
    };

    const resetCanes = () => {
      for (const entry of cache) {
        strengths.set(entry.el, 0);
        applyCane(entry, 0, 1, 0, 0);
      }
      root.style.setProperty("--interaction-strength", "0");
    };

    const rebuildCache = () => {
      const rootRect = root.getBoundingClientRect();
      rootWidth = rootRect.width || 1;
      rootHeight = rootRect.height || 1;
      const radii = getRadii(rootWidth);
      radius = radii.radius;
      core = radii.core;

      cache = [];
      for (const el of caneRefs.current ?? []) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        cache.push({
          el,
          x: rect.left + rect.width / 2 - rootRect.left,
          y: rect.top + rect.height / 2 - rootRect.top,
          restOpacity: Number(el.dataset.restOpacity) || 0.2,
          activeOpacity: Number(el.dataset.activeOpacity) || 0.95,
          baseRotate: Number(el.dataset.rotate) || -12,
        });
        if (!strengths.has(el)) strengths.set(el, 0);
      }
    };

    const updateCanes = (px: number, py: number, inside: boolean) => {
      if (!cache.length) return;

      const velX = px - prevX;
      const velY = py - prevY;
      prevX = px;
      prevY = py;

      let maxStrength = 0;

      for (const entry of cache) {
        const dx = px - entry.x;
        const dy = py - entry.y;
        const distance = Math.hypot(dx, dy);
        const normalized = Math.max(0, 1 - distance / radius);
        const distanceStrength = inside
          ? influenceStrength(distance, radius, core)
          : 0;

        const normalizedX = entry.x / rootWidth;
        const horizontalBias = 0.9 + normalizedX * 0.1;
        const targetStrength = distanceStrength * horizontalBias;

        const previous = strengths.get(entry.el) ?? 0;
        const next = previous + (targetStrength - previous) * STRENGTH_LERP;
        strengths.set(entry.el, next);
        maxStrength = Math.max(maxStrength, next);

        const inv = distance > 0.001 ? 1 / distance : 0;
        const dirX = (dx * inv + velX * 0.02) * -1;
        const dirY = (dy * inv + velY * 0.02) * -1;

        applyCane(entry, next, 1 - normalized, dirX, dirY);
      }

      root.style.setProperty("--interaction-strength", maxStrength.toFixed(3));
    };

    const applyStaticFocus = () => {
      rebuildCache();
      const px = rootWidth * MOBILE_STATIC_FOCUS.x;
      const py = rootHeight * MOBILE_STATIC_FOCUS.y;
      prevX = px;
      prevY = py;

      for (const entry of cache) {
        const dx = px - entry.x;
        const dy = py - entry.y;
        const distance = Math.hypot(dx, dy);
        const normalized = Math.max(0, 1 - distance / (radius * 1.05));
        const base = influenceStrength(distance, radius * 1.05, core);
        const normalizedX = entry.x / rootWidth;
        const strength =
          base *
          (0.9 + normalizedX * 0.1) *
          MOBILE_STATIC_FOCUS.strength;

        strengths.set(entry.el, strength);
        applyCane(entry, strength, 1 - normalized, 0, 0);
      }

      root.style.setProperty("--pointer-x", `${px}px`);
      root.style.setProperty("--pointer-y", `${py}px`);
      root.style.setProperty(
        "--interaction-strength",
        String(MOBILE_STATIC_FOCUS.strength),
      );
    };

    if (reduced) {
      rebuildCache();
      resetCanes();
      return;
    }

    if (!enabled) {
      applyStaticFocus();
      const onResize = () => applyStaticFocus();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        resetCanes();
      };
    }

    const render = () => {
      const pointer = pointerRef?.current;
      if (pointer) {
        updateCanes(pointer.x, pointer.y, pointer.inside);
      }
      frame = window.requestAnimationFrame(render);
    };

    rebuildCache();
    resetCanes();

    const resizeObserver = new ResizeObserver(() => {
      rebuildCache();
    });
    resizeObserver.observe(root);
    frame = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      resetCanes();
    };
  }, [caneRefs, enabled, pointerRef, rootRef]);
}
