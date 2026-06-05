"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to home</Link>
        <Image src="/assets/PheronAgentLOGO2.png" alt="Pheron Agent" width={28} height={28} style={{ opacity: 0.7 }} />
      </div>

      <div className={styles.content}>
        <div className={styles.identityCard}>
          <div className={styles.identityInfo}>
            <span className={styles.userName}>Coming Soon</span>
            <span className={styles.userEmail}>Profile features will be available in a future update.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
