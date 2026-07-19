import type { CSSProperties } from "react";

import styles from "./ProgramsPreview.module.css";

type ProgramHoverVisualProps = {
  active: boolean;
  offsetPercent: number;
};

export function ProgramHoverVisual({
  active,
  offsetPercent,
}: ProgramHoverVisualProps) {
  return (
    <div
      className={`${styles.hoverVisual} ${active ? styles.hoverVisualActive : ""}`}
      style={{ "--hover-top": `${offsetPercent}%` } as CSSProperties}
      aria-hidden
    >
      <div className={styles.hoverStage}>
        <span
          className={styles.hoverBand}
          style={
            {
              "--band-x": "22%",
              "--band-rotate": "-14deg",
            } as CSSProperties
          }
        />
        <span
          className={styles.hoverBand}
          style={
            {
              "--band-x": "48%",
              "--band-rotate": "-9deg",
            } as CSSProperties
          }
        />
        <span className={styles.hoverOrb} />
        <span
          className={styles.hoverLine}
          style={{ "--line-x": "38%" } as CSSProperties}
        />
        <span
          className={styles.hoverLine}
          style={{ "--line-x": "58%" } as CSSProperties}
        />
      </div>
    </div>
  );
}
