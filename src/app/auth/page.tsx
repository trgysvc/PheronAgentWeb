"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function AuthPage() {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleOAuthLogin = (provider: "Apple") => {
    setMessage({ 
      text: `Redirecting to Supabase OAuth portal for ${provider} Login...`, 
      type: "success" 
    });

    setTimeout(() => {
      const supabaseUrl = "https://pmqrnjspbonanydcahky.supabase.co";
      const redirectUrl = window.location.origin;
      window.location.href = `${supabaseUrl}/auth/v1/authorize?provider=apple&redirect_to=${encodeURIComponent(redirectUrl)}`;
    }, 800);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to home
      </Link>

      {/* Left side: Character & Tagline */}
      <div className={styles.leftSide}>
        <div className={styles.leftContent}>
          <div className={styles.characterWrapper}>
            <Image 
              src="/assets/PheronAgentCharacterClean.png" 
              alt="Pheron Agent Character" 
              width={640} 
              height={640} 
              className={styles.characterImg}
              priority
            />
          </div>
          <h2 className={styles.leftTitle}>Autonomous Intelligence</h2>
          <p className={styles.leftSubtitle}>
            Run state-of-the-art local models on Apple Silicon with hardware-level security and zero external dependencies.
          </p>
        </div>
      </div>

      {/* Right side: Login Panel */}
      <div className={styles.rightSide}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>
              Sign in to Pheron Agent
            </h1>
            <p className={styles.subtitle}>
              Access your Pheron Agent cloud configurations and manage your licenses.
            </p>
          </div>

          {/* OAuth Buttons (Supabase Auth Mock) */}
          <div className={styles.ssoContainer}>
            <button 
              type="button" 
              className={`${styles.ssoBtn} ${styles.btnApple}`}
              onClick={() => handleOAuthLogin("Apple")}
            >
              <svg className={styles.socialIcon} viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.84-14.3-5.9-3.58-2.83-7.5-7.66-11.75-14.53-8.61-13.9-15.02-30.88-19.23-50.96-2.58-12.35-3.87-24-3.87-34.98 0-16.14 3.87-29.21 11.62-39.22 7.74-10.02 17.5-15.15 29.27-15.4 5.37-.12 11.02 1.63 16.94 5.25 5.92 3.63 9.94 5.44 12.06 5.44 1.79 0 5.44-1.5 10.96-4.5 5.51-3 10.9-4.57 16.16-4.7 11.96-.13 22.01 4.22 30.15 13.06 6.04 6.57 10.37 14.53 13 23.86-13.5 8.16-20.12 18.91-19.87 32.26.25 10.39 4.17 19.1 11.75 26.13 7.58 7.03 16.42 11 26.54 11.9-2.61 7.62-5.78 15.17-9.5 22.65zM119.22 30.3c0-7.85 2.8-15.34 8.4-22.5 7.64-9.39 16.94-14.3 27.9-14.7 1.06 8.36-1.92 16.32-8.94 23.87-7.02 7.55-15.82 12.22-26.4 13.01-.63-.94-.96-1.74-.96-2.68z" />
              </svg>
              Sign in with Apple
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <div 
              style={{ 
                fontSize: "14px", 
                color: message.type === "success" ? "var(--color-cyan)" : "#ef4444",
                background: message.type === "success" ? "rgba(0, 242, 254, 0.05)" : "rgba(239, 68, 68, 0.05)",
                border: `1px solid ${message.type === "success" ? "var(--color-cyan)" : "#ef4444"}`,
                padding: "12px",
                borderRadius: "8px",
                lineHeight: "1.4"
              }}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
