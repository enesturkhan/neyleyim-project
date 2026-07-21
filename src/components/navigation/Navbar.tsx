"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout";
import { useScrollDirection } from "@/hooks";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavigation } from "./MobileNavigation";
import { NavbarLogo } from "./NavbarLogo";

import styles from "./Navbar.module.css";

const DESKTOP_NAV_MIN = 1024;

export function Navbar() {
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const panelId = `mobile-navigation-${menuId}`;

  // Open only while the menu pathname still matches the current route.
  // Route changes close the menu without render-time setState.
  const menuOpen = menuPathname === pathname;

  const closeMenu = () => setMenuPathname(null);

  const toggleMenu = () => {
    setMenuPathname((current) => (current === pathname ? null : pathname));
  };

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN}px)`);

    const onViewportChange = () => {
      if (media.matches) {
        setMenuPathname(null);
      }
    };

    media.addEventListener("change", onViewportChange);

    return () => {
      media.removeEventListener("change", onViewportChange);
    };
  }, []);

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
              <NavbarLogo onNavigate={closeMenu} />
            </div>

            <nav
              aria-label="Ana navigasyon"
              className={styles.desktopNavArea}
            >
              <DesktopNavigation />
            </nav>

            <div className={styles.balanceArea}>
              <MobileMenuButton
                ref={menuButtonRef}
                open={menuOpen}
                onClick={toggleMenu}
                controlsId={panelId}
              />
            </div>
          </div>
        </Container>
      </header>

      <MobileNavigation
        id={panelId}
        open={menuOpen}
        onClose={closeMenu}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
