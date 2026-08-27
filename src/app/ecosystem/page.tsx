"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";
import toolsTranslations from "../../i18n/toolsTranslations";

// 72 integrated native tools categorized and described
const TOOLS = [
  // File (3 tools)
  { id: "fileManager", name: "File Manager", icon: "📁", desc: "Native file explorer: scan large files, copy, move, and delete items securely", category: "File" },
  { id: "readFile", name: "Read File", icon: "📖", desc: "Read local documents: PDF, DOCX, TXT, MD, Swift, JSON, Plist without sandbox limits", category: "File" },
  { id: "writeFile", name: "Write File", icon: "✍️", desc: "Atomically write or overwrite local files with auto-directory path building", category: "File" },

  // System (12 tools)
  { id: "shellExec", name: "Shell Exec", icon: "💻", desc: "Secure local shell and zsh terminal execution engine for arbitrary commands", category: "System" },
  { id: "volumeControl", name: "Volume Control", icon: "🔊", desc: "Native Core Audio output volume controller (0-100) bypassing AppleScript", category: "System" },
  { id: "brightnessControl", name: "Brightness Control", icon: "🔆", desc: "Screen brightness controller matching system display parameters", category: "System" },
  { id: "sleepControl", name: "Sleep Control", icon: "🌙", desc: "Put system to sleep, lock display, or control lock status instantly", category: "System" },
  { id: "sysInfo", name: "Sys Info", icon: "📊", desc: "Retrieve hardware specs, CPU cores, and memory capacity using native APIs", category: "System" },
  { id: "telemetry", name: "Telemetry", icon: "📡", desc: "Real-time thermal diagnostics, RAM usage, memory pressure, and CPU activity", category: "System" },
  { id: "dateTime", name: "Date Time", icon: "⏰", desc: "Fetch local system date and time to parse relative user timeframes", category: "System" },
  { id: "appUiLearner", name: "App UI Learner", icon: "🔍", desc: "List running apps and map AXUIElement trees into the experience vault", category: "System" },
  { id: "shortcutScan", name: "Shortcut Scan", icon: "🗂️", desc: "Scan and list all installed Siri Shortcuts on the macOS host system", category: "System" },
  { id: "shortcutRun", name: "Shortcut Run", icon: "🏃", desc: "Invoke siri shortcuts asynchronously with dynamic text arguments", category: "System" },
  { id: "appLauncher", name: "App Launcher", icon: "🚀", desc: "Securely launch macOS applications by name or bundle ID", category: "System" },
  { id: "accessibilityAx", name: "Accessibility AX", icon: "♿", desc: "Interact directly with application UI controls via Accessibility APIs", category: "System" },

  // Web (4 tools)
  { id: "webSearch", name: "Web Search", icon: "🔍", desc: "Live web searching using Brave and Google Search APIs for real-time facts", category: "Web" },
  { id: "webFetch", name: "Web Fetch", icon: "📥", desc: "HTTP document retriever formatting raw web text into clean Markdown", category: "Web" },
  { id: "safariAutomation", name: "Safari Automation", icon: "🧭", desc: "Control active Safari sessions: search, scrape, read, and close tabs", category: "Web" },
  { id: "browserNative", name: "Browser Native", icon: "🌐", desc: "High-fidelity interactive Safari controller for filling forms and navigating", category: "Web" },

  // Communication (4 tools)
  { id: "whatsappSend", name: "WhatsApp Send", icon: "💬", desc: "Automate sending WhatsApp messages using Desktop app scripting", category: "Communication" },
  { id: "unifiedMessaging", name: "Unified Messaging", icon: "💬", desc: "Send messages over iMessage or WhatsApp dynamically based on destination", category: "Communication" },
  { id: "emailSend", name: "Email Send", icon: "📧", desc: "Draft and dispatch emails through Apple Mail with biometric safeguards", category: "Communication" },
  { id: "appleMailManager", name: "Apple Mail Manager", icon: "📧", desc: "Retrieve unread mail, create drafts, and send messages via Apple Mail", category: "Communication" },

  // Media (4 tools)
  { id: "mediaControl", name: "Media Control", icon: "⏯️", desc: "System-wide media playback controls for Apple Music track searching", category: "Media" },
  { id: "musicDna", name: "Music DNA", icon: "🎵", desc: "Forensic acoustic analysis: SNR, THD+N, EBU R128 loudness, key, and tempo", category: "Media" },
  { id: "id3Processor", name: "ID3 Processor", icon: "🏷️", desc: "Recursive ID3 tagger embedding metadata from JSON/TXT with manual overrides", category: "Media" },
  { id: "audacityControl", name: "Audacity Control", icon: "🎙️", desc: "Control running Audacity instance via mod-script-pipe protocol: import/export audio, edit, apply 40+ effects", category: "Media" },

  // Vision (4 tools)
  { id: "imageAnalysis", name: "Image Analysis", icon: "🖼️", desc: "Local screen analysis for OCR and interactive UI element detection", category: "Vision" },
  { id: "semanticVision", name: "Semantic Vision", icon: "👁️‍🗨️", desc: "On-device VLM for semantic visual audits and diagram parsing (24GB+ Mac)", category: "Vision" },
  { id: "chicagoVision", name: "Chicago Vision", icon: "👁️", desc: "Visual OCR and UI layout auditing with ScreenCaptureKit integration", category: "Vision" },
  { id: "backgroundRemoval", name: "Background Removal", icon: "✂️", desc: "On-device Vision framework background isolation exporting transparent PNGs", category: "Vision" },

  // Development (6 tools)
  { id: "gitAction", name: "Git Action", icon: "🌿", desc: "Basic local Git operations: commit, status, diff, log, and revert", category: "Development" },
  { id: "patchFile", name: "Patch File", icon: "🩹", desc: "Line-by-line diff match and semantic file patching without external dependencies", category: "Development" },
  { id: "xcodeEngine", name: "Xcode Engine", icon: "🛠️", desc: "Automated Xcode project building, error tracking, and simulator control", category: "Development" },
  { id: "blender3d", name: "Blender 3D", icon: "🧊", desc: "Automate Blender 3D rendering and meshes via custom background Python process bridge (Non-MCP)", category: "Development" },
  { id: "higgsfieldVideo", name: "Higgsfield Video", icon: "🎥", desc: "Generate generative AI video and motion dynamics via direct Higgsfield REST API (Non-MCP)", category: "Development" },
  { id: "subagentSpawn", name: "Subagent Spawn", icon: "👥", desc: "Delegate recursive sub-tasks to child orchestrator runtimes", category: "Development" },

  // Productivity (11 tools)
  { id: "contacts", name: "Contacts", icon: "📇", desc: "Query and retrieve contact details from the local Contacts database", category: "Productivity" },
  { id: "calendar", name: "Calendar", icon: "📅", desc: "Create, list, and manage local calendar events via EventKit", category: "Productivity" },
  { id: "calculator", name: "Calculator", icon: "🧮", desc: "High-precision math evaluations with safe expression parsing", category: "Productivity" },
  { id: "weather", name: "Weather", icon: "🌤️", desc: "Fetch weather conditions and UV index using Apple WeatherKit", category: "Productivity" },
  { id: "timer", name: "Timer", icon: "⏳", desc: "Set native async timers and reminders with custom messages", category: "Productivity" },
  { id: "researchReport", name: "Research Report", icon: "📝", desc: "Finalize strategic research tasks into publication-quality Markdown sections", category: "Productivity" },
  { id: "appleNotes", name: "Apple Notes", icon: "📝", desc: "Create, list, search, and read Apple Notes natively", category: "Productivity" },
  { id: "appleReminders", name: "Apple Reminders", icon: "🔔", desc: "Create, list, and complete Apple Reminders natively", category: "Productivity" },
  { id: "excelNumbers", name: "Excel (Numbers)", icon: "📊", desc: "Build structured spreadsheets and export genuine .xlsx files via Apple Numbers", category: "Productivity" },
  { id: "powerpointKeynote", name: "PowerPoint (Keynote)", icon: "📑", desc: "Build slide presentations and export genuine .pptx files via Apple Keynote", category: "Productivity" },
  { id: "wordPages", name: "Word (Pages)", icon: "📄", desc: "Build documents and export genuine .docx files via Apple Pages", category: "Productivity" },

  // Self-Improvement (2 tools)
  { id: "memoryVault", name: "Memory Vault", icon: "🧠", desc: "Access local long-term experiential memory for past task solutions", category: "Self-Improvement" },
  { id: "skillPatch", name: "Skill Patch", icon: "🦾", desc: "Manage, patch, and search custom agent skills and procedural rules", category: "Self-Improvement" },

  // MCP Bridges (10 tools) + Direct REST Bridges (2 tools)
  { id: "gitMcpBridge", name: "Git MCP Bridge", icon: "🌿", desc: "Anthropic Model Context Protocol bridge for full Git control (12 actions) · Live-Verified", category: "MCP Bridges" },
  { id: "memoryMcpBridge", name: "Memory MCP Bridge", icon: "🧠", desc: "Official Knowledge-Graph MCP server for entity-relation observation CRUD · Live-Verified", category: "MCP Bridges" },
  { id: "browserMcpBridge", name: "Browser MCP Bridge", icon: "🌐", desc: "Microsoft Playwright MCP server offering headless web testing (22 actions) · Live-Verified", category: "MCP Bridges" },
  { id: "perplexityMcpBridge", name: "Perplexity MCP Bridge", icon: "🔍", desc: "Official Perplexity search engine integration via standard MCP model · Live-Verified", category: "MCP Bridges" },
  { id: "stripeMcpBridge", name: "Stripe MCP Bridge", icon: "💳", desc: "Manage payments, customers, subscriptions, and refunds via Stripe's MCP · Live-Verified", category: "MCP Bridges" },
  { id: "githubMcpBridge", name: "GitHub MCP Bridge", icon: "🐙", desc: "Comprehensive GitHub API MCP server: issues, PRs, actions, and projects · Live-Verified", category: "MCP Bridges" },
  { id: "zapierMcpBridge", name: "Zapier MCP Bridge", icon: "⚡", desc: "Connect over 9000 apps using Zapier's dynamic action invocation protocol (Pending URL Setup)", category: "MCP Bridges" },
  { id: "notionMcpBridge", name: "Notion MCP Bridge", icon: "📓", desc: "Official Notion workspace integration: pages, databases, and comments (OAuth Integration)", category: "MCP Bridges" },
  { id: "unrealEngineMcpBridge", name: "Unreal Engine MCP Bridge", icon: "🎮", desc: "Control actors, material instances, and attributes inside Unreal Engine 5.8+ (Experimental, Editor-embedded)", category: "MCP Bridges" },
  { id: "larkMcpBridge", name: "Lark MCP Bridge", icon: "🐦", desc: "Official Lark/Feishu OpenAPI MCP: messaging, chats, calendar, Base, docs, tasks, wiki (27 tools) · Live-Verified", category: "MCP Bridges" },

  // Direct REST Bridges (non-MCP)
  { id: "lemonSqueezy", name: "LemonSqueezy", icon: "🍋", desc: "Manage orders, customers, subscriptions, discounts, and license keys via direct REST API (Non-MCP) · Live-Verified", category: "Development" },
  { id: "kitConvertKit", name: "Kit (ConvertKit)", icon: "📮", desc: "Email marketing: subscribers, broadcasts, sequences, and tags via Kit's V4 REST API (Non-MCP) · Live-Verified", category: "Communication" },
];

