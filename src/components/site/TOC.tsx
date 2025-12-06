type Heading = { depth: number; text: string; id: string };

export function TOC({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) return null;
  const filtered = headings.filter((h) => h.depth <= 3);
  return (
    <aside>
      <div className="max-h-[calc(100vh-4rem)] overflow-auto">
        <div className="text-xs uppercase font-medium text-zinc-700 dark:text-zinc-300">On this page</div>
        <nav className="mt-2 space-y-1">
          {filtered.map((h) => (
            <a key={h.id} href={`#${h.id}`} className={`block rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-accent-soft dark:text-zinc-200 dark:hover:bg-accent-soft ${h.depth === 2 ? "ml-0" : "ml-3"}`}>
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
