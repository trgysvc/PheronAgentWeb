"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


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

// Terminal log scripts for simulation
const SIMULATION_SCRIPTS = [
  `pheron "create a website and test it in Safari"`,
  `[UNO Orchestrator] Analyzing prompt with ANE Intent Classifier...`,
  `[ANE Classifier] Category detected: pipeline_development -> Hardware route: Apple Neural Engine`,
  `[UNO Orchestrator] Spawning Planner actor (Swift 6 Distributed Actor)...`,
  `[Planner] Generated [TaskNode] plan (2 steps):`,
  `  1. xcode_engine UBID(0x8F9C...): Initialize a Next.js template and run build`,
  `  2. safari_automation UBID(0x3B1A...): Open http://localhost:3000, read page, check DOM`,
  `[Executor] Running Node 1/2: xcode_engine --cmd init-nextjs`,
  `  └─ Running: npx create-next-app@latest pheron-site --ts --src-dir --yes`,
  `  └─ Success: Next.js initialized, server compiled successfully on port 3000.`,
  `[Executor] Running Node 2/2: safari_automation --cmd open --url http://localhost:3000`,
  `  └─ Opening Safari at http://localhost:3000`,
  `  └─ Scraping DOM content... Found title "Create Next App"`,
  `  └─ Verification: Page elements loaded and interactive.`,
  `[UNO Orchestrator] Task finished successfully! Total Energy: 24.3 Joules`,
  `[SkillVault] Procedural check: archiving 'setup-nextjs-safari-verify.skill.md' to SkillVault.`,
];

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Footer Interactive States
  const [activeTheme, setActiveTheme] = useState("system"); // system, light, dark
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
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



  const runTerminalSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsTerminalRunning(true);
    setTerminalLines([]);

    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < SIMULATION_SCRIPTS.length) {
        setTerminalLines(prev => [...prev, SIMULATION_SCRIPTS[currentLineIndex]]);
        currentLineIndex++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTerminalRunning(false);
        intervalRef.current = null;
      }
    }, 900);
    intervalRef.current = interval;
  };

  useEffect(() => {
    runTerminalSimulation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logoContainer}>
            <Image 
              src="/assets/logo.png" 
              alt="Pheron Logo" 
              width={32} 
              height={32} 
              className={styles.logoImg}
            />
            <span>Pheron Agent</span>
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

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroTagline}>Native macOS Autonomous Agent</div>
        <h1 className={styles.heroTitle}>
          <span>Autonomy by Nature.</span>
          <span className="text-neon">Privacy by Design.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Pheron Agent is a fully autonomous, hardware-native AI agent for macOS. 
          Built on the Swift 6 UNO architecture, it runs entirely on your Apple Silicon 
          with local MLX inference. Zero cloud required, zero data leaks.
        </p>
        <div className={styles.heroRequirement}>
          <svg className={styles.appleIcon} viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.84-14.3-5.9-3.58-2.83-7.5-7.66-11.75-14.53-8.61-13.9-15.02-30.88-19.23-50.96-2.58-12.35-3.87-24-3.87-34.98 0-16.14 3.87-29.21 11.62-39.22 7.74-10.02 17.5-15.15 29.27-15.4 5.37-.12 11.02 1.63 16.94 5.25 5.92 3.63 9.94 5.44 12.06 5.44 1.79 0 5.44-1.5 10.96-4.5 5.51-3 10.9-4.57 16.16-4.7 11.96-.13 22.01 4.22 30.15 13.06 6.04 6.57 10.37 14.53 13 23.86-13.5 8.16-20.12 18.91-19.87 32.26.25 10.39 4.17 19.1 11.75 26.13 7.58 7.03 16.42 11 26.54 11.9-2.61 7.62-5.78 15.17-9.5 22.65zM119.22 30.3c0-7.85 2.8-15.34 8.4-22.5 7.64-9.39 16.94-14.3 27.9-14.7 1.06 8.36-1.92 16.32-8.94 23.87-7.02 7.55-15.82 12.22-26.4 13.01-.63-.94-.96-1.74-.96-2.68z" />
          </svg>
          <span>Requires macOS 15.0+, Apple Silicon Chips</span>
        </div>

      </section>

      {/* Terminal Simulator Section */}
      <section id="demo" className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Live Simulation</span>
          <h2 className={styles.sectionTitle}>See the Agent in Action</h2>
          <p className={styles.sectionSubtitle}>
            Watch Pheron Agent plan and execute a multi-step workflow locally using 
            the UNO (Unified Native Orchestration) architecture.
          </p>
        </div>

        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <div className={styles.terminalTitle}>zsh - pheron@macbook-pro</div>
            <div className={styles.terminalAction} onClick={runTerminalSimulation}>
              {isTerminalRunning ? "Running..." : "Run Demo"}
            </div>
          </div>
          <div className={styles.terminalBody}>
            {terminalLines.map((line, idx) => {
              if (!line) return null;
              if (line.startsWith("pheron")) {
                return (
                  <div key={idx} className="term-line">
                    <span style={{ color: "#38bdf8" }}>$</span> {line}
                  </div>
                );
              }
              if (line.includes("[UNO Orchestrator]")) {
                return <div key={idx} className="term-plan">{line}</div>;
              }
              if (line.includes("[Executor]")) {
                return <div key={idx} className="term-tool">{line}</div>;
              }
              if (line.includes("Success:") || line.includes("Task finished")) {
                return <div key={idx} className="term-success">{line}</div>;
              }
              if (line.includes("└─")) {
                return <div key={idx} className="term-comment" style={{ paddingLeft: "16px" }}>{line}</div>;
              }
              return <div key={idx} className="term-comment">{line}</div>;
            })}
            {isTerminalRunning && <span className={styles.cursor} />}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Under the Hood</span>
          <h2 className={styles.sectionTitle}>Built for Extreme Performance</h2>
          <p className={styles.sectionSubtitle}>
            Pheron Agent is built with native Apple hardware components to achieve speeds 
            unmatched by cloud-based alternatives.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🚀</div>
            <h3 className={styles.featureTitle}>Titan Engine</h3>
            <p className={styles.featureDesc}>
              On-device MLX inference featuring wired memory pinning, 4-bit KV quantization, 
              rotating cache (up to 131K context), and speculative decoding via custom draft models.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> Local Inference
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🧠</div>
            <h3 className={styles.featureTitle}>ANE Intent Classifier</h3>
            <p className={styles.featureDesc}>
              Hardware-accelerated task routing executed directly on the Apple Neural Engine. 
              Routes prompts to tools, weather, chat, or LLM fallback in milliseconds.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> Neural Engine
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>💾</div>
            <h3 className={styles.featureTitle}>Three-Layer Memory</h3>
            <p className={styles.featureDesc}>
              Structured memory layers: L1 Hot Cache (12 messages), L2 Daily Notes, and L3 
              DreamBank long-term summaries coupled with Metal-accelerated RAG via custom Metal kernels.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> Metal RAG
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Energy Profiling</h3>
            <p className={styles.featureDesc}>
              Monitored via `PheronEnergyDaemon` XPC helper utilizing `powermetrics` at 100ms 
              intervals for exact, hardware-level Joule accounting per task execution.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> true joule accounting
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Privacy Guard</h3>
            <p className={styles.featureDesc}>
              Rule-based + local LLM PII (Personally Identifiable Information) detection before 
              any external routing, executing PASS, DESENSITIZE, or BLOCK decisions. Direct inquiries 
              regarding security audits can be sent to privacy@pheronagent.com.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> Privacy Centric
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🛠️</div>
            <h3 className={styles.featureTitle}>SkillVault</h3>
            <p className={styles.featureDesc}>
              Self-improving procedural memory. The agent writes and patches its own `.skill.md` 
              tool scripts, while a background curator Actor consolidates skills across sessions.
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> Self-improving
            </div>
          </div>
        </div>
      </section>


      {/* Enterprise & Licensing Section */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "80px" }}>
        <div className={styles.sectionHeader} style={{ marginBottom: "40px" }}>
          <span className={styles.sectionTag}>Enterprise & Licensing</span>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.sectionSubtitle}>
            Pheron Agent is built for power users and enterprise teams. Select the appropriate contact channel below.
          </p>
        </div>
        <div className={styles.featuresGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "24px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "16px", width: "36px", height: "36px" }}>💬</div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "8px" }}>General & Partnerships</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginTop: "8px" }}>
              For general inquiries or custom integration opportunities, reach out to <a href="mailto:info@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>info@pheronagent.com</a> or <a href="mailto:collaborations@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>collaborations@pheronagent.com</a>.
            </p>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "24px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "16px", width: "36px", height: "36px" }}>🛠️</div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "8px" }}>Help & Support</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginTop: "8px" }}>
              Our support engineers are ready to assist with setup, configurations, or bugs at <a href="mailto:support@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>support@pheronagent.com</a>.
            </p>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "24px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "16px", width: "36px", height: "36px" }}>💳</div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "8px" }}>Billing & Payments</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginTop: "8px" }}>
              For single-payment queries, bulk licensing invoices, or payment inquiries, email <a href="mailto:billing@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>billing@pheronagent.com</a> or <a href="mailto:payments@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>payments@pheronagent.com</a>.
            </p>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "24px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "16px", width: "36px", height: "36px" }}>⚖️</div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginTop: "8px" }}>Legal & Compliance</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginTop: "8px" }}>
              For licensing agreements, terms, or regulatory matters, contact <a href="mailto:legal@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline" }}>legal@pheronagent.com</a>.
            </p>
          </div>
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
                  src="/assets/logo.png" 
                  alt="Pheron Logo" 
                  width={24} 
                  height={24} 
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
