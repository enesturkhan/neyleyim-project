import type { CSSProperties } from "react";

import type { InstrumentBackgroundVariant } from "../../data/instruments.data";

import styles from "./Instruments.module.css";

type InstrumentBackgroundProps = {
  variant: InstrumentBackgroundVariant;
};

function NeyVisual() {
  const reeds = [
    { x: "22%", width: "2.1rem", rotate: "-11deg", opacity: 0.42, delay: "0s", holes: [28, 48, 68] },
    { x: "38%", width: "2.6rem", rotate: "-9deg", opacity: 0.62, delay: "0.4s", holes: [24, 44, 64] },
    { x: "54%", width: "3rem", rotate: "-8deg", opacity: 0.78, delay: "0.8s", holes: [22, 40, 58, 76] },
    { x: "70%", width: "2.35rem", rotate: "-12deg", opacity: 0.5, delay: "1.1s", holes: [30, 52, 72] },
    { x: "84%", width: "1.9rem", rotate: "-7deg", opacity: 0.35, delay: "1.5s", holes: [36, 58] },
  ];

  return (
    <div className={styles.visual} data-variant="reeds">
      {reeds.map((reed) => (
        <div
          key={reed.x}
          className={styles.reed}
          style={
            {
              "--reed-x": reed.x,
              "--reed-width": reed.width,
              "--reed-rotate": reed.rotate,
              "--reed-opacity": reed.opacity,
              "--reed-delay": reed.delay,
            } as CSSProperties
          }
        >
          {reed.holes.map((top) => (
            <span
              key={top}
              className={styles.reedHole}
              style={{ top: `${top}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function BendirVisual() {
  return (
    <div className={styles.visual} data-variant="circles">
      <span
        className={styles.ring}
        style={{ "--ring-inset": "8%", "--ring-delay": "0s" } as CSSProperties}
      />
      <span
        className={styles.ring}
        style={{ "--ring-inset": "18%", "--ring-delay": "0.35s" } as CSSProperties}
      />
      <span
        className={styles.ring}
        style={{ "--ring-inset": "28%", "--ring-delay": "0.7s" } as CSSProperties}
      />
      <span className={styles.ringCore} />
    </div>
  );
}

function KudumVisual() {
  return (
    <div className={styles.visual} data-variant="drums">
      <div className={`${styles.drum} ${styles.drumPrimary}`}>
        <span className={styles.drumRim} />
      </div>
      <div className={`${styles.drum} ${styles.drumSecondary}`}>
        <span className={styles.drumRim} />
      </div>
    </div>
  );
}

function KemanVisual() {
  const curves = [
    { rotate: "-22deg", scale: "1", opacity: 0.45, delay: "0s" },
    { rotate: "-8deg", scale: "0.86", opacity: 0.6, delay: "0.5s" },
    { rotate: "10deg", scale: "0.72", opacity: 0.5, delay: "1s" },
    { rotate: "24deg", scale: "0.58", opacity: 0.35, delay: "1.4s" },
  ];

  return (
    <div className={styles.visual} data-variant="curves">
      {curves.map((curve) => (
        <span
          key={curve.rotate}
          className={styles.curve}
          style={
            {
              "--curve-rotate": curve.rotate,
              "--curve-scale": curve.scale,
              "--curve-opacity": curve.opacity,
              "--curve-delay": curve.delay,
            } as CSSProperties
          }
        />
      ))}
      <span
        className={styles.curveHair}
        style={{ "--hair-rotate": "-14deg" } as CSSProperties}
      />
      <span
        className={styles.curveHair}
        style={{ "--hair-rotate": "8deg", top: "42%" } as CSSProperties}
      />
      <span
        className={styles.curveHair}
        style={{ "--hair-rotate": "-2deg", top: "58%" } as CSSProperties}
      />
    </div>
  );
}

export function InstrumentBackground({ variant }: InstrumentBackgroundProps) {
  switch (variant) {
    case "reeds":
      return <NeyVisual />;
    case "circles":
      return <BendirVisual />;
    case "drums":
      return <KudumVisual />;
    case "curves":
      return <KemanVisual />;
    default:
      return null;
  }
}
