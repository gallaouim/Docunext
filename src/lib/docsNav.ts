export type LeafItem = { href: string; label: string };
export type GroupItem = { label: string; items: LeafItem[] };
export type NavItem = LeafItem | GroupItem;

export const docsItems: readonly NavItem[] = [
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/examples", label: "Examples" },
  { href: "/docs/overview", label: "Overview (MD)" },
  {
    label: "Tutorials",
    items: [
      { href: "/docs/tutorials/tutorial", label: "Tutorial" },
    ],
  },
  { href: "/docs/faq", label: "FAQ (MD)" },
];

export function flattenDocsItems(items: readonly NavItem[]): LeafItem[] {
  const out: LeafItem[] = [];
  for (const it of items) {
    if ("items" in it) out.push(...flattenDocsItems(it.items));
    else out.push({ href: it.href, label: it.label });
  }
  return out;
}
