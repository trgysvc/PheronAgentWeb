"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../../context/LanguageContext";

export default function PricingPage() {
  const { language, t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader activeTab="pricing" />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "140px 24px 80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <span className={styles.sectionTag}>{t("pricing.tag", "Pricing Plans")}</span>
          <h1 className={styles.sectionTitle} style={{ fontSize: "40px", fontWeight: "800", marginTop: "12px", marginBottom: "16px" }}>
            {t("pricing.title", "Sovereign On-Device Power")}
          </h1>
          <p className={styles.sectionSubtitle} style={{ maxWidth: "600px", margin: "0 auto 40px auto" }}>
            {t("pricing.subtitle", "Pheron Agent runs fully on-device on Apple Silicon. Select a plan that matches your memory allocation and workflow needs.")}
          </p>

          {/* Pricing Card */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", padding: "0 24px" }}>
            <div className="glass-card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "500px", border: "1px solid var(--color-cyan)", position: "relative", overflow: "hidden" }}>
              
              {/* Launch Badge */}
              <div style={{ position: "absolute", top: "16px", right: "-32px", background: "var(--color-cyan)", color: "#000", fontSize: "12px", fontWeight: "800", padding: "6px 40px", transform: "rotate(45deg)", textTransform: "uppercase" }}>
                {t("pricing.launchSpecial", "Launch Special")}
              </div>

              <div>
                <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: "9999px", background: "rgba(0, 242, 254, 0.08)", border: "1px solid rgba(0, 242, 254, 0.2)", color: "var(--color-cyan)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", marginBottom: "12px" }}>
                  {t("pricing.oneTimePurchase", "One-Time Purchase")}
                </div>
                <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "var(--text-primary)" }}>{t("pricing.standardLicense", "Standard License")}</h3>
                <p style={{ fontSize: "15px", color: "var(--text-tertiary)", lineHeight: "1.5" }}>{t("pricing.licenseDesc", "A perpetual license for Pheron Agent. Pay once, use forever on your Mac.")}</p>
              </div>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "8px" }}>
                <span style={{ fontSize: "56px", fontWeight: "800", color: "#fff", lineHeight: "1" }}>$69</span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
                  <span style={{ fontSize: "20px", color: "var(--text-tertiary)", textDecoration: "line-through", fontWeight: "600" }}>$99</span>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{t("pricing.oneTimePayment", "one-time payment")}</span>
                </div>
              </div>

              <Link href="/download" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%", padding: "16px", justifyContent: "center", fontSize: "16px", marginTop: "8px" }}>
                  {t("pricing.downloadMac", "Download for macOS")}
                </button>
              </Link>
              
              <div style={{ textAlign: "center", fontSize: "13px", color: "var(--text-tertiary)", fontStyle: "italic", marginTop: "-8px" }}>
                {t("pricing.lemonNotice", "* Purchasing is securely handled via Lemon Squeezy from within the app after download.")}
              </div>

              <div style={{ textAlign: "center", fontSize: "12px", color: "var(--text-tertiary)", marginTop: "-4px" }}>
                {t("pricing.reqSpecs", "Requires Apple Silicon (M1 or later) · macOS 26 Tahoe or later")}
              </div>

              <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "24px", marginTop: "8px" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", fontSize: "15px", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.guarantee", "14-day money-back guarantee — no questions asked")} (<Link href="/refund" style={{ color: "var(--color-cyan)", textDecoration: "none" }}>{t("footer.refund", "Refund Policy")}</Link>)</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.lifetime", "Lifetime license — use your version forever")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.updates", "Free updates, bug fixes & security patches for your major version")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.upgrades", "Discounted upgrades to future major versions")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.localMlx", "Complete local MLX 4-bit inference")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.multiAgent", "Multi-Agent Swarm execution")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.aneRouting", "ANE Intent Classifier routing")}</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ color: "var(--color-cyan)", fontSize: "18px" }}>✓</span>
                    <span>{t("pricing.allTools", "All 59 integrated native tools")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
