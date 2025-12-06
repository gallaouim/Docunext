import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "src", "content", "docs");

const index = [];

const walk = (dir, parts = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) walk(path.join(dir, e.name), [...parts, e.name]);
    else if (e.name.endsWith(".mdx") || e.name.endsWith(".md")) {
      const fp = path.join(dir, e.name);
      const raw = fs.readFileSync(fp, "utf8");
      const { content, data } = matter(raw);
      index.push({
        title: data.title ?? e.name.replace(/\.(mdx|md)$/, ""),
        path: `/docs/${[...parts, e.name.replace(/\.(mdx|md)$/, "")].join("/")}`,
        content: content.replace(/\s+/g, " ").slice(0, 4000),
      });
    }
  }
};

if (fs.existsSync(root)) walk(root);

const outDir = path.join(process.cwd(), "public");
fs.writeFileSync(path.join(outDir, "search-index.json"), JSON.stringify(index, null, 2));
console.log(`Generated search-index.json with ${index.length} entries`);
