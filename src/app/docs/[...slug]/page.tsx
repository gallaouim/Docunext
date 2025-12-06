import Link from "next/link";
import { Sidebar } from "@/components/site/Sidebar";
import { docsItems, flattenDocsItems } from "@/lib/docsNav";
import { loadDoc, availableDocSlugs } from "@/lib/mdx";
import { TOC } from "@/components/site/TOC";
import { MobileSidebar } from "@/components/site/MobileSidebar";

export default async function DocPage(props: { params?: { slug?: string[] } }) {
  const p = (await Promise.resolve(props?.params)) ?? {};
  const slug = (p.slug ?? []) as string[];
  const { mdx, meta, headings } = await loadDoc({ slug });
  return (
    <main className="mx-auto max-w-6xl px-6 sm:px-8 py-8">
      <MobileSidebar />
      <div className="flex gap-6">
        <aside className="hidden lg:block w-64">
          <div className="rounded-lg bg-accent-soft p-3 shadow-sm dark:bg-accent-soft">
            <Sidebar />
          </div>
        </aside>
        <article className="prose w-full rounded-lg bg-white p-6 shadow-sm text-black dark:bg-zinc-950 dark:text-zinc-100">
          <h1>{meta.title}</h1>
          {mdx}
          <div className="mt-8 flex items-center justify-between gap-3">
            {(() => {
              const current = `/docs/${slug.join("/")}`;
              const flat = flattenDocsItems(docsItems);
              const idx = flat.findIndex((i) => i.href === current);
              const prev = idx > 0 ? flat[idx - 1] : null;
              const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
              return (
                <>
                  <div className="flex-1">
                    {prev && (
                      <Link href={prev.href} className="block rounded-md bg-accent-soft px-4 py-3 text-sm font-medium text-black dark:text-zinc-200">
                        ← {prev.label}
                      </Link>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    {next && (
                      <Link href={next.href} className="inline-block rounded-md bg-accent-soft px-4 py-3 text-sm font-medium text-black dark:text-zinc-200">
                        {next.label} →
                      </Link>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </article>
        <div className="hidden lg:block w-64">
          <div className="sticky top-16 rounded-lg bg-accent-soft p-3 shadow-sm dark:bg-accent-soft">
            <TOC headings={headings} />
          </div>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return availableDocSlugs().map((slug) => ({ slug }));
}
