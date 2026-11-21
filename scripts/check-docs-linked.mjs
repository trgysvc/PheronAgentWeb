// Fails when a docs markdown file is not reachable from the docs index AND the sidebar.
// Orphan docs get "Discovered - currently not indexed" in Search Console.
import fs from "fs";
import path from "path";

const root = "src/content/docs";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".md") ? [path.join(d, e.name)] : []);
const slugs = walk(root)
  .map((f) => path.relative(root, f).replace(/\.md$/, "").split(path.sep).join("/"))
  .filter((s) => !/\.[A-Za-z-]+$/.test(s) && !["index", "learn"].includes(s));

const index = fs.readFileSync(path.join(root, "index.md"), "utf8");
const layout = fs.readFileSync("src/app/resources/ResourcesClientLayout.tsx", "utf8");
let bad = 0;
for (const s of slugs) {
  if (!index.includes(`(${s}.md)`)) { console.error(`not in docs index: ${s}`); bad++; }
  if (!layout.includes(`/resources/docs/${s}"`)) { console.error(`not in sidebar: ${s}`); bad++; }
}
if (bad) process.exit(1);
console.log(`ok: ${slugs.length} docs linked from index and sidebar`);
