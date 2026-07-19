import styles from "./FinalCTA.module.css";

export function FinalCTAHeader() {
  return (
    <header className={styles.header}>
      <p data-final-cta-reveal className={styles.eyebrow}>
        İLETİŞİM
      </p>

      <h2 id="final-cta-heading" className={styles.title}>
        {["Birlikte", "aynı nefesi", "paylaşalım."].map((line) => (
          <span key={line} className={styles.titleClip}>
            <span data-final-cta-title-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h2>

      <p data-final-cta-reveal className={styles.lead}>
        <span className="block">Konserler,</span>
        <span className="block">özel davetler,</span>
        <span className="block">tasavvuf geceleri</span>
        <span className="block">ve kültürel organizasyonlar için</span>
        <span className="block">Neyleyim ile iletişime geçebilirsiniz.</span>
      </p>
    </header>
  );
}
