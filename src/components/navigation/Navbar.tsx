"use client";

import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout";
import { useScrollDirection } from "@/hooks";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavigation } from "./MobileNavigation";
import { NavbarLogo } from "./NavbarLogo";

import styles from "./Navbar.module.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);
  const menuId = useId();
  const panelId = `mobile-navigation-${menuId}`;

  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  const { scrolled, hidden } = useScrollDirection({
    scrolledThreshold: 48,
    hideThreshold: 160,
    delta: 10,
    forceVisible: menuOpen,
  });

  return (
    <>
      <header
        data-navbar
        data-scrolled={scrolled ? "true" : "false"}
        data-hidden={hidden ? "true" : "false"}
        data-menu-open={menuOpen ? "true" : "false"}
        className={styles.header}
      >
        <Container width="wide" className={styles.shell}>
          <div className={styles.navbarGrid}>
            <div className={styles.logoArea}>
              <NavbarLogo onNavigate={() => setMenuOpen(false)} />
            </div>

            <nav
              aria-label="Ana navigasyon"
              className={styles.desktopNavArea}
            >
              <DesktopNavigation />
            </nav>

            <div className={styles.balanceArea} aria-hidden="true">
              <MobileMenuButton
                ref={menuButtonRef}
                open={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
                controlsId={panelId}
              />
            </div>
          </div>
        </Container>
      </header>

      <MobileNavigation
        id={panelId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
