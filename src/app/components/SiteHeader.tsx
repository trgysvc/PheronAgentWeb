"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import { useLanguage } from "../../context/LanguageContext";

interface SiteHeaderProps {
  activeTab?: string;
}

export default function SiteHeader({ activeTab }: SiteHeaderProps) {
  const { language, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link href="/" className={styles.logoContainer} style={{ textDecoration: "none", color: "inherit" }}>
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
            <button className={`${styles.navLinkButton} ${activeTab === "product" ? styles.docsLinkActive : ""}`}>
              {t("nav.product", "Product")}
            </button>
            <div className={styles.navDropdown}>
              <Link href="/product/agent" className={styles.dropdownItem}>{t("nav.agent", "Agent")}</Link>
              <Link href={`/resources/docs/${language}/api`} className={styles.dropdownItem}>{t("footer.api", "API")}</Link>
              <Link href="/ecosystem" className={styles.dropdownItem}>{t("nav.ecosystem", "Ecosystem")}</Link>
            </div>
          </div>

          {/* Pricing */}
          <Link href="/pricing" className={`${styles.navLink} ${activeTab === "pricing" ? styles.docsLinkActive : ""}`}>
            {t("nav.pricing", "Pricing")}
          </Link>

          {/* Resources with 2-Column Dropdown */}
          <div className={styles.navItemWithDropdown}>
            <button className={`${styles.navLinkButton} ${activeTab === "resources" ? styles.docsLinkActive : ""}`}>
              {t("nav.resources", "Resources")}
            </button>
            <div className={`${styles.navDropdown} ${styles.navDropdownTwoCol}`}>
              <div className={styles.dropdownCol}>
                <Link href="/resources/help" className={styles.dropdownItem}>{t("footer.help", "Help")}</Link>
                <Link href={`/resources/docs/${language}`} className={styles.dropdownItem}>{t("footer.docs", "Docs")}</Link>
                <Link href="/resources/learn" className={styles.dropdownItem}>{t("footer.learn", "Learn")}</Link>
                <Link href={`/resources/docs/${language}/wiki/benchmark_results`} className={styles.dropdownItem}>{t("nav.benchmarks", "Benchmarks")}</Link>
              </div>
              <div className={styles.dropdownCol}>
                <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>{t("nav.blog", "Blog")}</span>
                <Link href="/changelog" className={styles.dropdownItem}>{t("nav.changelog", "Changelog")}</Link>
                <span className={styles.dropdownItem} style={{ opacity: 0.4, cursor: "default" }}>{t("nav.community", "Community")}</span>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.navActions}>
          <Link href="/download" className={`${styles.navBtn} btn-primary`}>{t("nav.download", "Download")}</Link>
        </div>
      </div>
    </header>
  );
}
