import fs from "fs";
import path from "path";
import LegalClient from "../legal/LegalClient";
import { parseMarkdown } from "../../utils/markdown";

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), "src/content/privacy.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <LegalClient htmlContent={htmlContent} />;
}
