"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";

interface SiteHeaderProps {
  activeTab?: string;
}

export default function SiteHeader({ activeTab }: SiteHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link href="/" className={styles.logoContainer} style={{ textDecoration: "none", color: "inherit" }}>
          <Image 
            src="/assets/PheronAgentLOGO2.png" 
            alt="Pheron Logo" 
            width={32} 
            height={32} 
            className={styles.logoImg}
          />
          <span>Pheron Agent</span>
        </Link>
        <nav className={styles.navLinks}>
          {/* Product with Dropdown */}
          <div className={styles.navItemWithDropdown}>
            <button className={`${styles.navLinkButton} ${activeTab === "product" ? styles.docsLinkActive : ""}`}>
              {t("nav.product", "Product")}
            </button>
            <div className={styles.navDropdown}>
              <Link href="/product/agent" className={styles.dropdownItem}>{t("nav.agent", "Agent")}</Link>
              <Link href={`/resources/docs/${language}/api`} className={styles.dropdownItem}>{t("footer.api", "API")}</Link>
              <Link href="/ecosystem" className={styles.dropdownItem}>{t("nav.ecosystem", "Ecosystem")}</Link>
            </div>
          </div>

          {/* Pricing */}
          <Link href="/pricing" className={`${styles.navLink} ${activeTab === "pricing" ? styles.docsLinkActive : ""}`}>
            {t("nav.pricing", "Pricing")}
          </Link>

          {/* Resources with 2-Column Dropdown */}
          <div className={styles.navItemWithDropdown}>
            <button className={`${styles.navLinkButton} ${activeTab === "resources" ? styles.docsLinkActive : ""}`}>
              {t("nav.resources", "Resources")}
            </button>
            <div className={`${styles.navDropdown} ${styles.navDropdownTwoCol}`}>
              <div className={styles.dropdownCol}>
                <Link href="/resources/help" className={styles.dropdownItem}>{t("footer.help", "Help")}</Link>
                <Link href={`/resources/docs/${language}`} className={styles.dropdownItem}>{t("footer.docs", "Docs")}</Link>
                <Link href="/resources/learn" className={styles.dropdownItem}>{t("footer.learn", "Learn")}</Link>
                <Link href={`/resources/docs/${language}/wiki/benchmark_results`} className={styles.dropdownItem}>{t("nav.benchmarks", "Benchmarks")}</Link>
              </div>
              <div className={styles.dropdownCol}>
                <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>{t("nav.blog", "Blog")}</span>
                <Link href="/changelog" className={styles.dropdownItem}>{t("nav.changelog", "Changelog")}</Link>
                <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>{t("nav.community", "Community")}</span>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.navActions}>
          {/* Header Language Selector */}
          <div className={styles.languageContainer} ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className={styles.languageBtn}
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              style={{ background: "rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border-glass)" }}
            >
              <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{currentLangObj.label}</span>
              <svg className={`${styles.caretIcon} ${languageDropdownOpen ? styles.caretIconOpen : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {languageDropdownOpen && (
              <div className={styles.languageDropdown} style={{ right: 0, top: "100%", marginTop: "8px" }}>
                {LANGUAGES.map((langItem) => (
                  <button
                    key={langItem.code}
                    className={`${styles.languageOption} ${language === langItem.code ? styles.languageOptionActive : ""}`}
                    onClick={() => {
                      setLanguage(langItem.code);
                      setLanguageDropdownOpen(false);
                    }}
                  >
                    <span>{langItem.label}</span>
                    {language === langItem.code && (
                      <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/download" className={`${styles.navBtn} btn-primary`}>{t("nav.download", "Download")}</Link>
        </div>
      </div>
    </header>
  );
}
