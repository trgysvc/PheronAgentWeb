"use client";

import Link from "next/link";
import ResourcesClientLayout from "../ResourcesClientLayout";
import styles from "../../page.module.css";
import { useLanguage } from "../../../context/LanguageContext";

export default function ResourcesHelpPage() {
  const { t, language } = useLanguage();

  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody}>
        <h1>{t("help.title", "Help & Support")}</h1>
        <p>
          {t("help.subtitle", "Find answers, report issues, and get in touch with the Pheron Agent team.")}
        </p>

        <h2>{t("help.quickLinks", "Quick Links")}</h2>
        <ul>
          <li><Link href={`/resources/docs/${language}/wiki/macos_onboarding_permissions_guide`}>{t("help.linkSetup", "macOS Permissions & Setup Guide")}</Link> — {t("help.descSetup", "First-time setup, permission grants, and model downloads")}</li>
          <li><Link href={`/resources/docs/${language}/wiki/models_and_hardware`}>{t("help.linkModels", "Models & Hardware Tiers")}</Link> — {t("help.descModels", "Supported Apple Silicon chips and recommended models")}</li>
          <li><Link href={`/resources/docs/${language}`}>{t("footer.docs", "Documentation")}</Link> — {t("help.descDocs", "Full technical reference")}</li>
          <li><Link href="/changelog">{t("nav.changelog", "Changelog")}</Link> — {t("help.descChangelog", "Latest releases and updates")}</li>
        </ul>

        <h2>{t("help.contactSupport", "Contact Support")}</h2>
        <ul>
          <li><strong>{t("help.generalQuestions", "General questions:")}</strong> <a href="mailto:info@pheronagent.com">info@pheronagent.com</a></li>
          <li><strong>{t("help.bugReports", "Bug reports & technical help:")}</strong> <a href="mailto:support@pheronagent.com">support@pheronagent.com</a></li>
          <li><strong>{t("help.billingLicensing", "Billing & licensing:")}</strong> <a href="mailto:billing@pheronagent.com">billing@pheronagent.com</a></li>
          <li><strong>{t("help.privacySecurity", "Privacy & security:")}</strong> <a href="mailto:privacy@pheronagent.com">privacy@pheronagent.com</a></li>
        </ul>

        <p>
          {t("help.fullOverview", "For a full overview of all contact channels, visit the")} <Link href="/get-in-touch">{t("nav.getInTouch", "Get in Touch")}</Link> {t("help.pageSuffix", "page.")}
        </p>
      </div>
    </ResourcesClientLayout>
  );
}
