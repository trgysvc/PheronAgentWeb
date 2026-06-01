import fs from "fs";
import path from "path";
import ResourcesClientLayout from "../ResourcesClientLayout";
import styles from "../../page.module.css";
import { parseMarkdown } from "../../../utils/markdown";

export default async function ResourcesDocsIndexPage() {
  const filePath = path.join(process.cwd(), "src/content/docs/index.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </ResourcesClientLayout>
  );
}
