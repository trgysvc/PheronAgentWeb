"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../i18n";

// Terminal log scripts for simulation removed

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  // Premium Chat Simulation State
  const [simState, setSimState] = useState("idle"); // idle, sending, thinking, tool1, tool2, tool3, streaming, completed
  const [typedText, setTypedText] = useState("");
  const [thinkingText, setThinkingText] = useState("");
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [isBtnBouncing, setIsBtnBouncing] = useState(false);

  const finalMessage = "I've checked your music, found that you're listening to 'The Weeknd - Blinding Lights'. I read his Wikipedia page, summarized it, and sent it to Sarah via iMessage.";

  useEffect(() => {
    // Auto-scroll logic
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [simState, typedText, thinkingText]);

  const activeTimeouts = useRef<NodeJS.Timeout[]>([]);

  const clearSimulation = () => {
    activeTimeouts.current.forEach(clearTimeout);
    activeTimeouts.current = [];
    setSimState("idle");
    setTypedText("");
    setIsBtnBouncing(false);
  };

  const runPremiumSimulation = () => {
    clearSimulation();

    // 1. Submit & Feedback
    setIsBtnBouncing(true);
    setSimState("sending");

    // 2. User Bubble Appears & Thinking Starts
    activeTimeouts.current.push(setTimeout(() => {
      setSimState("thinking");
      setThinkingText("Analyzing intent...");
    }, 400));

    activeTimeouts.current.push(setTimeout(() => {
      setThinkingText("Initializing MediaControllerTool...");
    }, 1500));

    // 3. Tool 1 Executed
    activeTimeouts.current.push(setTimeout(() => {
      setSimState("tool1");
    }, 2800));

    // Tool 2
    activeTimeouts.current.push(setTimeout(() => {
      setSimState("tool2");
    }, 4500));

    // Tool 3
    activeTimeouts.current.push(setTimeout(() => {
      setSimState("tool3");
    }, 6200));

    // 4. Streaming Output
    activeTimeouts.current.push(setTimeout(() => {
      setSimState("streaming");
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < finalMessage.length) {
          setTypedText(finalMessage.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          // 5. Completion & Action Bar
          setSimState("completed");
        }
      }, 25);
      
      // Store interval as any since NodeJS.Timeout overlaps
      activeTimeouts.current.push(typeInterval as any);
    }, 7800));
  };

  useEffect(() => {
    let loopTimeout: NodeJS.Timeout;
    if (simState === "completed") {
      loopTimeout = setTimeout(() => {
        runPremiumSimulation();
      }, 5000);
    }
    return () => clearTimeout(loopTimeout);
  }, [simState]);



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





  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroTagline}>{t("hero.badge", "v1.0.6 NOW AVAILABLE · SWIFT 6 & MLX ENGINE")}</div>
        <h1 className={styles.heroTitle}>
          <span>{t("hero.title", "Native Autonomous AI Agent for macOS")}</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {t("hero.subtitle", "A fully autonomous, hardware-native AI agent running entirely on your Apple Silicon. Local MLX inference, ANE acceleration, and 62 integrated native tools. Privacy by design, autonomy by nature.")}
        </p>

        {/* Hero Screenshot */}
        <div style={{ marginTop: "60px", width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-glass)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
          <Image 
            src="/assets/hero-screenshot.png" 
            alt="Pheron Agent Interface" 
            width={1200} 
            height={800} 
            style={{ width: "100%", height: "auto", display: "block" }} 
            priority
          />
        </div>

      </section>

      {/* Core Capabilities Section */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader} style={{ alignItems: "flex-start", textAlign: "left" }}>
          <span className={styles.sectionTag}>{t("features.tag", "Under the Hood")}</span>
          <h2 className={styles.sectionTitle}>{t("features.title", "Built for Extreme Performance")}</h2>
          <p className={styles.sectionSubtitle} style={{ textAlign: "left", maxWidth: "100%", margin: "0" }}>
            {t("features.subtitle", "Pheron Agent is built with native Apple hardware components to achieve speeds unmatched by cloud-based alternatives.")}
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🚀</div>
            <h3 className={styles.featureTitle}>{t("features.titan_title", "Titan Engine")}</h3>
            <p className={styles.featureDesc}>
              {t("features.titan_desc", "On-device MLX inference featuring wired memory pinning, 4-bit KV quantization, rotating cache (up to 131K context), and speculative decoding via custom draft models.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.titan_meta", "Local Inference")}
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🧠</div>
            <h3 className={styles.featureTitle}>{t("features.ane_title", "ANE Intent Classifier")}</h3>
            <p className={styles.featureDesc}>
              {t("features.ane_desc", "Hardware-accelerated task routing executed directly on the Apple Neural Engine. Routes prompts to tools, weather, chat, or LLM fallback in milliseconds.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.ane_meta", "Neural Engine")}
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>💾</div>
            <h3 className={styles.featureTitle}>{t("features.memory_title", "Three-Layer Memory")}</h3>
            <p className={styles.featureDesc}>
              {t("features.memory_desc", "Structured memory layers: L1 Hot Cache (12 messages), L2 Daily Notes, and L3 DreamBank long-term summaries coupled with Metal-accelerated RAG via custom Metal kernels.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.memory_meta", "Metal RAG")}
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>{t("features.energy_title", "Energy Profiling")}</h3>
            <p className={styles.featureDesc}>
              {t("features.energy_desc", "Monitored via `PheronEnergyDaemon` XPC helper utilizing `powermetrics` at 100ms intervals for exact, hardware-level Joule accounting per task execution.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.energy_meta", "true joule accounting")}
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>{t("features.privacy_title", "Privacy Guard")}</h3>
            <p className={styles.featureDesc}>
              {t("features.privacy_desc", "Rule-based + local LLM PII (Personally Identifiable Information) detection before any external routing, executing PASS, DESENSITIZE, or BLOCK decisions.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.privacy_meta", "Privacy Centric")}
            </div>
          </div>

          <div className={`${styles.featureCard} glass-card`}>
            <div className={styles.featureIcon}>🛠️</div>
            <h3 className={styles.featureTitle}>{t("features.skillvault_title", "SkillVault")}</h3>
            <p className={styles.featureDesc}>
              {t("features.skillvault_desc", "Self-improving procedural memory. The agent writes and patches its own `.skill.md` tool scripts, while a background curator Actor consolidates skills across sessions.")}
            </p>
            <div className={styles.featureMeta}>
              <span className={styles.featureMetaDot} /> {t("features.skillvault_meta", "Self-improving")}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Simulation Section */}
      <section id="chat-demo" className={styles.section}>
        
        <div className={styles.sectionHeader} style={{ alignItems: "flex-start", textAlign: "left" }}>
          <span className={styles.sectionTag}>{t("sim.tag", "Live Simulation")}</span>
          <h2 className={styles.sectionTitle}>{t("sim.title", "Agent Workflow in Action")}</h2>
          <p className={styles.sectionSubtitle} style={{ textAlign: "left", maxWidth: "100%", margin: "0" }}>
            {t("sim.subtitle", "Watch Pheron Agent plan and execute a multi-step workflow locally using native macOS integrations.")}
          </p>
        </div>

        {/* macOS Window Replica */}
        <div className={styles.macOSWindow}>
          
          {/* Header */}
          <div className={styles.macOSHeader}>
            <div className={styles.trafficLights}>
              <div className={`${styles.trafficLight} ${styles.trafficRed}`}></div>
              <div className={`${styles.trafficLight} ${styles.trafficYellow}`}></div>
              <div className={`${styles.trafficLight} ${styles.trafficGreen}`}></div>
            </div>
          </div>

          <div className={styles.appContent}>
            
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarHistory}>
                <div className={styles.historyItem}>
                  <div className={styles.historyItemTitle}>Merhaba ve nas...</div>
                  <div className={styles.historyItemTime}>5 hours ago</div>
                </div>
              </div>
              <div className={styles.sidebarBottom}>
                <button className={styles.newChatBtn} onClick={() => { clearSimulation(); setTimeout(runPremiumSimulation, 100); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  {t("sim.newChat", "New Chat")}
                </button>
              </div>
            </div>

            {/* Main View */}
            <div className={styles.mainView}>
              
              {/* Top Bar */}
              <div className={styles.topBar}>
                <div className={styles.modelSelector}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px'}}>
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Qwen 3.5 9B
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px'}}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                
                <div className={styles.statusIndicator}>
                  <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f'}}></div>
                  {t("sim.ready", "Ready")}
                </div>
                
                <div className={styles.topRightArea}>
                  <span>$0.0000</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <svg className={styles.powerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                  </svg>
                </div>
              </div>

              {/* Chat Area (Auto-scroll container) */}
              <div className={styles.chatArea} ref={chatAreaRef}>
                
                {/* User Prompt Bubble */}
                {simState !== "idle" && simState !== "sending" && (
                  <div className={`${styles.chatBubbleUserPremium} ${styles.animSlideUpFade}`}>
                    {t("sim.userPrompt", "Hey Pheron, what is currently playing on Apple Music? Find the artist's Wikipedia page, summarize it, and message it to Sarah.")}
                  </div>
                )}

                {/* Agent Area */}
                {simState !== "idle" && simState !== "sending" && (
                  <div className={styles.chatAgentWrapper}>
                    
                    {/* Thinking Indicator */}
                    {simState === "thinking" && (
                      <div className={styles.thinkingIndicator}>
                        <div className={`${styles.thinkingLogo} ${styles.animPulseBreathing}`}></div>
                        <span className={styles.animPulseBreathing}>{thinkingText}</span>
                      </div>
                    )}

                    {/* Tool 1 */}
                    {(simState === "tool1" || simState === "tool2" || simState === "tool3" || simState === "streaming" || simState === "completed") && (
                      <div className={`${styles.chatToolCard} ${styles.animSlideUpFade} ${simState !== "tool1" ? styles.animGlowSuccess : ''}`}>
                        <div className={styles.chatToolHeader}>MediaControllerTool</div>
                        <div className={styles.chatToolResult}>
                          &gt; get_current_track()<br/>
                          {simState !== "tool1" && <span className={styles.chatToolSuccess}>✓ The Weeknd - Blinding Lights</span>}
                          {simState === "tool1" && <span className={styles.animPulseBreathing}>Loading...</span>}
                        </div>
                      </div>
                    )}

                    {/* Tool 2 */}
                    {(simState === "tool2" || simState === "tool3" || simState === "streaming" || simState === "completed") && (
                      <div className={`${styles.chatToolCard} ${styles.animSlideUpFade} ${simState !== "tool2" ? styles.animGlowSuccess : ''}`}>
                        <div className={styles.chatToolHeader}>NativeBrowserTool</div>
                        <div className={styles.chatToolResult}>
                          &gt; fetch("https://en.wikipedia.org/wiki/The_Weeknd")<br/>
                          {simState !== "tool2" && <span className={styles.chatToolSuccess}>✓ 14.2KB read and summarized.</span>}
                          {simState === "tool2" && <span className={styles.animPulseBreathing}>Scraping DOM...</span>}
                        </div>
                      </div>
                    )}

                    {/* Tool 3 */}
                    {(simState === "tool3" || simState === "streaming" || simState === "completed") && (
                      <div className={`${styles.chatToolCard} ${styles.animSlideUpFade} ${simState !== "tool3" ? styles.animGlowSuccess : ''}`}>
                        <div className={styles.chatToolHeader}>MessengerTool</div>
                        <div className={styles.chatToolResult}>
                          &gt; send_message(to: "Sarah", text: "Summary...")<br/>
                          {simState !== "tool3" && <span className={styles.chatToolSuccess}>✓ Delivered via iMessage.</span>}
                          {simState === "tool3" && <span className={styles.animPulseBreathing}>Sending...</span>}
                        </div>
                      </div>
                    )}

                    {/* Final Streaming Response */}
                    {(simState === "streaming" || simState === "completed") && (
                      <div className={styles.chatBubbleAgent}>
                        {typedText}
                        {simState === "streaming" && <span className={styles.blinkingCursor}></span>}
                      </div>
                    )}

                    {/* Completion Action Bar */}
                    {simState === "completed" && (
                      <div className={`${styles.actionBar} ${styles.animStaggerFadeIn}`}>
                        <div className={styles.actionBtn}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px'}}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          {t("sim.copy", "Copy")}
                        </div>
                        <div className={styles.actionBtn}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px'}}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                          {t("sim.read", "Read")}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Input Bar */}
              <div className={styles.inputBarWrapper}>
                <div className={styles.inputBar} style={{ borderColor: simState === "completed" ? "rgba(0, 242, 254, 0.4)" : "rgba(255,255,255,0.08)", transition: "border-color 0.3s" }}>
                  <div className={styles.inputPlusBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  
                  {simState === "idle" ? (
                     <input type="text" className={styles.inputField} placeholder={t("sim.askPlaceholder", "Ask PheronAgent...")} value={t("sim.userPrompt", "Hey Pheron, what is currently playing on Apple Music? Find the artist's Wikipedia page, summarize it, and message it to Sarah.")} readOnly />
                  ) : (
                     <input type="text" className={`${styles.inputField} ${simState === "sending" ? styles.inputFadeOut : ''}`} placeholder={t("sim.askPlaceholder", "Ask PheronAgent...")} value="" readOnly />
                  )}

                  <div className={`${styles.inputSendBtn} ${isBtnBouncing ? styles.btnSpringBounce : ''}`} onClick={runPremiumSimulation}>
                    {simState === "idle" || simState === "completed" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                        <rect x="6" y="6" width="12" height="12"></rect>
                      </svg>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: "1000px", margin: "12px auto 0", width: "100%", textAlign: "right", fontSize: "12px", color: "#888" }}>
          {t("sim.disclaimer", "* Design elements may vary in the actual application.")}
        </div>
      </section>

      {/* Frontier Grid Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader} style={{ alignItems: "flex-start", textAlign: "left" }}>
          <span className={styles.sectionTag}>{t("frontier.tag", "VERSATILITY")}</span>
          <h2 className={styles.sectionTitle}>{t("frontier.title", "Learn the details")}</h2>
          <p className={styles.sectionSubtitle} style={{ textAlign: "left", maxWidth: "100%", margin: "0" }}>
            {t("frontier.subtitle", "Pheron Agent seamlessly integrates with the world's leading AI models and your entire local codebase to accelerate development at scale.")}
          </p>
        </div>
          
        <div className={styles.frontierGrid}>
            
            {/* Card 1 */}
            <div className={styles.frontierCard}>
              <h3 className={styles.frontierCardTitle}>{t("frontier.card1_title", "MLX Optimized Local Models")}</h3>
              <p className={styles.frontierCardDesc}>
                {t("frontier.card1_desc", "Run cutting-edge AI models natively on Apple Silicon with MLX optimization.")}
              </p>
              <Link href={`/resources/docs/${language}/wiki/models_and_hardware`} className={styles.frontierCardLink}>
                {t("frontier.card1_link", "Explore models")} 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </Link>
              <div className={styles.frontierCardVisual} style={{ padding: 0 }}>
                <Image src="/assets/mlx_chip_visual.png" alt="MLX Hardware Processing" width={400} height={300} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.frontierCard}>
              <h3 className={styles.frontierCardTitle}>{t("frontier.card2_title", "SkillVault Procedural Memory")}</h3>
              <p className={styles.frontierCardDesc}>
                {t("frontier.card2_desc", "Converts past experiences into refined procedural skills, teaching the agent how to solve similar tasks automatically.")}
              </p>
              <Link href={`/resources/docs/${language}/wiki/skill_vault`} className={styles.frontierCardLink}>
                {t("frontier.card2_link", "Explore SkillVault")} 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </Link>
              <div className={styles.frontierCardVisual} style={{ padding: 0 }}>
                <Image src="/assets/skill_vault_visual.png" alt="SkillVault Visual" width={400} height={300} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.frontierCard}>
              <h3 className={styles.frontierCardTitle}>{t("frontier.card3_title", "System Stability")}</h3>
              <p className={styles.frontierCardDesc}>
                {t("frontier.card3_desc", "Experience uninterrupted performance with autonomous self-healing and intelligent hardware-aware protection.")}
              </p>
              <Link href={`/resources/docs/${language}/wiki/system_stability`} className={styles.frontierCardLink}>
                {t("frontier.card3_link", "Explore Stability")} 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
              <div className={styles.frontierCardVisual} style={{ padding: 0 }}>
                <Image src="/assets/system_stability_visual.png" alt="System Stability Visual" width={400} height={300} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>

          </div>
      </section>

      {/* Bottom Content Section (Changelog & About) */}
      <section className={styles.section} style={{ paddingTop: "20px" }}>
        
        {/* Changelog */}
        <div>
          <h2 className={styles.changelogHeader}>{t("changelog.header", "Changelog")}</h2>
          <div className={styles.changelogGrid}>
            
            <div className={styles.changelogCard}>
              <div className={styles.changelogMeta}>
                <span className={styles.changelogBadge}>1.0.6</span>
                <span>Aug 1, 2026</span>
              </div>
              <span className={styles.changelogTitle}>Lark, LemonSqueezy & Kit Integrations, Audacity, Notes, Reminders & 22 Fixes</span>
            </div>

            <div className={styles.changelogCard}>
              <div className={styles.changelogMeta}>
                <span className={styles.changelogBadge}>1.0.5</span>
                <span>Jul 24, 2026</span>
              </div>
              <span className={styles.changelogTitle}>Citation Safety & Expanded MCP Tools</span>
            </div>

            <div className={styles.changelogCard}>
              <div className={styles.changelogMeta}>
                <span className={styles.changelogBadge}>1.0.4</span>
                <span>Jul 6, 2026</span>
              </div>
              <span className={styles.changelogTitle}>Multi-Turn Continuity & MCP Hub</span>
            </div>

          </div>
          <Link href="/changelog" className={styles.changelogLink}>
            {t("changelog.seeAll", "See all notable changes")} 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        {/* About Banner */}
        <div className={styles.aboutBanner}>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              {t("about.text", "Pheron Agent is your sovereign, on-device AI companion. It runs 100% locally on your Apple Silicon, ensuring absolute privacy while autonomously automating your daily workflows.")}
            </p>
            <Link href="/download" className={styles.changelogLink}>
              {t("about.try", "Try it for yourself")} 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          <div className={styles.aboutVisual}>
            <Image src="/assets/private_ai_visual.png" alt="Pheron Agent" fill sizes="(max-width: 1024px) 100vw, 65vw" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
