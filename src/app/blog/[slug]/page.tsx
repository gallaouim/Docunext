import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default async function BlogPost(props: { params?: { slug?: string } }) {
  const p = (await Promise.resolve(props?.params)) ?? {};
  const slug = String(p.slug ?? "");
  const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const { content: mdx } = await compileMDX({
    source: content,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings] },
    },
  });
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">{data.title ?? slug}</h1>
      <article className="prose mt-4 text-black dark:text-zinc-100">{mdx}</article>
    </main>
  );
}

export function generateStaticParams() {
  const base = path.join(process.cwd(), "src", "content", "blog");
  if (!fs.existsSync(base)) return [] as { slug: string }[];
  return fs
    .readdirSync(base)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}
