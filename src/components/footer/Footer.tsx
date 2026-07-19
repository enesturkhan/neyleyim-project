"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { prefersReducedMotion, registerGsap } from "@/lib/animations";

import { FooterBrand } from "./FooterBrand";
import { FooterMeta } from "./FooterMeta";
import { FooterNavigation } from "./FooterNavigation";
import { FooterSocials } from "./FooterSocials";

import styles from "./Footer.module.css";

const reeds: Array<{ x: string; rotate: string }> = [
  { x: "18%", rotate: "-9deg" },
  { x: "86%", rotate: "-11deg" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const gsap = registerGsap();
    const reveals = footer.querySelectorAll("[data-footer-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(reveals, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(reveals, { autoAlpha: 0, y: 12 });

    const tween = gsap.to(reveals, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.atmosphere} aria-hidden>
        <div className={styles.atmosphereGlow} />
        <div className={styles.atmosphereGrain} />
        {reeds.map((reed) => (
          <span
            key={reed.x}
            className={styles.atmosphereReed}
            style={
              {
                "--reed-x": reed.x,
                "--reed-rotate": reed.rotate,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          <FooterBrand />
          <FooterNavigation />
        </div>

        <div className={styles.middle}>
          <FooterSocials />
        </div>

        <FooterMeta />
      </div>
    </footer>
  );
}
