"use client";

import styles from "../page.module.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useLanguage } from "../../context/LanguageContext";

export default function GetInTouchPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader />

      {/* Enterprise & Licensing Section */}
      <section className={styles.section} style={{ paddingTop: "120px", minHeight: "70vh" }}>
        <div className={styles.sectionHeader} style={{ marginBottom: "60px" }}>
          <span className={styles.sectionTag}>{t("contact.tag", "Enterprise & Licensing")}</span>
          <h1 className={styles.sectionTitle}>{t("contact.title", "Get in Touch")}</h1>
          <p className={styles.sectionSubtitle}>
            {t("contact.subtitle", "Pheron Agent is built for power users, developers, and enterprise teams. Select the appropriate contact channel below.")}
          </p>
        </div>
        <div className={styles.featuresGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>💬</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>{t("contact.generalTitle", "General & Partnerships")}</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              {t("contact.generalDesc", "For general inquiries, strategic partnerships, or custom integration opportunities:")}
            </p>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="mailto:info@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>info@pheronagent.com</a>
              <a href="mailto:collaborations@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>collaborations@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>🛠️</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>{t("contact.helpTitle", "Help & Support")}</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              {t("contact.helpDesc", "Our support engineers are ready to assist you with installation, local model setup, or debugging:")}
            </p>
            <div style={{ marginTop: "16px" }}>
              <a href="mailto:support@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>support@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>💳</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>{t("contact.billingTitle", "Billing & Payments")}</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              {t("contact.billingDesc", "For purchase queries, licensing invoices, tax compliance, or corporate billing:")}
            </p>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="mailto:billing@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>billing@pheronagent.com</a>
              <a href="mailto:payments@pheronagent.com" style={{ color: "var(--color-cyan)", textDecoration: "underline", fontSize: "14px" }}>payments@pheronagent.com</a>
            </div>
          </div>
          <div className={`${styles.featureCard} glass-card`} style={{ padding: "28px" }}>
            <div className={styles.featureIcon} style={{ fontSize: "20px", width: "44px", height: "44px" }}>⚖️</div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginTop: "12px" }}>{t("contact.legalTitle", "Legal & Compliance")}</h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "12px" }}>
              {t("contact.legalDesc", "For custom licensing agreements, compliance audits, data processing agreements (DPA), or regulatory inquiries:")}
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
