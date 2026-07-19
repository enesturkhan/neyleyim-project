import type { MemoryItem } from "../../data/memories.data";

import styles from "./Memories.module.css";

type MemoryPlaceholderProps = {
  tone: MemoryItem["tone"];
};

export function MemoryPlaceholder({ tone }: MemoryPlaceholderProps) {
  return (
    <div className={styles.placeholder} data-tone={tone} aria-hidden>
      <div className={styles.placeholderBase} />
      <div className={styles.placeholderBloom} />
      <div className={styles.placeholderGrain} />
      <div className={styles.placeholderVeil} />
    </div>
  );
}
