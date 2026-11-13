import fs from "fs";
import path from "path";
import LegalClient from "../legal/LegalClient";
import { parseMarkdown } from "../../utils/markdown";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/terms", "Terms of Service | Pheron Agent", "End User License Agreement (EULA) for Pheron Agent.");

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), "src/content/terms.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <LegalClient htmlContent={htmlContent} />;
}
