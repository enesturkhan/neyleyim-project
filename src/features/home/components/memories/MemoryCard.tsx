import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import type { MemoryItem } from "../../data/memories.data";
import { MemoryPlaceholder } from "./MemoryPlaceholder";

import styles from "./Memories.module.css";

type MemoryCardProps = {
  memory: MemoryItem;
};

function ratioToCss(ratio: MemoryItem["ratio"]): string {
  return ratio.replace("/", " / ");
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const hasImage = Boolean(memory.image);

  return (
    <article className={styles.card} tabIndex={0}>
      <div className={styles.mediaWrap}>
        <div
          data-memory-frame
          className={`${styles.frame} ${styles.reveal}`}
          style={
            {
              "--memory-ratio": ratioToCss(memory.ratio),
            } as CSSProperties
          }
        >
          <div data-memory-parallax className={styles.parallax}>
            {hasImage ? (
              // Real photos will replace this source later.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.media}
                src={memory.image}
                alt={memory.alt}
              />
            ) : (
              <div className={styles.media}>
                <MemoryPlaceholder tone={memory.tone} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div data-memory-caption className={styles.caption}>
        <div className={styles.meta}>
          <p className={styles.location}>{memory.location}</p>
          {memory.title ? (
            <h3 className={styles.eventTitle}>{memory.title}</h3>
          ) : null}
          {memory.description ? (
            <p className={styles.description}>{memory.description}</p>
          ) : null}
        </div>

        <div className={styles.yearRow}>
          <span className={styles.year}>{memory.year}</span>
          <ArrowUpRight className={styles.arrow} aria-hidden />
        </div>
      </div>
    </article>
  );
}
