"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

// 38 tools categorized and described
const TOOLS = [
  { name: "File Manager", icon: "📁", desc: "Native file explorer and controller", category: "File" },
  { name: "Read File", icon: "📖", desc: "Read local file contents without sandbox limits", category: "File" },
  { name: "Write File", icon: "✍️", desc: "Safe file creation with auto-directory building", category: "File" },
  { name: "Patch File", icon: "🩹", desc: "Line-by-line diff and semantic patching", category: "File" },
  { name: "ID3 Editor", icon: "🏷️", desc: "Audio file metadata editor", category: "File" },
  
  { name: "Shell Exec", icon: "💻", desc: "Secure local shell commands in zsh", category: "System" },
  { name: "Volume Control", icon: "🔊", desc: "AppleScript native volume controller", category: "System" },
  { name: "Brightness Control", icon: "🔆", desc: "Screen brightness modifier", category: "System" },
  { name: "Sleep Control", icon: "🌙", desc: "Control mac sleep, lock, and display cycles", category: "System" },
  { name: "Sys Info", icon: "📊", desc: "Hardware metrics, temperature, and RAM allocation", category: "System" },
  { name: "Telemetry", icon: "📡", desc: "Local session telemetry logs", category: "System" },
  { name: "Date Time", icon: "⏰", desc: "True timezone dates for precise tasks", category: "System" },
  { name: "App Discovery", icon: "🔍", desc: "Finds installed macOS applications", category: "System" },
  { name: "Shortcut Scan", icon: "🗂️", desc: "Scans available Siri Shortcuts", category: "System" },
  { name: "Shortcut Run", icon: "🏃", desc: "Runs Siri Shortcuts with typed parameters", category: "System" },
  { name: "Accessibility AX", icon: "♿", desc: "Direct control via Accessibility API (click, drag, type)", category: "System" },
  
  { name: "Web Search", icon: "🔍", desc: "Brave Search API integration for real-time web context", category: "Web" },
  { name: "Web Fetch", icon: "📥", desc: "Direct HTTP downloader and Markdown formatter", category: "Web" },
  { name: "Safari Automation", icon: "🧭", desc: "Automate Safari: search, scrape, click, close", category: "Web" },
  { name: "Browser Native", icon: "🌐", desc: "Interactive native Safari controller with navigate, fill, inspect_ax, and tab management", category: "Web" },
  
  { name: "WhatsApp", icon: "💬", desc: "Send and read messages via WhatsApp Desktop", category: "Communication" },
  { name: "Messenger", icon: "✉️", desc: "Automate Messenger replies", category: "Communication" },
  { name: "Email Send", icon: "📧", desc: "Draft and dispatch Apple Mail messages", category: "Communication" },
  { name: "Mail Search", icon: "🔎", desc: "Index and search local Apple Mail mailboxes", category: "Communication" },
  
  { name: "Media Control", icon: "⏯️", desc: "System-wide media playback hooks", category: "Media" },
  { name: "Music DNA", icon: "🎵", desc: "Forensic acoustic analysis and EBU R128 loudness reporting via AudioIntelligence Infinity Engine", category: "Media" },
  
  { name: "Image Analysis", icon: "🖼️", desc: "Local vision models analyzing screenshots", category: "Vision" },
  { name: "Chicago Vision", icon: "👁️", desc: "Fine-tuned local OCR screen reading engine", category: "Vision" },
  { name: "Semantic Vision", icon: "👁️‍🗨️", desc: "Hardware VLM analyzing complex UI layouts (24GB+ Macs)", category: "Vision" },
  
  { name: "Git Action", icon: "🌿", desc: "Native Git execution: commit, branch, push, conflicts", category: "Development" },
  { name: "Xcode Engine", icon: "🛠️", desc: "Xcode build, run, debug, and test harness execution", category: "Development" },
  { name: "Blender 3D", icon: "🧊", desc: "Automates Blender 3D rendering and meshes via Python", category: "Development" },
  { name: "Subagent Spawn", icon: "👥", desc: "Spawn child actors to solve parallel tasks", category: "Development" },
  
  { name: "Contacts", icon: "📇", desc: "Access and search local Contacts database", category: "Productivity" },
  { name: "Calendar", icon: "📅", desc: "Create, view, and modify Calendar events", category: "Productivity" },
  { name: "Calculator", icon: "🧮", desc: "Compile mathematical computations", category: "Productivity" },
  { name: "Weather", icon: "🌤️", desc: "Fetch local weather data via Apple WeatherKit", category: "Productivity" },
  { name: "Timer", icon: "⏳", desc: "Native timers and reminders", category: "Productivity" },
  { name: "Markdown Report", icon: "📝", desc: "Generate formatted HTML/PDF executive summaries", category: "Productivity" },
  
  { name: "Memory Vault", icon: "🧠", desc: "Manage L1 hot, L2 medium, and L3 DreamBank long-term memory", category: "Self-Improvement" },
  { name: "Skill Patch", icon: "🦾", desc: "Write, patch, test, and archive custom skills (.skill.md)", category: "Self-Improvement" },
];

const CATEGORIES = ["All", "System", "File", "Web", "Vision", "Development", "Communication", "Productivity", "Self-Improvement"];

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

              src="/assets/logo-perfect.png" 

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

      {/* 38 Tools Showcase Section */}
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
                  src="/assets/logo-perfect.png" 
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
