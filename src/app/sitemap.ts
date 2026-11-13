import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { DOCS_CONTENT_LANG, SITE_URL } from "../lib/seo";

const STATIC_PATHS = [
  "/",
  "/pricing",
  "/download",
  "/ecosystem",
  "/product/agent",
  "/changelog",
  "/get-in-touch",
  "/resources/learn",
  "/resources/help",
  "/privacy",
  "/terms",
  "/refund",
  "/data-use",
];

function docSlugs(dir: string, base: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...docSlugs(full, base));
    else if (entry.isFile() && entry.name.endsWith(".md")) {
      const rel = path.relative(base, full).replace(/\.md$/, "");
      if (!/\.[A-Za-z-]+$/.test(rel)) out.push(rel.split(path.sep).join("/"));
    }
  }
  return out;
}

/** Only canonical URLs: the English docs; the other language routes repeat the same text and canonicalise to it. */
export default function sitemap(): MetadataRoute.Sitemap {
  const docsDir = path.join(process.cwd(), "src/content/docs");
  const docs = docSlugs(docsDir, docsDir)
    .filter((s) => s !== "index")
    .map((s) => `/resources/docs/${DOCS_CONTENT_LANG}/${s}`);
  const all = [...STATIC_PATHS, `/resources/docs/${DOCS_CONTENT_LANG}`, ...docs];
  return all.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}` }));
}
