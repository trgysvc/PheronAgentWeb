"use client";

import { useState, useRef, useEffect } from "react";
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

export default function PricingPage() {
  const [activeTheme, setActiveTheme] = useState("system");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const getPrice = (monthly: number) => {
    return billingPeriod === "annually" ? Math.floor(monthly * 0.8) : monthly;
  };

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logoContainer}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "inherit" }}>
              <Image 
                src="/assets/logo.png" 
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
                <Link href="/ecosystem" className={styles.dropdownItem}>Agent</Link>
                <Link href="/resources/docs/cli" className={styles.dropdownItem}>CLI</Link>
                <Link href="/ecosystem" className={styles.dropdownItem}>Ecosystem</Link>
              </div>
            </div>

            {/* Pricing */}
            <Link href="/pricing" className={`${styles.navLink} ${styles.docsLinkActive}`} style={{ background: "none", padding: 0 }}>Pricing</Link>

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
                  <a href="#" className={styles.dropdownItem}>Blog</a>
                  <Link href="/changelog" className={styles.dropdownItem}>Changelog</Link>
                  <a href="#" className={styles.dropdownItem}>Community</a>
                </div>
              </div>
            </div>
          </nav>
          <div className={styles.navActions}>
            <Link href="/auth" className={`${styles.navBtn} btn-secondary`}>Sign In</Link>
            <Link href="/download" className={`${styles.navBtn} btn-primary`}>Download</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "140px 24px 80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span className={styles.sectionTag}>Pricing Plans</span>
          <h1 className={styles.sectionTitle} style={{ fontSize: "40px", fontWeight: "800", marginTop: "12px", marginBottom: "16px" }}>
            Sovereign On-Device Power
          </h1>
          <p className={styles.sectionSubtitle} style={{ maxWidth: "600px", margin: "0 auto 40px auto" }}>
            Pheron Agent runs fully on-device on Apple Silicon. Select a plan that matches your memory allocation and workflow needs.
          </p>

          {/* Billing Switcher */}
          <div style={{ display: "inline-flex", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-glass)", borderRadius: "9999px", padding: "4px", marginBottom: "50px" }}>
            <button 
              onClick={() => setBillingPeriod("monthly")}
              style={{ background: billingPeriod === "monthly" ? "rgba(255, 255, 255, 0.08)" : "transparent", color: billingPeriod === "monthly" ? "#fff" : "var(--text-secondary)", border: "none", borderRadius: "9999px", padding: "8px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod("annually")}
              style={{ background: billingPeriod === "annually" ? "rgba(255, 255, 255, 0.08)" : "transparent", color: billingPeriod === "annually" ? "#fff" : "var(--text-secondary)", border: "none", borderRadius: "9999px", padding: "8px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
            >
              Annually (Save 20%)
            </button>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", textAlign: "left" }}>
            
            {/* Personal Tier */}
            <div className="glass-card" style={{ padding: "40px 30px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Personal</h3>
                <p style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>Perfect for individual power users and researchers.</p>
              </div>
              <div>
                <span style={{ fontSize: "48px", fontWeight: "800", color: "#fff" }}>${getPrice(15)}</span>
                <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}> / month</span>
              </div>
              <button className="btn-secondary" style={{ width: "100%", padding: "12px", justifyContent: "center" }}>
                Start 14-Day Free Trial
              </button>
              <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "20px" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                  <li>✓ Complete local MLX 4-bit inference</li>
                  <li>✓ ANE Intent Classifier routing</li>
                  <li>✓ L1 & L2 Memory management</li>
                  <li>✓ Unlimited custom SkillVault creations</li>
                  <li>✓ Access to 35+ native system tools</li>
                </ul>
              </div>
            </div>

            {/* Pro Tier (Featured) */}
            <div className="glass-card" style={{ padding: "40px 30px", display: "flex", flexDirection: "column", gap: "24px", border: "1px solid var(--color-cyan)" }}>
              <div>
                <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: "9999px", background: "rgba(0, 242, 254, 0.08)", border: "1px solid rgba(0, 242, 254, 0.2)", color: "var(--color-cyan)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", marginBottom: "12px" }}>
                  Most Popular
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Developer Pro</h3>
                <p style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>For engineers needing advanced debugging & swarms.</p>
              </div>
              <div>
                <span style={{ fontSize: "48px", fontWeight: "800", color: "#fff" }}>${getPrice(30)}</span>
                <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}> / month</span>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "12px", justifyContent: "center" }}>
                Upgrade to Pro
              </button>
              <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "20px" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                  <li><strong>Everything in Personal, plus:</strong></li>
                  <li>✓ Multi-Agent Swarm execution (`spawn`)</li>
                  <li>✓ Unlimited 8-bit model inference</li>
                  <li>✓ Local Powermetrics energy profiling</li>
                  <li>✓ Semantic vision VLM support (24 GB+ RAM)</li>
                  <li>✓ Headless Blender 3D integration</li>
                  <li>✓ Priority GitHub & Discord support</li>
                </ul>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="glass-card" style={{ padding: "40px 30px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>Enterprise</h3>
                <p style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>For corporations requiring bespoke security and APIs.</p>
              </div>
              <div>
                <span style={{ fontSize: "48px", fontWeight: "800", color: "#fff" }}>Custom</span>
              </div>
              <button className="btn-secondary" style={{ width: "100%", padding: "12px", justifyContent: "center" }}>
                Contact Sales
              </button>
              <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "20px" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                  <li><strong>Everything in Pro, plus:</strong></li>
                  <li>✓ Customized Metal GPU kernels</li>
                  <li>✓ Private LLM server integrations</li>
                  <li>✓ Biometric isolation sentinel hooks</li>
                  <li>✓ Dedicated deployment assistance</li>
                  <li>✓ SLA guaranteed enterprise support</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.logoContainer} style={{ background: "none", WebkitTextFillColor: "unset", color: "var(--text-primary)" }}>
                <Image 
                  src="/assets/logo.png" 
                  alt="Pheron Logo" 
                  width={24} 
                  height={24} 
                  className={styles.logoImg}
                />
                <span style={{ fontSize: "16px", fontWeight: "700" }}>Pheron Agent</span>
              </div>
            </div>

            <div className={styles.footerLinksGrid}>
              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Product</span>
                <ul className={styles.columnList}>
                  <li><Link href="/ecosystem" className={styles.footerLink}>Agent</Link></li>
                  <li><Link href="/resources/docs/cli" className={styles.footerLink}>CLI</Link></li>
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
                  <li><a href="#" className={styles.footerLink}>Blog</a></li>
                  <li><a href="#" className={styles.footerLink}>Community</a></li>
                  <li><Link href="/resources/docs/future" className={styles.footerLink}>Future</Link></li>
                  <li><Link href="/" className={styles.footerLink}>Pheron Agent</Link></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Legal</span>
                <ul className={styles.columnList}>
                  <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
                  <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
                  <li><Link href="/data-use" className={styles.footerLink}>Data Use</Link></li>
                  <li><Link href="/resources/docs/security" className={styles.footerLink}>Security</Link></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <span className={styles.columnTitle}>Connect</span>
                <ul className={styles.columnList}>
                  <li><a href="#" className={styles.footerLink}>X</a></li>
                  <li><a href="#" className={styles.footerLink}>Linkedin</a></li>
                  <li><a href="#" className={styles.footerLink}>IG</a></li>
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
