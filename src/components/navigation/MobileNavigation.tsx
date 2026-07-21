"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

const INTERACT_DELAY_MS = 400;

function resetClosedStyles(
  gsap: ReturnType<typeof registerGsap>,
  panel: HTMLElement,
  links: NodeListOf<HTMLElement>,
  footer: HTMLElement | null,
) {
  gsap.set(panel, {
    opacity: 0,
    yPercent: 0,
    clearProps: "transform,visibility",
  });
  // GSAP exclusively owns link transforms (no CSS transform on .overlayLink).
  gsap.set(links, { yPercent: 110 });
  gsap.set(footer, { opacity: 0, y: 0, clearProps: "transform" });
  panel.removeAttribute("data-interactive");
}

function applyOpenStyles(
  gsap: ReturnType<typeof registerGsap>,
  panel: HTMLElement,
  links: NodeListOf<HTMLElement>,
  footer: HTMLElement | null,
) {
  // Drop inline GSAP hides so CSS [data-open="true"] can keep the panel visible.
  gsap.set(panel, { clearProps: "opacity,transform,visibility" });
  gsap.set(links, { clearProps: "transform" });
  gsap.set(footer, { clearProps: "opacity,transform" });
}

export function MobileNavigation({
  open,
  onClose,
  triggerRef,
  id,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [linksEnabled, setLinksEnabled] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const timer = window.setTimeout(() => {
      setLinksEnabled(true);
      panel?.setAttribute("data-interactive", "true");
    }, INTERACT_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      setLinksEnabled(false);
      panel?.removeAttribute("data-interactive");
    };
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const gsap = registerGsap();
    const links = panel.querySelectorAll<HTMLElement>(`.${styles.overlayLink}`);
    const footer = panel.querySelector<HTMLElement>(`.${styles.overlayFooter}`);
    const reduced = prefersReducedMotion() || reducedMotion;
    const hasOpened = panel.dataset.hasOpened === "true";

    if (!open && !hasOpened) {
      resetClosedStyles(gsap, panel, links, footer);
      return;
    }

    if (reduced) {
      if (open) {
        panel.dataset.hasOpened = "true";
        applyOpenStyles(gsap, panel, links, footer);
      } else {
        resetClosedStyles(gsap, panel, links, footer);
      }
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    if (open) {
      panel.dataset.hasOpened = "true";
      panel.removeAttribute("data-interactive");

      gsap.set(panel, { opacity: 0, yPercent: -8 });
      gsap.set(links, { yPercent: 110 });
      gsap.set(footer, { opacity: 0, y: 12 });

      const safetyTimer = window.setTimeout(() => {
        applyOpenStyles(gsap, panel, links, footer);
      }, 850);

      timeline.eventCallback("onComplete", () => {
        window.clearTimeout(safetyTimer);
        applyOpenStyles(gsap, panel, links, footer);
      });

      timeline
        .to(
          panel,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.78,
          },
          0,
        )
        .to(
          links,
          { yPercent: 0, duration: 0.72, stagger: 0.07 },
          0.18,
        )
        .to(
          footer,
          { opacity: 1, y: 0, duration: 0.5 },
          0.48,
        );

      return () => {
        window.clearTimeout(safetyTimer);
        timeline.kill();
        // If React remounts the effect while still open, do not leave
        // inline opacity:0 / yPercent:110 that keep the panel invisible.
        if (panel.getAttribute("data-open") === "true") {
          applyOpenStyles(gsap, panel, links, footer);
        }
      };
    }

    panel.removeAttribute("data-interactive");
    timeline
      .to(footer, { opacity: 0, duration: 0.25 }, 0)
      .to(links, { yPercent: 100, duration: 0.35, stagger: 0.03 }, 0)
      .to(
        panel,
        {
          opacity: 0,
          yPercent: -4,
          duration: 0.5,
          onComplete: () => {
            resetClosedStyles(gsap, panel, links, footer);
          },
        },
        0.05,
      );

    return () => {
      timeline.kill();
    };
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;

    // Focus the dialog itself — never autofocus the first nav link.
    // On mobile, focusing /hakkimizda during the opening tap can make the
    // residual click activate that Link and navigate away immediately.
    const focusTimer = window.setTimeout(() => {
      panel.focus({ preventScroll: true });
    }, reducedMotion ? 0 : 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.tabIndex !== -1 && !el.hasAttribute("disabled"));

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || active === panel) {
          event.preventDefault();
          last?.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus({ preventScroll: true });
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
      inert={!open ? true : undefined}
      tabIndex={open ? -1 : undefined}
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
                  tabIndex={open && linksEnabled ? 0 : -1}
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
                tabIndex={open && linksEnabled ? 0 : -1}
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
