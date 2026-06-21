"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

// 40+ tools categorized and described
// 50+ tools categorized and described
const TOOLS = [
  // File (5 tools)
  { name: "File Manager", icon: "📁", desc: "Native file explorer: scan large files, copy, move, and delete items securely", category: "File" },
  { name: "Read File", icon: "📖", desc: "Read local documents: PDF, DOCX, TXT, MD, Swift, JSON, Plist without sandbox limits", category: "File" },
  { name: "Write File", icon: "✍️", desc: "Atomically write or overwrite local files with auto-directory path building", category: "File" },
  { name: "Patch File", icon: "🩹", desc: "Line-by-line diff match and semantic file patching without external dependencies", category: "File" },
  { name: "ID3 Processor", icon: "🏷️", desc: "Recursive ID3 tagger embedding metadata from JSON/TXT with manual overrides", category: "File" },

  // System (12 tools)
  { name: "Shell Exec", icon: "💻", desc: "Secure local shell and zsh terminal execution engine for arbitrary commands", category: "System" },
  { name: "Volume Control", icon: "🔊", desc: "Native Core Audio output volume controller (0-100) bypassing AppleScript", category: "System" },
  { name: "Brightness Control", icon: "🔆", desc: "Screen brightness controller matching system display parameters", category: "System" },
  { name: "Sleep Control", icon: "🌙", desc: "Put system to sleep, lock display, or control lock status instantly", category: "System" },
  { name: "Sys Info", icon: "📊", desc: "Retrieve hardware specs, CPU cores, and memory capacity using native APIs", category: "System" },
  { name: "Telemetry", icon: "📡", desc: "Real-time thermal diagnostics, RAM usage, memory pressure, and CPU activity", category: "System" },
  { name: "Date Time", icon: "⏰", desc: "Fetch local system date and time to parse relative user timeframes", category: "System" },
  { name: "App UI Learner", icon: "🔍", desc: "List running apps and map AXUIElement trees into the experience vault", category: "System" },
  { name: "Shortcut Scan", icon: "🗂️", desc: "Scan and list all installed Siri Shortcuts on the macOS host system", category: "System" },
  { name: "Shortcut Run", icon: "🏃", desc: "Invoke siri shortcuts asynchronously with dynamic text arguments", category: "System" },
  { name: "App Launcher", icon: "🚀", desc: "Securely launch macOS applications by name or bundle ID", category: "System" },
  { name: "Accessibility AX", icon: "♿", desc: "Interact directly with application UI controls via Accessibility APIs", category: "System" },

  // Web (4 tools)
  { name: "Web Search", icon: "🔍", desc: "Live web searching using Brave and Google Search APIs for real-time facts", category: "Web" },
  { name: "Web Fetch", icon: "📥", desc: "HTTP document retriever formatting raw web text into clean Markdown", category: "Web" },
  { name: "Safari Automation", icon: "🧭", desc: "Control active Safari sessions: search, scrape, read, and close tabs", category: "Web" },
  { name: "Browser Native", icon: "🌐", desc: "High-fidelity interactive Safari controller for filling forms and navigating", category: "Web" },

  // Communication (4 tools)
  { name: "WhatsApp Send", icon: "💬", desc: "Automate sending WhatsApp messages using Desktop app scripting", category: "Communication" },
  { name: "Unified Messaging", icon: "💬", desc: "Send messages over iMessage or WhatsApp dynamically based on destination", category: "Communication" },
  { name: "Email Send", icon: "📧", desc: "Draft and dispatch emails through Apple Mail with biometric safeguards", category: "Communication" },
  { name: "Apple Mail Manager", icon: "📧", desc: "Retrieve unread mail, create drafts, and send messages via Apple Mail", category: "Communication" },

  // Media (2 tools)
  { name: "Media Control", icon: "⏯️", desc: "System-wide media playback controls for Apple Music track searching", category: "Media" },
  { name: "Music DNA", icon: "🎵", desc: "Forensic acoustic analysis: SNR, THD+N, EBU R128 loudness, key, and tempo", category: "Media" },

  // Vision (3 tools)
  { name: "Image Analysis", icon: "🖼️", desc: "Local screen analysis for OCR and interactive UI element detection", category: "Vision" },
  { name: "Semantic Vision", icon: "👁️‍🗨️", desc: "On-device VLM for semantic visual audits and diagram parsing (24GB+ Mac)", category: "Vision" },
  { name: "Chicago Vision", icon: "👁️", desc: "Visual OCR and UI layout auditing with ScreenCaptureKit integration", category: "Vision" },

  // Development (5 tools)
  { name: "Git Action", icon: "🌿", desc: "Basic local Git operations: commit, status, diff, log, and revert", category: "Development" },
  { name: "Xcode Engine", icon: "🛠️", desc: "Automated Xcode project building, error tracking, and simulator control", category: "Development" },
  { name: "Blender 3D", icon: "🧊", desc: "Automate Blender 3D rendering and meshes via custom background Python bridge", category: "Development" },
  { name: "Higgsfield Video", icon: "🎥", desc: "Generate generative AI video and motion dynamics via Higgsfield REST API", category: "Development" },
  { name: "Subagent Spawn", icon: "👥", desc: "Delegate recursive sub-tasks to child orchestrator runtimes", category: "Development" },

  // Productivity (6 tools)
  { name: "Contacts", icon: "📇", desc: "Query and retrieve contact details from the local Contacts database", category: "Productivity" },
  { name: "Calendar", icon: "📅", desc: "Create, list, and manage local calendar events via EventKit", category: "Productivity" },
  { name: "Calculator", icon: "🧮", desc: "High-precision math evaluations with safe expression parsing", category: "Productivity" },
  { name: "Weather", icon: "🌤️", desc: "Fetch weather conditions and UV index using Apple WeatherKit", category: "Productivity" },
  { name: "Timer", icon: "⏳", desc: "Set native async timers and reminders with custom messages", category: "Productivity" },
  { name: "Research Report", icon: "📝", desc: "Finalize strategic research tasks into publication-quality Markdown sections", category: "Productivity" },

  // Self-Improvement (2 tools)
  { name: "Memory Vault", icon: "🧠", desc: "Access local long-term experiential memory for past task solutions", category: "Self-Improvement" },
  { name: "Skill Patch", icon: "🦾", desc: "Manage, patch, and search custom agent skills and procedural rules", category: "Self-Improvement" },

  // MCP Bridges (9 tools)
  { name: "Git MCP Bridge", icon: "🌿", desc: "Anthropic Model Context Protocol bridge for full Git control (12 actions)", category: "MCP Bridges" },
  { name: "Memory MCP Bridge", icon: "🧠", desc: "Official Knowledge-Graph MCP server for entity-relation observation CRUD", category: "MCP Bridges" },
  { name: "Browser MCP Bridge", icon: "🌐", desc: "Microsoft Playwright MCP server offering headless web testing (22 actions)", category: "MCP Bridges" },
  { name: "Perplexity MCP Bridge", icon: "🔍", desc: "Official Perplexity search engine integration via standard MCP model", category: "MCP Bridges" },
  { name: "Stripe MCP Bridge", icon: "💳", desc: "Manage payments, customers, subscriptions, and refunds via Stripe's MCP", category: "MCP Bridges" },
  { name: "GitHub MCP Bridge", icon: "🐙", desc: "Comprehensive GitHub API MCP server: issues, PRs, actions, and projects", category: "MCP Bridges" },
  { name: "Zapier MCP Bridge", icon: "⚡", desc: "Connect over 9000 apps using Zapier's dynamic action invocation protocol", category: "MCP Bridges" },
  { name: "Notion MCP Bridge", icon: "📓", desc: "Official Notion workspace integration: pages, databases, and comments", category: "MCP Bridges" },
  { name: "Unreal Engine MCP Bridge", icon: "🎮", desc: "Control actors, material instances, and attributes inside Unreal Engine 5.8+", category: "MCP Bridges" },
];

