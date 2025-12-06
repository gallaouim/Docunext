import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function BlogIndex() {
  const base = path.join(process.cwd(), "src", "content", "blog");
  const posts = fs.existsSync(base)
    ? fs
        .readdirSync(base)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => {
          const raw = fs.readFileSync(path.join(base, f), "utf8");
          const { data } = matter(raw);
          return { slug: f.replace(/\.mdx$/, ""), title: data.title ?? f };
        })
    : [];
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`} className="text-zinc-900 hover:underline dark:text-zinc-200">
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
