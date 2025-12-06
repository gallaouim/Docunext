"use client";
import { useEffect, useRef, useState } from "react";
import { Document } from "flexsearch";

type SearchItem = { id: string; title: string; path: string; content: string };

export function useSearch() {
  const [items, setItems] = useState<SearchItem[]>([]);
  const indexRef = useRef<Document<SearchItem> | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: Omit<SearchItem, "id">[]) => {
        const withId = data.map((d) => ({ id: d.path, ...d }));
        setItems(withId as SearchItem[]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const doc = new Document<SearchItem>({
      document: {
        id: "id",
        index: ["title", "content"],
        store: ["title", "path"],
      },
      tokenize: "forward",
    });
    for (const it of items) doc.add(it);
    indexRef.current = doc;
  }, [items]);

  const search = (q: string) => {
    const doc = indexRef.current;
    if (!doc || !q.trim()) return [] as { title: string; path: string }[];
    const res = doc.search(q, { enrich: true }) as Array<{ result: Array<{ id: string }> }>;
    const hits: { id: string }[] = [];
    for (const group of res) {
      for (const r of group.result) hits.push({ id: r.id });
    }
    const uniq = Array.from(new Map(hits.map((h) => [h.id, h])).values());
    const out = uniq
      .map((h) => items.find((i) => i.id === h.id)!)
      .filter((i) => !!i)
      .slice(0, 8)
      .map((i) => ({ title: i!.title, path: i!.path }));
    return out;
  };

  return { search };
}
