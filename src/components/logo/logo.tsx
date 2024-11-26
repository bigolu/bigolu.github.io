import styles from "./logo.module.css";

export default function LogoComponent() {
  return (
    <a className={styles.container} href="/">
      <div className={styles["home-logo"]}>
        <span className={styles.big}>big</span>
        <span className={styles.olu}>olu</span>
      </div>
    </a>
  );
}
