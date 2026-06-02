import Link from "next/link";
import ResourcesClientLayout from "../ResourcesClientLayout";
import styles from "../../page.module.css";

export default function ResourcesHelpPage() {
  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody}>
        <h1>Help & Support</h1>
        <p>
          Find answers, report issues, and get in touch with the Pheron Agent team.
        </p>

        <h2>Quick Links</h2>
        <ul>
          <li><Link href="/resources/docs/wiki/macos_onboarding_permissions_guide">macOS Permissions & Setup Guide</Link> — First-time setup, permission grants, and model downloads</li>
          <li><Link href="/resources/docs/wiki/models_and_hardware">Models & Hardware Tiers</Link> — Supported Apple Silicon chips and recommended models</li>
          <li><Link href="/resources/docs">Documentation</Link> — Full technical reference</li>
          <li><Link href="/changelog">Changelog</Link> — Latest releases and updates</li>
        </ul>

        <h2>Contact Support</h2>
        <ul>
          <li><strong>General questions:</strong> <a href="mailto:info@pheronagent.com">info@pheronagent.com</a></li>
          <li><strong>Bug reports & technical help:</strong> <a href="mailto:support@pheronagent.com">support@pheronagent.com</a></li>
          <li><strong>Billing & licensing:</strong> <a href="mailto:billing@pheronagent.com">billing@pheronagent.com</a></li>
          <li><strong>Privacy & security:</strong> <a href="mailto:privacy@pheronagent.com">privacy@pheronagent.com</a></li>
        </ul>

        <p>
          For a full overview of all contact channels, visit the <Link href="/get-in-touch">Get in Touch</Link> page.
        </p>
      </div>
    </ResourcesClientLayout>
  );
}
