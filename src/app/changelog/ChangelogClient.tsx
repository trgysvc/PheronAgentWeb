"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";

interface ChangelogClientProps {
  htmlContent: string;
}

export default function ChangelogClient({ htmlContent }: ChangelogClientProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
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
          <nav className={styles.navLinks}>
            {/* Product with Dropdown */}
            <div className={styles.navItemWithDropdown}>
              <button className={styles.navLinkButton}>
                Product
              </button>
              <div className={styles.navDropdown}>
                <Link href="/product/agent" className={styles.dropdownItem}>Agent</Link>
                <Link href="/resources/docs/api" className={styles.dropdownItem}>API</Link>
                <Link href="/ecosystem" className={styles.dropdownItem}>Ecosystem</Link>
              </div>
            </div>

            {/* Pricing */}
            <Link href="/pricing" className={styles.navLink}>Pricing</Link>

            {/* Resources with 2-Column Dropdown */}
            <div className={styles.navItemWithDropdown}>
              <button className={styles.navLinkButton}>
                Resources
              </button>
              <div className={`${styles.navDropdown} ${styles.navDropdownTwoCol}`}>
                <div className={styles.dropdownCol}>
                  <Link href="/resources/help" className={styles.dropdownItem}>Help</Link>
                  <Link href="/resources/docs" className={styles.dropdownItem}>Docs</Link>
                  <Link href="/resources/learn" className={styles.dropdownItem}>Learn</Link>
                  <Link href="/resources/docs/wiki/benchmark_results" className={styles.dropdownItem}>Benchmarks</Link>
                </div>
                <div className={styles.dropdownCol}>
                  <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>Blog</span>
                  <Link href="/changelog" className={styles.dropdownItem}>Changelog</Link>
                  <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>Community</span>
                </div>
              </div>
            </div>
          </nav>
          <div className={styles.navActions}>
            <Link href="/auth" className={`${styles.navBtn} btn-secondary`} style={{ display: "none" }}>Sign In</Link>
            <Link href="/download" className={`${styles.navBtn} btn-primary`}>Download</Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "140px 24px 80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
