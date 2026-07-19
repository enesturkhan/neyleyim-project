import { forwardRef } from "react";

import styles from "./Navbar.module.css";

type MobileMenuButtonProps = {
  open: boolean;
  onClick: () => void;
  controlsId: string;
};

export const MobileMenuButton = forwardRef<
  HTMLButtonElement,
  MobileMenuButtonProps
>(function MobileMenuButton({ open, onClick, controlsId }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
      className={styles.menuButton}
    >
      <span className={styles.menuLines} aria-hidden>
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
      </span>
      <span>{open ? "Kapat" : "Menü"}</span>
    </button>
  );
});
