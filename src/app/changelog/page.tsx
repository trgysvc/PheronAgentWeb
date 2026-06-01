import fs from "fs";
import path from "path";
import ChangelogClient from "./ChangelogClient";
import { parseMarkdown } from "../../utils/markdown";

export default async function ChangelogPage() {
  const filePath = path.join(process.cwd(), "src/content/changelog.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <ChangelogClient htmlContent={htmlContent} />;
}
