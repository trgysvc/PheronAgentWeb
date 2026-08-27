"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { useLanguage } from "../../../context/LanguageContext";

export default function AgentPage() {
  const { language, t } = useLanguage();

  const ENGINE_COMPONENTS = [
    {
      icon: "🚀",
      title: t("features.titan_title", "Titan Engine"),
      desc: t("features.titan_desc", "On-device MLX inference featuring wired memory pinning, 4-bit KV quantization, rotating cache (up to 131K context), and speculative decoding via custom draft models."),
      meta: t("features.titan_meta", "Local Inference"),
    },
    {
      icon: "🧠",
      title: t("features.ane_title", "ANE Intent Classifier"),
      desc: t("features.ane_desc", "Hardware-accelerated task routing executed directly on the Apple Neural Engine. Routes prompts to tools, weather, chat, or LLM fallback in milliseconds."),
      meta: t("features.ane_meta", "Neural Engine"),
    },
    {
      icon: "💾",
      title: t("features.memory_title", "Three-Layer Memory"),
      desc: t("features.memory_desc", "Structured memory layers: L1 Hot Cache (12 messages), L2 Daily Notes, and L3 DreamBank long-term summaries coupled with Metal-accelerated RAG via custom Metal kernels."),
      meta: t("features.memory_meta", "Metal RAG"),
    },
    {
      icon: "⚡",
      title: t("features.energy_title", "Energy Profiling"),
      desc: t("features.energy_desc", "Monitored via PheronEnergyDaemon XPC helper utilizing powermetrics at 100ms intervals for exact, hardware-level Joule accounting per task execution."),
      meta: t("features.energy_meta", "True Joule Accounting"),
    },
    {
      icon: "🔒",
      title: t("features.privacy_title", "Privacy Guard"),
      desc: t("features.privacy_desc", "Rule-based + local LLM PII detection before any external routing, executing PASS, DESENSITIZE, or BLOCK decisions."),
      meta: t("features.privacy_meta", "Privacy Centric"),
    },
    {
      icon: "🛠️",
      title: t("features.skillvault_title", "SkillVault"),
      desc: t("features.skillvault_desc", "Self-improving procedural memory. The agent writes and patches its own .skill.md tool scripts, while a background curator Actor consolidates skills across sessions."),
      meta: t("features.skillvault_meta", "Self-Improving"),
    },
  ];

  const MODELS = [
    { name: "Qwen3.5 4B", arch: "Qwen 3.5", quant: "4-bit MLX", ram: "6 GB UMA", speed: "~80 tok/s", toolCall: "✓", thinking: "✓", note: "Hybrid GatedDeltaNet + full-attention architecture." },
    { name: "Qwen3.5 9B", arch: "Qwen 3.5", quant: "4-bit MLX", ram: "10 GB UMA", speed: "~50 tok/s", toolCall: "✓", thinking: "✓", note: "Default model for 16 GB devices." },
    { name: "Qwen3.5 9B OptiQ", arch: "Qwen 3.5", quant: "OptiQ 4-bit", ram: "10 GB UMA", speed: "~50 tok/s", toolCall: "✓", thinking: "✓", note: "Mixed-precision quantization for higher quality." },
    { name: "Qwen3.5 27B", arch: "Qwen 3.5", quant: "4-bit MLX", ram: "18 GB UMA", speed: "~20 tok/s", toolCall: "✓", thinking: "✓", note: "Ideal for 24–32 GB Macs." },
    { name: "Llama 3.2 1B", arch: "Llama 3.2", quant: "4-bit MLX", ram: "2 GB UMA", speed: "~180 tok/s", toolCall: "✓", thinking: "—", note: "Ultra-lightweight model." },
    { name: "Llama 3.2 3B", arch: "Llama 3.2", quant: "4-bit MLX", ram: "4 GB UMA", speed: "~120 tok/s", toolCall: "✓", thinking: "—", note: "Default fallback for base M1/M2 chips." },
    { name: "Llama 3.1 8B", arch: "Llama 3.1", quant: "4-bit MLX", ram: "8 GB UMA", speed: "~35 tok/s", toolCall: "✓", thinking: "—", note: "Standard Llama 3.1 8B instruct." },
    { name: "Llama 3.3 70B", arch: "Llama 3.3", quant: "4-bit MLX", ram: "48 GB UMA", speed: "~10 tok/s", toolCall: "✓", thinking: "—", note: "Advanced reasoning for Workstation-class systems." },
    { name: "Llama 4 Scout", arch: "Llama 4 MoE", quant: "4-bit MoE", ram: "80 GB UMA", speed: "~8 tok/s", toolCall: "✓", thinking: "—", note: "⚠️ Experimental — Pending mlx-swift-lm llama4 support." },
    { name: "Llama 4 Maverick", arch: "Llama 4 MoE", quant: "4-bit MoE", ram: "512 GB UMA", speed: "~3 tok/s", toolCall: "✓", thinking: "—", note: "⚠️ Experimental — Massive MoE model." },
    { name: "Gemma 3 1B", arch: "Gemma 3", quant: "4-bit MLX", ram: "2 GB UMA", speed: "~250 tok/s", toolCall: "—", thinking: "—", note: "Lightweight and fast Gemma model." },
    { name: "Gemma 3 4B", arch: "Gemma 3", quant: "4-bit MLX", ram: "6 GB UMA", speed: "~85 tok/s", toolCall: "—", thinking: "—", note: "Balanced Gemma 3 performance." },
    { name: "Gemma 3 12B", arch: "Gemma 3", quant: "4-bit MLX", ram: "12 GB UMA", speed: "~35 tok/s", toolCall: "—", thinking: "—", note: "High-capability Gemma for 16 GB RAM systems." },
    { name: "Gemma 3 27B", arch: "Gemma 3", quant: "4-bit MLX", ram: "24 GB UMA", speed: "~20 tok/s", toolCall: "—", thinking: "—", note: "Gemma 3 model for complex tasks." },
    { name: "Gemma 4 E4B", arch: "Gemma 4", quant: "4-bit MLX", ram: "8 GB UMA", speed: "~60 tok/s", toolCall: "✓", thinking: "✓", note: "Next-gen dense 4.5B model with tool calling." },
    { name: "Gemma 4 26B", arch: "Gemma 4 MoE", quant: "4-bit MoE", ram: "20 GB UMA", speed: "~25 tok/s", toolCall: "✓", thinking: "✓", note: "⚠️ Experimental — Pending MoE router fix." },
    { name: "Mistral 7B v0.3", arch: "Mistral", quant: "4-bit MLX", ram: "8 GB UMA", speed: "~45 tok/s", toolCall: "✓", thinking: "—", note: "Reliable Mistral 7B model." },
    { name: "Mistral Nemo 12B", arch: "Mistral", quant: "4-bit MLX", ram: "12 GB UMA", speed: "~30 tok/s", toolCall: "✓", thinking: "—", note: "Balanced model with large 128K context window." },
    { name: "Mistral Small 24B", arch: "Mistral", quant: "4-bit MLX", ram: "16 GB UMA", speed: "~18 tok/s", toolCall: "✓", thinking: "—", note: "Mistral Small for general-purpose tasks." },
    { name: "Mistral Small 3.2 24B", arch: "Mistral", quant: "4-bit MLX", ram: "16 GB UMA", speed: "~18 tok/s", toolCall: "✓", thinking: "—", note: "Mistral Small 3.2 with enhanced tool calling." },
    { name: "Devstral Small 24B", arch: "Mistral", quant: "4-bit MLX", ram: "24 GB UMA", speed: "~17 tok/s", toolCall: "✓", thinking: "—", note: "⚠️ Experimental — Developer-focused model." },
    { name: "Mistral Large 123B", arch: "Mistral", quant: "4-bit MLX", ram: "128 GB UMA", speed: "~6 tok/s", toolCall: "✓", thinking: "—", note: "Large-scale Mistral Large model." },
    { name: "Devstral 2 123B", arch: "Mistral", quant: "4-bit MLX", ram: "128 GB UMA", speed: "~6 tok/s", toolCall: "✓", thinking: "—", note: "⚠️ Experimental — Pending ministral3 architecture." },
    { name: "Phi-4 Mini", arch: "Phi 4", quant: "4-bit MLX", ram: "4 GB UMA", speed: "~150 tok/s", toolCall: "✓", thinking: "—", note: "Microsoft reasoning model with native function calling." },
    { name: "Phi-4 14B", arch: "Phi 4", quant: "4-bit MLX", ram: "12 GB UMA", speed: "~35 tok/s", toolCall: "—", thinking: "—", note: "Phi-4 14B instruct model." },
    { name: "DeepSeek Coder V2 Lite", arch: "DeepSeek MoE", quant: "4-bit MoE", ram: "12 GB UMA", speed: "~30 tok/s", toolCall: "—", thinking: "—", note: "⚠️ Experimental — Pending deepseek_v2 architecture." },
    { name: "DeepSeek V4 Flash", arch: "DeepSeek MoE", quant: "4-bit MoE", ram: "192 GB UMA", speed: "~4 tok/s", toolCall: "✓", thinking: "✓", note: "⚠️ Experimental — Pending deepseek_v4 architecture." },
    { name: "Qwen2.5-VL 3B", arch: "Qwen 2.5 VL", quant: "4-bit MLX", ram: "24 GB UMA", speed: "~20 tok/s", toolCall: "—", thinking: "—", note: "Vision-Language model requiring 24 GB+ UMA." },
    { name: "Qwen3-VL 4B", arch: "Qwen 3 VL", quant: "4-bit MLX", ram: "32 GB UMA", speed: "~18 tok/s", toolCall: "—", thinking: "—", note: "Vision-Language model requiring 32 GB+ UMA." },
    { name: "Qwen2.5-VL 7B", arch: "Qwen 2.5 VL", quant: "4-bit MLX", ram: "48 GB UMA", speed: "~10 tok/s", toolCall: "—", thinking: "—", note: "Vision-Language model requiring 48 GB+ UMA." },
  ];

  const HW_TIERS = [
    { chip: "Starter (Base) · 16 GB", models: "3B – 9B models", speed: "~30–120 tok/s", features: ["Titan Engine", "ANE Intent Classifier", "72 Tools", "Quantized KV Cache"], highlight: false },
    { chip: "Mid (Pro) · 16–24 GB", models: "9B – 27B models", speed: "~20–200 tok/s", features: ["Titan Engine", "ANE Intent Classifier", "72 Tools", "Speculative Decoding", "Semantic Vision (24GB)"], highlight: true },
    { chip: "High (Max) · 32–64 GB", models: "27B – 32B models", speed: "~15–50 tok/s", features: ["Titan Engine", "ANE Intent Classifier", "72 Tools", "Speculative Decoding", "65K Context (8-bit KV)"], highlight: false },
    { chip: "Ultra (Ultra) · 64 GB+", models: "70B – 72B models", speed: "~10–25 tok/s", features: ["Titan Engine", "ANE Intent Classifier", "72 Tools", "Speculative Decoding", "131K Context (FP16 KV)"], highlight: false },
  ];

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader activeTab="product" />

      {/* Hero */}
      <section className={styles.hero} style={{ paddingBottom: "60px" }}>
        <div className={styles.heroTagline}>{t("agent.tagline", "Technical Specifications")}</div>
        <h1 className={styles.heroTitle}>
          <span>PheronAgent</span>{" "}
          <span className="text-neon">{t("agent.heroNeon", "Under the Hood")}</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {t("agent.heroSubtitle", "A hardware-native autonomous AI agent for macOS. Built on Swift 6 UNO architecture, running entirely on Apple Silicon via local MLX inference.")}
        </p>
        <div className={styles.heroRequirement}>
          <svg className={styles.appleIcon} viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.84-14.3-5.9-3.58-2.83-7.5-7.66-11.75-14.53-8.61-13.9-15.02-30.88-19.23-50.96-2.58-12.35-3.87-24-3.87-34.98 0-16.14 3.87-29.21 11.62-39.22 7.74-10.02 17.5-15.15 29.27-15.4 5.37-.12 11.02 1.63 16.94 5.25 5.92 3.63 9.94 5.44 12.06 5.44 1.79 0 5.44-1.5 10.96-4.5 5.51-3 10.9-4.57 16.16-4.7 11.96-.13 22.01 4.22 30.15 13.06 6.04 6.57 10.37 14.53 13 23.86-13.5 8.16-20.12 18.91-19.87 32.26.25 10.39 4.17 19.1 11.75 26.13 7.58 7.03 16.42 11 26.54 11.9-2.61 7.62-5.78 15.17-9.5 22.65zM119.22 30.3c0-7.85 2.8-15.34 8.4-22.5 7.64-9.39 16.94-14.3 27.9-14.7 1.06 8.36-1.92 16.32-8.94 23.87-7.02 7.55-15.82 12.22-26.4 13.01-.63-.94-.96-1.74-.96-2.68z" />
          </svg>
          <span>{t("agent.reqText", "macOS 26.0+ · Apple Silicon · 16 GB RAM minimum")}</span>
        </div>
      </section>

      {/* Engine Components */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>{t("features.tag", "Under the Hood")}</span>
          <h2 className={styles.sectionTitle}>{t("features.title", "Built for Extreme Performance")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("features.subtitle", "Pheron Agent is built with native Apple hardware components to achieve speeds unmatched by cloud-based alternatives.")}
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {ENGINE_COMPONENTS.map((c) => (
            <div key={c.title} className={`${styles.featureCard} glass-card`}>
              <div className={styles.featureIcon}>{c.icon}</div>
              <h3 className={styles.featureTitle}>{c.title}</h3>
              <p className={styles.featureDesc}>{c.desc}</p>
              <div className={styles.featureMeta}>
                <span className={styles.featureMetaDot} /> {c.meta}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Models */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "80px" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>{t("agent.modelsTag", "Local Models")}</span>
          <h2 className={styles.sectionTitle}>{t("agent.modelsTitle", "Supported Models")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("agent.modelsSubtitle", "All models run entirely on-device via MLX. No internet required. Tool calling and thinking mode support varies by architecture.")}
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            fontFamily: "var(--font-mono)",
          }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-glass)" }}>
                {[
                  t("agent.thModel", "Model"),
                  t("agent.thArch", "Architecture"),
                  t("agent.thQuant", "Quantization"),
                  t("agent.thRam", "Min RAM"),
                  t("agent.thSpeed", "Speed (M4)"),
                  t("agent.thTool", "Tool Calling"),
                  t("agent.thThinking", "Thinking Mode")
                ].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m, i) => (
                <tr key={m.name} style={{
                  borderBottom: "1px solid var(--border-glass)",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {m.name}
                    {m.note && (
                      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", fontWeight: 400, marginTop: "3px", fontFamily: "var(--font-inter)" }}>
                        {m.note}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{m.arch}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: m.quant.startsWith("OptiQ") ? "rgba(127,0,255,0.15)" : "rgba(255,255,255,0.05)",
                      color: m.quant.startsWith("OptiQ") ? "#a78bfa" : "var(--text-secondary)",
                      border: m.quant.startsWith("OptiQ") ? "1px solid rgba(127,0,255,0.3)" : "1px solid var(--border-glass)",
                    }}>
                      {m.quant}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{m.ram}</td>
                  <td style={{ padding: "14px 16px", color: "var(--color-cyan)" }}>{m.speed}</td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {m.toolCall === "✓" ? (
                      <span style={{ color: "#22c55e", fontSize: "16px" }}>✓</span>
                    ) : (
                      <span style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {m.thinking === "✓" ? (
                      <span style={{ color: "#22c55e", fontSize: "16px" }}>✓</span>
                    ) : (
                      <span style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hardware Tiers */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "80px" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>{t("agent.hwTag", "Hardware Requirements")}</span>
          <h2 className={styles.sectionTitle}>{t("agent.hwTitle", "Performance by Chip")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("agent.hwSubtitle", "Pheron Agent automatically selects the best model for your hardware. All tiers require macOS 26.0+ and Apple Silicon.")}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}>
          {HW_TIERS.map((tier) => (
            <div key={tier.chip} className="glass-card" style={{
              padding: "28px",
              borderRadius: "16px",
              border: tier.highlight
                ? "1px solid rgba(0,242,254,0.3)"
                : "1px solid var(--border-glass)",
              background: tier.highlight
                ? "rgba(0,242,254,0.04)"
                : "rgba(255,255,255,0.02)",
              position: "relative",
            }}>
              {tier.highlight && (
                <span style={{
                  position: "absolute",
                  top: "-11px",
                  left: "20px",
                  background: "var(--color-cyan)",
                  color: "#06060a",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  textTransform: "uppercase",
                }}>{t("agent.rec", "Recommended")}</span>
              )}
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{tier.chip}</div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "16px", fontFamily: "var(--font-mono)" }}>
                {tier.models} · {tier.speed}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#22c55e", fontSize: "12px" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: "24px",
          fontSize: "12px",
          color: "var(--text-tertiary)",
          textAlign: "center",
          lineHeight: "1.6",
        }}>
          {t("agent.hwNote", "Speed figures are benchmarked on M4. M1/M2 devices run approximately 2–3× slower on equivalent models. Semantic VLM requires 24 GB+ unified memory.")}
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
