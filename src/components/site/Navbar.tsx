"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Moon, Sun, Github, Linkedin } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearch } from "@/lib/search";

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = useState("");
  const { search } = useSearch();
  const results = useMemo(() => (query ? search(query) : []), [query, search]);
  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const GITHUB_URL = "https://github.com/your-org/your-repo";
  const LINKEDIN_URL = "https://www.linkedin.com/in/maher-gallaoui/";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-300 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <Link href={`/docs/getting-started`} className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <Image src="/logo.svg" alt="DocuNext" width={20} height={20} />
          <span className="text-accent">DocuNext</span>
        </Link>
        <nav className="ml-6 hidden gap-4 md:flex">
          <Link href={`/docs/getting-started`} className="text-sm font-medium text-black hover:text-black dark:text-zinc-300 dark:hover:text-white">Docs</Link>
          <Link href={`/blog`} className="text-sm font-medium text-black hover:text-black dark:text-zinc-300 dark:hover:text-white">Blog</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <Input
              placeholder="Search docs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
              <div className="absolute mt-2 w-80 rounded-md border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                {results.map((r) => (
                  <Link key={r.path} href={r.path} className="block rounded px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    {r.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="ml-2">{isDark ? "Light" : "Dark"}</span>
          </Button>
          <Button
            variant="outline"
            aria-label="GitHub"
            onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
          >
            <Github className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            aria-label="LinkedIn"
            onClick={() => window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer")}
          >
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
