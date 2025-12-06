import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { SandpackPreview } from "@/components/mdx/SandpackPreview";
import GithubSlugger from "github-slugger";

export type DocMeta = {
  title: string;
  description?: string;
  slug: string[];
};

export type Heading = { depth: number; text: string; id: string };

export function contentRoot() {
  return path.join(process.cwd(), "src", "content");
}

export function docPath({ slug }: { slug: string[] }) {
  const base = path.join(contentRoot(), "docs", slug.join("/"));
  const mdx = `${base}.mdx`;
  const md = `${base}.md`;
  if (fs.existsSync(mdx)) return mdx;
  if (fs.existsSync(md)) return md;
  return mdx; // default path, may throw later on read
}

export async function loadDoc(opts: { slug: string[] }) {
  const filePath = docPath(opts);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const slugger = new GithubSlugger();
  const headings: Heading[] = content
    .split("\n")
    .map((line) => {
      const m = /^(#{1,6})\s+(.*)$/.exec(line.trim());
      if (!m) return null;
      const depth = m[1].length;
      const text = m[2].trim();
      const id = slugger.slug(text);
      return { depth, text, id };
    })
    .filter(Boolean) as Heading[];
  const { content: mdx } = await compileMDX<Record<string, unknown>>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
    components: {
      SandpackPreview,
    },
  });

  const meta: DocMeta = {
    title: data.title ?? opts.slug[opts.slug.length - 1],
    description: data.description ?? undefined,
    slug: opts.slug,
  };

  return { mdx, meta, headings };
}

export function availableDocSlugs() {
  const base = path.join(contentRoot(), "docs");
  const walk = (dir: string, parts: string[] = []): string[][] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results: string[][] = [];
    for (const e of entries) {
      if (e.isDirectory()) results.push(...walk(path.join(dir, e.name), [...parts, e.name]));
      else if (e.name.endsWith(".mdx")) results.push([...parts, e.name.replace(/\.mdx$/, "")]);
      else if (e.name.endsWith(".md")) results.push([...parts, e.name.replace(/\.md$/, "")]);
    }
    return results;
  };
  return fs.existsSync(base) ? walk(base) : [];
}
