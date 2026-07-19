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
  return (
    <ul id={listId} className={styles.list} role="listbox" aria-label="Enstrümanlar">
      {instruments.map((instrument) => {
        const isActive = instrument.id === activeId;
        const indexLabel = String(instrument.index).padStart(2, "0");

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
              <span className={styles.index}>{indexLabel}</span>
              <span className={styles.name}>{instrument.title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
