"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";

// 59 integrated native tools categorized and described
const TOOLS = [
  // File (3 tools)
  { name: "File Manager", icon: "📁", desc: "Native file explorer: scan large files, copy, move, and delete items securely", category: "File" },
  { name: "Read File", icon: "📖", desc: "Read local documents: PDF, DOCX, TXT, MD, Swift, JSON, Plist without sandbox limits", category: "File" },
  { name: "Write File", icon: "✍️", desc: "Atomically write or overwrite local files with auto-directory path building", category: "File" },

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

  // Media (4 tools)
  { name: "Media Control", icon: "⏯️", desc: "System-wide media playback controls for Apple Music track searching", category: "Media" },
  { name: "Music DNA", icon: "🎵", desc: "Forensic acoustic analysis: SNR, THD+N, EBU R128 loudness, key, and tempo", category: "Media" },
  { name: "ID3 Processor", icon: "🏷️", desc: "Recursive ID3 tagger embedding metadata from JSON/TXT with manual overrides", category: "Media" },
  { name: "Audacity Control", icon: "🎙️", desc: "Control running Audacity instance via mod-script-pipe protocol: import/export audio, edit, apply 40+ effects", category: "Media" },

  // Vision (4 tools)
  { name: "Image Analysis", icon: "🖼️", desc: "Local screen analysis for OCR and interactive UI element detection", category: "Vision" },
  { name: "Semantic Vision", icon: "👁️‍🗨️", desc: "On-device VLM for semantic visual audits and diagram parsing (24GB+ Mac)", category: "Vision" },
  { name: "Chicago Vision", icon: "👁️", desc: "Visual OCR and UI layout auditing with ScreenCaptureKit integration", category: "Vision" },
  { name: "Background Removal", icon: "✂️", desc: "On-device Vision framework background isolation exporting transparent PNGs", category: "Vision" },

  // Development (6 tools)
  { name: "Git Action", icon: "🌿", desc: "Basic local Git operations: commit, status, diff, log, and revert", category: "Development" },
  { name: "Patch File", icon: "🩹", desc: "Line-by-line diff match and semantic file patching without external dependencies", category: "Development" },
  { name: "Xcode Engine", icon: "🛠️", desc: "Automated Xcode project building, error tracking, and simulator control", category: "Development" },
  { name: "Blender 3D", icon: "🧊", desc: "Automate Blender 3D rendering and meshes via custom background Python process bridge (Non-MCP)", category: "Development" },
  { name: "Higgsfield Video", icon: "🎥", desc: "Generate generative AI video and motion dynamics via direct Higgsfield REST API (Non-MCP)", category: "Development" },
  { name: "Subagent Spawn", icon: "👥", desc: "Delegate recursive sub-tasks to child orchestrator runtimes", category: "Development" },

  // Productivity (11 tools)
  { name: "Contacts", icon: "📇", desc: "Query and retrieve contact details from the local Contacts database", category: "Productivity" },
  { name: "Calendar", icon: "📅", desc: "Create, list, and manage local calendar events via EventKit", category: "Productivity" },
  { name: "Calculator", icon: "🧮", desc: "High-precision math evaluations with safe expression parsing", category: "Productivity" },
  { name: "Weather", icon: "🌤️", desc: "Fetch weather conditions and UV index using Apple WeatherKit", category: "Productivity" },
  { name: "Timer", icon: "⏳", desc: "Set native async timers and reminders with custom messages", category: "Productivity" },
  { name: "Research Report", icon: "📝", desc: "Finalize strategic research tasks into publication-quality Markdown sections", category: "Productivity" },
  { name: "Apple Notes", icon: "📝", desc: "Create, list, search, and read Apple Notes natively", category: "Productivity" },
  { name: "Apple Reminders", icon: "🔔", desc: "Create, list, and complete Apple Reminders natively", category: "Productivity" },
  { name: "Excel (Numbers)", icon: "📊", desc: "Build structured spreadsheets and export genuine .xlsx files via Apple Numbers", category: "Productivity" },
  { name: "PowerPoint (Keynote)", icon: "📑", desc: "Build slide presentations and export genuine .pptx files via Apple Keynote", category: "Productivity" },
  { name: "Word (Pages)", icon: "📄", desc: "Build documents and export genuine .docx files via Apple Pages", category: "Productivity" },

  // Self-Improvement (2 tools)
  { name: "Memory Vault", icon: "🧠", desc: "Access local long-term experiential memory for past task solutions", category: "Self-Improvement" },
  { name: "Skill Patch", icon: "🦾", desc: "Manage, patch, and search custom agent skills and procedural rules", category: "Self-Improvement" },

  // MCP Bridges (10 tools) + Direct REST Bridges (2 tools)
  { name: "Git MCP Bridge", icon: "🌿", desc: "Anthropic Model Context Protocol bridge for full Git control (12 actions) · Live-Verified", category: "MCP Bridges" },
  { name: "Memory MCP Bridge", icon: "🧠", desc: "Official Knowledge-Graph MCP server for entity-relation observation CRUD · Live-Verified", category: "MCP Bridges" },
  { name: "Browser MCP Bridge", icon: "🌐", desc: "Microsoft Playwright MCP server offering headless web testing (22 actions) · Live-Verified", category: "MCP Bridges" },
  { name: "Perplexity MCP Bridge", icon: "🔍", desc: "Official Perplexity search engine integration via standard MCP model · Live-Verified", category: "MCP Bridges" },
  { name: "Stripe MCP Bridge", icon: "💳", desc: "Manage payments, customers, subscriptions, and refunds via Stripe's MCP · Live-Verified", category: "MCP Bridges" },
  { name: "GitHub MCP Bridge", icon: "🐙", desc: "Comprehensive GitHub API MCP server: issues, PRs, actions, and projects · Live-Verified", category: "MCP Bridges" },
  { name: "Zapier MCP Bridge", icon: "⚡", desc: "Connect over 9000 apps using Zapier's dynamic action invocation protocol (Pending URL Setup)", category: "MCP Bridges" },
  { name: "Notion MCP Bridge", icon: "📓", desc: "Official Notion workspace integration: pages, databases, and comments (OAuth Integration)", category: "MCP Bridges" },
  { name: "Unreal Engine MCP Bridge", icon: "🎮", desc: "Control actors, material instances, and attributes inside Unreal Engine 5.8+ (Experimental, Editor-embedded)", category: "MCP Bridges" },
  { name: "Lark MCP Bridge", icon: "🐦", desc: "Official Lark/Feishu OpenAPI MCP: messaging, chats, calendar, Base, docs, tasks, wiki (27 tools) · Live-Verified", category: "MCP Bridges" },

  // Direct REST Bridges (non-MCP)
  { name: "LemonSqueezy", icon: "🍋", desc: "Manage orders, customers, subscriptions, discounts, and license keys via direct REST API (Non-MCP) · Live-Verified", category: "Development" },
  { name: "Kit (ConvertKit)", icon: "📮", desc: "Email marketing: subscribers, broadcasts, sequences, and tags via Kit's V4 REST API (Non-MCP) · Live-Verified", category: "Communication" },
];

const CATEGORIES = ["All", "System", "File", "Web", "Vision", "Development", "Communication", "Productivity", "Self-Improvement", "Media", "MCP Bridges"];

export default function Ecosystem() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
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
                type="button"
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
      <SiteFooter />
    </div>
  );
}
