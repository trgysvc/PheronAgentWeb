import type { Metadata } from "next";

/** The one canonical origin (apex redirects to www with 308). */
export const SITE_URL = "https://www.pheronagent.com";

/** Language every docs page is actually written in; other /resources/docs/<lang> routes serve the same text. */
export const DOCS_CONTENT_LANG = "en";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, type: "website", url: `${SITE_URL}${path}` },
  };
}

/** First "# " heading of a markdown file, or null. */
export function markdownTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].replace(/[*_`]/g, "").trim() : null;
}

/** First prose paragraph (no heading, list, table, code or blockquote), plain text, at most 160 characters. */
export function markdownDescription(md: string): string | null {
  for (const block of md.split(/\n\s*\n/)) {
    const text = block.trim();
    if (!text || /^(#|[-*+>|`]|\d+\.|!\[|<)/.test(text)) continue;
    const plain = text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (plain.length < 40) continue;
    return plain.length > 160 ? `${plain.slice(0, 157).trimEnd()}...` : plain;
  }
  return null;
}

/**
 * Docs metadata. Every /resources/docs/<lang>/... route currently serves the same English text
 * (no translated markdown exists), so all of them point their canonical at the English URL.
 */
export function docsMetadata(md: string, slug: string[]): Metadata {
  const heading = markdownTitle(md);
  const title = heading ? `${heading} | Pheron Agent Docs` : "Pheron Agent Documentation";
  const description =
    markdownDescription(md) ?? "Pheron Agent documentation: architecture, tools, memory and setup for the native macOS AI agent.";
  const path = `/resources/docs/${DOCS_CONTENT_LANG}${slug.length ? `/${slug.join("/")}` : ""}`;
  return pageMetadata(path, title, description);
}
