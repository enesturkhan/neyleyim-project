"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { useBodyScrollLock, useReducedMotion } from "@/hooks";
import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import {
  brand,
  mainNavigation,
  socialLinks,
} from "./navigation.config";

import styles from "./Navbar.module.css";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  id: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigation({
  open,
  onClose,
  triggerRef,
  id,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useBodyScrollLock(open);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const gsap = registerGsap();
    const links = panel.querySelectorAll<HTMLElement>(`.${styles.overlayLink}`);
    const footer = panel.querySelector<HTMLElement>(`.${styles.overlayFooter}`);
    const reduced = prefersReducedMotion() || reducedMotion;
    const hasOpened = panel.dataset.hasOpened === "true";

    if (!open && !hasOpened) {
      gsap.set(panel, { autoAlpha: 0, yPercent: -8 });
      gsap.set(links, { yPercent: 110 });
      gsap.set(footer, { autoAlpha: 0 });
      return;
    }

    if (reduced) {
      gsap.set(panel, {
        autoAlpha: open ? 1 : 0,
        yPercent: 0,
      });
      gsap.set(links, { yPercent: open ? 0 : 110 });
      gsap.set(footer, { autoAlpha: open ? 1 : 0 });
      if (open) panel.dataset.hasOpened = "true";
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    if (open) {
      panel.dataset.hasOpened = "true";
      timeline
        .fromTo(
          panel,
          { autoAlpha: 0, yPercent: -8 },
          { autoAlpha: 1, yPercent: 0, duration: 0.78 },
          0,
        )
        .fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.72, stagger: 0.07 },
          0.18,
        )
        .fromTo(
          footer,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.48,
        );
    } else {
      timeline
        .to(footer, { autoAlpha: 0, duration: 0.25 }, 0)
        .to(links, { yPercent: 100, duration: 0.35, stagger: 0.03 }, 0)
        .to(panel, { autoAlpha: 0, yPercent: -4, duration: 0.5 }, 0.05);
    }

    return () => {
      timeline.kill();
    };
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const focusTimer = window.setTimeout(() => {
      first?.focus();
    }, reducedMotion ? 0 : 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, onClose, reducedMotion, triggerRef]);

  return (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Ana menü"
      data-open={open ? "true" : "false"}
      className={styles.overlay}
      aria-hidden={!open}
    >
      <div className={styles.overlayCanes} aria-hidden />

      <div className={styles.overlayInner}>
        <nav aria-label="Mobil navigasyon">
          <ul className={styles.overlayNav}>
            {mainNavigation.map((item, index) => (
              <li key={item.href} className={styles.overlayItem}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className={styles.overlayLink}
                >
                  <span className={styles.overlayIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.overlayLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.overlayFooter}>
          <p className={styles.overlayStatement}>
            {brand.statement.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <div className={styles.overlayMeta}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className={styles.socialLink}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
