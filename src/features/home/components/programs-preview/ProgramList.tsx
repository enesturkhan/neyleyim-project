"use client";

import { useState } from "react";

import type { ProgramPreviewItem } from "../../data/programs-preview.data";
import { ProgramHoverVisual } from "./ProgramHoverVisual";
import { ProgramRow } from "./ProgramRow";

import styles from "./ProgramsPreview.module.css";

type ProgramListProps = {
  programs: ProgramPreviewItem[];
};

export function ProgramList({ programs }: ProgramListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const offsetPercent =
    activeIndex === null
      ? 12
      : Math.min(58, Math.max(4, activeIndex * 28 + 8));

  return (
    <div className={styles.listWrap}>
      <ProgramHoverVisual
        active={activeIndex !== null}
        offsetPercent={offsetPercent}
      />

      <ul className={styles.list}>
        {programs.map((program, index) => (
          <li
            key={program.id}
            data-programs-row
            className={`${styles.rowItem} ${styles.reveal}`}
          >
            <ProgramRow
              program={program}
              onActivate={() => setActiveIndex(index)}
              onDeactivate={() => setActiveIndex(null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
