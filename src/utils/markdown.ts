import fs from "fs";
import path from "path";
import { marked } from "marked";

const DOCS_ROOT = path.join(process.cwd(), "src/content/docs");

/**
 * Resolves a markdown link the way the file system does: relative to the directory of the page that contains it
 * (`full_tool_inventory.md` inside wiki/ is wiki/full_tool_inventory, `../concepts/x.md` is concepts/x).
 * Links written from the docs root (`wiki/x.md`) keep working: when the directory-relative target does not exist
 * but the root-relative one does, the root-relative one is used.
 */
function resolveDocLink(target: string, docDir: string[]): string {
  const exists = (rel: string) => fs.existsSync(path.join(DOCS_ROOT, `${rel}.md`));
  if (target.startsWith("/")) return target.substring(1);
  const resolved = path.posix.normalize([...docDir, target].join("/"));
  const rootRelative = path.posix.normalize(target);
  if (!resolved.startsWith("..") && exists(resolved)) return resolved;
  if (!rootRelative.startsWith("..") && exists(rootRelative)) return rootRelative;
  return resolved.startsWith("..") ? rootRelative.replace(/^(\.\.\/)+/, "") : resolved;
}

// Custom slugify to ensure GFM-like slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .replace(/[\s_]+/g, "-")  // replace spaces/underscores with hyphens
    .replace(/-+/g, "-")      // collapse multiple hyphens
    .trim();
}

// Rewrites markdown relative links (.md) and normalizes hash anchors (#)
export function rewriteMarkdownLinks(html: string, lang: string = "en", docDir: string[] = []): string {
  // 1. Rewrite relative links ending with .md
  let cleaned = html.replace(/href="([^"]+)\.md"/g, (match, p1) => {
    if (p1.startsWith("http://") || p1.startsWith("https://") || p1.startsWith("mailto:") || p1.startsWith("#")) {
      return match;
    }
    
    const cleanedPath = resolveDocLink(p1, docDir);
    
    if (cleanedPath === "wiki/macos_onboarding_permissions_guide") {
      return 'href="/resources/help"';
    }
    if (cleanedPath === "wiki/learn" || cleanedPath === "learn") {
      return 'href="/resources/learn"';
    }
    if (cleanedPath === "index") {
      return `href="/resources/docs/${lang}"`;
    }
    if (cleanedPath === "wiki/api" || cleanedPath === "api") {
      return `href="/resources/docs/${lang}/api"`;
    }
    if (cleanedPath === "wiki/future" || cleanedPath === "future") {
      return `href="/resources/docs/${lang}/future"`;
    }
    if (cleanedPath === "wiki/security" || cleanedPath === "security") {
      return `href="/resources/docs/${lang}/security"`;
    }
    
    return `href="/resources/docs/${lang}/${cleanedPath}"`;
  });

  // 2. Normalize link anchor hashes to match slugified IDs (e.g. href="#1-apple-hig--onboarding" -> href="#1-apple-hig-onboarding")
  cleaned = cleaned.replace(/href="#([^"]+)"/g, (match, p1) => {
    return `href="#${slugify(p1)}"`;
  });

  return cleaned;
}

// Configures marked and parses markdown content to HTML
export async function parseMarkdown(content: string, lang: string = "en", docDir: string[] = []): Promise<string> {
  // Configure marked custom renderer for headings
  marked.use({
    renderer: {
      heading(token) {
        // Parse inline tokens inside heading
        const text = this.parser.parseInline(token.tokens);
        const id = slugify(token.text);
        return `<h${token.depth} id="${id}">${text}</h${token.depth}>`;
      }
    }
  });

  const html = await marked.parse(content);
  return rewriteMarkdownLinks(html, lang, docDir);
}
