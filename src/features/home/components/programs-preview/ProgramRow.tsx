import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { formatEventDate } from "@/lib/utils/format-event-date";

import type { ProgramPreviewItem } from "../../data/programs-preview.data";
import { programsPreviewIntro } from "../../data/programs-preview.data";

import styles from "./ProgramsPreview.module.css";

type ProgramRowProps = {
  program: ProgramPreviewItem;
  onActivate: () => void;
  onDeactivate: () => void;
};

export function ProgramRow({
  program,
  onActivate,
  onDeactivate,
}: ProgramRowProps) {
  const formatted = formatEventDate(program.date, program.time);

  return (
    <Link
      href={programsPreviewIntro.cta.href}
      className={styles.row}
      aria-label={`${program.title} programını görüntüle. ${formatted.fullLabel}, ${program.venue}, ${program.city}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <div className={styles.dateBlock} aria-hidden>
        <span className={styles.day}>{formatted.day}</span>
        <span className={styles.month}>{formatted.month}</span>
      </div>

      <div className={styles.main}>
        <h3 className={styles.titleText}>{program.title}</h3>
        {program.shortDescription ? (
          <p className={styles.description}>{program.shortDescription}</p>
        ) : null}
      </div>

      <div className={styles.meta}>
        <span className={styles.metaPrimary}>{program.venue}</span>
        <span>
          {program.city} · {program.time}
        </span>
      </div>

      <ArrowUpRight className={styles.arrow} aria-hidden />
    </Link>
  );
}
