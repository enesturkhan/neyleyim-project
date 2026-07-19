"use client";

import { useEffect } from "react";

/**
 * Locks document scroll while `locked` is true.
 * Also signals Lenis via `data-scroll-lock` on <html>.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;
    const previousBody = body.style.overflow;
    const previousHtml = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.dataset.scrollLock = "true";

    return () => {
      body.style.overflow = previousBody;
      html.style.overflow = previousHtml;
      delete html.dataset.scrollLock;
    };
  }, [locked]);
}
