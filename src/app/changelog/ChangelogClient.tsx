"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES } from "../../i18n";

interface ChangelogClientProps {
  htmlContent: string;
}

export default function ChangelogClient({ htmlContent }: ChangelogClientProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <SiteHeader />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "140px 24px 80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
