import fs from "fs";
import path from "path";
import LegalClient from "../legal/LegalClient";
import { parseMarkdown } from "../../utils/markdown";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/refund", "Refund Policy | Pheron Agent", "Refund policy for Pheron Agent licenses.");

export default async function RefundPage() {
  const filePath = path.join(process.cwd(), "src/content/refund.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <LegalClient htmlContent={htmlContent} />;
}
