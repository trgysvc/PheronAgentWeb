"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

const LANGUAGES = [
  "English",
  "简体中文",
  "日本語",
  "繁體中文",
  "Español",
  "Français",
  "Português",
  "한국어",
  "Deutsch",
  "हिन्दी"
];

export default function DownloadPage() {
  const [activeTheme, setActiveTheme] = useState("system"); // system, light, dark
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [versionExpanded, setVersionExpanded] = useState(false);
  const [version791Expanded, setVersion791Expanded] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <Link href="/" className={styles.logoContainer} style={{textDecoration: "none", color: "inherit"}}>

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
            <Link href="/download" className={`${styles.navBtn} btn-primary`}>Download</Link>
          </div>
        </div>
      </header>

      {/* Main Download Section */}
      <section className={styles.downloadPageContainer}>
        <h1 className={styles.downloadTitle}>Download macOS</h1>
        <p className={styles.downloadSubtitle}>Requires macOS 15.0+, Apple Silicon — 16 GB RAM minimum, 24 GB+ recommended</p>
        
        <div style={{ marginBottom: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a 
            href="https://app.pheronagent.com/PheronAgent102.dmg" 
            className={styles.downloadPillBtn}
          >
            <span>Download for macOS</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>

          <div style={{ marginTop: "24px", padding: "16px 24px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.2)", borderRadius: "12px", display: "inline-block", maxWidth: "500px", textAlign: "left" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>
                <strong style={{ color: "var(--text-primary)" }}>Download first, buy later.</strong> You can download and install Pheron Agent for free. Upon opening the app, you will be prompted to securely purchase a license or enter an existing key.
              </p>
            </div>
          </div>
        </div>

        <h2 className={styles.downloadReleaseHeading}>
          The Pheron Agent desktop app is available for macOS Release;
        </h2>

        <div className={styles.versionList}>
          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersionExpanded(!versionExpanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.2</span>
                <span className={styles.versionLatestBadge}>Latest</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${versionExpanded ? styles.versionCaretOpen : ""}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {versionExpanded && (
              <div className={styles.versionDetails}>
                <p>
                  Pheron Agent v1.0.2 is the active, stable release for macOS (Apple Silicon).
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a 
                    href="https://app.pheronagent.com/PheronAgent102.dmg" 
                    className={styles.versionDetailsLink}
                  >
                    Download PheronAgent102.dmg directly (v1.0.2)
                  </a>
                  <Link href="/changelog#v1.0.2" className={styles.versionDetailsLink}>
                    View Changelog
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion791Expanded(!version791Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.1</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>Previous</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version791Expanded ? styles.versionCaretOpen : ""}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {version791Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  Pheron Agent v1.0.1 is a previous release for macOS (Apple Silicon).
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a 
                    href="https://app.pheronagent.com/PheronAgent101.dmg" 
                    className={styles.versionDetailsLink}
                  >
                    Download PheronAgent101.dmg directly (v1.0.1)
                  </a>
                  <Link href="/changelog#v1.0.1" className={styles.versionDetailsLink}>
                    View Changelog
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section style={{
        maxWidth: "900px",
        width: "100%",
        margin: "0 auto",
        padding: "0 24px 80px 24px",
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "24px", letterSpacing: "-0.2px" }}>
          System Requirements
        </h2>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {[
            ["Operating System", "macOS 15.0 Sequoia or later"],
            ["Processor", "Apple Silicon (M1 or later)"],
            ["RAM — Minimum", "16 GB unified memory"],
            ["RAM — Recommended", "24 GB+ unified memory"],
            ["Storage", "~6 GB free space (per model)"],
            ["GPU", "Metal (built into Apple Silicon)"],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{label}</span>
              <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            {/* Left side brand */}
            <div className={styles.footerBrand}>
              <div className={styles.logoContainer} style={{ background: "none", WebkitTextFillColor: "unset", color: "var(--text-primary)" }}>
                <Image 
                  src="/assets/PheronAgentLOGO2.png" 
                  alt="Pheron Logo" 
                  width={32} 
                  height={32} 
                  className={styles.logoImg}
                />
                <span style={{ fontSize: "16px", fontWeight: "700" }}>Pheron Agent</span>
              </div>
            </div>

            {/* Right side links grid */}
            <div className={styles.footerLinksGrid}>
              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Product</span>
                <ul className={styles.columnList}>
                  <li><Link href="/product/agent" className={styles.footerLink}>Agent</Link></li>
                  <li><Link href="/resources/docs/api" className={styles.footerLink}>API</Link></li>
                  <li><Link href="/ecosystem" className={styles.footerLink}>Ecosystem</Link></li>
                  <li><Link href="/pricing" className={styles.footerLink}>Pricing</Link></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Resources</span>
                <ul className={styles.columnList}>
                  <li><Link href="/download" className={styles.footerLink}>Download</Link></li>
                  <li><Link href="/changelog" className={styles.footerLink}>Changelog</Link></li>
                  <li><Link href="/resources/docs" className={styles.footerLink}>Docs</Link></li>
                  <li><Link href="/resources/learn" className={styles.footerLink}>Learn</Link></li>
                  <li><Link href="/resources/help" className={styles.footerLink}>Help</Link></li>
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
                <span className={styles.columnTitle}>Legal</span>
                <ul className={styles.columnList}>
                  <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
                  <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
                  <li><Link href="/refund" className={styles.footerLink}>Refund Policy</Link></li>
                  <li><Link href="/data-use" className={styles.footerLink}>Data Use</Link></li>
                  <li><Link href="/resources/docs/security" className={styles.footerLink}>Security</Link></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Connect</span>
                <ul className={styles.columnList}>
                  <li><a href="https://x.com/PheronAgent" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>X</a></li>
                  <li><a href="https://www.linkedin.com/company/pheron-agent/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Linkedin</a></li>
                  <li><a href="https://www.instagram.com/pheronagent/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>IG</a></li>
                  <li><Link href="/get-in-touch" className={styles.footerLink}>Get in Touch</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerDivider} />

          <div className={styles.footerBottom}>
            <div className={styles.footerBottomLeft}>
              <span>© {new Date().getFullYear()} Pheron Agent. All rights reserved.</span>
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
                  <span>{selectedLanguage}</span>
                  <svg className={`${styles.caretIcon} ${languageDropdownOpen ? styles.caretIconOpen : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {languageDropdownOpen && (
                  <div className={styles.languageDropdown}>
                    {LANGUAGES.map((lang) => (
                      <button 
                        key={lang} 
                        className={`${styles.languageOption} ${selectedLanguage === lang ? styles.languageOptionActive : ""}`}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLanguageDropdownOpen(false);
                        }}
                      >
                        <span>{lang}</span>
                        {selectedLanguage === lang && (
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
    </div>
  );
}
