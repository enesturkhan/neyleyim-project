import { memoriesIntro } from "../../data/memories.data";

import styles from "./Memories.module.css";

export function MemoriesHeader() {
  return (
    <header className={styles.header}>
      <p data-memories-reveal className={styles.eyebrow}>
        {memoriesIntro.eyebrow}
      </p>

      <h2 id="memories-heading" className={styles.title}>
        {memoriesIntro.title.map((line) => (
          <span key={line} className={styles.titleClip}>
            <span data-memories-title-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div data-memories-reveal className={styles.lead}>
        {memoriesIntro.lead.map((line, index) =>
          line === "" ? (
            <span key={`gap-${index}`} className={styles.leadGap} />
          ) : (
            <span key={line} className="block">
              {line}
            </span>
          ),
        )}
      </div>
    </header>
  );
}
