import { marked } from "marked";

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
export function rewriteMarkdownLinks(html: string): string {
  // 1. Rewrite relative links ending with .md
  let cleaned = html.replace(/href="([^"]+)\.md"/g, (match, p1) => {
    if (p1.startsWith("http://") || p1.startsWith("https://") || p1.startsWith("mailto:") || p1.startsWith("#")) {
      return match;
    }
    
    let cleanedPath = p1;
    if (cleanedPath.startsWith("/")) {
      cleanedPath = cleanedPath.substring(1);
    }
    
    if (cleanedPath === "wiki/macos_onboarding_permissions_guide") {
      return 'href="/resources/help"';
    }
    if (cleanedPath === "wiki/learn" || cleanedPath === "learn") {
      return 'href="/resources/learn"';
    }
    if (cleanedPath === "index") {
      return 'href="/resources/docs"';
    }
    if (cleanedPath === "wiki/cli" || cleanedPath === "cli") {
      return 'href="/resources/docs/cli"';
    }
    if (cleanedPath === "wiki/future" || cleanedPath === "future") {
      return 'href="/resources/docs/future"';
    }
    if (cleanedPath === "wiki/security" || cleanedPath === "security") {
      return 'href="/resources/docs/security"';
    }
    
    return `href="/resources/docs/${cleanedPath}"`;
  });

  // 2. Normalize link anchor hashes to match slugified IDs (e.g. href="#1-apple-hig--onboarding" -> href="#1-apple-hig-onboarding")
  cleaned = cleaned.replace(/href="#([^"]+)"/g, (match, p1) => {
    return `href="#${slugify(p1)}"`;
  });

  return cleaned;
}

// Configures marked and parses markdown content to HTML
export async function parseMarkdown(content: string): Promise<string> {
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
  return rewriteMarkdownLinks(html);
}
