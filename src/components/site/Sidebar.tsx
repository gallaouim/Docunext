"use client";
import Link from "next/link";
import { useState } from "react";
import { docsItems } from "@/lib/docsNav";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (label: string) => setOpenGroups((s) => ({ ...s, [label]: !s[label] }));
  return (
    <div className="w-64 shrink-0">
      <div className="p-2 sm:p-3">
        <div className="text-xs uppercase font-medium text-zinc-700 dark:text-zinc-300">Guides</div>
        <nav className="mt-2 space-y-1">
          {docsItems.map((it) => (
            "items" in it ? (
              <div key={`group-${it.label}`} className="mt-2">
                <button
                  type="button"
                  onClick={() => toggleGroup(it.label)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-black hover:bg-accent-soft dark:text-zinc-200 dark:hover:bg-accent-soft"
                >
                  <span>{it.label}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${openGroups[it.label] ? "rotate-90" : "rotate-0"}`} />
                </button>
                {(() => {
                  const hasActive = it.items.some((child) => child.href === pathname);
                  const isOpen = openGroups[it.label] === true || hasActive;
                  return isOpen ? (
                  <div className="mt-1 space-y-1 pl-2">
                    {it.items.map((child) => (
                      <Link key={child.href} href={child.href} className="block rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-accent-soft dark:text-zinc-200 dark:hover:bg-accent-soft">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                  ) : null;
                })()}
              </div>
            ) : (
              <Link key={it.href} href={it.href} className="block rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-accent-soft dark:text-zinc-200 dark:hover:bg-accent-soft">
                {it.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </div>
  );
}
