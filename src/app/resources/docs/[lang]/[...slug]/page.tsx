import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ResourcesClientLayout from "../../../ResourcesClientLayout";
import styles from "../../../../page.module.css";
import { parseMarkdown } from "../../../../../utils/markdown";

interface PageProps {
  params: Promise<{
    lang: string;
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
      // Clean language suffixes like .tr.md or .en.md
      const cleanRelative = relativePath.replace(/\.(tr|en)\.md$/, ".md").replace(/\.md$/, "");
      const slugParts = cleanRelative.split(/[\\/]/);
      
      // Exclude index.md which is served by the parent [lang]/page.tsx
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
  const rawSlugList = getAllMarkdownFiles(docsDirectory, docsDirectory);
  
  // Deduplicate slug list strings
  const uniqueSlugMap = new Map<string, string[]>();
  for (const parts of rawSlugList) {
    const key = parts.join("/");
    if (!uniqueSlugMap.has(key)) {
      uniqueSlugMap.set(key, parts);
    }
  }

  const slugPartsList = Array.from(uniqueSlugMap.values());
  const languages = ["en", "tr"];
  const paramsList: { lang: string; slug: string[] }[] = [];

  for (const lang of languages) {
    for (const slugParts of slugPartsList) {
      paramsList.push({
        lang,
        slug: slugParts,
      });
    }
  }

  return paramsList;
}

export default async function ResourcesDocsSlugPage({ params }: PageProps) {
  const { lang, slug } = await params;
  
  if (!slug || slug.length === 0 || (slug.length === 1 && slug[0] === "index")) {
    notFound();
  }

  const docsDirectory = path.join(process.cwd(), "src/content/docs");
  
  // Build potential file paths for the requested slug
  const slugPath = slug.join("/");
  const parentDirs = slug.slice(0, -1);
  const baseName = slug[slug.length - 1];

  // Candidates in priority order:
  // 1) <slug>.<lang>.md (e.g. wiki/benchmark_results.tr.md)
  // 2) <lang>/<slug>.md (e.g. tr/wiki/benchmark_results.md)
  // 3) <slug>.md (default fallback)
  const candidate1 = path.join(docsDirectory, ...parentDirs, `${baseName}.${lang}.md`);
  const candidate2 = path.join(docsDirectory, lang, ...slug) + ".md";
  const candidate3 = path.join(docsDirectory, ...slug) + ".md";

  let targetFilePath: string | null = null;
  if (fs.existsSync(candidate1)) {
    targetFilePath = candidate1;
  } else if (fs.existsSync(candidate2)) {
    targetFilePath = candidate2;
  } else if (fs.existsSync(candidate3)) {
    targetFilePath = candidate3;
  }

  if (!targetFilePath) {
    notFound();
  }

  const fileContent = fs.readFileSync(targetFilePath, "utf8");
  const htmlContent = await parseMarkdown(fileContent, lang);

  return (
    <ResourcesClientLayout>
      <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </ResourcesClientLayout>
  );
}
