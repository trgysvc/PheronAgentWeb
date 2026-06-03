"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

function ActivateLogic() {
  const searchParams = useSearchParams();
  const licenseKey = searchParams.get("key");
  const [copied, setCopied] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    if (licenseKey && !redirectAttempted) {
      setRedirectAttempted(true);
      // Attempt deep link redirect
      window.location.href = `pheron://activate?key=${licenseKey}`;
    }
  }, [licenseKey, redirectAttempted]);

  const handleCopy = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleManualOpen = () => {
    if (licenseKey) {
      window.location.href = `pheron://activate?key=${licenseKey}`;
    }
  };

  if (!licenseKey) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}>No License Key Found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
          This link appears to be invalid or is missing a license key.
        </p>
        <Link href="/">
          <button className="btn-primary" style={{ padding: "12px 24px" }}>Return to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "64px", height: "64px", margin: "0 auto 24px auto", background: "rgba(0, 242, 254, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
        </svg>
      </div>
      
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "12px" }}>Activating Pheron Agent</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "32px", lineHeight: "1.5" }}>
        If your browser asks for permission, please allow it to open Pheron Agent. 
        <br/>If the app didn't open automatically, you can click the button below or copy the key manually.
      </p>

      <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-glass)", borderRadius: "12px", padding: "16px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <code style={{ color: "var(--text-primary)", fontSize: "16px", fontFamily: "var(--font-jetbrains-mono)" }}>
          {licenseKey}
        </code>
        <button 
          onClick={handleCopy}
          style={{ background: "transparent", border: "none", color: "var(--color-cyan)", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <button className="btn-primary" onClick={handleManualOpen} style={{ padding: "14px 32px" }}>
          Open Pheron Agent
        </button>
        <Link href="/download">
          <button className="btn-secondary" style={{ padding: "14px 32px" }}>
            I don't have the app
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div className={styles.container}>
      {/* Minimal Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logoContainer}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "inherit" }}>
              <Image 
                src="/assets/PheronAgentLOGO2.png" 
                alt="Pheron Logo" 
                width={32} 
                height={32} 
                className={styles.logoImg}
              />
              <span>Pheron Agent</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "160px 24px 80px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card" style={{ maxWidth: "600px", width: "100%", padding: "48px 40px", border: "1px solid rgba(0, 242, 254, 0.2)" }}>
          <Suspense fallback={<div style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading activation details...</div>}>
            <ActivateLogic />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
