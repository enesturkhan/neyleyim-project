import type { CSSProperties } from "react";

import type { MemoryItem } from "../../data/memories.data";
import { MemoryCard } from "./MemoryCard";

import styles from "./Memories.module.css";

type MemoryListProps = {
  items: MemoryItem[];
};

export function MemoryList({ items }: MemoryListProps) {
  return (
    <ul className={styles.list}>
      {items.map((memory) => (
        <li
          key={memory.id}
          data-memory-item
          className={styles.item}
          data-align={memory.alignment}
          style={
            {
              "--memory-width": memory.width,
            } as CSSProperties
          }
        >
          <MemoryCard memory={memory} />
        </li>
      ))}
    </ul>
  );
}
