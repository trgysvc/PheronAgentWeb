import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ResourcesClientLayout from "../../ResourcesClientLayout";
import styles from "../../../page.module.css";
import { parseMarkdown } from "../../../../utils/markdown";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getAllMarkdownFiles(dir: string, baseDir: string): string[][] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[][] = [];

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(res, baseDir));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const relativePath = path.relative(baseDir, res);
      const slugParts = relativePath.replace(/\.md$/, "").split(/[\\/]/);
      // Exclude index.md which is served by the parent page
      if (slugParts.length === 1 && slugParts[0] === "index") {
        continue;
      }
      files.push(slugParts);
    }
  }

  return files;
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), "src/content/docs");
  const slugPartsList = getAllMarkdownFiles(docsDirectory, docsDirectory);

  return slugPartsList.map((slugParts) => ({
    slug: slugParts,
  }));
}

export default async function ResourcesDocsSlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  if (!slug || slug.length === 0 || (slug.length === 1 && slug[0] === "index")) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "src/content/docs", ...slug) + ".md";

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent);

  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </ResourcesClientLayout>
  );
}