const CATEGORIES = ["All", "System", "File", "Web", "Vision", "Development", "Communication", "Productivity", "Self-Improvement", "Media", "MCP Bridges"];

const CATEGORY_KEYS: Record<string, string> = {
  "All": "ecosystem.catAll",
  "System": "ecosystem.catSystem",
  "File": "ecosystem.catFile",
  "Web": "ecosystem.catWeb",
  "Vision": "ecosystem.catVision",
  "Development": "ecosystem.catDev",
  "Communication": "ecosystem.catComm",
  "Productivity": "ecosystem.catProd",
  "Self-Improvement": "ecosystem.catSelf",
  "Media": "ecosystem.catMedia",
  "MCP Bridges": "ecosystem.catMCP",
};

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
      <SiteHeader />

      {/* 50+ Tools Showcase Section */}
      <section id="tools" className={styles.section} style={{ minHeight: "60vh", paddingTop: "120px" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>{t("ecosystem.title", "Integrated Native Tools")}</span>
          <h2 className={styles.sectionTitle}>{t("ecosystem.title", "Native Tool Ecosystem")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("ecosystem.subtitle", "72 integrated native tools across file management, system automation, web, communication, vision, and developer workflows.")}
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
                {t(CATEGORY_KEYS[cat], cat)}
              </button>
            ))}
          </div>

          <div className={styles.toolsGrid}>
            {filteredTools.map(tool => {
              const translated = toolsTranslations[language]?.[tool.id];
              return (
                <div key={tool.id} className={`${styles.toolCard} glass-card`}>
                  <span className={styles.toolIcon}>{tool.icon}</span>
                  <span className={styles.toolName}>{translated?.name || tool.name}</span>
                  <span className={styles.toolDesc}>{translated?.desc || tool.desc}</span>
                  <span className={styles.toolTag}>{t(CATEGORY_KEYS[tool.category], tool.category)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
