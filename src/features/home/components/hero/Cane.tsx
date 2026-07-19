import { forwardRef, type CSSProperties } from "react";

import type { CaneConfig } from "../../data/hero.data";

import styles from "./Hero.module.css";

type CaneProps = {
  cane: CaneConfig;
};

export const Cane = forwardRef<HTMLDivElement, CaneProps>(function Cane(
  { cane },
  ref,
) {
  return (
    <div
      ref={ref}
      className={styles.cane}
      data-zone={cane.zone}
      data-rest-opacity={cane.opacity}
      data-active-opacity={cane.activeOpacity}
      data-rotate={cane.rotate}
      style={
        {
          "--cane-x": `${cane.x}%`,
          "--cane-top": `${cane.top}%`,
          "--cane-width": `${cane.width}px`,
          "--cane-height": `${cane.height}%`,
          "--cane-rotate": `${cane.rotate}deg`,
          "--rest-opacity": cane.opacity,
          filter: cane.blur ? `blur(${cane.blur}px)` : undefined,
          opacity: cane.opacity,
        } as CSSProperties
      }
      aria-hidden
    >
      <div className={styles.caneBody}>
        <span className={styles.caneRidge} />
        {cane.holes.map((top) => (
          <span
            key={`${cane.id}-${top}`}
            className={styles.caneHole}
            style={{ top: `${top}%` }}
          />
        ))}
        <span className={styles.caneEdge} />
      </div>
    </div>
  );
});
