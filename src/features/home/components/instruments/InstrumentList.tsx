"use client";

import { useEffect, useRef } from "react";

import { instruments, type Instrument } from "../../data/instruments.data";

import styles from "./Instruments.module.css";

type InstrumentListProps = {
  activeId: Instrument["id"];
  onSelect: (id: Instrument["id"]) => void;
  listId: string;
  previewId: string;
};

export function InstrumentList({
  activeId,
  onSelect,
  listId,
  previewId,
}: InstrumentListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const activeButton = list.querySelector<HTMLButtonElement>(
      `[data-instrument-id="${activeId}"]`,
    );
    activeButton?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <ul
      ref={listRef}
      id={listId}
      className={styles.list}
      role="listbox"
      aria-label="Enstrümanlar"
    >
      {instruments.map((instrument) => {
        const isActive = instrument.id === activeId;

        return (
          <li key={instrument.id} className={styles.listItem} role="none">
            <button
              type="button"
              role="option"
              data-instrument-id={instrument.id}
              aria-selected={isActive}
              aria-current={isActive ? "true" : undefined}
              aria-controls={previewId}
              className={`${styles.listButton} ${isActive ? styles.listButtonActive : ""}`}
              onClick={() => onSelect(instrument.id)}
              onMouseEnter={() => onSelect(instrument.id)}
              onFocus={() => onSelect(instrument.id)}
            >
              <span className={styles.name}>{instrument.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