const CATEGORIES = ["All", "System", "File", "Web", "Vision", "Development", "Communication", "Productivity", "Self-Improvement", "Media", "MCP Bridges"];

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

export default function Ecosystem() {
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const filteredTools = selectedCategory === "All" 
    ? TOOLS 
    : TOOLS.filter(t => t.category === selectedCategory);

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
            <Link href="/auth" className={`${styles.navBtn} btn-secondary`} style={{ display: "none" }}>Sign In</Link>
            <Link href="/download" className={`${styles.navBtn} btn-primary`}>Download</Link>
          </div>
        </div>
      </header>

      {/* 50+ Tools Showcase Section */}
      <section id="tools" className={styles.section} style={{ minHeight: "60vh", paddingTop: "120px" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Unrivaled Access</span>
          <h2 className={styles.sectionTitle}>Integrated Native Tools</h2>
          <p className={styles.sectionSubtitle}>
            Pheron Agent interacts directly with macOS, local applications, and files. 
            Filter through the tool inventory below.
          </p>
        </div>

        <div className={styles.toolsContainer}>
          <div className={styles.filterBar}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.toolsGrid}>
            {filteredTools.map(tool => (
              <div key={tool.name} className={`${styles.toolCard} glass-card`}>
                <span className={styles.toolIcon}>{tool.icon}</span>
                <span className={styles.toolName}>{tool.name}</span>
                <span className={styles.toolDesc}>{tool.desc}</span>
                <span className={styles.toolTag}>{tool.category}</span>
              </div>
            ))}
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
