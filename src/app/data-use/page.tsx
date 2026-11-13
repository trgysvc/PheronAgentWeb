import fs from "fs";
import path from "path";
import LegalClient from "../legal/LegalClient";
import { parseMarkdown } from "../../utils/markdown";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("/data-use", "Data Use Policy | Pheron Agent", "How Pheron Agent uses data.");

export default async function DataUsePage() {
  const filePath = path.join(process.cwd(), "src/content/data-use.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <LegalClient htmlContent={htmlContent} />;
}
