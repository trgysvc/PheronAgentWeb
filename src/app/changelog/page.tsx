import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import ChangelogClient from "./ChangelogClient";
import { parseMarkdown } from "../../utils/markdown";
import { LANGUAGES, DEFAULT_LANGUAGE } from "../../i18n";

export default async function ChangelogPage() {
  const cookieStore = await cookies();
  const requested = cookieStore.get("pheron_language")?.value;
  const lang = LANGUAGES.some((l) => l.code === requested) ? requested! : DEFAULT_LANGUAGE;

  const contentDir = path.join(process.cwd(), "src/content");
  const localizedPath = path.join(contentDir, `changelog.${lang}.md`);
  const filePath = lang !== DEFAULT_LANGUAGE && fs.existsSync(localizedPath)
    ? localizedPath
    : path.join(contentDir, "changelog.md");

  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return <ChangelogClient htmlContent={htmlContent} />;
}
