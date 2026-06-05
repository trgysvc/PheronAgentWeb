"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";

export default function GetInTouchPage() {
  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logoContainer}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "inherit" }}>
              <Image 
                src="/assets/PheronAgentLOGO2.png" 
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

      {/* Enterprise & Licensing Section */}
      <section className={styles.section} style={{ paddingTop: "120px", minHeight: "70vh" }}>
        <div className={styles.sectionHeader} style={{ marginBottom: "60px" }}>
          <span className={styles.sectionTag}>Enterprise & Licensing</span>
          <h1 className={styles.sectionTitle}>Get in Touch</h1>
          <p className={styles.sectionSubtitle}>
            Pheron Agent is built for power users, developers, and enterprise teams. Select the appropriate contact channel below.
          </p>
        </div>
        <div className={styles.featuresGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>💬</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>General & Partnerships</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              For general inquiries, strategic partnerships, or custom integration opportunities:
            </p>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="mailto:info@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>info@pheronagent.com</a>
              <a href="mailto:collaborations@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>collaborations@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>🛠️</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>Help & Support</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              Our support engineers are ready to assist you with installation, local model setup, or debugging:
            </p>
            <div style={{ marginTop: "16px" }}>
              <a href="mailto:support@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>support@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>💳</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>Billing & Payments</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              For purchase queries, licensing invoices, tax compliance, or corporate billing:
            </p>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="mailto:billing@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>billing@pheronagent.com</a>
              <a href="mailto:payments@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>payments@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>⚖️</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>Legal & Compliance</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              For custom licensing agreements, compliance audits, data processing agreements (DPA), or regulatory inquiries:
            </p>
            <div style={{ marginTop: "16px" }}>
              <a href="mailto:legal@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>legal@pheronagent.com</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
