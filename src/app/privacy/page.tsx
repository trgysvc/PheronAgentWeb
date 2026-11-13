import fs from "fs";
import path from "path";
import LegalClient from "../legal/LegalClient";
import { parseMarkdown } from "../../utils/markdown";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/privacy", "Privacy Policy | Pheron Agent", "How Pheron Agent handles your data: what stays on your Mac and what is processed elsewhere.");

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), "src/content/privacy.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <LegalClient htmlContent={htmlContent} />;
}
