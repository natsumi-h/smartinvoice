import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main className={styles.main}>
      <div>Header login</div>
      <div className={styles.description}>Market</div>
    </main>
  );
}
