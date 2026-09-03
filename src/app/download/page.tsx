"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../../context/LanguageContext";

export default function DownloadPage() {
  const { language, t } = useLanguage();
  const [version106Expanded, setVersion106Expanded] = useState(false);
  const [versionExpanded, setVersionExpanded] = useState(false);
  const [version104Expanded, setVersion104Expanded] = useState(false);
  const [version103Expanded, setVersion103Expanded] = useState(false);
  const [version102Expanded, setVersion102Expanded] = useState(false);
  const [version101Expanded, setVersion101Expanded] = useState(false);

  const trackDownload = (fileName: string, version: string, url: string, linkText?: string) => {
    try {
      sendGAEvent("event", "file_download", {
        file_name: fileName,
        file_extension: "dmg",
        link_url: url,
        link_text: linkText || "Download for macOS",
        version: version,
      });
    } catch (e) {
      console.warn("GA4 file_download event error:", e);
    }
  };

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader />

      {/* Main Download Section */}
      <section className={styles.downloadPageContainer}>
        <h1 className={styles.downloadTitle}>{t("download.pageTitle", "Download macOS")}</h1>
        <p className={styles.downloadSubtitle}>{t("download.pageSubtitle", "Requires macOS 26.0+ (Tahoe or later), Apple Silicon — 16 GB RAM minimum, 24 GB+ recommended")}</p>
        
        <div style={{ marginBottom: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a 
            href="https://app.pheronagent.com/PheronAgent106.dmg" 
            className={styles.downloadPillBtn}
            onClick={() => trackDownload("PheronAgent106.dmg", "1.0.6", "https://app.pheronagent.com/PheronAgent106.dmg", "Download for macOS")}
          >
            <span>{t("download.downloadBtn", "Download for macOS")}</span>
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
                <strong style={{ color: "var(--text-primary)" }}>{t("download.noticeTitle", "Download first, buy later.")}</strong> {t("download.noticeDesc", "You can download and install Pheron Agent for free. Upon opening the app, you will be prompted to securely purchase a license or enter an existing key.")}
              </p>
            </div>
          </div>
        </div>

        <h2 className={styles.downloadReleaseHeading}>
          {t("download.releaseHeading", "The Pheron Agent desktop app is available for macOS Release;")}
        </h2>

        <div className={styles.versionList}>
          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion106Expanded(!version106Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.6</span>
                <span className={styles.versionLatestBadge}>{t("download.latest", "Latest")}</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version106Expanded ? styles.versionCaretOpen : ""}`} 
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
            {version106Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  {t("download.activeRelease", "Pheron Agent v{version} is the active, stable release for macOS (Apple Silicon).").replace("{version}", "1.0.6")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent106.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent106.dmg", "1.0.6", "https://app.pheronagent.com/PheronAgent106.dmg", "Download PheronAgent106.dmg directly (v1.0.6)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent106.dmg").replace("{version}", "1.0.6")}
                  </a>
                  <Link href="/changelog#v1.0.6" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersionExpanded(!versionExpanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.5</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>{t("download.previous", "Previous")}</span>
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
                  {t("download.previousRelease", "Pheron Agent v{version} is a previous release for macOS (Apple Silicon).").replace("{version}", "1.0.5")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent105.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent105.dmg", "1.0.5", "https://app.pheronagent.com/PheronAgent105.dmg", "Download PheronAgent105.dmg directly (v1.0.5)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent105.dmg").replace("{version}", "1.0.5")}
                  </a>
                  <Link href="/changelog#v1.0.5" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion104Expanded(!version104Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.4</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>{t("download.previous", "Previous")}</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version104Expanded ? styles.versionCaretOpen : ""}`} 
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
            {version104Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  {t("download.previousRelease", "Pheron Agent v{version} is a previous release for macOS (Apple Silicon).").replace("{version}", "1.0.4")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent104.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent104.dmg", "1.0.4", "https://app.pheronagent.com/PheronAgent104.dmg", "Download PheronAgent104.dmg directly (v1.0.4)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent104.dmg").replace("{version}", "1.0.4")}
                  </a>
                  <Link href="/changelog#v1.0.4" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion103Expanded(!version103Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.3</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>{t("download.previous", "Previous")}</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version103Expanded ? styles.versionCaretOpen : ""}`} 
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
            {version103Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  {t("download.previousRelease", "Pheron Agent v{version} is a previous release for macOS (Apple Silicon).").replace("{version}", "1.0.3")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent103.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent103.dmg", "1.0.3", "https://app.pheronagent.com/PheronAgent103.dmg", "Download PheronAgent103.dmg directly (v1.0.3)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent103.dmg").replace("{version}", "1.0.3")}
                  </a>
                  <Link href="/changelog#v1.0.3" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion102Expanded(!version102Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.2</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>{t("download.previous", "Previous")}</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version102Expanded ? styles.versionCaretOpen : ""}`} 
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
            {version102Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  {t("download.previousRelease", "Pheron Agent v{version} is a previous release for macOS (Apple Silicon).").replace("{version}", "1.0.2")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent102.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent102.dmg", "1.0.2", "https://app.pheronagent.com/PheronAgent102.dmg", "Download PheronAgent102.dmg directly (v1.0.2)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent102.dmg").replace("{version}", "1.0.2")}
                  </a>
                  <Link href="/changelog#v1.0.2" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className={styles.versionItem}>
            <div 
              className={styles.versionRow} 
              onClick={() => setVersion101Expanded(!version101Expanded)}
            >
              <div className={styles.versionLeft}>
                <span className={styles.versionNum}>1.0.1</span>
                <span className={styles.versionLatestBadge} style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text-secondary)", borderColor: "transparent" }}>{t("download.previous", "Previous")}</span>
              </div>
              <svg 
                className={`${styles.versionCaret} ${version101Expanded ? styles.versionCaretOpen : ""}`} 
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
            {version101Expanded && (
              <div className={styles.versionDetails}>
                <p>
                  {t("download.previousRelease", "Pheron Agent v{version} is a previous release for macOS (Apple Silicon).").replace("{version}", "1.0.1")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <a
                    href="https://app.pheronagent.com/PheronAgent101.dmg"
                    className={styles.versionDetailsLink}
                    onClick={() => trackDownload("PheronAgent101.dmg", "1.0.1", "https://app.pheronagent.com/PheronAgent101.dmg", "Download PheronAgent101.dmg directly (v1.0.1)")}
                  >
                    {t("download.directDownload", "Download {file} directly (v{version})").replace("{file}", "PheronAgent101.dmg").replace("{version}", "1.0.1")}
                  </a>
                  <Link href="/changelog#v1.0.1" className={styles.versionDetailsLink}>
                    {t("download.viewChangelog", "View Changelog")}
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
          {t("download.systemRequirements", "System Requirements")}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {[
            [t("download.specOS", "Operating System"), t("download.specOSValue", "macOS 26.0 Tahoe or later")],
            [t("download.specProcessor", "Processor"), t("download.specProcessorValue", "Apple Silicon (M1 or later)")],
            [t("download.specRamMin", "RAM — Minimum"), t("download.specRamMinValue", "16 GB unified memory")],
            [t("download.specRamRec", "RAM — Recommended"), t("download.specRamRecValue", "24 GB+ unified memory")],
            [t("download.specStorage", "Storage"), t("download.specStorageValue", "~6 GB free space (per model)")],
            [t("download.specGpu", "GPU"), t("download.specGpuValue", "Metal (built into Apple Silicon)")],
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
      <SiteFooter />
    </div>
  );
}
