"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";

export default function SiteFooter() {
  const [activeTheme, setActiveTheme] = useState("system");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

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
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          {/* Left side brand */}
          <div className={styles.footerBrand}>
            <div className={styles.logoContainer} style={{ background: "none", WebkitTextFillColor: "unset", color: "var(--text-primary)" }}>
              <Image src="/assets/PheronAgentLOGO2.png" alt="Pheron Logo" width={32} height={32} className={styles.logoImg} />
              <span style={{ fontSize: "20px", fontWeight: "800" }}>Pheron Agent</span>
            </div>
          </div>

          {/* Right side links grid */}
          <div className={styles.footerLinksGrid}>
            <div className={styles.footerColumn}>
              <span className={styles.columnTitle}>{t("footer.product", "Product")}</span>
              <ul className={styles.columnList}>
                <li><Link href="/product/agent" className={styles.footerLink}>{t("nav.agent", "Agent")}</Link></li>
                <li><Link href="/resources/docs/api" className={styles.footerLink}>{t("footer.api", "API")}</Link></li>
                <li><Link href="/ecosystem" className={styles.footerLink}>{t("nav.ecosystem", "Ecosystem")}</Link></li>
                <li><Link href="/pricing" className={styles.footerLink}>{t("nav.pricing", "Pricing")}</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.columnTitle}>{t("footer.resources", "Resources")}</span>
              <ul className={styles.columnList}>
                <li><Link href="/download" className={styles.footerLink}>{t("nav.download", "Download")}</Link></li>
                <li><Link href="/changelog" className={styles.footerLink}>{t("nav.changelog", "Changelog")}</Link></li>
                <li><Link href="/resources/docs" className={styles.footerLink}>{t("footer.docs", "Docs")}</Link></li>
                <li><Link href="/resources/learn" className={styles.footerLink}>{t("footer.learn", "Learn")}</Link></li>
                <li><Link href="/resources/docs/wiki/benchmark_results" className={styles.footerLink}>Benchmarks</Link></li>
                <li><Link href="/resources/help" className={styles.footerLink}>{t("footer.help", "Help")}</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.columnTitle}>Company</span>
              <ul className={styles.columnList}>
                <li><span className={styles.footerLink} style={{ opacity: 0.4, cursor: "default" }}>Blog</span></li>
                <li><span className={styles.footerLink} style={{ opacity: 0.4, cursor: "default" }}>Community</span></li>
                <li><Link href="/resources/docs/future" className={styles.footerLink}>Future</Link></li>
                <li><Link href="/" className={styles.footerLink}>Pheron Agent</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.columnTitle}>{t("footer.legal", "Legal")}</span>
              <ul className={styles.columnList}>
                <li><Link href="/terms" className={styles.footerLink}>{t("footer.terms", "Terms of Service")}</Link></li>
                <li><Link href="/privacy" className={styles.footerLink}>{t("footer.privacy", "Privacy Policy")}</Link></li>
                <li><Link href="/refund" className={styles.footerLink}>{t("footer.refund", "Refund Policy")}</Link></li>
                <li><Link href="/data-use" className={styles.footerLink}>{t("footer.dataUse", "Data Use")}</Link></li>
                <li><Link href="/resources/docs/security" className={styles.footerLink}>{t("footer.security", "Security")}</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.columnTitle}>Connect</span>
              <ul className={styles.columnList}>
                <li><a href="https://x.com/PheronAgent" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>X</a></li>
                <li><a href="https://www.linkedin.com/company/pheron-agent/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Linkedin</a></li>
                <li><a href="https://www.instagram.com/pheronagent/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>IG</a></li>
                <li><Link href="/get-in-touch" className={styles.footerLink}>{t("nav.getInTouch", "Get in Touch")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <span>© {new Date().getFullYear()} Pheron Agent. {t("footer.copyright", "All rights reserved.")}</span>
          </div>

          <div className={styles.footerBottomRight}>
            {/* Theme Selector */}
            <div className={styles.themeSelector}>
              <button
                className={`${styles.themeBtn} ${activeTheme === "system" ? styles.themeBtnActive : ""}`}
                onClick={() => setActiveTheme("system")}
                title="System Theme"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                className={`${styles.themeBtn} ${activeTheme === "light" ? styles.themeBtnActive : ""}`}
                onClick={() => setActiveTheme("light")}
                title="Light Theme"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </button>
              <button
                className={`${styles.themeBtn} ${activeTheme === "dark" ? styles.themeBtnActive : ""}`}
                onClick={() => setActiveTheme("dark")}
                title="Dark Theme"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>

            {/* Language Selector */}
            <div className={styles.languageContainer} ref={dropdownRef}>
              <button
                className={styles.languageBtn}
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
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
                <div className={styles.languageDropdown}>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
