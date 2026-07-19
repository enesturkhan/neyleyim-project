import styles from "./Hero.module.css";

export function PointerGlow() {
  return (
    <>
      <div className={styles.glowCore} data-pointer-glow-core aria-hidden />
      <div
        className={styles.glowAmbient}
        data-pointer-glow-ambient
        aria-hidden
      />
    </>
  );
}
