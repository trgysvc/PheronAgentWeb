import fs from "fs";
import path from "path";
import ResourcesClientLayout from "../../ResourcesClientLayout";
import styles from "../../../page.module.css";
import { parseMarkdown } from "../../../../utils/markdown";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

export default async function ResourcesDocsIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const docsDirectory = path.join(process.cwd(), "src/content/docs");
  
  let filePath = path.join(docsDirectory, `index.${lang}.md`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(docsDirectory, "index.md");
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent, lang);

  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </ResourcesClientLayout>
  );
}
